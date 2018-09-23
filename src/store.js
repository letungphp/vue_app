import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	//State chứa tất cả các thông tin muốn sử dụng cho ứng dụng
	state : {

		//todo data when init here
		todos : [{
			title: 'Todo A',
			project: 'Project A',
			done: false,
		}]
	},
	actions : {
		A_ADD_TODO ({ commit }, todo ){
			let new_todo_obj = {
				title : todo.title,
				project : todo.project,
				done : false
			}
			commit ( "M_ADD_TODO" , new_todo_obj);
		},
		A_DEL_TODO ({ commit }, todo ) {
			commit ( "M_DEL_TODO" , todo);
		},
		A_UPT_TODO ({ commit }, todo ) {
			commit ( "M_UPT_TODO" , todo);
		}
	},
	getters : {
		//Hàm lấy thông tin từ state , các component sử dụng sẽ gọi bằng cách sử dụng computed function "this.$store.getters.todoFromStore"
		todoFromStore : (state) => {
			return state.todos;
		}
	},
	mutations : {
		M_ADD_TODO( state , new_todo ){
			return state.todos.push(new_todo);
		},
		M_DEL_TODO (state , todo ) {
			const todoIndex = state.todos.indexOf(todo);
	      	state.todos.splice(todoIndex, 1);
		},
		M_UPT_TODO ( state , todo ) {
			const todoIndex = state.todos.indexOf(todo);
			state.todos[todoIndex].done = !state.todos[todoIndex].done;
		}

	}
});

export default store;