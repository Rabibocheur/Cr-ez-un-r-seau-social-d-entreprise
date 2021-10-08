<template>
  <v-card class="mt-2 pa-1">
    <v-card-title class="mx-3 my-1 pa-0">
      <Avatar :avatar="post.user.avatar" :uuid="post.user.uuid" size="36" />
      <v-layout column class="ml-3">
        <router-link
        :to="`/profile/${post.user.uuid}`"
        class="text-body-2 font-weight-medium black--text">
          {{ `${post.user.firstname} ${post.user.lastname}` }}
        </router-link>
        <span class="text-caption grey--text text--darken-2">
          {{
            moment(post.createdAt)
              .locale("fr")
              .fromNow()
          }}
        </span>
      </v-layout>
      <v-btn fab small depressed color="white">
          <v-icon>
            mdi-dots-horizontal
          </v-icon>
        </v-btn>
    </v-card-title>
    <v-card-text class="mx-3 my-1 pa-0 font-weight-regular title black--text">
      {{ post.title }}
    </v-card-text>
    <v-img
      v-if="post.content != ''"
      :src="post.content"
    ></v-img>
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
    <ToComment
      :postId="post.id"
      :comments="post.comments"
    />
  </v-card>
</template>

<script>
import Avatar from "./Avatar";
import ToComment from "./ToComment";

const moment = require("moment");

export default {
  name: "Post",
  components: { Avatar, ToComment },
  props: ['post'],
  data: () => {
    return {
      moment: moment
    };
  }
};
</script>

<style scoped>
  .v-card {
    overflow-wrap: anywhere;
  }
</style>
