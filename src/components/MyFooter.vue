<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" :checked="isAll" @change="checkAll"/>
    </label>
    <span> <span>已完成{{doneTotal}}</span> / 全部{{total}}</span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script scoped>
export default {
  name: "MyFooter",
  props:['todos'],
  data() {
    return {
      newTodos:[]
    }
  },
  computed:{
    total(){
      return this.todos.length
    },
    doneTotal(){
      //简单写法
      /* let sum = 0
      this.todos.forEach(todo => {
        if(todo.done){
          sum++
        }
      });
      return sum */
      //用reduce
      //每一次运行 reducer 会将先前元素的计算结果作为参数传入
      //最后将其结果汇总为单个返回值。
      //也就是第二次运行reduce函数时，第一次的reduce函数运行结果作为参数
      //current是todo的每一项
      //reduce里面箭头函数省略了花括号和return
      return this.todos.reduce((pre,cur)=> pre + (cur.done ? 1 : 0),0)
    },
    isAll(){
      return this.doneTotal === this.total && this.total>0
    }
  },
  methods: {
    checkAll(e){
      //console.log(e.target.checked)//布尔值
      //console.log(e.target.value)//on
      this.$emit("checkAllTodo",e.target.checked)
    },
    //这里虽然不需要传参，用自定义事件是为了在APP里处理数据，
    //因为props属性不可修改
    clearAll(){
      this.$emit("clearAllTodo")
    }
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>