<template>
  <div>
    <NavBar />
    <v-main>
      <v-layout class="white d-flex column align-center">
        <v-card flat class="profil_header">
          <v-img
            class="rounded-b-lg"
            width="800px"
            height="350px"
            :src="profilInfos.couverture"
          ></v-img>
          <v-avatar class="profil_avatar" height="150" width="150">
            <img :src="profilInfos.avatar" />
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
      <v-container>
        <v-layout justify-center class="my-10">
          <v-row style="max-width: 600px">
            <v-col cols="12">
              <ToPost @reloadPosts="getProfile()" />
            </v-col>
          </v-row>
        </v-layout>
        <v-layout justify-center>
          <v-row style="max-width: 600px">
            <v-col cols="12" v-for="post in posts" :key="post.id">
              <Post :post="post" />
            </v-col>
          </v-row>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "../components/NavBar";
import EditProfile from "../components/EditProfile";
import ToPost from "../components/ToPost";
import Post from "../components/Post";

export default {
  name: "Posts",
  components: { NavBar, EditProfile, ToPost, Post },
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
  mounted: function() {
    this.getProfile();
  },
  computed: {
    editProfil: function() {
      if (this.$store.state.user.uuid == this.$route.params.uuid) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(["getApi"]),
    getProfile: function() {
      const self = this;
      this.getApi(`/user/${this.$route.params.uuid}`)
      .then(function(response) {
        self.profilInfos = response.data;
        self.posts = response.data.posts;
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
