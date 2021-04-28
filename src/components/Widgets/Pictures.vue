<template>
  <div>
      <img v-for="(picture, index) in filterNbPictures" :key="index" :src="picture"/>
      </div>
</template>

<script>
export default {
  name: "Pictures",
  props: {
      properties: {
        pictures: Array,
        nbPictures: Number
      }
  },
  computed: {
    filterNbPictures() {
      return this.properties.pictures.slice(0, this.properties.nbPictures);
    }
  }
};
</script>

<style>
</style>