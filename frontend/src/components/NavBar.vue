<template>
  <v-app-bar class="white" app elevation="2">
    <router-link to="/">
      <v-img
        src="/icon.png"
        v-if="$vuetify.breakpoint.width < 1100"
        contain
        max-width="55"
        max-height="55"
      >
      </v-img>
    </router-link>
    <v-text-field
      class="search"
      prepend-inner-icon="mdi-magnify"
      placeholder="Rechercher sur Groupomania"
      filled
      rounded
      dense
      clearable
      hide-details
    ></v-text-field>  

    <v-spacer></v-spacer>

    <router-link to="/">
      <v-img
        v-if="$vuetify.breakpoint.width > 1100"
        src="/icon-left-font-resize.png"
        contain
        max-width="250"
        max-height="48"
      ></v-img>
    </router-link>

    <v-spacer></v-spacer>

    <div class="account_menu d-flex flex-row justify-end">
      <v-btn
        v-if="$vuetify.breakpoint.width > 800"
        depressed
        color="transparent"
        route
        :to="`/profile/${user.uuid}`"
        class="test mr-5 pa-2 py-6 d-flex align-center text-capitalize rounded-pill"
      >
        <v-avatar size="34">
          <img :src="user.avatar || '../avatar.png'" />
        </v-avatar>
        <span class="black--text font-weight-medium ml-2 text-body-1">
          {{ user.firstname }}
        </span>
      </v-btn>

      <div class="d-flex flex-row">
        <v-btn icon class="mx-1 grey lighten-3">
          <v-icon color="black">mdi-bell</v-icon>
        </v-btn>
        <v-menu transition="slide-x-transition" bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="grey lighten-3" v-bind="attrs" v-on="on">
              <v-icon large color="black">
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-card width="300" class="px-2">
            <v-list>
              <v-list-item link route :to="'/profile/' + user.uuid">
                <v-list-item-avatar size="60" class="white">
                  <img :src="user.avatar || '../avatar.png'" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium text-body-1">{{
                    user.firstname + " " + user.lastname
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="subtitle-2 font-weight-light"
                    >Voir votre profil</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item link route to="/">
                <v-list-item-avatar>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Voir l'accueil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Mes paramètres</v-list-item-title>
                </v-list-item-content>
                <v-icon large style="width: 10px">mdi-chevron-right</v-icon>
              </v-list-item>
              <v-list-item @click="logout()">
                <v-list-item-avatar>
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Se déconnecter</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "NavBar",
  data: () => {
    return {
      search: false,
    };
  },
  methods: {
    ...mapActions(["logout"]),
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss">
  .account_menu {
    width: 300px;
  }
  .v-input.search {
    max-width: 300px
  }

  @media screen and (max-width: 600px) {
    .v-input.search {
      .v-input__slot {
        padding: 0 15px
      }
    }
    .account_menu {
      width: auto;
    }
  }
</style>