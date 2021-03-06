import Vue from 'vue';
import Router from 'vue-router';
import Ptodo from './../pages/Ptodo';
import Phome from './../pages/Phome';
import Plogin from './../pages/Plogin';

import store from './../store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
	routes : [
		{
			path : '/',
			name : 'Home',
			component : Phome,
			beforeEnter: ifAuthenticated,
		},
		{
			path : '/todo',
			name : 'Todo',
			component : Ptodo,
			beforeEnter: ifAuthenticated,
		},
		{
			path : '/login',
			name : 'Login',
			component : Plogin
		},
	]
});