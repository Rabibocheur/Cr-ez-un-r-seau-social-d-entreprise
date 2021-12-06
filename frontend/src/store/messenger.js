export default {
  state: {
    drawerConv: false,
    privateChat: [],
    popup: [],
    selected: null
  },
  mutations: {
    SET_DRAWER_CHAT: function(state, value) {
      state.drawerConv = value;
    },
    ADD_PRIVATE_POPUP: function(state, index){
      for (let i in state.popup) {
        if (state.popup[i] === index) return;
      }
      if(state.popup.length < 4){
        state.popup.push(index) 
      }
    },
    DELETE_PRIVATE_POPUP: function(state, index){
      state.popup.splice(index, 1);
    },
    SELECTED_CHAT: function(state, index){
      state.selected = index
    },
    SET_PRIVATE_CHAT: function(state, { to, room }) {
      for (let i in state.privateChat) {
        if (state.privateChat[i].to.uuid === to.uuid) return;
      }
      state.privateChat.push({ to, room, notView: 0, messages: [] });
    },
    SET_ROOM_CHAT: function(state, { to, room }) {
      for (let i in state.privateChat) {
        if (state.privateChat[i].to.uuid === to.uuid) {
          state.privateChat[i].room = room;
        }
      }
    },
    INITIALIZE_MESSAGES: function(state, { index, messages }){
      state.privateChat[index].messages = messages
    },
    ADD_NEW_MESSAGE: function(state, { index, message }){
      state.privateChat[index].messages.push(message)
    },
    NOTIFICATION_PRIVATE_CHAT: function(state, to) {
      for (let i in state.privateChat) {
        if (state.privateChat[i].to.uuid === to.uuid) {
          state.privateChat[i].notView += 1;
        }
      }
    },
  },
  actions: {},
};
