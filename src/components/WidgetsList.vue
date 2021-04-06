<template>
  <div>
    <meteo v-for="(widget, index) in widgets" :key="index"
    v-bind:id="index"
    v-bind:widgetsColor="widgetsColor"
    v-bind:ville="widget.ville"
    v-bind:temperature="widget.temperature"
    v-bind:icon="widget.icon"
    @deleteWidget="deleteWidget"/>
  </div>
</template>

<script>
import Meteo from "./Meteo"
export default {
  name: "WidgetsList",
  props: ["widgets", "widgetsColor"],
  components: {
      Meteo
  },
  methods: {
    deleteWidget: function(index) {
      this.widgets.splice(index, 1);
    }
  }
};
</script>