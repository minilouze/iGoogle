<template>
  <div>
      <img v-for="(picture, index) in properties.pictures" :key="index" :src="picture"/>
      </div>
</template>

<script>
export default {
  name: "Pictures",
  props: {
      properties: {
        pictures: Array
      }
  },
};
</script>

<style>
</style>