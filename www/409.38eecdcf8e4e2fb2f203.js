(self.webpackChunkzigate_plugin=self.webpackChunkzigate_plugin||[]).push([[409],{5409:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GroupModule:()=>C});var i=n(6073),o=n(5425),a=n(3548),r=n(2548),s=n(3218),c=n(4079),u=n(1572),l=n(9774),d=n(3957),p=n(2582),h=n(5181),g=n(175),m=n(7703),_=n(1980),Z=n(4224);const U=["table"],f=["content"];function b(e,t){if(1&e){const e=u.EpF();u._uU(0,"\n            "),u.TgZ(1,"i",20),u.NdJ("click",function(){const t=u.CHM(e).row;return u.oxw().delete(t)}),u.ALo(2,"translate"),u.qZA(),u._uU(3,"\n          ")}2&e&&(u.xp6(1),u.s9C("title",u.lcZ(2,1,"group.create.delete.button")))}function w(e,t){1&e&&u._uU(0),2&e&&u.hij("\n            ",t.row._GroupId,"\n          ")}function v(e,t){if(1&e){const e=u.EpF();u._uU(0,"\n            "),u.TgZ(1,"input",21),u.NdJ("change",function(t){const n=u.CHM(e).row;return u.oxw().updateValue(t,n._GroupId)}),u.qZA(),u._uU(2,"\n          ")}if(2&e){const e=t.row;u.xp6(1),u.Q6J("value",e.GroupName)}}function A(e,t){if(1&e&&(u._uU(0,"\n                "),u.TgZ(1,"span",24),u._uU(2,"\n                  "),u.TgZ(3,"b"),u._uU(4,"Widget"),u.qZA(),u._uU(5),u.TgZ(6,"b"),u._uU(7,"IEEE"),u.qZA(),u._uU(8),u.TgZ(9,"b"),u._uU(10,"Ep"),u.qZA(),u._uU(11),u.TgZ(12,"b"),u._uU(13,"Id"),u.qZA(),u._uU(14),u.TgZ(15,"b"),u._uU(16),u.qZA(),u._uU(17,"\n                "),u.qZA(),u._uU(18,"\n              ")),2&e){const e=t.item,n=t.searchTerm;u.xp6(1),u.Q6J("ngOptionHighlight",n),u.xp6(4),u.hij(" : ",e.Name," - "),u.xp6(3),u.hij(" : ",e.IEEE," - "),u.xp6(3),u.hij(" : ",e.Ep," -\n                  "),u.xp6(3),u.hij(" : ",e._ID," -\n                  "),u.xp6(2),u.Oqu(e.ZDeviceName)}}function x(e,t){if(1&e){const e=u.EpF();u._uU(0,"\n            "),u.TgZ(1,"ng-select",22),u.NdJ("ngModelChange",function(e){return t.row.devicesSelected=e})("change",function(){return u.CHM(e),u.oxw().isFormValid()}),u._uU(2,"\n              "),u.YNc(3,A,19,6,"ng-template",23),u._uU(4,"\n            "),u.qZA(),u._uU(5,"\n          ")}if(2&e){const e=t.row,n=u.oxw();u.xp6(1),u.Q6J("items",n.devices)("multiple",!0)("closeOnSelect",!1)("searchable",!0)("ngModel",e.devicesSelected)}}function T(e,t){if(1&e){const e=u.EpF();u._uU(0,"\n            "),u.TgZ(1,"div",25),u._uU(2,"\n              "),u.TgZ(3,"input",26),u.NdJ("click",function(t){const n=u.CHM(e).row;return u.oxw().updateCoordinator(t,n)}),u.qZA(),u._uU(4,"\n            "),u.qZA(),u._uU(5,"\n          ")}if(2&e){const e=t.row;u.xp6(3),u.Q6J("checked",e.coordinatorInside)}}function N(e,t){1&e&&(u._uU(0,"\n  "),u.TgZ(1,"div",27),u._uU(2,"\n    "),u._UZ(3,"h4",28),u._uU(4,"\n    "),u.TgZ(5,"button",29),u.NdJ("click",function(){return t.$implicit.dismiss("Cross click")}),u._uU(6,"\n      "),u.TgZ(7,"span",30),u._uU(8,"\xd7"),u.qZA(),u._uU(9,"\n    "),u.qZA(),u._uU(10,"\n  "),u.qZA(),u._uU(11,"\n  "),u._UZ(12,"div",31),u._uU(13,"\n  "),u.TgZ(14,"div",32),u._uU(15,"\n    "),u.TgZ(16,"button",33),u.NdJ("click",function(){return t.$implicit.dismiss("cancel")}),u.qZA(),u._uU(17,"\n  "),u.qZA(),u._uU(18,"\n"))}const E=function(e,t,n){return{emptyMessage:e,totalMessage:t,selectedMessage:n}},q=new r.Yd("GroupComponent"),k=[{path:"",component:(()=>{class e extends c.n{constructor(e,t,n,i,o,a){super(),this.modalService=e,this.apiService=t,this.formBuilder=n,this.translate=i,this.toastr=o,this.headerService=a,this.rows=[],this.rowsTemp=[],this.temp=[],this.hasEditing=!1,this.waiting=!1}ngOnInit(){this.apiService.getZGroupDevicesAvalaible().subscribe(e=>{const t=[];e&&e.length>0&&(e.forEach(e=>{e.WidgetList.forEach(n=>{if("0000"!==e._NwkId){const i=new s.zL;i.Ep=n.Ep,i.IEEE=n.IEEE,i.Name=n.Name,i.ZDeviceName=n.ZDeviceName,i._ID=n._ID,i._NwkId=e._NwkId,t.push(i)}})}),this.devices=[...t],this.getGroups())})}updateValue(e,t){this.hasEditing=!0,this.rows.find(e=>e._GroupId===t).GroupName=e.target.value}updateFilter(e){const t=e.target.value.toLowerCase(),n=this.temp.filter(function(e){let n=!1;return e._GroupId&&(n=-1!==e._GroupId.toLowerCase().indexOf(t)),!n&&e.GroupName&&(n=-1!==e.GroupName.toLowerCase().indexOf(t)),n||!t});this.rows=n,this.table.offset=0}updateDevices(){this.rows.forEach(e=>{e.coordinatorInside&&(e.devicesSelected||(e.devicesSelected=[]),e.devicesSelected.push({Ep:"01",_NwkId:"0000"}))}),this.isFormValid&&this.apiService.putZGroups(this.rows).subscribe(e=>{q.debug(this.rows),this.hasEditing=!1,this.toastr.success(this.translate.instant("api.global.succes.update.title")),this.apiService.getRestartNeeded().subscribe(e=>{1===e.RestartNeeded&&(this.headerService.setRestart(!0),this.open(this.content))}),this.waiting=!0,setTimeout(()=>{this.getGroups(),this.waiting=!1},1e3)})}delete(e){const t=this.rows.indexOf(e,0);t>-1&&(this.rows.splice(t,1),this.rows=[...this.rows],this.temp=[...this.rows])}add(){const e=new s.ZA;e.GroupName="",e.coordinatorInside=!1,this.rows.push(e),this.rows=[...this.rows],this.temp=[...this.rows]}updateCoordinator(e,t){t.coordinatorInside=e.currentTarget.checked}open(e){this.modalService.open(e,{ariaLabelledBy:"modal-basic-title"}).result.then(e=>{},e=>{})}isFormValid(){let e=!0;return this.rows.forEach(t=>{t.GroupName&&(t.coordinatorInside||t.devicesSelected&&0!==t.devicesSelected.length)||(e=!1)}),!this.waiting&&e}getGroups(){this.apiService.getZGroups().subscribe(e=>{e&&e.length>0&&(e.forEach(e=>{const t=[];e.coordinatorInside=!1,e.Devices.forEach(n=>{if("0000"===n._NwkId)e.coordinatorInside=!0;else{const e=this.devices.find(e=>e._NwkId===n._NwkId&&e.Ep===n.Ep);null!=e&&t.push(e)}}),e.devicesSelected=t}),this.rows=[...e],this.temp=[...e])})}}return e.\u0275fac=function(t){return new(t||e)(u.Y36(l.FF),u.Y36(d.s),u.Y36(i.qu),u.Y36(p.sK),u.Y36(h._W),u.Y36(g.r))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-group"]],viewQuery:function(e,t){if(1&e&&(u.Gf(U,5),u.Gf(f,5)),2&e){let e;u.iGM(e=u.CRH())&&(t.table=e.first),u.iGM(e=u.CRH())&&(t.content=e.first)}},features:[u.qOj],decls:71,vars:46,consts:[[1,"card"],[1,"card-header"],["translate","group.create.validate.button",1,"btn","btn-primary","float-right",3,"disabled","click"],[1,"card-body"],[1,"card-title",3,"innerHTML"],[1,"card-text"],[1,"row"],[1,"col-sm"],["type","text",3,"placeholder","keyup"],[1,"col-sm-2"],["translate","group.create.add.button",1,"w-100","btn","btn-primary",3,"click"],[1,"bootstrap",3,"rows","columnMode","headerHeight","footerHeight","limit","rowHeight","messages"],["table",""],[3,"sortable","maxWidth"],["ngx-datatable-cell-template",""],["prop","_GroupId",3,"maxWidth","name"],["prop","GroupName",3,"maxWidth","name"],[3,"name","sortable"],[3,"maxWidth","name","sortable"],["content",""],[1,"fa","fa-trash",2,"cursor","pointer",3,"title","click"],["autofocus","","type","text",3,"value","change"],["bindLabel","Name","placeholder","Choose device","appendTo","body",3,"items","multiple","closeOnSelect","searchable","ngModel","ngModelChange","change"],["ng-option-tmp",""],[3,"ngOptionHighlight"],[1,"form-check"],["type","checkbox",1,"form-check-input",3,"checked","click"],[1,"modal-header"],["id","modal-basic-title","translate","group.reloadplugin.alert.title",1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],["translate","group.reloadplugin.alert.subject",1,"modal-body"],[1,"modal-footer"],["type","button","translate","group.reloadplugin.alert.cancel",1,"btn","btn-outline-dark",3,"click"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0),u._uU(1,"\n  "),u.TgZ(2,"div",1),u._uU(3),u.ALo(4,"translate"),u.TgZ(5,"button",2),u.NdJ("click",function(){return t.updateDevices()}),u.qZA(),u._uU(6,"\n  "),u.qZA(),u._uU(7,"\n  "),u.TgZ(8,"div",3),u._uU(9,"\n    "),u._UZ(10,"h5",4),u.ALo(11,"translate"),u._uU(12,"\n    "),u.TgZ(13,"div",5),u._uU(14,"\n      "),u.TgZ(15,"div",6),u._uU(16,"\n        "),u.TgZ(17,"div",7),u._uU(18,"\n          "),u.TgZ(19,"input",8),u.NdJ("keyup",function(e){return t.updateFilter(e)}),u.ALo(20,"translate"),u.qZA(),u._uU(21,"\n        "),u.qZA(),u._uU(22,"\n        "),u.TgZ(23,"div",9),u._uU(24,"\n          "),u.TgZ(25,"button",10),u.NdJ("click",function(){return t.add()}),u.qZA(),u._uU(26,"\n        "),u.qZA(),u._uU(27,"\n      "),u.qZA(),u._uU(28,"\n      "),u.TgZ(29,"ngx-datatable",11,12),u.ALo(31,"translate"),u.ALo(32,"translate"),u.ALo(33,"translate"),u._uU(34,"\n        "),u.TgZ(35,"ngx-datatable-column",13),u._uU(36,"\n          "),u.YNc(37,b,4,3,"ng-template",14),u._uU(38,"\n        "),u.qZA(),u._uU(39,"\n\n        "),u.TgZ(40,"ngx-datatable-column",15),u.ALo(41,"translate"),u._uU(42,"\n          "),u.YNc(43,w,1,1,"ng-template",14),u._uU(44,"\n        "),u.qZA(),u._uU(45,"\n        "),u.TgZ(46,"ngx-datatable-column",16),u.ALo(47,"translate"),u._uU(48,"\n          "),u.YNc(49,v,3,1,"ng-template",14),u._uU(50,"\n        "),u.qZA(),u._uU(51,"\n        "),u.TgZ(52,"ngx-datatable-column",17),u.ALo(53,"translate"),u._uU(54,"\n          "),u.YNc(55,x,6,5,"ng-template",14),u._uU(56,"\n        "),u.qZA(),u._uU(57,"\n        "),u.TgZ(58,"ngx-datatable-column",18),u.ALo(59,"translate"),u._uU(60,"\n          "),u.YNc(61,T,6,1,"ng-template",14),u._uU(62,"\n        "),u.qZA(),u._uU(63,"\n      "),u.qZA(),u._uU(64,"\n    "),u.qZA(),u._uU(65,"\n  "),u.qZA(),u._uU(66,"\n"),u.qZA(),u._uU(67,"\n\n"),u.YNc(68,N,19,0,"ng-template",null,19,u.W1O),u._uU(70,"\n")),2&e&&(u.xp6(3),u.hij("\n    ",u.lcZ(4,22,"group.create.header"),""),u.xp6(2),u.Q6J("disabled",!t.isFormValid()),u.xp6(5),u.Q6J("innerHTML",u.lcZ(11,24,"group.create.subtitle"),u.oJD),u.xp6(9),u.s9C("placeholder",u.lcZ(20,26,"group.create.placeholder")),u.xp6(10),u.Q6J("rows",t.rows)("columnMode","force")("headerHeight",40)("footerHeight","auto")("limit",10)("rowHeight","auto")("messages",u.kEZ(42,E,u.lcZ(31,28,"NODATA"),u.lcZ(32,30,"TOTAL"),u.lcZ(33,32,"SELECTED"))),u.xp6(6),u.Q6J("sortable",!1)("maxWidth",100),u.xp6(5),u.s9C("name",u.lcZ(41,34,"group.create.shortid.column")),u.Q6J("maxWidth",100),u.xp6(6),u.s9C("name",u.lcZ(47,36,"group.create.groupname.column")),u.Q6J("maxWidth",200),u.xp6(6),u.s9C("name",u.lcZ(53,38,"group.create.devices.column")),u.Q6J("sortable",!1),u.xp6(6),u.s9C("name",u.lcZ(59,40,"group.create.coordinator.column")),u.Q6J("maxWidth",150)("sortable",!1))},directives:[p.Pi,m.nE,m.UC,m.vq,_.w9,i.JJ,i.On,_.Z2,Z.s],pipes:[p.X$],styles:[""]}),e})(),data:{title:(0,r.Kl)("group")}}];let I=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({providers:[],imports:[[a.Bz.forChild(k)],a.Bz]}),e})(),C=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[I,o.m,i.u5]]}),e})()}}]);