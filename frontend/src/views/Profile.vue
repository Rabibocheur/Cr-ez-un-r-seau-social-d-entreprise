<template>
  <div>
    <v-layout class="white d-flex column align-center">
      <v-card flat class="profil_header">
        <v-img
          class="red lighten-5 rounded-b-lg"
          width="800px"
          height="350px"
          :src="profilInfos.couverture"
          contain
        ></v-img>
        <v-avatar class="profil_avatar" height="150" width="150">
          <v-img contain :src="profilInfos.avatar || '../avatar.png'"></v-img>
        </v-avatar>
      </v-card>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="mt-5">
              {{ profilInfos.firstname }} {{ profilInfos.lastname }}
            </h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <h3 class="font-weight-light">{{ profilInfos.bio }}</h3>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="editProfil == true">
        <v-row
          style="border-top: 1px solid rgba(128, 128, 128, 0.3)"
          class="mx-10 pt-4"
          justify="center"
        >
          <EditProfile @reload="getProfile()" />
          <v-btn depressed class="ml-5">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-layout>
    <v-divider></v-divider>
    <v-container class="mt-5">
      <v-layout justify-center>
        <v-row style="max-width: 600px">
          <v-col cols="12" class="pa-1" v-for="post in posts" :key="post.id">
            <Post
              :post="post"
              @changePost="updatePost"
              @deletePost="deletePost"
            />
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import EditProfile from "../components/EditProfile";
import Post from "../components/Post";

export default {
  name: "Posts",
  components: { EditProfile, Post },
  watch: {
    $route() {
      window.location.reload();
    },
  },
  data: function() {
    return {
      profilInfos: {},
      posts: [],
    };
  },
  mounted() {
    this.getProfile();
  },
  computed: {
    editProfil() {
      if (this.$store.state.user.uuid == this.$route.params.uuid) {
        return true;
      }
      return false;
    },
  },
  methods: {
    getProfile: function() {
      const self = this;
      apiClient.get(`/user/${this.$route.params.uuid}`).then(function(response) {
        self.profilInfos = response.data;
        self.posts = response.data.posts;
      });
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

<style scoped>
.profil_header {
  position: relative;
}
.profil_avatar {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translatex(-50%);
}
</style>
