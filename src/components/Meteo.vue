<template>
  <md-card md-with-hover>
    <md-card-header>
      <md-icon v-bind:style="{ color: themeColor }">nights_stay</md-icon>
      <div class="md-title">Météo</div>
      <div class="md-subhead">{{ ville }}</div>
    </md-card-header>

    <md-card-content>
      <img v-bind:src="icon" alt="meteo icon" />
      <span class="temperature">{{ temperature }}°</span>
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
export default {
  name: "Widget",
  props: ["id", "themeColor", "temperature", "icon", "ville"],
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
  .md-ripple {
    padding: 0.5rem;
  }
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