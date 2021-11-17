<template>
  <v-app>
    <NavBar v-if="route != 'Login'"/>
    <v-main >
        <router-view />
    </v-main>
    <GalleryFullScreen />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from "./components/NavBar";
import GalleryFullScreen from "./components/GalleryFullScreen";


export default {
  name: 'App',
  components: {
    NavBar,
    GalleryFullScreen
  },
  computed:{
    ...mapState(['posts']),
    route(){
      return this.$route.name
    }
  }
};
</script>

<style>
  #app, body { background-color: #F0F2F5; }
  a { text-decoration: none; }
</style>