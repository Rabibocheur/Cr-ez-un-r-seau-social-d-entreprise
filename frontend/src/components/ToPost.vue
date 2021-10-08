<template>
  <div>
    <v-card class="pa-3">
      <v-layout class="d-flex">
        <Avatar
          :avatar="user.avatar"
          :uuid="user.uuid"
          size="50"
          class="float-left"
        />
        <v-textarea
          v-model="title"
          label="Que voulez vous dire ?"
          auto-grow
          outlined
          rows="1"
          row-height="15"
          color="red"
          class="mx-2"
        ></v-textarea>
      </v-layout>
      <div class="d-flex justify-space-around">
        <v-btn
          :disabled="isAddButtonDisabled"
          class="red accent-2 white--text"
          depressed
          @click="createPost()"
        >
          <v-icon left>mdi-send</v-icon>
          <span>Publier</span>
        </v-btn>
        <v-btn
          depressed
          class="light-blue darken-1 white--text"
          @click="takeContent()"
        >
          <v-icon left>mdi-image</v-icon>
          <span>image/gif</span>
          <v-file-input
            ref="file"
            style="visibility: hidden; width: 0"
            label="File input"
            hide-input
            @change="onFileContent"
          ></v-file-input>
        </v-btn>
      </div>
    </v-card>

    <v-card  v-if="title != '' || urlContent != ''" class="mt-2 pa-1">
      <v-card-title class="mx-3 my-1 pa-0">
        <Avatar :avatar="user.avatar" :uuid="user.uuid" size="36" />
        <v-layout column class="ml-3">
          <span class="text-body-2 font-weight-medium black--text">
            {{ `${user.firstname} ${user.lastname}` }}
          </span>
          <span class="text-caption grey--text text--darken-2">
            Aperçu du post
          </span>
        </v-layout>
      </v-card-title>
      <v-card-text class="mx-3 my-1 pa-0 font-weight-regular title black--text">
        {{ title }}
      </v-card-text>
      <v-img v-if="urlContent != ''" :src="urlContent"></v-img>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Avatar from "./Avatar";

export default {
  name: "ToPost",
  components: { Avatar },
  data: function() {
    return {
      title: "",
      urlContent: "",
      fileContent: null,
      isFormData: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    isAddButtonDisabled: function() {
      return !(this.title || this.urlContent);
    },
  },
  methods: {
    ...mapActions(["postApi"]),
    takeContent: function() {
      this.$refs.file.$children[0].$el.click();
    },
    onFileContent: function(event) {
      this.urlContent = URL.createObjectURL(event);
      this.fileContent = event;
      this.isFormData = true;
    },
    createPost: function() {
      let body = {
        title: this.title,
        content: "",
      };

      if (this.isFormData) {
        let formData = new FormData();
        formData.append("content", this.fileContent);
        formData.append("title", this.title);
        body = formData;
      }

      this.title = "";
      this.urlContent = "";

      this.postApi({ path: `/post`, body }).then(() => {
        this.$emit("reloadPosts");
      });
    },
  },
};
</script>
