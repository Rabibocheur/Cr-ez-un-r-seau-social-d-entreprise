<template>
  <div>
    <v-app-bar class="white" app elevation="1">
      <div class="d-flex flex-row align-center" style="width: 300px">
        <router-link to="/">
          <v-img src="/icon.png" contain max-width="55" max-height="55">
          </v-img>
        </router-link>

        <v-app-bar-nav-icon x-large @click="setDrawerSearch" v-if="$vuetify.breakpoint.width < 800"></v-app-bar-nav-icon>

        <v-text-field
          v-if="$vuetify.breakpoint.width > 800"
          autofocus
          class="search ma-1"
          style="max-width: 240px"
  
          prepend-inner-icon="mdi-magnify"
          placeholder="Rechercher quelqu'un"
          filled
          rounded
          dense
          clearable
          hide-details
        ></v-text-field>
      </div>

      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="$vuetify.breakpoint.width > 515">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            to="/"
            depressed
            class="btn-home rounded-0 light"
            height="100%"
          >
            <v-icon large class="icon-home">mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Fil d'actualité</span>
      </v-tooltip>

      <v-tooltip bottom v-if="$vuetify.breakpoint.width > 515">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            class="btn-follow rounded-0 light"
            height="100%"
          >
            <v-icon large class="icon-home">mdi-account-box-multiple</v-icon>
          </v-btn>
        </template>
        <span>Fil à suivre</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <div class="account_menu d-flex flex-row justify-end">
        <v-btn
          v-if="$vuetify.breakpoint.width > 1050"
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
          <v-btn icon class="mx-1 grey lighten-3" @click="setDrawerConv">
            <v-icon color="black">mdi-facebook-messenger</v-icon>
          </v-btn>
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
                    <v-icon>mdi-account-box-multiple</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Personnes à suivre</v-list-item-title>
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
    <SearchUsersDrawer />
    <DiscussionDrawer />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import SearchUsersDrawer from "./SearchUsersDrawer";
import DiscussionDrawer from "./DiscussionDrawer";

export default {
  name: "NavBar",
  components: { SearchUsersDrawer, DiscussionDrawer },
  methods: {
    ...mapActions(["logout"]),
    ...mapMutations(["SET_DRAWER_SEARCH", "SET_DRAWER_CONV"]),
    setDrawerSearch() {
      this.SET_DRAWER_SEARCH(true);
    },
    setDrawerConv(){
      this.SET_DRAWER_CONV(true);
    }
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss">
.v-toolbar__content {
  padding: 0 16px !important;
}

.btn-home,
.btn-follow {
  width: 150px;
}
.btn-home.v-btn--active,
.btn-follow.v-btn--active {
  border-bottom: 3px solid #fd2f04;
  border-radius: none !important;
}
.btn-home.v-btn::before,
.btn-follow.v-btn::before {
  background-color: white !important;
}
.btn-home.theme--light.v-btn.v-btn--has-bg,
.btn-follow.theme--light.v-btn.v-btn--has-bg {
  background-color: white !important;
}
.btn-home.v-btn--active .icon-home,
.btn-follow.v-btn--active .icon-home {
  color: #fd2f04 !important;
}

.account_menu {
  width: 300px;
}

.search_bar {
  padding: 7px 15px;
  color: rgba(0, 0, 0, 0.171);
  background-color: #f0efef;
  border-radius: 30px;
  max-width: 300px;
  cursor: pointer;
  &:hover {
    background-color: #e2e1e1;
  }
}

@media screen and (max-width: 1050px) {
  .v-input.search {
    .v-input__slot {
      padding: 0 15px;
    }
  }
  .account_menu {
    width: auto;
  }
}
@media screen and (max-width: 800px) {
  .btn-home,
  .btn-follow {
    width: 100px;
  }
}
</style>
