<template>
  <md-card md-with-hover>
    <md-card-header>
      <md-icon :style="{ color: themeColor }">{{
        widgetInfo.materialIcon
      }}</md-icon>
      <div class="md-title">{{ widgetInfo.title }}</div>
      <div v-if="widgetInfo.subtitle" class="md-subhead">
        {{ widgetInfo.subtitle }}
      </div>
    </md-card-header>

    <md-card-content>
      <component
        :is="widgetInfo.componentName"
        :properties="widgetInfo.properties"
      />
    </md-card-content>

    <md-card-actions>
      <md-button
        v-if="widgetInfo.configurable"
        class="md-icon-button md-raised"
      >
        <md-icon>settings</md-icon>
      </md-button>
      <md-button
        @click="deleteWidget"
        class="md-icon-button md-raised md-accent"
      >
        <md-icon>delete</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import Weather from "./Widgets/Weather";
import Clock from "./Widgets/Clock";
import Pictures from "./Widgets/Pictures";
import MichelBillaudTwitter from "./Widgets/MichelBillaudTwitter";
import News from "./Widgets/News";

export default {
  name: "Widget",
  props: ["widgetInfo", "themeColor"],
  components: {
    Weather,
    Clock,
    Pictures,
    MichelBillaudTwitter,
    News,
  },
  methods: {
    deleteWidget: function () {
      this.$emit("deleteWidget", this.widgetInfo.id);
    },
  },
};
</script>


<style lang="scss">
.md-card {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .md-card-header {
    height: 88px;
  }
  .md-card-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 88px - 56px);
    overflow: auto;
    .temperature {
      font-size: 2rem;
      line-height: 2rem;
      margin-left: 1rem;
    }
  }
  .md-card-actions {
    height: 56px;
  }
}
.vue-resizable-handle {
  z-index: 9;
}
</style>