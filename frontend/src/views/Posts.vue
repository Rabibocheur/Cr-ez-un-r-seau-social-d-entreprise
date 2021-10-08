<template>
  <div>
    <NavBar />
    <v-main>
      <v-container>
        <v-layout justify-center class="my-10">
          <v-row style="max-width: 600px">
            <v-col cols="12">
              <ToPost
                @reloadPosts="getPosts()"
              />
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
import ToPost from "../components/ToPost";
import Post from "../components/Post";

export default {
  name: "Posts",
  components: { NavBar, ToPost, Post },
  data: function () {
    return {
      posts: []
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    ...mapActions(["getApi"]),
    getPosts: function() {
      this.getApi(`/post`).then((response) => {
        this.posts = response.data
      });
    },
  },
};
</script>
