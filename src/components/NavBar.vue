<template>
    <nav>
        <v-app-bar class="white" flat >
            <v-img src="/icon-left-font.png" max-width="300" max-height="56"></v-img>
            <v-spacer></v-spacer>
            <div v-if="currentRoute == '/login' || currentRoute == '/signup'">
                <NavLogin />
            </div>
            <div v-else>
                <NavAccount />
            </div>
        </v-app-bar>
        <v-divider></v-divider>
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