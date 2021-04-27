<template>
  <md-card md-with-hover>
    <md-card-header>
      <md-icon :style="{ color: themeColor }">{{ widgetType.materialIcon }}</md-icon>
      <div class="md-title">{{ widgetType.title }}</div>
      <div :v-if="widgetType.subtitle" class="md-subhead">{{ widgetType.subtitle }}</div>
    </md-card-header>

    <md-card-content>
      <component :is="widgetType.componentName" :properties="widgetType.properties"/>
    </md-card-content>

    <md-card-actions>
      <md-button class="md-icon-button md-raised">
        <md-icon>settings</md-icon>
      </md-button>
      <md-button
        @click="deleteWidget"
        class="md-icon-button md-raised md-accent">
        <md-icon>delete</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>

import Meteo from "./Widgets/Meteo";
import Clock from "./Widgets/Clock"

export default {
  name: "Widget",
  props: ["id", "widgetType", "themeColor"],
  components: {
    Meteo,
    Clock
  },
  methods: {
    deleteWidget: function () {
      this.$emit("deleteWidget", this.id);
    },
  },
};
</script>


<style lang="scss">
.md-card {
  display: inline-flex;
  flex-direction: column;
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