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
        <md-button class="md-icon-button" @click="openPicturesPrompt()">
          <md-icon>image</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="openWeatherPrompt()">
          <md-icon>thermostat</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="getClock()">
          <md-icon>schedule</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>

    <md-dialog-prompt
      :md-active.sync="weatherPrompt.active"
      v-model="weatherPrompt.city"
      md-title="Pour quelle ville souhaitez-vous la météo ?"
      md-input-maxlength="30"
      md-input-placeholder="Écrivez le nom de la ville..."
      md-cancel-text="Annuler"
      md-confirm-text="Valider"
      @md-confirm="getWeather"
    />

    <md-dialog-prompt
      :md-active.sync="picturesPrompt.active"
      v-model="picturesPrompt.search"
      md-title="Quelles images souhaitez-vous ?"
      md-input-maxlength="30"
      md-input-placeholder="Écrivez vos mots-clés..."
      md-cancel-text="Annuler"
      md-confirm-text="Valider"
      @md-confirm="getPictures"
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
    bottomPosition: null,
    weatherPrompt: {
      active: false,
      city: "",
    },
    picturesPrompt: {
      active: false,
      search: "",
    },
    themeColor: "#448aff",
  }),
  components: {
    Menu,
    WidgetsList,
    InputColorPicker,
  },
  methods: {
    openWeatherPrompt: function () {
      this.weatherPrompt.active = true;
    },
    openPicturesPrompt: function () {
      this.picturesPrompt.active = true;
    },
    getWeather: function () {
      axios
        // .get(
        //   "http://api.weatherstack.com/current?access_key=8a3910f661c45e015711823eb5df116a&query=fetch:ip"
        // )
        .get(
          `http://api.weatherstack.com/current?access_key=8a3910f661c45e015711823eb5df116a&query=${this.weatherPrompt.city}`
        )
        .then((response) => {
          const data = response.data;
          const widget = {
            widgetType: {
              componentName: "Weather",
              configurable: true,
              materialIcon: "thermostat",
              title: "Météo",
              subtitle: data.location.name,
              properties: {
                temperature: data.current.temperature,
                icon: data.current.weather_icons[0],
              },
            },
          };
          this.widgets.push(widget);
          this.weatherPrompt.city = "";
        });
    },
    getClock: function () {
      const widget = {
        widgetType: {
          componentName: "Clock",
          materialIcon: "schedule",
          configurable: false,
          title: "Date/Heure",
        },
      };
      this.widgets.push(widget);
    },
    getPictures: function () {
      const pictures = [];
      axios
        .get(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4c961240fea7a5205c865fd44e0152af&text=${this.picturesPrompt.search}`
        )
        .then((response) => {
          response = new DOMParser().parseFromString(
            response.data,
            "application/xml"
          );
          for (let photo of response.getElementsByTagName("photo")) {
            const serverId = photo.getAttribute("server");
            const id = photo.getAttribute("id");
            const secret = photo.getAttribute("secret");
            pictures.push(
              `https://live.staticflickr.com/${serverId}/${id}_${secret}_s.jpg`
            );
          }
        });
      const widget = {
        widgetType: {
          componentName: "Pictures",
          configurable: true,
          materialIcon: "image",
          title: "Images",
          subtitle: this.picturesPrompt.search,
          properties: {
            pictures,
            nbPictures: 3
          },
        },
      };
      this.widgets.push(widget);
      this.picturesPrompt.search = "";
    },
  },
  watch: {
    themeColor: (color) => {
      document.documentElement.style.setProperty(
        "--md-theme-default-primary",
        color
      );
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
