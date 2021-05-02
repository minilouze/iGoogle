<template>
  <md-speed-dial id="add-widget">
    <md-speed-dial-target class="md-primary">
      <md-icon>add</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button
        class="md-icon-button"
        @click="
          getWidgetData({ widgetType: widgetTypes.MICHEL_BILLAUD_TWITTER })
        "
      >
        <md-icon>person</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="openPrompt(widgetTypes.NEWS)">
        <md-icon>article</md-icon>
      </md-button>
      <md-button
        class="md-icon-button"
        @click="openPrompt(widgetTypes.PICTURES)"
      >
        <md-icon>image</md-icon>
      </md-button>
      <md-button
        class="md-icon-button"
        @click="openPrompt(widgetTypes.WEATHER)"
      >
        <md-icon>thermostat</md-icon>
      </md-button>
      <md-button
        class="md-icon-button"
        @click="getWidgetData({ widgetType: widgetTypes.CLOCK })"
      >
        <md-icon>schedule</md-icon>
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial>
</template>

<script>
import axios from "axios";
import WidgetTypes from "../widgetTypes";
import Widget from "../widget";
import Vue from "vue";

export default {
  props: {
    input: String,
    bus: Vue,
  },
  data() {
    return {
      widgetTypes: WidgetTypes,
    };
  },
  mounted() {
    this.bus.$on("onRequestedData", this.getWidgetData);
  },
  methods: {
    openPrompt: function (widgetType) {
      this.$emit("onAskedPrompt", widgetType);
    },
    getWidgetData: function (request) {
      const widgetType = request.widgetType;
      const widget = new Widget(widgetType.information);
      if (Object.prototype.hasOwnProperty.call(widgetType, "api")) {
        const input = request.input;
        const url = new URL(widgetType.api);
        url.searchParams.set(widgetType.paramName, input);
        axios
          .get(url)
          .then((response) => {
            switch (widgetType.id) {
              case this.widgetTypes.WEATHER.id:
                {
                  const data = response.data;
                  widget.subtitle = data.location.name;
                  widget.properties = {
                    temperature: data.current.temperature,
                    icon: data.current.weather_icons[0],
                  };
                }
                break;
              case this.widgetTypes.PICTURES.id:
                {
                  response = new DOMParser().parseFromString(
                    response.data,
                    "application/xml"
                  );
                  const pictures = [];
                  for (let photo of response.getElementsByTagName("photo")) {
                    const serverId = photo.getAttribute("server");
                    const id = photo.getAttribute("id");
                    const secret = photo.getAttribute("secret");
                    pictures.push(
                      `https://live.staticflickr.com/${serverId}/${id}_${secret}_s.jpg`
                    );
                    widget.subtitle = input;
                    widget.properties = {
                      pictures,
                      nbPictures: 3,
                    };
                  }
                }
                break;
              case this.widgetTypes.NEWS.id:
                widget.subtitle = input;
                widget.properties = {
                  articles: response.data.articles,
                };
                break;
            }
            this.$emit("onReceivedDataWidget", widget);
          })
          .catch((e) => {
            console.error(e);
            this.$emit("onError");
          });
      } else {
        this.$emit("onReceivedDataWidget", widget);
      }
    },
  },
};
</script>

<style>
</style>