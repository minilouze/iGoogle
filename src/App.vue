<template>
  <div id="app">
    <div id="topBar">
      <InputColorPicker v-model="themeColor" />
      <Menu></Menu>
    </div>
    <WidgetsList
      :widgets="widgets"
      :themeColor="themeColor"
      @deleteWidgetFromSource="deleteWidgetFromSource"
    ></WidgetsList>

    <WidgetsAdder
      :input="promptInput"
      :trigger="trigger"
      @widgetDataReceived="addWidget"
      @onPromptAsked="openPrompt"
    ></WidgetsAdder>

    <PromptsManager
    :widgetType="promptWidgetType"
    :active="promptOpened"
    @onConfirm="sendPromptInput"></PromptsManager>
  </div>
</template>

<script>
import Menu from "./components/Menu";
import WidgetsAdder from "./components/WidgetsAdder";
import WidgetsList from "./components/WidgetsList";
import InputColorPicker from "vue-native-color-picker";
import WidgetTypes from "./widgetTypes";
import PromptsManager from './components/Widgets/PromptsManager.vue';

export default {
  name: "App",
  data: () => ({
    widgets: [],
    trigger: false,
    promptWidgetType: 0,
    promptOpened : false,
    promptInput: "",
    themeColor: "#448aff",
  }),
  components: {
    Menu,
    WidgetsList,
    InputColorPicker,
    WidgetsAdder,
    PromptsManager,
  },
  methods: {
    openPrompt: function (widgetType) {
      console.log(widgetType);
      this.promptWidgetType = widgetType;
      switch (widgetType) {
        case WidgetTypes.WEATHER:
          this.promptOpened = true;
          break;
      }
    },
    sendPromptInput: function () {
      this.trigger = !this.trigger;
    },
    addWidget: function (widgetInfo) {
      widgetInfo.id = this.widgets.length,
      this.widgets.push(widgetInfo);
    },
    deleteWidgetFromSource: function (id) {
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
  padding: 1rem;
  position: relative;
  #topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #add-widget {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
