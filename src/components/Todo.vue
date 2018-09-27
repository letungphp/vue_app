<template>
<div class='ui centered card'>
      <div class='content'>
        <div class='header'>
          {{ todo.title }}
        </div>
        <div class='meta'>
          {{ todo.description }}
        </div>
        <div class='extra content'>
          <span class='right floated edit icon' v-if="!todo.status" >
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
					<input type='text' v-model="todo.description" >
				</div>
				<div class='ui two button attached buttons'>
					<button class='ui basic blue button' v-on:click="hideForm(todo)">
					Close X
					</button>
				</div>
			</div>
		</div>

      <div class='ui bottom attached green basic button' v-on:click='toggleTodo(todo)' v-if="todo.status">
        Đã hoàn tất
      </div>
      <div class='ui bottom attached red basic button' v-on:click='toggleTodo(todo)' v-if="!todo.status">
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
		hideForm : function(todo){
			this.$store.dispatch('A_UPT_TODO',todo);
			this.isEditing = false;
		},
		showForm : function(){
			this.isEditing = true;
		},
		deleteTodo(todo) {
	        this.$store.dispatch('A_DEL_TODO', todo);
	    },
	    toggleTodo(todo) {
	    	todo.status = todo.status === 1 ? 0 : 1;
	    	this.$store.dispatch('A_UPT_TODO' , todo);
	    }


	}
}

</script>