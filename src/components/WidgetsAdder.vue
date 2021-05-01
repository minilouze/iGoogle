<template>
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
</template>

<script>
import axios from "axios";
import WidgetTypes from "../widgetTypes";

export default {
  props: {
    input: String,
    trigger: Boolean,
  },
  watch: {
    trigger: function() {
        this.getWeather();
    },
  },
  methods: {
    openWeatherPrompt: function () {
      this.$emit("onPromptAsked", WidgetTypes.WEATHER);
    },
    openPicturesPrompt: function () {
      this.picturesPrompt.active = true;
    },
    openNewsPrompt: function () {
      this.newsPrompt.active = true;
    },
    getWeather: function () {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=8a3910f661c45e015711823eb5df116a&query=${this.input}`
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
          this.$emit("widgetDataReceived", widgetInfo);
        });
    },
    getClock: function () {
      const widgetInfo = {
        componentName: "Clock",
        materialIcon: "schedule",
        configurable: false,
        title: "Date/Heure",
      };
      this.$emit("widgetDataReceived", widgetInfo);
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
  },
};
</script>

<style>
</style>