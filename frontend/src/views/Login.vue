<template>
  <v-container>
    <v-row style="height: 100vh;">
      <v-col cols="12" class="d-flex flex-column justify-end align-center">
        <v-img
          contain
          src="/icon-above-font-transparent.png"
          max-width="300"
          max-height="150"
        ></v-img>
        <h2 class="mt-3 text-center font-weight-light" style="max-width: 500px">
          Avec Groupomania, partagez et restez en contact avec vos collègues.
        </h2>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-flex class="align-self-start" style="max-width: 400px">
          <v-card class="my-5 d-flex flex-column justify-center">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="pa-3 text-center"
            >
              <v-text-field
                style="height: 60px"
                v-model="body.email"
                :rules="emailRules"
                label="Adresse email"
                required
                outlined
                dense
              ></v-text-field>
              <v-text-field
                style="height: 60px"
                v-model="body.password"
                label="Mot de passe"
                type="password"
                color="green"
                outlined
                dense
              ></v-text-field>
              <v-btn
                @click="validate"
                :disabled="!valid"
                depressed
                style="width: 100%"
                class="white--text"
                color="#FD2D01"
              >
                <span v-if="status == 'loading'">
                  <v-progress-circular
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                </span>
                <span v-else>Se connecter</span>
              </v-btn>
            </v-form>
            <router-link to="/" class="mb-3 align-self-center"
              >Mot de passe oublié ?</router-link
            >
            <v-divider></v-divider>
            <Registration @login="loginAfterRegist" />
          </v-card>
        </v-flex>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbarError">
      {{ status }}
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
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Registration from "../components/Registration";

export default {
  name: "Login",
  components: { Registration },
  data: () => {
    return {
      valid: true,
      body: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      snackbarError: false
    };
  },
  mounted() {
    this.snackbarError = true;
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    ...mapActions(["postApi"]),
    ...mapMutations(["setStatus", "logUser"]),
    validate() {
      const validate = this.$refs.form.validate();
      if (validate) this.login();
    },
    loginAfterRegist(payload) {
      this.email = payload.email;
      this.password = payload.password;
      this.login();
    },
    login() {
      this.setStatus("loading");
      const body = this.body;
      this.postApi({ path: "/user/login", body })
      .then((user) => {
        console.log(user)
        this.setStatus("");
      }).catch((e) => {
        console.log('error', e)
        this.setStatus("Email et/ou mot de passe incorrect");
        this.snackbarError = true;
      })

      // const self = this;
      // this.$store
      //   .dispatch("login", {
      //     email: this.email,
      //     password: this.password,
      //   })
      //   .then(
      //     () => {
      //       self.$store.state.user = JSON.parse(localStorage.getItem("user"));
      //       self.$router.push("/");
      //     },
      //     (error) => {
      //       console.log(error);
      //       self.errorLog("Email et/ou mot de passe incorrect");
      //     }
      //   );
    }
  },
};
</script>

<style>
.login {
  width: 400px;
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
}
</style>
