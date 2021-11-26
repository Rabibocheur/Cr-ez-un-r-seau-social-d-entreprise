<template>
  <v-container class="d-flex" fluid>
    <div
      class="pr-5"
      style="min-width: 360px"
      v-if="$vuetify.breakpoint.width > 800"
    >
      <SearchUsers />
    </div>
    <v-container class="container_posts mt-5 pt-0 d-flex justify-center">
      <div class="container_posts-posts mt-3">
        <v-layout justify-center>
          <v-row style="max-width: 600px">
            <v-col cols="12" class="pa-1">
              <ToPost />
              <PostForm />
            </v-col>
          </v-row>
        </v-layout>
        <PostsList />
      </div>
    </v-container>
    <div v-if="$vuetify.breakpoint.width > 1200">
      <DiscussionGlobal class="card_save"/>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ToPost from "../components/ToPost";
import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
import SearchUsers from "../components/SearchUsers";
import DiscussionGlobal from "../components/DiscussionGlobal";

export default {
  name: "Posts",
  components: { ToPost, PostsList, PostForm, SearchUsers, DiscussionGlobal },
  data() {
    return {
      msg: null
    }
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss">
.container_posts {
  justify-content: space-between;
}
.container_posts-posts {
  padding: 0 20px;
}
@media screen and (max-width: 800px) {
  .container_posts {
    justify-content: center !important;
  }
  .container_posts-posts {
    padding: 0;
  }
}
.card_save {
  position: sticky;
  top: 100px;
  height: 600px;
}
</style>