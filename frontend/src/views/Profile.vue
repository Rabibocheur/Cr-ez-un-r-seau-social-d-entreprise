<template>
  <div>
    <NavBar />
    <v-main>
        <v-layout class="white d-flex column align-center">
            <v-card flat class="profil_header">
                <v-img class="rounded-b-lg" height="350px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                <v-avatar class="profil_avatar" color="indigo" height="150" width="150">
                    <img :src="avatar">
                </v-avatar>
            </v-card>
            <h1 class="ma-5">{{user.firstname}} {{user.lastname}}</h1>
            <v-btn depressed class="mb-5 black--text">Modifier le profil</v-btn>
            <div style="border-top: 1px solid grey">
                <v-btn @click="menu = 'publication'" depressed :class="`white ${menu == 'publication'?'red--text':'grey--text'}`">Publication</v-btn>
                <v-btn @click="menu = 'apropos'" depressed :class="`white ${menu == 'apropos'?'red--text':'grey--text'}`">A propos</v-btn>
            </div>
        </v-layout>
        <v-divider></v-divider>
        <v-layout v-if="menu == 'publication'" class="ma-5 d-flex justify-center">
            <ToPost />
        </v-layout>
    </v-main>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import NavBar from '../components/NavBar'
  import ToPost from '../components/ToPost'

  export default {
    name: 'Posts',
    components: { NavBar, ToPost },
    watch: {
        $route () {
            window.location.reload()
        }
    },
    data: function (){
        return {
            menu: 'publication'
        }
    },
    mounted: function () {
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login');
            this.$store.commit('updateRoute', '/login');
            return ;
        }
        this.$store.dispatch('getProfilInfos', this.$route.params.userId);
    },
    computed: {
        ...mapState({
            user: 'profilInfos'
        }),
        avatar: function () {
            return this.user.avatar == null ? '../../icon.png' : this.user.avatar
        },
    },
  }
</script>

<style scoped>
    .profil_header{
        position: relative;
    }
    .profil_avatar{
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translatex(-50%);
    }
</style>