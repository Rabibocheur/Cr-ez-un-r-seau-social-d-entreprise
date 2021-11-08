<template>
    <router-link :to="`/profile/${uuid}`">
        <v-avatar :size="size">
            <v-img contain :src="avatar || '../avatar.png'"></v-img>
        </v-avatar>
    </router-link>
</template>

<script>
export default {
    name: 'Avatar',
    props: ['avatar', 'uuid', 'size']
}
</script>