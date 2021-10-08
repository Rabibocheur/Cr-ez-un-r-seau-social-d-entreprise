<template>
  <v-dialog transition="dialog-top-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        style="max-width: 300px"
        class="my-6 align-self-center"
        color="success"
        large
        dark
        v-bind="attrs"
        v-on="on"
      >
        Créer un compte
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar height="100" flat color="white" class="pb-3">
          <v-toolbar-title class="d-flex flex-column align-start display-1">
            S'inscrire
            <span class="text-body-1">C’est rapide et facile.</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.value = false" fab>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="px-5 py-3">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  style="height: 40px"
                  :counter="10"
                  v-model="body.firstname"
                  label="Prenom"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  style="height: 40px"
                  :counter="10"
                  v-model="body.lastname"
                  label="Nom"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  style="height: 40px"
                  v-model="body.email"
                  :rules="emailRules"
                  label="Adresse email"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  style="height: 40px"
                  v-model="body.password"
                  label="Mot de passe"
                  type="password"
                  color="green"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  style="height: 40px"
                  v-model="confirmPassword"
                  label="Confirmer"
                  type="password"
                  color="red"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-btn
            :disabled="!valid"
            @click="validate"
            style="width: 100%"
            class="title mt-6 align-self-center"
            color="success"
            large
          >
            <span v-if="status == 'loading'">
              <v-progress-circular
                indeterminate
                color="white"
              ></v-progress-circular>
            </span>
            <span v-else>S'inscrire</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Registration",
  data: () => {
    return {
      valid: true,
      body: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    validate() {
      const validate = this.$refs.form.validate();
      if (validate) this.register();
    },
    register() {
      this.$store
        .dispatch("register", this.body)
        .then(
          (user) => {
            this.$emit("login", {
              email: user.data.email,
              password: this.body.password,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style>
.v-dialog {
  margin: 0 !important;
}
</style>
