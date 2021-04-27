<template>
  <div>
    <widget
      v-for="(widget, index) in widgets"
      :key="index"
      :id="index"
      :themeColor="themeColor"
      :widgetType="widget.widgetType"
      @deleteWidget="deleteWidget"
    />
  </div>
</template>

<script>
import Widget from "./Widget";

export default {
  name: "WidgetsList",
  props: ["widgets", "themeColor"],
  components: {
    Widget,
  },
  methods: {
    deleteWidget: function (index) {
      this.widgets.splice(index, 1);
    },
  },
};
</script>