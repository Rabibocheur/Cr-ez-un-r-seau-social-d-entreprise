<template>
  <v-snackbar v-model="snackbar">
    {{ status }}
    <template v-slot:action="{ attrs }">
      <v-btn color="primary" text v-bind="attrs" @click="closeSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'SnackBar',
    computed: {
      ...mapState(["status", "snackbar"])
    },
    methods: {
      ...mapMutations(['SET_SNACKBAR']),
      closeSnackbar(){
        this.SET_SNACKBAR(false)
      }
    },
}
</script>