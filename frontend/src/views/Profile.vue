<template>
  <div>
    <NavBar />
    <v-main>
      <v-layout class="white d-flex column align-center">
        <v-card flat class="profil_header">
          <v-img
            class="rounded-b-lg"
            width="800px"
            height="350px"
            :src="profilInfos.couverture"
          ></v-img>
          <v-avatar
            class="profil_avatar"
            color="indigo"
            height="150"
            width="150"
          >
            <img :src="profilInfos.avatar" />
          </v-avatar>
        </v-card>
        <v-container>
          <v-row>
            <v-col cols="12" class="text-center">
              <h1 class="mt-5">{{ profilInfos.firstname }} {{ profilInfos.lastname }}</h1>
            </v-col>
            <v-col cols="12" class="text-center">
              <h3 class="font-weight-light">{{ profilInfos.bio }}</h3>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-if="editProfil == true">
          <v-row
            style="border-top: 1px solid rgba(128, 128, 128, 0.3)"
            class="mx-10 pt-4"
            justify="center"
          >
            <EditProfile />
            <v-btn depressed class="ml-5">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-layout>
      <v-divider></v-divider>
      <v-container>
        <v-layout row class="ma-5 justify-center">
          <v-flex md6>
            <ToPost
              :avatar="this.$store.state.user.avatar"
              :id="this.$store.state.user.id"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import instance from "../service/instance";
import NavBar from "../components/NavBar";
import EditProfile from "../components/EditProfile";
import ToPost from "../components/ToPost";

export default {
  name: "Posts",
  components: { NavBar, EditProfile, ToPost },
  watch: {
    $route() {
      window.location.reload();
    },
  },
  data: function() {
    return {
      profilInfos: {}
    };
  },
  mounted: function() {
    const self = this
    instance
      .get(`/user/${this.$route.params.userId}`)
      .then(function(response) {
        self.profilInfos = response.data
      })
      .catch(function(e) {
        if (e.response.status === 401) {
          self.$store.commit("logout");
        }
      });
  },
  computed: {
    editProfil: function() {
      if (this.$store.state.user.id == this.$route.params.userId) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.profil_header {
  position: relative;
}
.profil_avatar {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translatex(-50%);
}
</style>
