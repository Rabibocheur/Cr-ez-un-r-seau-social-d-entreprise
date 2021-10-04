<template>
  <div>
    <NavBar />
    <v-main>
      <v-container>
        <v-layout row class="ma-5 justify-center">
          <v-flex xs12 md6 lg6>
            <ToPost
              :avatar="this.$store.state.user.avatar"
              :id="this.$store.state.user.userId"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import ToPost from '../components/ToPost'

  export default {
    name: 'Posts',
    components: { NavBar, ToPost }
  }
</script>
