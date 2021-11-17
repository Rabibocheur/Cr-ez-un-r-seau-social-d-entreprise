<template>
  <v-navigation-drawer v-model="drawer" width="370px" fixed left temporary>
    <v-text-field
      autofocus
      class="search ma-1"
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      placeholder="Rechercher quelqu'un"
      filled
      rounded
      dense
      clearable
      hide-details
    ></v-text-field>

    <v-divider></v-divider>

    <v-list class="px-1">
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Administrateur
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item
        v-for="user in userAdmin"
        :key="user.firstname"
        link
        route
        :to="'/profile/' + user.uuid"
      >
        <v-list-item-avatar>
          <img :src="user.avatar || '../avatar.png'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            >{{ user.firstname }} {{ user.lastname }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Membres Entreprise
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item
        v-for="user in usersNoAdmin"
        :key="user.firstname"
        link
        route
        :to="'/profile/' + user.uuid"
      >
        <v-list-item-avatar>
          <img :src="user.avatar || '../avatar.png'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            >{{ user.firstname }} {{ user.lastname }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import { mapState, mapMutations } from "vuex";

export default {
  name: "SearchUsersDrawer",
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
    userAdmin(){
      let admin = []
      this.usersList.forEach(user => {
        if(user.isAdmin) admin.push(user)
      });
      return admin
    },
     usersNoAdmin(){
      let users = []
      this.usersList.forEach(user => {
        if(!user.isAdmin) users.push(user)
      });
      return users
    }
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
