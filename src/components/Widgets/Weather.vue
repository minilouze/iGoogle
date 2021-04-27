<template>
  <div>
    <img :src="properties.icon" alt="weather icon" />
    <span class="temperature">{{ properties.temperature }}°</span>
  </div>
</template>

<script>
export default {
  name: "Widget",
  props: {
    properties: {
      icon: String,
      temperature: Number
    }
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