<template>
    <v-container class="container_posts mt-5 d-flex" fluid>
      <div
        class="pr-5"
        style="width: 300px"
        v-if="$vuetify.breakpoint.width > 800"
      >
        <SearchUsers />
      </div>
      <div class="container_posts-posts">
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
      <div style="width:300px" v-if="$vuetify.breakpoint.width > 1200">
        <Discussion />
      </div>
    </v-container>
</template>

<script>
import ToPost from "../components/ToPost";
import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
import SearchUsers from "../components/SearchUsers";
import Discussion from "../components/Discussion";

export default {
  name: "Posts",
  components: { ToPost, PostsList, PostForm, SearchUsers, Discussion },
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
</style>
