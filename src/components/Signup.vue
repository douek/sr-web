<template>
    <div class="ui grid">
    <div class="six wide centered floated column">
        <div class="ui middle aligned center aligned container">
    <h2 class="ui blue header">
      <div class="content">
        Sign-up to SR-Web
      </div>
    </h2>
    <form class="ui form">
      <div class="ui segment">
             <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input v-model="name" type="text" name="name" placeholder="Name">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input v-model="email" type="text" name="email" placeholder="E-mail address">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input v-model="password" type="password" name="password" placeholder="Password">
          </div>
        </div>
        <div @click="signUp" class="ui fluid blue submit button">Sign up</div>

      </div>

    </form>
                  <div v-if="err" class="ui error message">{{err}}</div>

        <div class="ui message">
      Already have account? <router-link to="/login">Login</router-link>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
export default {
    name:'Signup',
    data(){
        return {name: "", email: "", password: "", err: null}
    },
    methods:{
        signUp() {
      this.$firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
            user.user.updateProfile({
              displayName: this.name
            })
            .then(() => {});
            this.$router.replace('/')
          },  (err) => {
              this.err = err.message;          
              })
        .catch(err => {
          this.err = err.message;
        });
    }
    }
}
</script>