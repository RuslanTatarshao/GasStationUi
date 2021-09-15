<template>
  <headerBar/>
  <div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import headerBar from './components/Header';

export default {
  name: 'App',

  components: {
    headerBar,
  },

  mounted() {
    if (!localStorage.getItem('auth')) {
      this.$router.push({name: 'login'});
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #CCD6DD;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(to right, #E1E8ED, #E1E8ED)
}
</style>
