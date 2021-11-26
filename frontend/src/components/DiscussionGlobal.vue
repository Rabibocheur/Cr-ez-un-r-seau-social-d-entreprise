<template>
  <v-card elevation="0" style="width: 360px">
    <v-list style="height: 10%">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title grey--text text--darken-1"
            >Discussions Global</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <perfect-scrollbar class="pa-3" v-chat-scroll>
      <v-row>
        <v-col
          cols="12"
          class="bulle_chat d-flex align-center py-0"
          :class="message.user.uuid != user.uuid ? '' : 'flex-row-reverse'"
          v-for="(message, index) in messages"
          :key="index"
        >
          <Avatar
            v-if="message.user.uuid != user.uuid"
            :avatar="message.user.avatar"
            :uuid="message.user.uuid"
            size="36"
            class="mr-2"
          />
          <v-tooltip left color="black">
            <template v-slot:activator="{ on, attrs }">
              <div
                class="rounded-xl my-1 pa-1 px-3 grey lighten-4"
                v-bind="attrs"
                v-on="on"
                :style="
                  message.user.uuid != user.uuid
                    ? 'max-width: 300px'
                    : 'max-width: 340px'
                "
              >
                <router-link
                  v-if="message.user.uuid != user.uuid"
                  :to="`/profile/${message.user.uuid}`"
                  class="black--text text-subtitle-2 font-weight-medium"
                >
                  {{ `${message.user.firstname} ${message.user.lastname}` }}
                </router-link>
                <p class="mb-0">{{ message.message }}</p>
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

    <v-layout class="pa-3" style="height: 10%">
      <v-icon @click="marker = !marker">mdi-emoticon</v-icon>
      <VEmojiPicker style="position: absolute; top:0; left:0; width: 100%" v-if="marker" @select="selectEmoji" />
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
import { mapState } from "vuex";
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
      marker: false
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
    selectEmoji(emoji) { 
      console.log(emoji)
      this.value = emoji.data
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

<style lang="scss">
.ps {
  height: 80%;
  max-height: 80vh;
}
</style>
