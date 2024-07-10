<template>
    <div>
      <span class="text-green-700" v-if="product.general.price.excludePromo"> Special Price</span>
      <p class="text-3xl"> ₹{{ product.general.price.finalPrice }}
        
        <span class="text-gray-700 text-xl strike"> ₹{{ product.general.price.msrp }}</span>
        <span class="text-green-700 text-xl ">{{ product.general.price.discount }}% off</span>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object
    }
  };
  </script>
  
  <style scoped>
  .strike {
    text-decoration: line-through;
  }
  </style>
  