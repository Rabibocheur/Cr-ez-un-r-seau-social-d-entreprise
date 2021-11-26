<template>
    <router-link :to="`/profile/${uuid}`">
        <v-avatar :size="size">
            <img :src="avatar || '../avatar.png'">
        </v-avatar>
    </router-link>
</template>

<script>
export default {
    name: 'Avatar',
    props: ['avatar', 'uuid', 'size']
}
</script>