import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import api_config from './config/api';

Vue.use(Vuex);

const store = new Vuex.Store({
	//State chứa tất cả các thông tin muốn sử dụng cho ứng dụng
	state : {
		//Loading
		page_loading : false,
		//token for login user
		auth_token : localStorage.getItem('token') || '',
		auth_status : '',
		//todo data when init here
		todos : [] //default array todo is empty
	},
	actions : {
		//PAGE LOGIN
		A_LOGIN ({commit}, logindata){
			commit('M_LOADING');
			axios.post(api_config.HOST+"/user/login",{...api_config.DEFAUT_PARAMS, ...logindata})
            .then((response) => {
            	localStorage.setItem('token',response.data.data.token);
            	axios.defaults.params = {};
				axios.defaults.params[ 'token' ] = response.data.data.token;
                commit("M_LOGIN_SUCCESS", response.data.data);
            })
            .catch((error => {
            	localStorage.removeItem('token');
            	axios.defaults.params = {};
                commit("M_LOGIN_FAIL");
            }));
		},
		A_LOGOUT ({commit}){
			console.log('Log out');
			localStorage.removeItem('token');
			commit('M_LOGOUT');
		},
		//PAGE TODO
		A_LOAD_TODO ({commit}){
            axios.get(api_config.HOST+"/todo")
            .then((response) => {
            	console.log(response);
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

            axios.post(api_config.HOST+"/todo",new_todo_obj)
            .then((response) => {
                commit("M_ADD_TODO", new_todo_obj);
            })
            .catch((error => {
                console.log(error);
            }));
		},
		A_DEL_TODO ({ commit }, todo ) {
			axios.delete(api_config.HOST+"/todo/"+todo.id,todo)
            .then((response) => {
                commit("M_DEL_TODO", todo);
            })
            .catch((error => {
                console.log(error);
            }));
		},
		A_UPT_TODO ({ commit }, todo ) {
			axios.put(api_config.HOST+"/todo",todo)
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
		},
		isAuthenticated: state => !!state.auth_token,
  		authStatus: state => state.auth_status,
  		showloading : state => state.page_loading

	},
	mutations : {
		M_LOADING (state){
			state.page_loading = true;
		},
		M_LOGIN_SUCCESS ( state , logindata){
			state.auth_status = true;
			state.auth_token  = logindata.token;
			state.page_loading = false;
		},
		M_LOGIN_FAIL (state ){
			state.page_loading = false;
		},
		M_LOGOUT (state){
			state.auth_status = false;
			state.auth_token = '';
		},
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