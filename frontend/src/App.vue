<template>
  <v-app>
    <NavBar />
    <v-main>
        <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => {
    return {
    }
  }
};
</script>

<style>
  #app, body {
    background-color: #F0F2F5;
  }
  a{
    text-decoration: none;
  }
</style>