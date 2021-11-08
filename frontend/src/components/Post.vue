<template>
  <v-card class="mt-1 pa-1 rounded-lg" elevation="1">
    <v-card-title class="mx-3 my-1 pa-0">
      <Avatar :avatar="post.user.avatar" :uuid="post.user.uuid" size="38" />
      <v-layout column class="ml-3">
        <router-link
          :to="`/profile/${post.user.uuid}`"
          class="text-body-2 font-weight-medium black--text"
        >
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
      <v-menu bottom left v-if="post.user.uuid === user.uuid || user.isAdmin">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon large>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="editPost">
            <v-list-item-avatar>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Modifier la publication</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="deletePost(post.id)">
            <v-list-item-avatar>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Supprimer la publication</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-card-text
      v-if="post.title != ''"
      style="white-space:pre; width: 100%"
      class="mx-3 my-1 pa-0 font-weight-regular title black--text"
    >
      {{ post.title }}
    </v-card-text>

    <div v-if="post.content != ''" class="gallery">
      <img
        class="gallery--principal"
        :src="postUrlContent[0]"
      />
      <div class="gallery__bloc">
        <img
          @click="switchGallery($event)"
          class="gallery__bloc--img"
          v-for="url in postUrlContent"
          :key="url"
          :src="url"
        />
      </div>
    </div>

    <v-divider></v-divider>
    <Comment :likes="post.likes" :postId="post.id" />
  </v-card>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import { mapState } from "vuex";
import Avatar from "./Avatar";
import Comment from "./Comment";

const moment = require("moment");

export default {
  name: "Post",
  components: { Avatar, Comment },
  props: ["post"],
  data: () => {
    return {
      moment: moment,
      postUrlContent: [],
    };
  },
  mounted() {
    this.postUrlContent = this.post.content.split(";");
    this.postUrlContent.pop()
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    switchGallery(event){
      document.querySelector('.gallery--principal').src = event.originalTarget.src
    },
    editPost() {},
    savePost(postId) {
      let body = {
        title: this.title,
        content: this.urlContent,
      };

      if (this.isFormData) {
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.fileContent);
        body = formData;
      }

      apiClient.put(`/post/${postId}`, body).then((response) => {
        this.edit = false;
        this.$emit("changePost", response.data);
      });
    },
    deletePost(postId) {
      apiClient.delete(`/post/${postId}`).then(() => {
        this.$emit("deletePost", postId);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .gallery--principal{
    max-width: 100%;
    width: 600px;
    height: 400px;
    object-fit: cover;
  }
  .gallery__bloc{
    display: flex;
    overflow: auto;
    max-width: 600px;
  }
  .gallery__bloc--img{
    flex-grow: 1;
    max-width: 200px;
    height: 100px;
     object-fit: cover;
  }
</style>