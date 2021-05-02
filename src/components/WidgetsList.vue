<template>
  <div id="gridContainer">
    <grid-layout
      :layout.sync="layout"
      :col-num="colNum"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :responsive="responsive"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="widget in layout"
        :key="widget.i"
        :x="widget.x"
        :y="widget.y"
        :w="widget.w"
        :h="widget.h"
        :i="widget.i"
        :static="false"
      >
        <widget
          :themeColor="themeColor"
          :widgetInfo="widget.widgetInfo"
          @deleteWidget="deleteWidgetFromSource"
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
  data() {
    return {
      layout: this.widgets,
      draggable: true,
      resizable: true,
      responsive: true,
      colNum: 12,
    };
  },
  components: {
    Widget,
    GridLayout,
    GridItem,
  },
  watch: {
    // Synchoniser la liste des widgets
    widgets: function () {
      const newWidgets = this.widgets.filter(
        (widget) => !this.layout.some((w) => w.i === widget.id)
      );
      const deletedWidgets = this.layout.filter(
        (widget) => !this.widgets.some((w) => w.id === widget.i)
      );
      for (const newWidget of newWidgets) {
        this.addWidget(newWidget);
      }
      for (const deletedWidget of deletedWidgets) {
        this.deleteWidget(deletedWidget.i);
      }
    },
  },
  methods: {
    addWidget: function (widget) {
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12),
        w: 2,
        h: 2,
        i: widget.id,
        widgetInfo: widget,
      });
      this.index++;
    },
    deleteWidget: function (id) {
      const index = this.layout.map((widget) => widget.i).indexOf(id);
      this.layout.splice(index, 1);
    },
    deleteWidgetFromSource: function (id) {
      this.$emit("deleteWidgetFromSource", id);
    },
  },
};
</script>

<style scoped>
  #gridContainer {
    padding-right: 62px;
  }
</style>