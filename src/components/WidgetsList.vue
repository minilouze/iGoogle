<template>
  <div>
    <grid-layout
      :layout.sync="gridOptions.layout"
      :col-num="4"
      :is-draggable="gridOptions.draggable"
      :is-resizable="gridOptions.resizable"
      :responsive="gridOptions.responsive"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, index) in gridOptions.layout"
        :key="index"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="index"
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
.vue-grid-layout {
    background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}
.vue-grid-item .resizing {
    opacity: 0.9;
}
.vue-grid-item .static {
    background: #cce;
}
.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}
.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}
.vue-grid-item .minMax {
    font-size: 12px;
}
.vue-grid-item .add {
    cursor: pointer;
}
.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}