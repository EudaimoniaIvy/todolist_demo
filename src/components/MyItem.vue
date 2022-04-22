<template>
<transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__bounceInDown"
      leave-active-class="animate__fadeOut"
    >
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="handlerCheck(todo.id, $event)"
      />
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input
        type="text"
        :value="todo.title"
        v-show="todo.isEdit"
        @blur="handleBlur($event, todo)"
        ref="inputTitle"
      />
    </label>
    <button class="btn btn-danger" @click="handlerDelete(todo.id)">删除</button>
    <button class="btn btn-edit" @click="handlerEdit(todo.id)">编辑</button>
  </li>
</transition>
</template>

<script>
import "animate.css";
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  props: ["todo"],
  methods: {
    //勾选或者取消勾选
    handlerCheck(id) {
      //通知APP把id传过去然后done值取反
      this.$bus.$emit("checkTodo", id);
    },
    //删除某一项
    handlerDelete(id) {
      //通知APP把id传过去然后删掉
      if (confirm("确定要删除吗")) {
        //this.deleteTodo(id)
        //this.$bus.$emit('deleteTodo',id)
        pubsub.publish("deleteTodo", id);
      }
    },
    //编辑
    //疑问：props不能修改但是可以添加？
    handlerEdit(id) {
      this.$bus.$emit("editHandler", id);
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
    handleBlur(e, todo) {
      todo.isEdit = false;
      if (!e.target.value.trim()) return alert("输入不能为空！");
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: rgb(138, 182, 198);
}

li:hover button {
  display: block;
}
</style>