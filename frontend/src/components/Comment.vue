<template>
  <div>
    <v-layout
      v-if="likesCount > 0 || countAll > 0"
      justify-space-between
      class="mx-3 py-2"
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)"
    >
      <div class="font-weight-light">
        <div v-if="likesCount > 0">
          <v-icon x-small class="mr-1 icon-like">
            mdi-thumb-up
          </v-icon>
          <span class="subheading mr-2">{{ likesCount }}</span>
        </div>
      </div>
      <div class="font-weight-light">
        <span v-if="countAll > 0" class="mr-1">{{ countAll }}</span>
        <span v-if="countAll > 1" class="subheading">commentaires</span>
        <span v-else-if="countAll == 1" class="subheading">commentaire</span>
      </div>
    </v-layout>
    <div class="mx-3 py-1">
        <v-btn depressed class="white" @click="postLike" style="width: 50%">
          <v-icon class="mr-1" v-if="!like">mdi-thumb-up-outline</v-icon>
          <v-icon class="mr-1" v-else :style="`${like ? 'color: blue' : ''}`"
            >mdi-thumb-up</v-icon
          >
          <span class="mr-2" :style="`${like ? 'color: blue' : ''}`"
            >J'aime</span
          >
        </v-btn>
        <v-btn depressed class="white" @click="focusComment" style="width: 50%">
          <v-icon class="mr-1">
            mdi-message-outline
          </v-icon>
          <span>Commenter</span>
        </v-btn>
    </div>
    <v-layout
      v-if="comments.length > 0"
      class="mx-3 pt-3 pb-3 d-flex flex-column"
      style="border-top: 1px solid rgba(0, 0, 0, 0.2)"
    >
      <div
        class="comment_link grey--text text--darken-2 text-md-body-1 text-sm-body-1 text-caption font-weight-medium"
        v-if="count > 1 && !showAllComments"
        @click="getAllComments"
      >
        <span v-if="count > 2"
          >Afficher {{ count - 1 }} autres commentaires</span
        >
        <span v-else>Afficher {{ count - 1 }} autre commentaire</span>
      </div>
      <div
        class="comment_link grey--text text--darken-2 text-md-body-1 text-sm-body-1 text-caption font-weight-medium"
        v-if="count > 1 && showAllComments"
        @click="getOneComment"
      >
        <span>Masquer les commentaires</span>
      </div>
      <v-row class="mt-2" style="max-width: 575px">
        <v-col
          class="d-flex pb-0 pt-1"
          cols="12"
          v-for="comment in comments"
          :key="comment.id"
        >
          <Avatar
            :avatar="comment.user.avatar"
            :uuid="comment.user.uuid"
            size="36"
          />
          <div class="mx-2">
            <div class="rounded-xl pa-2 px-3 grey lighten-4">
              <router-link
                :to="`/profile/${comment.user.uuid}`"
                class="black--text text-subtitle-2 font-weight-medium"
              >
                {{ `${comment.user.firstname} ${comment.user.lastname}` }}
              </router-link>
              <p class="mb-0">{{ comment.content }}</p>
            </div>
            <p class="text-caption grey--text text--darken-2 ma-0">
              {{
                moment(comment.createdAt)
                  .locale("fr")
                  .fromNow()
              }}
            </p>
          </div>
          <v-menu
            bottom
            right
            v-if="comment.user.uuid === user.uuid || user.isAdmin"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                v-bind="attrs"
                v-on="on"
                class="white align-self-center"
              >
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item link>
                <v-list-item-title>
                    <v-icon small left>mdi-pencil</v-icon>
                    Modifier
                  </v-list-item-title>
              </v-list-item>
              <v-list-item link @click="deleteComment(comment.id)">
                <v-list-item-title>
                  <v-icon small left>mdi-delete</v-icon>
                  Supprimer
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-layout>
    <ToComment v-if="toComment" :postId="postId" @newComment="addComment" />
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { mapState } from "vuex";
import Avatar from "./Avatar";
import ToComment from "./ToComment";

const moment = require("moment");

export default {
  name: "Comment",
  components: { Avatar, ToComment },
  props: ["postId", "likes"],
  data() {
    return {
      moment: moment,
      comments: [],
      countAll: null,
      count: null,
      showAllComments: false,
      likesCount: null,
      like: null,
      toComment: false,
    };
  },
  mounted() {
    this.getOneComment();
    this.likesCount = this.likes;
    this.getLike();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getOneComment() {
      apiClient.get(`/post/${this.postId}/?limit=1`).then((response) => {
        this.comments = response.data.rows;
        this.countAll = response.data.count;
        this.count = this.countAll;
        this.showAllComments = false;
      });
    },
    getAllComments() {
      apiClient.get(`/post/${this.postId}`).then((response) => {
        this.comments = response.data.rows;
        this.showAllComments = true;
      });
    },
    addComment() {
      this.getOneComment()
    },
    modifyComment(){
      
    },
    deleteComment(commentId) {
      apiClient.delete(`/post/${commentId}/comment`).then(() => {
        this.getOneComment()
      });
    },
    getLike() {
      apiClient.get(`/post/${this.postId}/like`).then((response) => {
        if (response.data) this.like = true;
        else this.like = false;
      });
    },
    postLike() {
      apiClient.post(`/post/${this.postId}/like`).then((response) => {
        if (response.data.like) {
          this.like = true;
          this.likesCount++;
        } else {
          this.like = false;
          this.likesCount--;
        }
      });
    },
    focusComment() {
      this.toComment = !this.toComment;
      const input = document.getElementById(`input--comment-${this.postId}`);
      if (input != null) input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
  .icon-like {
    border-radius: 50px;
    background-color: blue;
    color: white;
    padding: 5px;
  }
  .comment_link{
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
</style>
