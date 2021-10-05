<template>
  <div>
    <v-card class="pa-3">
      <Avatar
        :avatar="user.avatar"
        :route="`/profile/${user.id}`"
        class="float-left"
      />
      <v-text-field
        v-model="title"
        class="mx-2"
        label="Que voulez vous dire ?"
        color="red"
      ></v-text-field>
      <div class="d-flex justify-space-around">
        <v-btn depressed @click="createPost()">
          <v-icon left>mdi-send</v-icon>
          <span>Publier</span>
        </v-btn>
        <v-btn depressed @click="takeContent()">
          <v-icon left>mdi-image</v-icon>
          <span>image/gif</span>
          <v-file-input
            ref="test"
            style="visibility: hidden; width: 0"
            label="File input"
            hide-input
            @change="onFileContent"
          ></v-file-input>
        </v-btn>
      </div>
    </v-card>
    <Post 
    v-if="title != '' || urlContent != null"
    :avatar="user.avatar"
    :firstname="user.firstname"
    :title="title"
    :content="urlContent"/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Avatar from "./Avatar";
import Post from "./Post";

export default {
  name: "ToPost",
  components: { Avatar, Post },
  data: function() {
    return {
      title: "",
      urlContent: null,
      fileContent: null,
      isFormData: false
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["postApi"]),
    takeContent: function() {
      this.$refs.test.$children[0].$el.click();
    },
    onFileContent: function(event) {
      this.urlContent = URL.createObjectURL(event);
      this.fileContent = event;
      this.isFormData = true;
    },
    createPost: function() {
      let body = {
        title: this.title,
        content: ''
      };
      if (this.isFormData) {
        let formData = new FormData();
        formData.append("content", this.fileContent)
        formData.append("title", this.title);
        body = formData;
      }
      this.postApi({path: `/post`, body})
        .then((post) => {
          console.log(post)
        });
    }
  },
};
</script>
