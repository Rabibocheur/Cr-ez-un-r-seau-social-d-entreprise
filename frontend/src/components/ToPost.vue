<template>
  <div class="mb-6">
    <v-card class="pa-1 rounded-lg" elevation="1">
      <v-layout class="d-flex mx-3 my-1">
        <Avatar
          :avatar="user.avatar"
          :uuid="user.uuid"
          size="38"
          class="float-left"
        />
        <div @click="openPostDialog" class="to_post mx-2">
          Ecrivez quelque chose...
        </div>
      </v-layout>
      <v-divider class="my-2"></v-divider>
      <v-btn
        style="width: 100%"
        depressed
        class="transparent darken-1 gray--text"
        @click="takeContent()"
      >
        <v-icon left>mdi-image</v-icon>
        <span>image / gif</span>
      </v-btn>
      <v-file-input
        ref="file"
        style="visibility: hidden; width: 0; position: absolute"
        label="File input"
        hide-input
        multiple
        @change="onFileContent"
      ></v-file-input>
    </v-card>
    <PostForm @sendPost="createPost" titleForm="Créer une publication" />
  </div>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import { mapState, mapMutations } from "vuex";
import { bus } from "../main";
import Avatar from "./Avatar";
import PostForm from "./PostForm";

export default {
  name: "ToPost",
  components: { Avatar, PostForm },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["SET_DIALOG"]),
    openPostDialog() {
      this.SET_DIALOG(true);
    },
    takeContent: function() {
      this.$refs.file.$children[0].$el.click();
    },
    onFileContent(event) {
      bus.$emit("addFiles", event);
      this.openPostDialog();
    },
    createPost(payload) {
      let body = {
        title: payload.title,
        content: payload.filesContent,
      };

      if (payload.isFormData) {
        let formData = new FormData();
        formData.append("title", payload.title);
        for (const i of Object.keys(payload.filesContent)) {
          formData.append("content", payload.filesContent[i]);
        }
        body = formData;
      }

      apiClient.post(`/post`, body).then((newPost) => {
        this.$emit("newPost", newPost.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.to_post {
  padding: 7px 15px;
  color: rgba(0, 0, 0, 0.38);
  background-color: #f0efef;
  border-radius: 30px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #e2e1e1;
  }
}
</style>
