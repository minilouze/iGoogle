<template>
  <div id="dateTimeContainer">{{ dateTime }}</div>
</template>

<script>
export default {
  name: "Clock",
  data: () => ({
    dateTime: new Date().toLocaleString("fr-FR"),
  }),
  mounted: function () {
    setInterval(() => {
      this.dateTime = new Date().toLocaleString("fr-FR");
    }, 1000);
  },
};
</script>

<style>
</style>