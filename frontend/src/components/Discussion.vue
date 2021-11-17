<template>
  <v-card class="card_save">
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-facebook-messenger</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title grey--text text--darken-1">Vos Discussions</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Aucune Discussions</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "PostsSaved",
};
</script>

<style lang="scss">
    .card_save{
        position: sticky;
        top: 100px;
    }
</style>