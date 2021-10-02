<template>
    <nav>
        <v-app-bar class="white" app elevation="2">
            <router-link to="/">
                <v-img src="/icon-left-font.png" max-width="300" max-height="56"></v-img>
            </router-link>
            <v-spacer></v-spacer>
            <div v-if="currentRoute == '/login' || currentRoute == '/signup'">
                <NavLogin />
            </div>
            <div v-else>
                <NavAccount />
            </div>
        </v-app-bar>
    </nav>
</template>

<script>
import NavLogin from './NavLogin'
import NavAccount from './NavAccount'

export default {
    name: 'NavBar',
    components: {
        NavLogin,
        NavAccount
    },
    data: () => {
        return {
        }
    },
    computed: {
        currentRoute: function () {
            return this.$store.state.currentRoute;
        }
    }
}
</script>