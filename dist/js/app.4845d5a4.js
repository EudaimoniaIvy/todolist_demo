(function(){"use strict";var t={4244:function(t,e,o){var n=o(8935),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"root"}},[o("div",{staticClass:"todo-container"},[o("div",{staticClass:"todo-wrap"},[o("MyHeader",{on:{addTodo:t.addTodo}}),o("MyList",{attrs:{todos:t.todos}}),o("MyFooter",{attrs:{todos:t.todos},on:{checkAllTodo:t.checkAllTodo,clearAllTodo:t.clearAllTodo}})],1)])])},i=[],d=o(8937),s=o.n(d),a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-header"},[o("input",{attrs:{type:"text",placeholder:"请输入你的任务名称，按回车键确认"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.add.apply(null,arguments)}}})])},l=[],c=o(562),u={name:"MyHeader",data(){return{title:""}},methods:{add(t){if(!t.target.value.trim())return alert("输入不能为空");const e={id:(0,c.x0)(),title:t.target.value,done:!1,isEdit:!1};this.$emit("addTodo",e),t.target.value=""}}},h=u,f=o(1001),p=(0,f.Z)(h,a,l,!1,null,"dbbb0770",null),m=p.exports,v=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ul",{staticClass:"todo-main"},t._l(t.todos,(function(t){return o("MyItem",{key:t.id,attrs:{todo:t}})})),1)},b=[],T=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{appear:"",name:"animate__animated animate__bounce","enter-active-class":"animate__bounceInDown","leave-active-class":"animate__fadeOut"}},[o("li",[o("label",[o("input",{attrs:{type:"checkbox"},domProps:{checked:t.todo.done},on:{change:function(e){return t.handlerCheck(t.todo.id,e)}}}),o("span",{directives:[{name:"show",rawName:"v-show",value:!t.todo.isEdit,expression:"!todo.isEdit"}]},[t._v(t._s(t.todo.title))]),o("input",{directives:[{name:"show",rawName:"v-show",value:t.todo.isEdit,expression:"todo.isEdit"}],ref:"inputTitle",attrs:{type:"text"},domProps:{value:t.todo.title},on:{blur:function(e){return t.handleBlur(e,t.todo)}}})]),o("button",{staticClass:"btn btn-danger",on:{click:function(e){return t.handlerDelete(t.todo.id)}}},[t._v("删除")]),o("button",{staticClass:"btn btn-edit",on:{click:function(e){return t.handlerEdit(t.todo.id)}}},[t._v("编辑")])])])},y=[],k={name:"MyItem",props:["todo"],methods:{handlerCheck(t){this.$bus.$emit("checkTodo",t)},handlerDelete(t){confirm("确定要删除吗")&&s().publish("deleteTodo",t)},handlerEdit(t){this.$bus.$emit("editHandler",t),this.$nextTick((function(){this.$refs.inputTitle.focus()}))},handleBlur(t,e){if(e.isEdit=!1,!t.target.value.trim())return alert("输入不能为空！");this.$bus.$emit("updateTodo",e.id,t.target.value)}}},_=k,$=(0,f.Z)(_,T,y,!1,null,"ec7e2906",null),g=$.exports,w={name:"MyList",components:{MyItem:g},props:["todos"]},E=w,x=(0,f.Z)(E,v,b,!1,null,"d32ebb06",null),A=x.exports,O=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],staticClass:"todo-footer"},[o("label",[o("input",{attrs:{type:"checkbox"},domProps:{checked:t.isAll},on:{change:t.checkAll}})]),o("span",[o("span",[t._v("已完成"+t._s(t.doneTotal))]),t._v(" / 全部"+t._s(t.total))]),o("button",{staticClass:"btn btn-danger",on:{click:t.clearAll}},[t._v("清除已完成任务")])])},C=[],M={name:"MyFooter",props:["todos"],data(){return{newTodos:[]}},computed:{total(){return this.todos.length},doneTotal(){return this.todos.reduce(((t,e)=>t+(e.done?1:0)),0)},isAll(){return this.doneTotal===this.total&&this.total>0}},methods:{checkAll(t){this.$emit("checkAllTodo",t.target.checked)},clearAll(){this.$emit("clearAllTodo")}}},H=M,I=(0,f.Z)(H,O,C,!1,null,"cd5c46c2",null),Z=I.exports,j={name:"App",components:{MyFooter:Z,MyList:A,MyHeader:m},data(){return{todos:JSON.parse(localStorage.getItem("todos"))||[]}},methods:{addTodo(t){this.todos.unshift(t)},checkTodo(t){this.todos.forEach((e=>{e.id===t&&(e.done=!e.done)}))},deleteTodo(t,e){this.todos=this.todos.filter((t=>t.id!==e))},checkAllTodo(t){this.todos.forEach((e=>{e.done=t}))},clearAllTodo(){this.todos=this.todos.filter((t=>!t.done))},editHandler(t){this.todos.forEach((e=>{e.id===t&&(e.isEdit=!e.isEdit)}))},updateTodo(t,e){this.todos.forEach((o=>{o.id===t&&(o.title=e)}))}},mounted(){this.$bus.$on("checkTodo",this.checkTodo),this.$bus.$on("editHandler",this.editHandler),this.$bus.$on("updateTodo",this.updateTodo),this.pubId=s().subscribe("deleteTodo",this.deleteTodo)},beforeDestroy(){this.$bus.$off("checkTodo"),this.$bus.$off("editHandler"),this.$bus.$off("updateTodo"),s().unsubscribe(this.pubId)},watch:{todos:{deep:!0,handler(t){localStorage.setItem("todos",JSON.stringify(t))}}}},N=j,P=(0,f.Z)(N,r,i,!1,null,null,null),D=P.exports;n.Z.config.productionTip=!1,new n.Z({el:"#app",beforeCreate(){n.Z.prototype.$bus=this},render:t=>t(D)})}},e={};function o(n){var r=e[n];if(void 0!==r)return r.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.loaded=!0,i.exports}o.m=t,function(){var t=[];o.O=function(e,n,r,i){if(!n){var d=1/0;for(c=0;c<t.length;c++){n=t[c][0],r=t[c][1],i=t[c][2];for(var s=!0,a=0;a<n.length;a++)(!1&i||d>=i)&&Object.keys(o.O).every((function(t){return o.O[t](n[a])}))?n.splice(a--,1):(s=!1,i<d&&(d=i));if(s){t.splice(c--,1);var l=r();void 0!==l&&(e=l)}}return e}i=i||0;for(var c=t.length;c>0&&t[c-1][2]>i;c--)t[c]=t[c-1];t[c]=[n,r,i]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){o.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};o.O.j=function(e){return 0===t[e]};var e=function(e,n){var r,i,d=n[0],s=n[1],a=n[2],l=0;if(d.some((function(e){return 0!==t[e]}))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(a)var c=a(o)}for(e&&e(n);l<d.length;l++)i=d[l],o.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return o.O(c)},n=self["webpackChunkdemo_todolist"]=self["webpackChunkdemo_todolist"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(4244)}));n=o.O(n)})();
//# sourceMappingURL=app.4845d5a4.js.map