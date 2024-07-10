<template>
    <div>
      <h1 class="text-4xl font-bold mb-4">{{ product.general.name }}</h1>
      <p class="font-bold text-red-500">{{product.general.collection.name}} by {{product.general.brand.name}}</p>
      <p>WebId : {{product.general.webId}}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object
    }
  };
  </script>
  