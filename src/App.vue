<template>
  <div id="app">
    <div id="topBar">
      <InputColorPicker v-model="themeColor" />
      <Menu></Menu>
    </div>
    <WidgetsList
      :widgets="widgets"
      :themeColor="themeColor"
      @deleteWidgetFromSource="deleteWidget"
    ></WidgetsList>

    <WidgetsAdder
      :bus="bus"
      @onReceivedDataWidget="addWidget"
      @onAskedPrompt="openPrompt"
      @onError="hasWidgetError = true"
    ></WidgetsAdder>

    <PromptsManager
      :bus="bus"
      @onConfirm="requestData"
      @onCancel="promptOpened = false"
    ></PromptsManager>

    <md-dialog-alert
      :md-active.sync="hasWidgetError"
      md-content="Désolé, ce widget n'est pas disponible pour le moment &#128533;"
      md-confirm-text="Pas grave"
    />
  </div>
</template>

<script>
import Menu from "./components/Menu";
import WidgetsAdder from "./components/WidgetsAdder";
import WidgetsList from "./components/WidgetsList";
import InputColorPicker from "vue-native-color-picker";
import PromptsManager from "./components/Widgets/PromptsManager.vue";
import Vue from "vue";

export default {
  name: "App",
  data: () => ({
    widgets: [],
    bus: new Vue(),
    hasWidgetError: false,
    themeColor: "#448aff",
  }),
  components: {
    Menu,
    WidgetsList,
    InputColorPicker,
    WidgetsAdder,
    PromptsManager,
  },
  mounted: function () {
    if (localStorage.themeColor) {
      this.themeColor = localStorage.themeColor;
    }
    if (localStorage.layout) {
      try {
        this.widgets = JSON.parse(localStorage.layout).map(widget => widget.widgetInfo);
      } catch (e) {
        localStorage.removeItem("layout");
      }
    }
  },
  methods: {
    openPrompt: function (widgetType) {
      this.bus.$emit("onAskedPrompt", widgetType);
    },
    requestData: function (request) {
      this.bus.$emit("onRequestedData", request);
    },
    addWidget: function (widgetInfo) {
      (widgetInfo.id = this.widgets.length), this.widgets.push(widgetInfo);
    },
    deleteWidget: function (id) {
      const index = this.widgets.map((widget) => widget.id).indexOf(id);
      this.widgets.splice(index, 1);
    },
  },
  watch: {
    themeColor: (color) => {
      document.documentElement.style.setProperty(
        "--md-theme-default-primary",
        color
      );
      localStorage.themeColor = color;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  padding: 2rem;
  position: relative;
  #topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  #add-widget {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
  }
}
</style>
