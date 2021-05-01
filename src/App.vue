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

    <md-speed-dial id="add-widget">
      <md-speed-dial-target class="md-primary">
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="getMichelBillaudTwitter()">
          <md-icon>person</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="openNewsPrompt()">
          <md-icon>article</md-icon>
        </md-button>
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

    <md-dialog-prompt
      :md-active.sync="newsPrompt.active"
      v-model="newsPrompt.search"
      md-title="Quelles informations recherchez-vous ?"
      md-input-maxlength="30"
      md-input-placeholder="Écrivez vos mots-clés..."
      md-cancel-text="Annuler"
      md-confirm-text="Valider"
      @md-confirm="getNews"
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
    newsPrompt: {
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
    openNewsPrompt: function () {
      this.newsPrompt.active = true;
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
          const widgetInfo = {
            componentName: "Weather",
            configurable: true,
            materialIcon: "thermostat",
            title: "Météo",
            subtitle: data.location.name,
            properties: {
              temperature: data.current.temperature,
              icon: data.current.weather_icons[0],
            },
          };
          this.addWidget(widgetInfo);
          this.weatherPrompt.city = "";
        });
    },
    getClock: function () {
      const widgetInfo = {
        componentName: "Clock",
        materialIcon: "schedule",
        configurable: false,
        title: "Date/Heure",
      };
      this.addWidget(widgetInfo);
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
      const widgetInfo = {
        componentName: "Pictures",
        configurable: true,
        materialIcon: "image",
        title: "Images",
        subtitle: this.picturesPrompt.search,
        properties: {
          pictures,
          nbPictures: 3,
        },
      };
      this.addWidget(widgetInfo);
      this.picturesPrompt.search = "";
    },
    getMichelBillaudTwitter: function () {
      const widgetInfo = {
        componentName: "MichelBillaudTwitter",
        materialIcon: "person",
        configurable: false,
        title: "@MichelBillaud",
      };
      this.addWidget(widgetInfo);
    },
    getNews: function () {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=${this.newsPrompt.search}&apiKey=d8567e8a076140a08c7ee9d4a2d459fa`
        )
        .then((response) => {
          const widgetInfo = {
              componentName: "News",
              configurable: false,
              materialIcon: "article",
              title: "News",
              subtitle: this.newsPrompt.search,
              properties: {
                articles: response.data.articles,
              },
          };
          this.addWidget(widgetInfo);
          this.newsPrompt.search = "";
        });
    },
    addWidget: function (widgetInfo) {
      const nbWidget = this.widgets.length;
      const widget = {
        widgetInfo,
        x: nbWidget % 4,
        y: Math.floor(nbWidget / 4) * 2,
        w: 1,
        h: 2,
        i: nbWidget,
      };
      this.widgets.push(widget);
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
  height: 100vh;
  padding: 1rem;
  position: relative;
  #topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #add-widget {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
