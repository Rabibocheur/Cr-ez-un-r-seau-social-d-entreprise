<template>
  <div>
    <v-card-actions>
      <v-layout justify-space-around>
        <v-btn depressed class="white">
          <v-icon class="mr-1">
            mdi-thumb-up-outline
          </v-icon>
          <span class="mr-2">J'aime</span>
        </v-btn>
        <v-btn depressed class="white">
          <v-icon class="mr-1">
            mdi-message-outline
          </v-icon>
          <span>Commenter</span>
        </v-btn>
      </v-layout>
    </v-card-actions>
    <Comment :comments="commentsList"/>
    <v-layout class="ma-3">
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <Avatar :avatar="user.avatar" :uuid="user.uuid" size="36" />
          <v-text-field
            v-model="toComment"
            ref="tocomment"
            @keyup.enter.exact="createComment"
            label="Ecrire un commentaire..."
            class="ml-2"
            style="height: 50px"
            filled
            rounded
            dense
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Avatar from "./Avatar";
import Comment from "./Comment";

export default {
  name: "ToComment",
  components: { Avatar, Comment },
  props: {
    postId: Number,
    comments: Array
  },
  data: () => {
    return {
      commentsList: [],
      toComment: ""
    };
  },
  mounted() {
    this.commentsList = this.comments;
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["postApi"]),
    createComment: function() {
      const body = {
        content: this.toComment,
      };
      this.toComment = "";
      this.postApi({ path: `/post/${this.postId}`, body }).then((comment) => {
        this.commentsList.push(comment.data);
      });
    },
  },
};
</script>
