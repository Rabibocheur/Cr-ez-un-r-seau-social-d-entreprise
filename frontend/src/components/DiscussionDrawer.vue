<template>
  <v-navigation-drawer v-model="drawer" width="600px" fixed right temporary>
    <v-card class="d-flex" style="height: 100vh">
      <v-tabs vertical>
        <v-tab style="width: 250px;">
          <v-icon left>
            mdi-account-group
          </v-icon>
          Global
        </v-tab>

        <v-tab v-for="(userConv, index) in usersConv" :key="index">
          <Avatar
            :avatar="userConv.avatar"
            :uuid="userConv.uuid"
            size="36"
            class="mr-2"
          />
          {{ userConv.firstname }} {{ userConv.lastname }}
        </v-tab>

                
        <v-tab-item style="border-left: 1px solid #80808030">
          <DiscussionGlobal />
        </v-tab-item>
        <v-tab-item v-for="(userConv, index) in usersConv" :key="index">
          <DiscussionPrivate :receiver="userConv" :firstMessages="firstMessage[userConv.uuid]"/>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import DiscussionGlobal from "./DiscussionGlobal";
import DiscussionPrivate from "./DiscussionPrivate";
import Avatar from "./Avatar";
import { socket } from "../services/Socket";

export default {
  name: "DiscussionDrawer",
  components: { DiscussionGlobal, DiscussionPrivate, Avatar },
  data() {
    return {
      firstMessage: []
    }
  },
  mounted() {
    socket.on("private message", (data) => {
        for(let i in this.usersConv){
          if(this.usersConv[i].uuid === data.sender.uuid) return;
        }
        this.SET_USER_CONV(data.sender)
        this.firstMessage[data.sender.uuid] = [{
          uuid: data.sender.uuid,
          avatar: data.sender.avatar,
          fullname: `${data.sender.firstname} ${data.sender.lastname}`,
          message: data.msg,
        }]
    });
  },
  computed: {
    ...mapState(["user", "drawerConv", "usersConv"]),
    drawer: {
      get() {
        return this.drawerConv;
      },
      set(value) {
        this.SET_DRAWER_CONV(value);
      },
    },
  },
  methods: {
    ...mapMutations(["SET_DRAWER_CONV", "SET_USER_CONV"])
  },
};
</script>
