<template>
  <div id="app">
    <Menu></Menu>
    <Meteo></Meteo>
    <md-speed-dial :class="bottomPosition" id="add-widget">
      <md-speed-dial-target>
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button">
          <md-icon>nights_stay</md-icon>
        </md-button>

      </md-speed-dial-content>
    </md-speed-dial>
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
  position: relative;
  #add-widget {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
