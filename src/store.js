import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	//State chứa tất cả các thông tin muốn sử dụng cho ứng dụng
	state : {
		//todo data when init here
		todos : [] //default array todo is empty
	},
	actions : {
		A_LOAD_TODO ({commit}){
            axios.get("http://localhost:8000/todo?token=eyJpdiI6Ikt1R0ZhSjUxSEFacGZHVDR2ZTNNQXc9PSIsInZhbHVlIjoiM2ln")
            .then((response) => {
                commit("M_LOAD_TODO", response);
            })
            .catch((error => {
                console.log(error);
            }));

		},
		A_ADD_TODO ({ commit }, todo ){
			let new_todo_obj = {
				title : todo.title,
				description : todo.description,
				status : 0
			}

            axios.post("http://localhost:8000/todo?token=eyJpdiI6Ikt1R0ZhSjUxSEFacGZHVDR2ZTNNQXc9PSIsInZhbHVlIjoiM2ln",new_todo_obj)
            .then((response) => {
                commit("M_ADD_TODO", new_todo_obj);
            })
            .catch((error => {
                console.log(error);
            }));
		},
		A_DEL_TODO ({ commit }, todo ) {
			axios.delete("http://localhost:8000/todo/"+todo.id+"?token=eyJpdiI6Ikt1R0ZhSjUxSEFacGZHVDR2ZTNNQXc9PSIsInZhbHVlIjoiM2ln",todo)
            .then((response) => {
                commit("M_DEL_TODO", todo);
            })
            .catch((error => {
                console.log(error);
            }));
		},
		A_UPT_TODO ({ commit }, todo ) {
			axios.put("http://localhost:8000/todo?token=eyJpdiI6Ikt1R0ZhSjUxSEFacGZHVDR2ZTNNQXc9PSIsInZhbHVlIjoiM2ln",todo)
            .then((response) => {
                commit("M_UPT_TODO", todo);
            })
            .catch((error => {
                console.log(error);
            }));
		}
	},
	getters : {
		//Hàm lấy thông tin từ state , các component sử dụng sẽ gọi bằng cách sử dụng computed function "this.$store.getters.todoFromStore"
		todoFromStore : (state) => {
			return state.todos;
		}
	},
	mutations : {
		//Set data from api to store state
		M_LOAD_TODO ( state , api_response ){
			state.todos = api_response.data;
		},
		M_ADD_TODO( state , new_todo ){
			return state.todos.push(new_todo);
		},
		M_DEL_TODO (state , todo ) {
			const todoIndex = state.todos.indexOf(todo);
	      	state.todos.splice(todoIndex, 1);
		},
		M_UPT_TODO ( state , todo ) {
			const todoIndex = state.todos.indexOf(todo);
			state.todos[todoIndex] = todo;
		}
	}
});

export default store;