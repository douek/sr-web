<template>
  <div class="ui grid">
    <div class="six wide centered floated column">
      <div class="ui middle aligned center aligned container">
        <h2 class="ui blue header">
          <div class="content">Log-in to your account</div>
        </h2>
        <form class="ui form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input v-model="email" type="text" name="email" placeholder="E-mail address" />
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input v-model="password" type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <div @click="signIn" class="ui fluid blue submit button">Login</div>
          </div>

          <div class="ui error message"></div>
        </form>
        <div v-if="err" class="ui error message">{{err}}</div>
        <button @click="googleSignIn" class="ui blue google button">
          <i class="google icon"></i>
          Sign in with Google
        </button>

        <div class="ui message">
          New to us?
          <router-link to="/signup">Sign Up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Signin",
  data() {
    return { email: "", password: "", err: null };
  },
  methods: {
    ...mapActions(["googleAuth"]),
    signIn() {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.replace("/");
          },
          err => {
            this.err = err.message;
          }
        )
    },
    googleSignIn() {
      var provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          this.googleAuth(token);
          this.$router.replace("/");
        })
        .catch(error => {
          // Handle Errors here.
          this.err = error.message;
        });
    }
  }
};
</script>