<template>
  <v-container
    class="d-flex"
    :class="$vuetify.breakpoint.width > 500 ? 'px-7' : 'pa-0'"
    fluid
  >
    <div class="card_save1 pr-5 d-flex" v-if="$vuetify.breakpoint.width > 1200">
      <SearchUsers />
    </div>
    <v-container
      class="container_posts mt-2 pt-0 d-flex justify-center"
      :class="$vuetify.breakpoint.width < 500 ? 'pa-0' : ''"
    >
      <div class="container_posts-posts">
        <v-layout justify-center>
          <v-row
            style="max-width: 600px;margin: 0!important;"
            :no-gutters="$vuetify.breakpoint.width < 500"
          >
            <v-col
              cols="12"
              :class="$vuetify.breakpoint.width < 500 ? 'white mt-3' : 'pa-2'"
              :style="$vuetify.breakpoint.width < 500 ? 'padding-top: 10px;margin-top: -18px !important;' : ''"
            >
              <ToPost />
              <PostForm />
            </v-col>
          </v-row>
        </v-layout>
        <PostsList />
      </div>
    </v-container>
    <div class="card_save1" v-if="$vuetify.breakpoint.width > 800">
      <DiscussionGlobal class="card_save2" />
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
      msg: null,
    };
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
  width: 100%;
}
@media screen and (max-width: 800px) {
  .container_posts {
    justify-content: center !important;
  }
  .container_posts-posts {
    padding: 0;
  }
}
.card_save1 {
  position: sticky;
  top: 88px;
  max-height: 600px;
  max-width: 360px;
}
.card_save2 {
  border: 1px solid #0000002f !important;
  height: 600px;
  width: 360px;
}
</style>
