<template>
    <div class="thumbnail-container mt-2 flex space-x-2" v-if="dynamicAttributes?.type == 'THUMBNAIL'">
       
      <div
      v-for="(item, index) of dynamicAttributes.items"
      :key="index"
      class="thumbnail-item"
      @mouseenter="hoverProduct(item.webId)"
    >
      <img :src="item.image" :alt="item.image" class="thumbnail-image" />
    </div>
  </div>

  <div class="thumbnail-container mt-2 flex space-x-2" v-else-if="dynamicAttributes?.type == 'SWATCH_THUMBNAIL'">   
    <div
      v-for="(item, index) of dynamicAttributes.items"
      :key="index"
      class="thumbnail-item"
      @mouseenter="hoverProduct(item.webId)"
      >
      <img :src="item.image" :alt="item.image" class="thumbnail-image" />
   </div>
  </div>
 

    <div v-else-if="dynamicAttributes?.type == 'TEXT'">{{dynamicAttributes.count}} {{dynamicAttributes.label}}</div>

    <div v-else-if="dynamicAttributes?.type == 'LAYOUT_TEXT'">{{dynamicAttributes.count}} {{dynamicAttributes.label}}</div>

    <div class="thumbnail-container mt-2 flex space-x-2" v-else-if="dynamicAttributes?.type == 'LAYOUTIMAGE'">   
      <div
        v-for="(item, index) of dynamicAttributes.items"
        :key="index"
        class="thumbnail-item"
        @mouseenter="hoverProduct(item.webId)"
        >
        <img :src="item.image" :alt="item.image" class="thumbnail-image" />
     </div>
    </div>



</template>
  
  <script>
  export default {
    props: {
      dynamicAttributes: Object,
      // item:Array
    },
    methods: {
    hoverProduct(webId) {
      this.$emit("hoverProduct", webId);
    },
  },
  }
  </script>
  
  <style scoped>
  .thumbnail-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .thumbnail-image {
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>
  