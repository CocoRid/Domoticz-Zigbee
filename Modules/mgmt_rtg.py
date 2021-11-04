from os import getgrouplist
import Domoticz
import time
import struct

from Modules.basicOutputs import mgt_routing_req, mgt_binding_table_req
from Modules.schneider_wiser import schneider_thermostat_check_and_bind
from Modules.tools import is_hex, get_device_nickname

STATUS_CODE = {"00": "Success", "84": "Not Supported (132)"}

STATUS_OF_ROUTE = {
    0x00: "Active (0)",
    0x01: "Discovery underway (1)",
    0x02: "Discovery Failed (2)",
    0x03: "Inactive (3)",
    0x04: "Validation underway (4)",
    0x05: "RESERVED (5)",
    0x06: "RESERVED (6)",
    0x07: "RESERVED (7)",
}

TABLE_TO_REPORT = {
    "RoutingTable": mgt_routing_req,
    "BindingTable": mgt_binding_table_req,
}

CLUSTER_TO_TABLE = {
    "8032": "RoutingTable",
    "8033": "BindingTable"
}

def mgmt_rtg(self, nwkid, table):

    #Domoticz.Log("=======> mgmt_rtg: %s %s" %(nwkid, table))
    if table not in TABLE_TO_REPORT:
        Domoticz.Error("=======> mgmt_rtg: %s %s not found in TABLE_TO_REPORT" %(nwkid, table))
        return

    func = TABLE_TO_REPORT[ table ]
    if table not in self.ListOfDevices[nwkid]:
        self.ListOfDevices[nwkid][table] = {}
        self.ListOfDevices[nwkid][table]["Devices"] = []
        self.ListOfDevices[nwkid][table]["SQN"] = 0
        self.ListOfDevices[nwkid][table]["TimeStamp"] = time.time()
        func(self, nwkid, "00")
        return

    if "TimeStamp" not in self.ListOfDevices[nwkid][table]:
        self.ListOfDevices[nwkid][table]["TimeStamp"] = time.time()
        func(self, nwkid, "00")
        return

    if (
        "Status" in self.ListOfDevices[nwkid][table]
        and self.ListOfDevices[nwkid][table]["Status"] != STATUS_CODE["00"]
    ):
        return


    feq = self.pluginconf.pluginConf[table+"RequestFeq"]
    if time.time() > self.ListOfDevices[nwkid][table]["TimeStamp"] + feq:
        func(self, nwkid, "00")
        return


def mgmt_rtg_rsp(
    self,
    srcnwkid,
    MsgSourcePoint,
    MsgClusterID,
    dstnwkid,
    MsgDestPoint,
    MsgPayload,
):

    if len(MsgPayload) < 10:
        Domoticz.Log("mgmt_rtg_rsp - Short message receive - NwkId: %s Ep: %s Cluster: %s Target: %s Ep: %s Payload: %s" %(
        srcnwkid,
        MsgSourcePoint,
        MsgClusterID,
        dstnwkid,
        MsgDestPoint,
        MsgPayload,   
        ))
        return


    if MsgClusterID == "8032":
        mgmt_routingtable_response( self,  srcnwkid, MsgSourcePoint, MsgClusterID, dstnwkid, MsgDestPoint, MsgPayload, )
    elif MsgClusterID == "8033":
        mgmt_bindingtable_response( self,  srcnwkid, MsgSourcePoint, MsgClusterID, dstnwkid, MsgDestPoint, MsgPayload, )
    else:
        Domoticz.Error("mgmt_rtg_rsp - unknown Cluster %s" %MsgClusterID)
        return

def mgmt_routingtable_response( self,  srcnwkid, MsgSourcePoint, MsgClusterID, dstnwkid, MsgDestPoint, MsgPayload, ):

    Sqn = MsgPayload[0:2]
    Status = MsgPayload[2:4]
    RoutingTableSize = MsgPayload[4:6]
    RoutingTableIndex = MsgPayload[6:8]
    RoutingTableListCount = MsgPayload[8:10]
    RoutingTableListRecord = MsgPayload[10:]     

    if "RoutingTable" not in self.ListOfDevices[srcnwkid]:
        self.ListOfDevices[srcnwkid]["RoutingTable"] = {}
        self.ListOfDevices[srcnwkid]["RoutingTable"]["Devices"] = []
        self.ListOfDevices[srcnwkid]["RoutingTable"]["SQN"] = 0

    if RoutingTableIndex == "00":
        self.ListOfDevices[srcnwkid]["RoutingTable"]["Devices"] = []

    self.ListOfDevices[srcnwkid]["RoutingTable"]["TimeStamp"] = time.time()
    self.ListOfDevices[srcnwkid]["RoutingTable"][ "RoutingTable" + "TableSize"] = int(RoutingTableSize, 16)
    if Status in STATUS_CODE:
        self.ListOfDevices[srcnwkid]["RoutingTable"]["Status"] = STATUS_CODE[Status]
    else:
        self.ListOfDevices[srcnwkid]["RoutingTable"]["Status"] = Status

    if Status != "00":
        return
    idx = 0
    if len(RoutingTableListRecord) % 10 != 0:
        return
    while idx < len(RoutingTableListRecord):

        target_nwkid = RoutingTableListRecord[idx + 2 : idx + 4] + RoutingTableListRecord[idx : idx + 2]
        target_bitfields = RoutingTableListRecord[idx + 4 : idx + 6]
        next_hop = RoutingTableListRecord[idx + 8 : idx + 10] + RoutingTableListRecord[idx + 6 : idx + 8]
        idx += 10

        device_status = int(target_bitfields, 16) & 0b00000111
        device_memory_constraint = (int(target_bitfields, 16) & 0b00001000) >> 3
        many_to_one = (int(target_bitfields, 16) & 0b00010000) >> 4
        route_record_required = (int(target_bitfields, 16) & 0b00100000) >> 5

        routing_record = {}
        routing_record[target_nwkid] = {}
        if device_status in STATUS_OF_ROUTE:
            routing_record[target_nwkid]["Status"] = STATUS_OF_ROUTE[device_status]
        else:
            routing_record[target_nwkid]["Status"] = "Unknown (%s)" % device_status
        routing_record[target_nwkid]["MemoryConstrained"] = device_memory_constraint
        routing_record[target_nwkid]["ManyToOne"] = many_to_one
        routing_record[target_nwkid]["RouteRecordRequired"] = route_record_required
        routing_record[target_nwkid]["NextHopNwkId"] = next_hop

        self.ListOfDevices[srcnwkid]["RoutingTable"]["Devices"].append(routing_record)

    if int(RoutingTableIndex, 16) + int(RoutingTableListCount, 16) < int(RoutingTableSize, 16):
        mgt_routing_req(self, srcnwkid, "%02x" % (int(RoutingTableIndex, 16) + int(RoutingTableListCount, 16)))

