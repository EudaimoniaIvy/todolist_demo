<template>
<!-- keydown摁键盘立即触发keyup松开时触发 -->
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add"/>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: "MyHeader",
  data() {
    return {
      title:''
    }
  },
  methods:{
    add(e){
      //将用户的输入包装成一个对象
      //这里不用写模板字符串
      //不想直接操作dom就用v-model=title，this.title代替e.target.value
      if(!e.target.value.trim())return alert("输入不能为空")
      const todoObj = {id:nanoid(),title:e.target.value,done:false,isEdit:false}
      //子（（header）子组件给parent组件（APP）传信息）
      //一个坑：这里的addTodo不能叫add因为名字不能相同
      this.$emit('addTodo',todoObj)
      //清空输入
      e.target.value = ''
    }
  }
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>