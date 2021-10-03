<template>
    <router-link :to="route">
    <v-list-item-avatar>
        <img :src="avatar">
    </v-list-item-avatar>
    </router-link>
</template>

<script>
export default {
    name: 'Avatar',
    props: ['avatar', 'route']
}
</script>