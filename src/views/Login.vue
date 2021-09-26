<template>
  <div>
    <NavBar />
    <v-main class="mainLight pa-8">
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
              <v-btn v-if="currentRoute == '/signup'" :disabled="!valid" class="mr-4 white--text" @click="validate" color="#FD2D01">S'inscrire</v-btn>
              <v-btn v-else :disabled="!valid" class="mr-4 white--text" @click="validate" color="#FD2D01">Me connecter</v-btn>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-main>
  </div>
</template>

<script>
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
        ]
      }
    },
    computed: {
      currentRoute: function () {
          return this.$store.state.currentRoute
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
    }
  }
</script>