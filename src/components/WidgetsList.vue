<template>
  <div>
    <grid-layout
      :layout.sync="widgets"
      :col-num="4"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in widgets"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :static="false"
        @moved="movedEvent"
      >
        <widget
          :themeColor="themeColor"
          :widgetType="item.widget.widgetType"
          @deleteWidget="deleteWidget"
        />
      </grid-item>
    </grid-layout>
  </div>
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
  data() {
    return {
      draggable: true,
      resizable: true,
      responsive: true,
      index: 0,
    };
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