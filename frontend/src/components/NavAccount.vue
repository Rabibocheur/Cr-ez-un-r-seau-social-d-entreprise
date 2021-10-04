<template>
    <div class="text-center">
        <v-menu :close-on-content-click="false" :nudge-width="180" offset-x>
            <template v-slot:activator="{ on, attrs }">
                <v-avatar color="indigo" v-bind="attrs" v-on="on">
                    <img :src="avatar">
                </v-avatar>
            </template>

            <v-card max-width="250">
                <v-list>
                    <v-list-item link route :to="'/profile/' + user.id">
                        <v-list-item-avatar>
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
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NavAccount',
    data: function (){
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