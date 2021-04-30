<template>
  <grid-layout
    :layout.sync="widgets"
    :col-num="4"
    :is-draggable="true"
    :is-resizable="true"
    
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="widget in widgets"
      :key="widget.i"
      :x="widget.x"
      :y="widget.y"
      :w="widget.w"
      :h="widget.h"
      :i="widget.i"
      :static="false"
      @moved="movedEvent"
    >
      <widget
        :themeColor="themeColor"
        :widgetInfo="widget.widgetInfo"
        @deleteWidget="deleteWidget"
      />
    </grid-item>
  </grid-layout>
</template>

<script>
import Widget from "./Widget";
import { GridLayout, GridItem } from "vue-grid-layout";

export default {
  name: "WidgetsList",
  props: ["widgets", "themeColor"],
  components: {
    Widget,
    GridLayout,
    GridItem,
  },
  methods: {
    deleteWidget: function (index) {
      this.widgets.splice(index, 1);
    },
    movedEvent: function (i, newX, newY) {
      const msg = "MOVED i=" + i + ", X=" + newX + ", Y=" + newY;
      console.log(msg);
    },
  },
};
</script>

<style scoped>
</style>