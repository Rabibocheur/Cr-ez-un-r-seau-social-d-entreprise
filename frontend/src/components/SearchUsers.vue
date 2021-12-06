<template>
  <v-card class="card_search-users" elevation="0">
    <v-list class="card_search-users--list px-1 pt-0">
      <v-list-item-title class="text-h6 grey--text text--darken-1">
        Membres entreprise
      </v-list-item-title>
    </v-list>
    <perfect-scrollbar style="max-height: 550px">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(user, i) in usersList"
          :key="i"
          class="card_search-users--list users-list--hover"
          :class="
            !user.isConnected ? 'users-list--connect' : 'users-list--disconnect'
          "
        >
          <v-expansion-panel-header class="pa-2">
            <v-list-item class="pl-0" style="max-width: 250px">
              <v-badge
                bottom
                :color="user.isConnected ? 'green' : 'transparent'"
                dot
                offset-x="22"
                offset-y="22"
              >
                <v-list-item-avatar class="ml-0" size="36">
                  <img :src="user.avatar || '../avatar.png'" />
                </v-list-item-avatar>
              </v-badge>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium text-body-1">{{
                  user.firstname + " " + user.lastname
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list-item link route :to="'/profile/' + user.uuid">
              <v-list-item-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Voir le profil</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="setUserConv(user, i)">
              <v-list-item-avatar>
                <v-icon>mdi-facebook-messenger</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Discuter</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </perfect-scrollbar>
  </v-card>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import { mapState, mapMutations } from "vuex";
import { socket } from "../services/Socket";

export default {
  name: "SearchUsers",
  data: () => {
    return {
      usersList: [],
    };
  },
  watch: {
    search(value) {
      if (value == null) value = "";
      this.searchUsers(value);
    },
  },
  mounted() {
    this.searchUsers();
    socket.emit("login", { uuid: this.user.uuid });
    socket.on("logout", (payload) => {
      this.userConnect(payload, false);
    });
    socket.on("login", (payload) => {
      this.userConnect(payload, true);
    });
  },
  computed: {
    ...mapState(["drawerSearch", "user", "search", "messenger"]),
    drawer: {
      get() {
        return this.drawerSearch;
      },
      set(value) {
        this.SET_DRAWER_SEARCH(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "SET_DRAWER_SEARCH",
      "SET_PRIVATE_CHAT",
      "ADD_PRIVATE_POPUP",
      "SET_DRAWER_CHAT",
      "SELECTED_CHAT",
    ]),
    setUserConv(user) {
      this.SET_PRIVATE_CHAT({ to: user, room: null });
      this.messenger.privateChat.forEach((chat, index) => {
        if (chat.to.uuid == user.uuid) {
          if (this.$vuetify.breakpoint.width < 1100) {
            this.SELECTED_CHAT(index);
            this.SET_DRAWER_CHAT(true);
            return;
          }
          this.ADD_PRIVATE_POPUP(index);
           this.SET_DRAWER_SEARCH(false);
        }
      });
    },
    searchUsers(search = "") {
      apiClient.get(`/user?search=${search}`).then((response) => {
        this.usersList = response.data;
      });
    },
    userConnect(payload, value) {
      this.usersList.forEach((user) => {
        if (user.uuid === payload.uuid) {
          user.isConnected = value;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.card_search-users {
  background-color: transparent !important;
  overflow: hidden;
  min-width: 360px;
}
.card_search-users--list {
  background-color: transparent !important;
  max-width: 300px !important;
}
.users-list--connect {
  filter: grayscale(80%);
}
.users-list--disconnect {
  filter: grayscale(0%);
}
.v-expansion-panel::before {
  box-shadow: none !important;
}
</style>
