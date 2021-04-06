<template>
  <div>
    <meteo v-for="(widget, index) in widgets" :key="index"
    v-bind:ville="widget.ville"
    v-bind:temperature="widget.temperature"
    v-bind:icon="widget.icon"/>
  </div>
</template>

<script>
import Meteo from "./Meteo"
export default {
  name: "WidgetsList",
  props: ["widgets"],
  components: {
      Meteo
  },
};
</script>