<template>
  <v-container id="test" class="mt-5">
    <v-layout justify-center>
      <v-row style="max-width: 600px">
        <v-col cols="12" class="pa-1">
          <ToPost @newPost="pushNewPost" />
        </v-col>
        <v-col cols="12" class="pa-1" v-for="post in posts" :key="post.id">
          <Post
            :post="post"
            @changePost="updatePost"
            @deletePost="deletePost"
          />
        </v-col>
        <v-progress-circular
          :size="100"
          :width="7"
          color="purple"
          indeterminate
          class="loading"
        ></v-progress-circular>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import ToPost from "../components/ToPost";
import Post from "../components/Post";

export default {
  name: "Posts",
  components: { ToPost, Post },
  data: function() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      apiClient.get(`/post`).then((response) => {
        this.posts = response.data;
      });
    },
    pushNewPost(post) {
      this.posts.unshift(post);
    },
    deletePost(postId) {
      this.posts.forEach((post, index) => {
        if (post.id === postId) this.posts.splice(index, 1);
      });
    },
    updatePost(newPost) {
      this.posts.forEach((post, index) => {
        if (post.id === newPost.id) this.posts.splice(index, 1, newPost);
      });
    },
  },
};
</script>

<style lang="scss">
.loading {
  margin-top: 100px;
  margin-bottom: 200px;
  z-index: 100;
  position: relative;
  left: 50%;
  transform: translatex(-50%);
}
</style>
