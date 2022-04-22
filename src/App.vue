<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"/>
        <MyList :todos="todos"/>
        <MyFooter 
        :todos="todos" 
        @checkAllTodo="checkAllTodo"
        @clearAllTodo="clearAllTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import MyHeader from "./components/MyHeader";
import MyList from "./components/MyList";
import MyFooter from "./components/MyFooter";

export default {
  name: "App",
  components: {
    MyFooter,
    MyList,
    MyHeader
  },
  data() {
    return {
      //捞储存在localStorage里的数据
      //一开始没有数据，展示空数组
      todos:JSON.parse(localStorage.getItem('todos'))||[]
    }
  },
  methods:{
    //添加一个todo
    addTodo(todoObj){
      this.todos.unshift(todoObj)
    },
    //勾选一个todo
    checkTodo(id){
      this.todos.forEach(todo => {
        if(todo.id===id){
          //记录bug这里多写了个等于号= =
          todo.done = !todo.done
        }
      });
    },
    //删除一个todo(就是留下来没删掉的，用过滤)
    //filter方法不改变原数组，所以要重新赋值
    deleteTodo(_,id){
      this.todos = this.todos.filter((todo)=>{
        return todo.id !==id
      })
    },
    //全选或取消全选
    checkAllTodo(done){
      this.todos.forEach((todo)=>{
        todo.done = done
      })
    },
    //清除已完成任务
    clearAllTodo(){
      this.todos = this.todos.filter((todo)=>{
        return !todo.done
      })
    },
    //编辑
    editHandler(id){
      this.todos.forEach((todo)=>{
        if(todo.id===id)todo.isEdit = !todo.isEdit
      })
    },
    //
    updateTodo(id,title){
				this.todos.forEach((todo)=>{
					if(todo.id === id) todo.title = title
				})
			},
  },
  mounted(){
    this.$bus.$on('checkTodo',this.checkTodo)
    this.$bus.$on('editHandler',this.editHandler)
    this.$bus.$on('updateTodo',this.updateTodo)
    //console.log('我是app组件，收到了数据')
    this.pubId = pubsub.subscribe('deleteTodo',this.deleteTodo)
  },
  beforeDestroy() {
      this.$bus.$off('checkTodo')
      this.$bus.$off('editHandler')
      this.$bus.$off('updateTodo')
      pubsub.unsubscribe(this.pubId)
    },
    //todos发生变化时候储存在localStorage里
  watch:{
    todos:{
      deep:true,
      handler(value){
        localStorage.setItem('todos',JSON.stringify(value))
    }
    }
  }  
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #ca514d;
  border: 1px solid #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: #185eaf;
  border: 1px solid rgb(12, 75, 100);
  margin-right: 5px;
}

.btn-danger:hover {
  color: #fff;
  background-color: #ca514d;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>