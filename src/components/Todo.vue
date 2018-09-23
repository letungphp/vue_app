<template>
<div class='ui centered card'>
      <div class='content'>
        <div class='header'>
          {{ todo.title }}
        </div>
        <div class='meta'>
          {{ todo.project }}
        </div>
        <div class='extra content'>
          <span class='right floated edit icon' v-if="!todo.done" >
            <i class='edit icon' v-on:click="showForm"></i>
          </span>
          <span class='right floated trash icon' v-on:click="deleteTodo(todo)">
		      <i class='trash icon'></i>
		  </span>

        </div>
      </div>


		<div class="content" v-show="isEditing">
			<div class='ui form'>
				<div class='field'>
					<label>Title</label>
					<input type='text' v-model="todo.title" >
				</div>
				<div class='field'>
					<label>Project</label>
					<input type='text' v-model="todo.project" >
				</div>
				<div class='ui two button attached buttons'>
					<button class='ui basic blue button' v-on:click="hideForm">
					Close X
					</button>
				</div>
			</div>
		</div>

      <div class='ui bottom attached green basic button' v-on:click='toggleTodo(todo)' v-if="todo.done">
        Đã hoàn tất
      </div>
      <div class='ui bottom attached red basic button' v-on:click='toggleTodo(todo)' v-if="!todo.done">
        Chưa hoàn tất
      </div>
  </div>

</template>
<script>
export default {
	props : [
		'todo'
	],
	data : function () {
		return {
			isEditing : false
		}
	},
	methods : {
		hideForm : function(){
			this.isEditing = false;
		},
		showForm : function(){
			this.isEditing = true;
		},
		deleteTodo(todo) {
	      this.$store.dispatch('A_DEL_TODO', todo);
	    },
	    toggleTodo(todo) {
	    	this.$store.dispatch('A_UPT_TODO' , todo);
	    }


	}
}

</script>