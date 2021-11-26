<template>
  <v-card elevation="0" style="width: 360px">
    <v-list style="height: 10%">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title grey--text text--darken-1"
            >Discussions Global</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <perfect-scrollbar class="pa-3" v-chat-scroll>
      <v-row>
        <v-col
          cols="12"
          class="bulle_chat d-flex align-center py-0"
          :class="message.uuid != user.uuid ? '' : 'flex-row-reverse'"
          v-for="(message, index) in messages"
          :key="index"
        >
          <Avatar
            v-if="message.uuid != user.uuid"
            :avatar="message.avatar"
            :uuid="message.uuid"
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
                  message.uuid != user.uuid
                    ? 'max-width: 300px'
                    : 'max-width: 340px'
                "
              >
                <router-link
                  v-if="message.uuid != user.uuid"
                  :to="`/profile/${message.uuid}`"
                  class="black--text text-subtitle-2 font-weight-medium"
                >
                  {{ message.fullname }}
                </router-link>
                <p class="mb-0">{{ message.message }}</p>
              </div>
            </template>
            <span>ok</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </perfect-scrollbar>

    <v-layout class="pa-3" style="height: 10%">
   
     
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

export default {
  name: "DiscussionPrivate",
  components: { Avatar },
  props: ["receiver", "firstMessages"],
  data() {
    return {
      value: "",
      messages: []
    };
  },
  created() {
    console.log(this.firstMessages)
    if(this.firstMessages) this.messages.push(this.firstMessages[0])
  },
  mounted() {
    socket.on("private message", (data) => {
      this.messages.push({
        uuid: data.sender.uuid,
        avatar: data.sender.avatar,
        fullname: `${data.sender.firstname} ${data.sender.lastname}`,
        message: data.msg,
      });
    });
  },
  computed: {
    ...mapState(["user", "messageConv"]),
  },
  watch: {
    firstMessages(value){
      console.log(value)
      this.messages.push(value)
    }
  },
  methods: {
    ...mapMutations(["ADD_MSG_CONV"]),
    sendMessage(){
      socket.emit('private message', { sender: this.user, receiver: this.receiver, msg: this.value })
      this.messages.push({
          uuid: this.user.uuid,
          avatar: this.user.avatar,
          message :this.value,
        });
      this.value = "";
    }
  },
};
</script>
