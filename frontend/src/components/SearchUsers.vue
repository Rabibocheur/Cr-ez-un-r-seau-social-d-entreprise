<template>
  <v-card class="card_search-users" elevation="0">
    <v-list class="card_search-users--list px-1 pt-0">
      <v-list-item-title class="text-h6 grey--text text--darken-1">
        Membres entreprise
      </v-list-item-title>
    </v-list>

    <v-expansion-panels accordion focusable>
      <v-expansion-panel
        v-for="(user, i) in usersList"
        :key="i"
        class="card_search-users--list"
      >
        <v-expansion-panel-header class="pa-2">
          <v-list-item style="max-width: 255px">
            <v-badge
              bottom
              :color="user.isConnected ? 'green' : 'transparent'"
              dot
              offset-x="22"
              offset-y="22"
            >
              <v-list-item-avatar size="40">
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
          <v-list-item link>
            <v-list-item-avatar>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Suivre</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="setUserConv(user)">
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
      search: "",
      usersList: [],
    };
  },
  watch: {
    search(value) {
      this.searchUsers(value)
    },
  },
  mounted() {
    this.searchUsers();
    socket.emit('login', { uuid: this.user.uuid })
    socket.on("logout", (payload) => {
      this.userConnect(payload, false)
    });
    socket.on("login", (payload) => {
      this.userConnect(payload, true)
    });
  },
  computed: {
    ...mapState(["drawerSearch", "user"]),
    drawer: {
      get() {
        return this.drawerSearch;
      },
      set(value) {
        this.SET_DRAWER(value);
      },
    },
  },
  methods: {
    ...mapMutations(["SET_DRAWER", "SET_USER_CONV"]),
    setUserConv(user){
      this.SET_USER_CONV(user)
    },
    searchUsers(value = "") {
      apiClient.get(`/user?search=${value}`).then((response) => {
        this.usersList = response.data;
      });
    },
    userConnect(payload, value){
      this.usersList.forEach(user => {
        if(user.uuid === payload.uuid){
          user.isConnected = value
        }
      });
    }
  },
};
</script>

<style lang="scss">
.card_search-users {
  position: sticky!important;
  top: 100px;
  background-color: transparent !important;
  max-width: 300px;
  overflow: auto;
}
.card_search-users--list {
  background-color: transparent !important;
}
.v-expansion-panel::before {
  box-shadow: none !important;
}
</style>
