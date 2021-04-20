<template>
  <div id="app">
    <div id="topBar">
      <!-- <md-button class="md-icon-button md-raised" id="color-picker">
      <md-icon>colorize</md-icon>
    </md-button> -->
      <InputColorPicker v-model="themeColor" />
      <Menu></Menu>
    </div>
    <WidgetsList :widgets="widgets" :themeColor="themeColor"></WidgetsList>

    <md-speed-dial :class="bottomPosition" id="add-widget">
      <md-speed-dial-target class="md-primary">
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="addMeteoWidget()">
          <md-icon>nights_stay</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>

    <md-dialog-prompt
      :md-active.sync="modal.active"
      v-model="value"
      md-title="Pour quelle ville souhaitez-vous la météo ?"
      md-input-maxlength="30"
      md-input-placeholder="Écrivez le nom de la ville..."
      md-cancel-text="Annuler"
      md-confirm-text="Valider"
      @md-confirm="getMeteo"
    />
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import WidgetsList from "./components/WidgetsList.vue";
import axios from "axios";
import InputColorPicker from "vue-native-color-picker";

export default {
  name: "App",
  data: () => ({
    widgets: [],
    value: "",
    bottomPosition: null,
    modal: {
      active: false,
    },
    themeColor: "#448aff",
  }),
  components: {
    Menu,
    WidgetsList,
    InputColorPicker,
  },
  methods: {
    addMeteoWidget: function () {
      this.modal.active = true;
    },
    getMeteo: function () {
      axios
        // .get(
        //   "http://api.weatherstack.com/current?access_key=8a3910f661c45e015711823eb5df116a&query=fetch:ip"
        // )
        .get(
          `http://api.weatherstack.com/current?access_key=8a3910f661c45e015711823eb5df116a&query=${this.value}`
        )
        .then((response) => {
          let self = this;
          const widget = {
            ville: response.data.location.name,
            temperature: response.data.current.temperature,
            icon: response.data.current.weather_icons[0],
          };
          self.widgets.push(widget);
        });
    },
  },
  watch: {
    themeColor: color => {
      document.documentElement.style.setProperty('--md-theme-default-primary', color);
    },
  },
};
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
  #topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #add-widget {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
