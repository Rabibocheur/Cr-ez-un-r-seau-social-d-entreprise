<template>
  <v-card class="my-5 pa-1">
    <v-card-title class="mb-1 pa-1">
      <v-avatar size="36">
        <img alt="user" :src="avatar" />
      </v-avatar>
      <v-layout column class="ml-3">
        <span class="text-body-2 black--text">{{ firstname }}</span>
        <span class="text-caption grey--text text--darken-2">Aperçu</span>
      </v-layout>
      <v-icon large>
        mdi-dots-horizontal
      </v-icon>
    </v-card-title>
    <v-card-text class="pa-2 font-weight-regular title black--text">
      {{ title }}
    </v-card-text>
    <v-img v-if="content != null" height="200px" :src="content"></v-img>
    <v-divider></v-divider>
    <v-layout
      justify-space-between
      class="mx-3 py-2"
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)"
    >
      <div class="font-weight-light">
        <v-icon small class="mr-1">
          mdi-thumb-up
        </v-icon>
        <span class="subheading mr-2">256</span>
      </div>
      <div class="font-weight-light">
        <span class="mr-1">45</span>
        <span class="subheading">commentaires</span>
      </div>
    </v-layout>
    <v-card-actions>
      <v-layout justify-space-around>
        <v-btn depressed class="white">
          <v-icon class="mr-1">
            mdi-thumb-up-outline
          </v-icon>
          <span class="mr-2">J'aime</span>
        </v-btn>
        <v-btn depressed class="white">
          <v-icon class="mr-1">
            mdi-message-outline
          </v-icon>
          <span>Commenter</span>
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: 'Post',
    props: ['avatar', 'firstname', 'title', 'content']
}
</script>