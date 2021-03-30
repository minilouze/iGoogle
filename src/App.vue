<template>
  <div id="app">
    <Menu></Menu>
    <Meteo></Meteo>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Meteo from './components/Meteo.vue'

export default {
  name: 'App',
  components: {
    Menu,
    Meteo
  }
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  padding: 1rem;
}
</style>
