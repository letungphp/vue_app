<template>
  <div>
  Login
  <ul>
  	<li v-for="error in errors">{{error}}</li>

  </ul>
  <input type='text' placeholder='Username' v-model="email"/>
  <input type='password' placeholder='Password' v-model="password" />
  <button @click='submit'>Login</button>

  </div>
</template>

<script type = "text/javascript" >

export default {
	components: {
	    
	},
	data : function(){
		return {
			errors : [],
			email : 'letungphp@gmail.com',
			password : '123456'
		};
	},
	methods : {
		submit : function(){
			//validate form here
			this.errors = [];
			if(this.email == ''){
				this.errors.push('Email empty');
			}

			if(this.password == ''){
				this.errors.push('Password empty');
			}

			if (this.errors.length == 0) {
		        this.$store.dispatch('A_LOGIN',{'email':this.email,'password':this.password})
		        .then(()=>{
		        	this.$router.push('/');
		        });
		    }
		}
	},
	computed : {
		
	},
	mounted : function(){
		
	}
};
</script>
<style>
</style>