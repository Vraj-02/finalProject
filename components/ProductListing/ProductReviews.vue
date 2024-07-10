<template>
    <div v-if="reviews.number > 0">
      <p class="text-yellow-700" v-if="reviews.rating <= 20">⭐({{reviews.number}})</p>
      <p class="text-yellow-700" v-else-if="reviews.rating <= 40">⭐⭐({{reviews.number}})</p>
      <p class="text-yellow-700" v-else-if="reviews.rating <= 60">⭐⭐⭐({{reviews.number}})</p>
      <p class="text-yellow-700" v-else-if="reviews.rating <= 80">⭐⭐⭐⭐({{reviews.number}})</p>
      <p class="text-yellow-700" v-else>⭐⭐⭐⭐⭐({{reviews.number}})</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      reviews: Object
    }
  }
  </script>
  
  <style scoped>
  .text-yellow-700 {
    color: #eab308;
  }
  </style>
  