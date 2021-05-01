<template>
  <md-dialog-prompt
    :md-active.sync="opened"
    v-model="input"
    :md-title="title"
    md-input-maxlength="30"
    :md-input-placeholder="title"
    md-cancel-text="Annuler"
    md-confirm-text="Valider"
    @md-confirm="confirm"
  />
</template>

<script>
import WidgetTypes from "../../widgetTypes";

export default {
  props: {
    widgetType: Number,
    active: Boolean,
    input: String,
    title: String,
    placeholder: String,
  },
  data() {
    return {
      opened: this.active
    };
  },
  watch: {
    widgetType: function () {
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
    },
    active: function() {
        this.opened = this.active;
    }
  },
  methods: {
    confirm: function () {
      this.$emit("onConfirm", this.input);
    },
  },
};
</script>

<style>
</style>