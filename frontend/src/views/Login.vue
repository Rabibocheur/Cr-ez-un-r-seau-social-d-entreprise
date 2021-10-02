<template>
  <div>
    <NavBar />
    <v-container fluid class="pa-8">
      <v-layout class="mt-5 d-flex justify-center">
        <v-flex xs10 md4>
          <v-card class="my-5 pa-5">
            <h1 v-if="currentRoute == '/signup'" class="m-auto text-center font-weight-light">Inscription</h1>
            <h1 v-else class="m-auto text-center font-weight-light">Connexion</h1>
            <v-form ref="form" v-model="valid" class="pa-5 text-center">
              <v-text-field v-if="currentRoute == '/signup'" :counter="10" v-model="firstName" :rules="nameRules" label="Prenom" required></v-text-field>
              <v-text-field v-if="currentRoute == '/signup'" :counter="10" v-model="lastName" :rules="nameRules" label="Nom" required></v-text-field>
              <v-text-field v-model="email" :rules="emailRules" label="Adresse email" required></v-text-field>
              <v-text-field v-model="password" label="Mot de passe" type="password"></v-text-field>
              <v-text-field v-if="currentRoute == '/signup'" v-model="confirmPassword" label="Confirmer" type="password"></v-text-field>
              <v-btn v-if="currentRoute == '/signup'" @click="register()" :disabled="!valid" class="mr-4 white--text" color="#FD2D01">
                <span v-if="status == 'loading'">
                  <v-progress-circular
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                </span>
                <span v-else>S'inscrire</span>
              </v-btn>
              <v-btn v-else @click="login()" :disabled="!valid" class="mr-4 white--text" color="#FD2D01">
                <span v-if="status == 'loading'">
                  <v-progress-circular
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                </span>
                <span v-else>Me connecter</span>
              </v-btn>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="snackbarError" >
        {{ textError }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="snackbarError = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import NavBar from '../components/NavBar'

  export default {
    name: 'Login',
    components: { NavBar },
    data: () => {
      return {
        valid: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        snackbarError: false,
        textError: '',
      }
    },
    mounted: function (){
      if(this.$store.state.user.userId != -1){
        this.$router.push('/');
        this.$store.commit('updateRoute', '/');  
        return ;
      }
    },
    computed: {
      currentRoute: function () {
          return this.$store.state.currentRoute
      },
      ...mapState(['status'])
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      register: function () {
        const self = this;
        this.$store.dispatch('register', {
          firstname: this.firstName,
          lastname: this.lastName,
          email: this.email,
          password: this.password
        }).then(function () {
          self.login();
        }, function (error) {
          console.log(error);
          self.errorLog('Email déjà existante')
        })
      },
      login: function () {
        const self = this;
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(function () {
          self.$store.commit('updateRoute', '/');
          self.$router.push('/');
        }, function (error) {
          console.log(error);
          self.errorLog('Email et/ou mot de passe incorrect')
        })
      },
      errorLog: function (error) {
        this.snackbarError = true
        this.textError = error
      }
    }
  }
</script>