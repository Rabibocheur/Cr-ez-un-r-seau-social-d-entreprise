<template>
  <v-navigation-drawer v-model="drawer" width="370px" fixed left temporary>
    <v-text-field
      autofocus
      class="search ma-1"
      prepend-inner-icon="mdi-magnify"
      placeholder="Rechercher quelqu'un"
      filled
      rounded
      dense
      clearable
      hide-details
    ></v-text-field>

    <v-divider></v-divider>

    <SearchUsers />
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SearchUsers from './SearchUsers.vue'

export default {
  name: "SearchUsersDrawer",
  components: { SearchUsers },
  data: () => {
    return {
    };
  },
  computed: {
    ...mapState(["drawerSearch"]),
    drawer: {
      get() {
        return this.drawerSearch;
      },
      set(value) {
        this.SET_DRAWER_SEARCH(value);
      },
    }
  },
  methods: {
    ...mapMutations(["SET_DRAWER_SEARCH"])
  },
};
</script>
