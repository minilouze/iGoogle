<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <md-icon>nights_stay</md-icon>
        <div class="md-title">Météo</div>
        <div class="md-subhead">{{ location.name }}</div>
      </md-card-header>

      <md-card-content>
        <img v-bind:src="current.weather_icons[0]" alt="meteo icon" />
        <span class="temperature">{{ current.temperature }}°</span>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-icon-button md-raised">
          <md-icon>settings</md-icon>
        </md-button>
        <md-button class="md-icon-button md-raised md-accent">
          <md-icon>delete</md-icon>
        </md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Widget",
  data() {
    return {
      info: null,
      location: null,
      current: null,
    };
  },
  mounted() {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=8a3910f661c45e015711823eb5df116a&query=fetch:ip"
      )
      .then((response) => {
        this.info = response.data;
        console.log(this.info);
        this.location = this.info.location;
        this.current = this.info.current;
      });
  },
};
</script>


<style lang="scss">
.md-card {
  display: inline-flex;
  .md-ripple {
    padding: 0.5rem;
  }
  .md-card-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .temperature {
      font-size: 2rem;
      line-height: 2rem;
      margin-left: 1rem;
    }
  }
}
</style>