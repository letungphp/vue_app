<template>
  <div>
    <p>Completed Tasks: {{todos.filter(todo => {return todo.status !== 0}).length}}</p>
    <p>Pending Tasks: {{todos.filter(todo => {return todo.done === 0}).length}}</p>

    <create-todo/>

    <todo v-for="todo in todos" v-bind:todo="todo" v-on:delete-todo="deleteTodo"></todo>
    
  </div>
</template>

<script type = "text/javascript" >
import Todo from './Todo';
import CreateTodo from './CreateTodo';

export default {
	components: {
	    Todo,
	    CreateTodo
	},
	methods : {
		deleteTodo(todo) {
			this.$store.dispatch( 'A_DEL_TODO' , todo);
	    }
	},
	computed : {
		todos(){
			return this.$store.getters.todoFromStore;
		},
	},
	mounted : function(){
		this.$store.dispatch('A_LOAD_TODO');
	}
};
</script>
<style>
</style>