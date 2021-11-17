<template>
  <v-card class="card_search-users" elevation="0">
    <v-list class="card_search-users--list px-1 pt-0">
      <v-list-item-content class="pt-0">
        <v-list-item-title class="text-h6 grey--text text--darken-1">
          Administrateur
        </v-list-item-title>
      </v-list-item-content>
    </v-list>

    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="(user, i) in userAdmin"
        :key="i"
        class="card_search-users--list"
      >
        <v-expansion-panel-header>
          <v-avatar size="40">
            <img :src="user.avatar || '../avatar.png'" />
          </v-avatar>
          <span>{{ user.firstname }} {{ user.lastname }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item link :to="'/profile/' + user.uuid">
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
          <v-list-item link>
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

    <v-divider></v-divider>

    <v-list class="card_search-users--list px-1">
      <v-list-item-content>
        <v-list-item-title class="text-h6 grey--text text--darken-1">
          Membres entreprise
        </v-list-item-title>
      </v-list-item-content>
    </v-list>

    <v-expansion-panels accordion focusable>
      <v-expansion-panel
        v-for="(user, i) in usersNoAdmin"
        :key="i"
        class="card_search-users--list"
      >
        <v-expansion-panel-header>
          <v-avatar size="40">
            <img :src="user.avatar || '../avatar.png'" />
          </v-avatar>
          <span>{{ user.firstname }} {{ user.lastname }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item link :to="'/profile/' + user.uuid">
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
          <v-list-item link>
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

export default {
  name: "SearchUsers",
  data: () => {
    return {
      search: "",
      usersList: [],
    };
  },
  watch: {
    async search(value) {
      this.searchUsers(value);
    },
  },
  async mounted() {
    this.searchUsers();
  },
  computed: {
    ...mapState(["drawerSearch"]),
    drawer: {
      get() {
        return this.drawerSearch;
      },
      set(value) {
        this.SET_DRAWER(value);
      },
    },
    userAdmin() {
      let admin = [];
      this.usersList.forEach((user) => {
        if (user.isAdmin) admin.push(user);
      });
      return admin;
    },
    usersNoAdmin() {
      let users = [];
      this.usersList.forEach((user) => {
        if (!user.isAdmin) users.push(user);
      });
      return users;
    },
  },
  methods: {
    ...mapMutations(["SET_DRAWER"]),
    searchUsers(value = "") {
      return new Promise(() => {
        apiClient.get(`/user?search=${value}`).then((response) => {
          this.usersList = response.data;
        });
      });
    },
  },
};
</script>

<style lang="scss">
.card_search-users {
  position: sticky;
  top: 100px;
  background-color: #f0f2f5 !important;
  width: 300px;
  overflow: auto;
}
.card_search-users--list {
  background-color: #f0f2f5 !important;
}
</style>
