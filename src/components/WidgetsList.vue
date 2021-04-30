<template>
  <div>
    <grid-layout
      :layout.sync="gridOptions.layout"
      :col-num="4"
      :is-draggable="gridOptions.draggable"
      :is-resizable="gridOptions.resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in gridOptions.layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :static="false"
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
  data: function () {
    return {};
  },
  components: {
    Widget,
    GridLayout,
    GridItem,
  },
  computed: {
    gridOptions: function () {
      return {
        layout: this.widgets.map(function (widget, index) {
          return {
            widget,
            x: (index % 4),
            y: Math.floor(index / 4),
            w: 1,
            h: 1,
            i: index,
          };
        }),
        draggable: true,
        resizable: true,
        responsive: true,
        index: 0,
      };
    },
  },
  methods: {
    deleteWidget: function (index) {
      this.widgets.splice(index, 1);
    },
  },
};
</script>

<style scoped>
</style>