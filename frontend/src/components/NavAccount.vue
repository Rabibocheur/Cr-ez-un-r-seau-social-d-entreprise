<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="180" offset-x>
            <template v-slot:activator="{ on, attrs }">
                <v-avatar color="indigo" v-bind="attrs" v-on="on">
                    <img :src="avatar" alt="John">
                </v-avatar>
            </template>

            <v-card max-width="250">
                <v-list>
                    <v-list-item link route :to="'/profile/' + this.userId">
                        <v-list-item-avatar>
                            <img :src="avatar" alt="John">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{user.firstname}} {{user.lastname}}</v-list-item-title>
                            <v-list-item-subtitle>Voir le profil</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed light class="white" @click="logout()">
                        Déconnexion
                        <v-icon right>mdi-exit-to-app</v-icon>
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
            userId: null
        }
    },
    mounted: function (){
        this.userId = JSON.parse(localStorage.getItem('user')).userId;
        this.$store.dispatch('getUserInfos', this.userId);
    },
    methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$store.commit('updateRoute', '/login');
            this.$router.push('/login');
        }
    },
    computed: {
        ...mapState({
            user: 'userInfos'
        }),
        avatar: function () {
            return this.user.avatar == null ? '../../icon.png' : this.user.avatar
        },
    }
}
</script>