<template>
    <div>
      <div class="h-100"> 
        <img :src="currentImage" alt="Product Image" class="w-full h-100 mb-4 border border-gray-300" />
      </div>
      <div class="overflow-x-auto">
        <div class="flex space-x-2">
          <img 
            v-for="image in product.gallery.productImages" 
            :key="image.src" 
            :src="image.src" 
            :alt="image.alt" 
            class="w-24 h-24 object-cover cursor-pointer border border-gray-300"
            @click="$emit('update-image', image.src)"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object,
      currentImage: String
    }
  };
  </script>
  