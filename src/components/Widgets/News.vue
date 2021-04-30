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