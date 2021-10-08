<template>
  <v-layout
    class="mx-3 mb-3 pt-3"
    style="border-top: 1px solid rgba(0, 0, 0, 0.2)"
  >
    <v-row style="max-width: 575px">
      <v-col
        class="d-flex"
        cols="12"
        v-for="comment in comments"
        :key="comment.id"
      >
        <Avatar
          :avatar="comment.user.avatar"
          :uuid="comment.user.uuid"
          size="36"
        />
        <div class="rounded mx-2 pa-2 grey lighten-4">
          <router-link
          :to="`/profile/${comment.user.uuid}`"
          class="black--text text-subtitle-2 font-weight-medium">
            {{ `${comment.user.firstname} ${comment.user.lastname}` }}
          </router-link>
          <p class="mb-0">{{ comment.content }}</p>
        </div>
        <v-btn fab small depressed class="white align-self-center">
          <v-icon small>
            mdi-dots-horizontal
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import Avatar from './Avatar'

export default {
    name: 'Comment',
    components: { Avatar },
    props: ['comments']
}
</script>
