<template>
  <v-card
    :elevation="popup ? popup.elevationCard : '0'"
    :style="resize ? 'bottom: -400px' : ''"
    style="height: 100%; width: 100%"
  >
    <div
      style="width: 100%; height: 10%; max-height: 70px"
      class="d-flex align-center justify-space-between px-3"
    >
      <v-btn text @click="goBack" v-if="$vuetify.breakpoint.width < 620">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <h4
        style="max-width: 160px; 
        display: flex; 
        align-items: center;"
      >
        <Avatar :avatar="to.avatar" :uuid="to.uuid" size="32" class="mr-2" />
        <span
          style="
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden; "
          >{{ to.firstname }} {{ to.lastname }}</span
        >
      </h4>

      <div>
        <v-btn icon @click="resize = !resize">
          <v-icon v-if="!resize">mdi-window-minimize</v-icon>
          <v-icon v-if="resize">mdi-window-maximize</v-icon>
        </v-btn>
        <v-btn icon @click="windowFullscreen">
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <v-btn icon @click="setDrawerConv">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>

    <perfect-scrollbar class="pa-3" v-chat-scroll>
      <v-row>
        <v-col
          cols="12"
          class="bulle_chat d-flex align-center py-0"
          :class="message.user.uuid != user.uuid ? '' : 'flex-row-reverse'"
          v-for="(message, index) in messenger.privateChat[indexChat].messages"
          :key="index"
        >
          <Avatar
            v-if="message.user.uuid != user.uuid"
            :avatar="message.user.avatar"
            :uuid="message.user.uuid"
            size="28"
            class="mr-2"
          />
          <v-tooltip left color="black">
            <template v-slot:activator="{ on, attrs }">
              <div
                class="rounded-xl my-1 pa-1 px-3"
                :class="
                  message.user.uuid == user.uuid
                    ? 'blue lighten-1 white--text'
                    : 'grey lighten-2'
                "
                v-bind="attrs"
                v-on="on"
                :style="
                  message.user.uuid != user.uuid
                    ? 'max-width: 300px'
                    : 'max-width: 340px'
                "
              >
                <p class="mb-0">{{ message.message }}</p>
              </div>
            </template>
            <span>ok</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </perfect-scrollbar>

    <v-divider></v-divider>

    <v-layout
      class="pa-3 d-flex flex-row align-center"
      style="width: 100%; height: 10%;"
    >
      <v-icon @click="marker = !marker">mdi-emoticon</v-icon>
      <VEmojiPicker
        style="position: absolute; top:0; left:0; width: 75%; height: 50%"
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
import { mapState, mapMutations } from "vuex";
import Avatar from "./Avatar";
import { socket } from "../services/Socket";
import { apiClient } from "../services/ApiClient";
import { VEmojiPicker } from "v-emoji-picker";

export default {
  name: "DiscussionPrivate",
  components: { Avatar, VEmojiPicker },
  props: ["indexChat", "to", "room", "popup"],
  data() {
    return {
      value: "",
      marker: false,
      resize: false,
    };
  },
  // async created() {
  //   if (this.room != null) {
  //     const response = await apiClient.get(`/chat/room/${this.room}`);
  //     this.INITIALIZE_MESSAGES({ index: this.indexChat, messages: response.data })
  //   }
  // },
  mounted() {
    socket.on("private message", (data) => {
      if (data.roomId === this.room) {
        this.ADD_NEW_MESSAGE({ index: this.indexChat, message: { user: data.user, message: data.message } })
      }
    });
  },
  computed: {
    ...mapState(["user", "messenger"]),
  },
  methods: {
    ...mapMutations([
      "SET_ROOM_CHAT",
      "SET_DRAWER_CHAT",
      "SELECTED_CHAT",
      "DELETE_PRIVATE_POPUP",
      "INITIALIZE_MESSAGES",
      "ADD_NEW_MESSAGE"
    ]),
    windowFullscreen() {
      this.SELECTED_CHAT(this.popup.popup);
      this.SET_DRAWER_CHAT(true);
    },
    goBack() {
      this.$emit("goBack");
    },
    setDrawerConv() {
      this.DELETE_PRIVATE_POPUP(this.popup.index);
      this.SET_DRAWER_CHAT(false);
    },
    selectEmoji(emoji) {
      this.value += emoji.data;
    },
    async sendMessage() {
      socket.emit("private message", {
        sender: this.user.uuid,
        receiver: this.to.uuid,
        message: this.value,
      });
      if (this.room === null) {
        const response = await apiClient.get(`/chat/rooms?to=${this.to.uuid}`);
        this.SET_ROOM_CHAT({ to: this.to, room: response.data[0].id });
      }
      this.ADD_NEW_MESSAGE({ index: this.indexChat, message: { user: this.user, message: this.value } })
      this.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.ps {
  height: 80%;
  max-height: 80vh;
}
</style>
