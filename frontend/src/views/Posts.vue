<template>
  <div>
    <NavBar />
  </div>
</template>

<script>
  import NavBar from '../components/NavBar'

  export default {
    name: 'Posts',
    components: { NavBar },
    mounted: function () {
      if(this.$store.state.user.userId == -1){
        this.$router.push('/login');
        this.$store.commit('updateRoute', '/login');  
        return ;
      }
    }
  }
</script>
