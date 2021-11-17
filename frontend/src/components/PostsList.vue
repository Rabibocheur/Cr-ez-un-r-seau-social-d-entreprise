<template>
  <v-layout justify-center class="mt-6">
    <v-row style="max-width: 600px">
      <v-col cols="12" class="pa-1" v-for="post in posts.posts" :key="post.id">
        <Post :post="post" />
      </v-col>
      <v-col cols="12" class="pa-1" v-if="posts.loading">
        <v-skeleton-loader
          elevation="1"
          class="mt-1"
          type="list-item-avatar, card-heading, image, table-heading"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" class="pa-1" v-if="posts.loading">
        <v-skeleton-loader
          elevation="1"
          class="mt-1"
          type="list-item-avatar, card-heading, image, table-heading"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Post from "../components/Post";

export default {
  name: "PostList",
  components: { Post },
  props: ["userUuid"],
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  async mounted() {
    await this.initializePostStore(this.postsParams);
  },
  computed: {
    ...mapState(["posts"]),
    postsParams() {
      if (this.userUuid) return this.userUuid;
      else return "";
    },
  },
  methods: {
    ...mapActions(["initializePostStore", "loadMore"]),
    ...mapMutations(["LOADING_POST"]),
    handleScroll() {
      const totalHeight = document.documentElement.scrollHeight;
      const scrollHeight = window.scrollY + window.innerHeight;
      const remainingOffset = totalHeight - scrollHeight;

      if (remainingOffset < 200 && !this.posts.isOnLastPage) {
        this.LOADING_POST(true)
      }

      if (remainingOffset < 3) {
        this.loadMore(this.postsParams);
      }
    },
  },
};
</script>
