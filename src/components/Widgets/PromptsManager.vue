<template>
  <md-dialog-prompt
    :md-active.sync="active"
    v-model="input"
    :md-title="title"
    md-input-maxlength="30"
    :md-input-placeholder="placeholder"
    md-cancel-text="Annuler"
    md-confirm-text="Valider"
    @md-confirm="confirm"
    @md-cancel="cancel"
  />
</template>

<script>
import Vue from 'vue';
import WidgetTypes from "../../widgetTypes";

export default {
  props: {
    bus: Vue,
  },
  data() {
    return {
      widgetType: null,
      active: false,
      title: "",
      placeholder: "",
      input: null,
    };
  },
  mounted() {
    this.bus.$on('onAskedPrompt', this.openPrompt)
  },
  methods: {
    openPrompt(widgetType) {
      this.widgetType = widgetType;
      switch (this.widgetType) {
        case WidgetTypes.WEATHER:
          this.title = "Pour quelle ville souhaitez-vous la météo ?";
          this.placeholder = "Écrivez le nom de la ville...";
          break;
        case WidgetTypes.PICTURES:
          this.title = "Quelles images souhaitez-vous ?";
          this.placeholder = "Écrivez vos mots-clés...";
          break;
        case WidgetTypes.NEWS:
          this.title = "Quelles informations recherchez-vous ?";
          this.placeholder = "Écrivez vos mots-clés...";
          break;
      }
      this.active = true;
    },
    confirm: function () {
      this.$emit("onConfirm", {widgetType: this.widgetType, input: this.input});
      this.input = "";
    },
    cancel: function() {
      this.input = "";
      this.$emit("onCancel");
    },
  },
};
</script>

<style>
</style>