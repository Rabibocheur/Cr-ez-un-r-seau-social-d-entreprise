<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
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