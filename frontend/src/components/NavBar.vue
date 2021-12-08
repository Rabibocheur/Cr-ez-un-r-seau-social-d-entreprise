<template>
  <div>
    <v-app-bar
      class="test-bar white"
      :elevate-on-scroll="$vuetify.breakpoint.width > 500"
      :elevation="$vuetify.breakpoint.width < 500 ? '0' : ''"
      :prominent="$vuetify.breakpoint.width < 500"
      :style="test && $vuetify.breakpoint.width < 500 ? 'top: -53px' : ''"
      short
      app
      :height="$vuetify.breakpoint.width < 500 ? 100 : ''"
      :fixed="$vuetify.breakpoint.width < 500 ? test : false"
      style="border-bottom: 1px solid #a6a6a6ab !important;transition: all 0.1s"
    >
      <div
        class="d-flex justify-space-between align-center"
        style="width: 100%"
        v-if="$vuetify.breakpoint.width < 500"
      >
        <img src="/icon-left-font.png" alt="" height="27" />
        <v-app-bar-nav-icon large @click="setDrawerSearch"></v-app-bar-nav-icon>
      </div>

      <div class="d-flex" style="width:100%; height: 100%;">
        <div
          class="d-flex flex-row align-center"
          style="padding-bottom: 1px;"
          :style="
            $vuetify.breakpoint.width < 1200 ? 'width: 150px' : 'width: 300px'
          "
        >
          <v-btn
            v-if="$vuetify.breakpoint.width < 500"
            to="/"
            depressed
            class="btn-home rounded-0 light"
            height="100%"
          >
            <v-icon large class="icon-home">mdi-home</v-icon>
          </v-btn>

          <router-link to="/" v-if="$vuetify.breakpoint.width > 500">
            <v-img src="/icon.png" contain max-width="55" max-height="50">
            </v-img>
          </router-link>

          <v-app-bar-nav-icon
            x-large
            @click="setDrawerSearch"
            v-if="
              $vuetify.breakpoint.width < 1200 &&
                $vuetify.breakpoint.width > 500
            "
          ></v-app-bar-nav-icon>

          <v-text-field
            v-if="$vuetify.breakpoint.width > 1200"
            v-model="setSearch"
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

        <v-spacer></v-spacer>

        <div class="account_menu d-flex flex-row justify-end align-center">
          <v-btn
            ripple
            v-if="$vuetify.breakpoint.width > 700"
            depressed
            color="transparent"
            route
            :to="`/profile/${user.uuid}`"
            class="btn-user mr-5 pa-2 py-6 d-flex align-center text-capitalize rounded-pill"
          >
            <v-avatar size="28">
              <img :src="user.avatar || '../avatar.png'" />
            </v-avatar>
            <span class="black--text font-weight-medium ml-2 text-body-1">
              {{ user.firstname }}
            </span>
          </v-btn>

          <div class="d-flex flex-row align-center py-1">
            <DiscussionsMenu @click="setDrawerConv" />
            <Notifications />
            <v-menu transition="slide-x-transition" bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="grey lighten-3"
                  v-bind="attrs"
                  v-on="on"
                  height="40px"
                  width="40px"
                >
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
                      <v-list-item-title
                        class="font-weight-medium text-body-1"
                        >{{
                          user.firstname + " " + user.lastname
                        }}</v-list-item-title
                      >
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
import DiscussionsMenu from "./DiscussionsMenu";
import Notifications from "./Notifications";

export default {
  name: "NavBar",
  components: {
    SearchUsersDrawer,
    DiscussionDrawer,
    DiscussionsMenu,
    Notifications,
  },
  data() {
    return {
      test: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      const { scrollTop } = document.documentElement;
      if (scrollTop > 10) this.test = true;
      else this.test = false;
    });
  },
  methods: {
    ...mapActions(["logout", "search"]),
    ...mapMutations([
      "SET_DRAWER_SEARCH",
      "SET_DRAWER_CHAT",
      "SET_SEARCH_USER",
    ]),
    setDrawerSearch() {
      this.SET_DRAWER_SEARCH(true);
    },
    setDrawerConv() {
      this.SET_DRAWER_CHAT(true);
    },
  },
  computed: {
    ...mapState(["user"]),
    setSearch: {
      set(value) {
        this.SET_SEARCH_USER(value);
      },
    },
  },
};
</script>

<style lang="scss">
.test-bar > .v-toolbar__content {
  padding: 0 16px !important;
  flex-direction: column;
  justify-content: space-between;
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
.btn-user.v-btn::before {
  top: initial;
  bottom: initial;
  height: 40px;
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
@media screen and (max-width: 500px) {
  .v-application .grey.lighten-3 {
    background-color: transparent !important;
  }
}
</style>
