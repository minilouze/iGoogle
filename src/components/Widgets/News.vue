<template>
  <div>
      <div v-for="(article, index) in properties.articles" :key="index">
          <img :src="article.urlToImage"/>
          <p><a :href="article.url">{{ article.title }}</a> by {{ article.author }} on {{ article.publishedAt }}</p>
          <p>{{ article.description }}</p>
      </div>
  </div>
</template>

<script>
//d8567e8a076140a08c7ee9d4a2d459fa
export default {
    name: "News",
    props: {
        properties: {
            articles: Array
        }
    }
}
</script>

<style>

</style>