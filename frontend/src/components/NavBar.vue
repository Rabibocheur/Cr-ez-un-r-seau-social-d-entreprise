<template>
    <v-app-bar class="white" app elevation="2">
        <router-link to="/">
            <v-img src="/icon-left-font.png" max-width="300" max-height="56"></v-img>
        </router-link>
        <v-spacer></v-spacer>
        <v-menu :close-on-content-click="false" :nudge-width="180" offset-x>
            <template v-slot:activator="{ on, attrs }">
                <v-avatar size="50" v-bind="attrs" v-on="on">
                    <img :src="avatar">
                </v-avatar>
            </template>

            <v-card max-width="250">
                <v-list>
                    <v-list-item link route :to="'/profile/' + user.uuid">
                        <v-list-item-avatar class="white">
                            <img :src="avatar">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{user.firstname}}</v-list-item-title>
                            <v-list-item-subtitle>Voir mon profil</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn depressed route to="/">
                        <v-icon>mdi-home</v-icon>
                    </v-btn>
                    <v-btn depressed>
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn depressed light class="white" @click="logout()">
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NavBar',
    data: () => {
        return {
        }
    },
     methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$store.commit('updateRoute', '/login');
            this.$router.push('/login');
        }
    },
    computed: {
        ...mapState(['user']),
        avatar: function () {
            return this.user.avatar == null ? '../../icon.png' : this.user.avatar
        },
    }
}
</script>