def mgmt_bindingtable_response( self,  srcnwkid, MsgSourcePoint, MsgClusterID, dstnwkid, MsgDestPoint, MsgPayload, ):
    
    Sqn = MsgPayload[0:2]
    Status = MsgPayload[2:4]
    BindingTableSize = MsgPayload[4:6]
    BindingTableIndex = MsgPayload[6:8]
    BindingTableListCount = MsgPayload[8:10]
    BindingTableListRecord = MsgPayload[10:]            

    #Domoticz.Log("mgmt_bindingtable_response for %s on cluster %s: >%s< -%s" %(srcnwkid, MsgClusterID, MsgPayload, len(BindingTableListRecord)))  

    if "BindingTable" not in self.ListOfDevices[srcnwkid]:
        self.ListOfDevices[srcnwkid]["BindingTable"] = {}
        self.ListOfDevices[srcnwkid]["BindingTable"]["Devices"] = []
        self.ListOfDevices[srcnwkid]["BindingTable"]["SQN"] = 0

    if BindingTableIndex == "00":
        self.ListOfDevices[srcnwkid]["BindingTable"]["Devices"] = []

    self.ListOfDevices[srcnwkid]["BindingTable"]["TimeStamp"] = time.time()
    self.ListOfDevices[srcnwkid]["BindingTable"][ "BindingTable" + "TableSize"] = int(BindingTableSize, 16)
    if Status in STATUS_CODE:
        self.ListOfDevices[srcnwkid]["BindingTable"]["Status"] = STATUS_CODE[Status]
    else:
        self.ListOfDevices[srcnwkid]["BindingTable"]["Status"] = Status

    if Status != "00":
        return

    idx = 0

    while idx < len(BindingTableListRecord):
        source_ieee = BindingTableListRecord[ idx: idx+16]
        idx += 16
        source_ep = BindingTableListRecord[ idx : idx +2]
        idx += 2
        cluster = BindingTableListRecord[ idx: idx +4 ]
        idx += 4
        addr_mode = BindingTableListRecord[ idx: idx +2 ]
        idx += 2
        if addr_mode == '03':
            dest_ieee = BindingTableListRecord[ idx: idx +16]
            dest_ieee = "%x" %struct.unpack("Q", struct.pack(">Q", int(dest_ieee, 16)))[0])
            idx += 16
        elif addr_mode in ( '02', '01'):
            shortid = BindingTableListRecord[ idx: idx +4]
            shortid = "%04x" %(struct.unpack("H", struct.pack(">H", int(shortid, 16)))[0])
            idx += 4
        dest_ep = BindingTableListRecord[ idx: idx+2]
        idx += 2

        binding_record = {}
        binding_record[source_ieee] = {}

        binding_record[source_ieee]["sourceEp"] = source_ep
        binding_record[source_ieee]["Cluster"] = cluster
        if addr_mode == '03':
            binding_record[source_ieee]["targetIEEE"] = dest_ieee
            binding_record[source_ieee]["targetNickName"] = get_device_nickname( self, Ieee=dest_ieee)
        elif addr_mode == '01':
            binding_record[source_ieee]["targetGroupId"] = shortid
        elif addr_mode == '02':
            binding_record[source_ieee]["targetNwkId"] = shortid
            binding_record[source_ieee]["targetNickName"] = get_device_nickname( self, NwkId=shortid)

        binding_record[source_ieee]["targetEp"] = dest_ep

        self.ListOfDevices[srcnwkid]["BindingTable"]["Devices"].append(binding_record)

    if int(BindingTableIndex, 16) + int(BindingTableListCount, 16) < int(BindingTableSize, 16):
        mgt_routing_req(self, srcnwkid, "%02x" % (int(BindingTableIndex, 16) + int(BindingTableListCount, 16)))