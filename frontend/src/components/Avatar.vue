<template>
  <v-avatar :size="size">
    <img :src="avatar || '../avatar.png'" />
  </v-avatar>
</template>

<script>
export default {
  name: "Avatar",
  props: ["avatar", "size"],
};
</script>
