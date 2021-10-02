<template>
    <v-btn depressed class="white" @click.prevent="updateRoute" route :to="routeTo">
        <span v-if="currentRoute == '/login'">Inscription</span>
        <span v-else>Connexion</span>
        <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'NavLogin',
    computed: {
        currentRoute: function () {
            return this.$store.state.currentRoute;
        },
        routeTo: function () {
            return this.currentRoute == '/login' ? '/signup' : '/login';
        }
    },
    methods: {
        updateRoute: function () {
            this.$store.commit('updateRoute', window.location.pathname);
        }
    }
}
</script>