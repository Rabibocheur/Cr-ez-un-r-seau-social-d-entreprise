<template>
  <v-card class="pa-3">
    <v-text-field
        class="mx-2"
      label="Que voulez vous dire ?"
      color='red'
    ></v-text-field>
    <div class="d-flex justify-space-around">
      <v-btn depressed>
        <v-icon left>mdi-send</v-icon>
        <span>Publier</span>
      </v-btn>
      <v-btn depressed>
        <v-icon left>mdi-image</v-icon>
        <span>image/gif</span>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ToPost",
};
</script>
