<template>
  <perfect-scrollbar v-chat-scroll>
    <v-list>
      <v-list-item
        link
        @click="addPopup(index)"
        v-for="(chat, index) in messenger.privateChat"
        :key="index"
        style="width: 300px;"
      >
        <v-badge
          :color="chat.notView > 0 ? 'red' : 'transparent'"
          :content="chat.notView"
          offset-x="25"
          offset-y="40"
        >
          <v-list-item-avatar class="ml-0" size="42">
            <img :src="chat.to.avatar || '../avatar.png'" />
          </v-list-item-avatar>
        </v-badge>
        <v-list-item-content>
          <v-list-item-title class="text-left">
            {{ chat.to.firstname }}
            {{ chat.to.lastname }}
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="chat.messages[chat.messages.length - 1] != undefined"
          >
            {{
              chat.messages[chat.messages.length - 1].user.uuid == user.uuid
                ? "Vous:"
                : ""
            }}
            {{ chat.messages[chat.messages.length - 1].message }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </perfect-scrollbar>
</template>
