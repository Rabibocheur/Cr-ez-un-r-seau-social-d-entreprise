<template>
  <v-card elevation="0">
    <div
      style="min-width: 360px; width: 100%; height: 10%; max-height: 70px"
      class="d-flex align-center justify-space-between px-5"
    >
      <v-btn text @click="goBack" v-if="$vuetify.breakpoint.width < 620">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <h4 class="d-flex align-center">
        <v-avatar class="mr-3">
          <v-icon>mdi-account-group</v-icon>
        </v-avatar>
        <span class="title">Tout le monde</span>
      </h4>

      <v-btn text @click="setDrawerConv" fab>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-divider></v-divider>

    <perfect-scrollbar class="pa-3" v-chat-scroll>
      <v-row>
        <v-col
          cols="12"
          class="bulle_chat d-flex align-center py-0"
          v-for="(message, index) in messages"
          :key="index"
        >
          <v-tooltip left color="black">
            <template v-slot:activator="{ on, attrs }">
              <div
                class="transparent rounded-xl my-1 pa-1 px-3"
                v-bind="attrs"
                v-on="on"
                style="max-width: 100%"
              >
                <Avatar :avatar="message.user.avatar" size="28" class="mr-2" />
                <span class="grey--text text--darken-1 text-body-2">{{ `${message.user.firstname} ${message.user.lastname}` }} </span>
                <span class="mb-0">{{ message.message }}</span>
              </div>
            </template>
            <span>{{
              moment(message.createdAt)
                .locale("fr")
                .calendar()
            }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </perfect-scrollbar>

    <v-divider></v-divider>

    <v-layout
      class="pa-3 d-flex flex-row align-center"
      style="width: 100%; height: 10%; max-height: 70px"
    >
      <v-icon @click="marker = !marker">mdi-emoticon</v-icon>
      <VEmojiPicker
        style="position: absolute; top:0; left:0; width: 100%"
        v-if="marker"
        @select="selectEmoji"
      />
      <v-text-field
        placeholder="Ecrire un message ..."
        :append-outer-icon="value ? 'mdi-send' : 'fa-thumbs-up'"
        v-model="value"
        @click:append-outer="sendMessage"
        @keydown.enter="sendMessage"
        class="ml-2"
        filled
        rounded
        dense
        clearable
        hide-details
      ></v-text-field>
    </v-layout>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Avatar from "./Avatar";
import { socket } from "../services/Socket";
import { apiClient } from "../services/ApiClient";
import { VEmojiPicker } from "v-emoji-picker";

const moment = require("moment");

export default {
  name: "DiscussionGlobal",
  components: { Avatar, VEmojiPicker },
  data() {
    return {
      messages: [],
      value: "",
      moment: moment,
      marker: false,
    };
  },
  created() {
    apiClient.get("/chat/").then((messages) => {
      this.messages = messages.data;
    });
  },
  mounted() {
    socket.on("global message", (message) => {
      this.messages.push(message);
    });
  },
  computed: {
    ...mapState(["user", "userReceiver"]),
  },
  methods: {
    ...mapMutations(["SET_DRAWER_CHAT"]),
    goBack() {
      this.$emit("goBack");
    },
    setDrawerConv() {
      this.SET_DRAWER_CHAT(false);
    },
    selectEmoji(emoji) {
      this.value += emoji.data;
    },
    sendMessage() {
      socket.emit("global message", {
        uuid: this.user.uuid,
        message: this.value,
      });
      this.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.ps {
  height: 80%;
  max-height: 80vh;
  background-color: #f0f2f59c;
}
</style>
