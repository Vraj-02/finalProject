<template>
    <div class="product-card p-4 bg-white shadow rounded relative">
      <div class="relative">
        <img
          :src="getImageSrc(item)"
          :alt="item.images?.mainImage?.alt || 'Product Image'"
          class="w-full h-auto mb-4"
          @mouseover="hoveredItem = item.id"
          @mouseleave="hoveredItem = null"
        />
        <img
          v-if="item.images?.hoverImage?.src && hoveredItem === item.id"
          :src="item.images.hoverImage.src"
          :alt="item.images?.mainImage?.alt || 'Product Image'"
          class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-0"
          style="z-index: -1;"
        />
        <template v-if="item.tags">
          <div class="absolute top-0 left-0 mt-2 ml-2">
            <ProductTags :item="item" />
          </div>
        </template>
        <DynamicAttributes
          :dynamicAttributes="item.dynamicAttribute"
          @hoverProduct="handleThumbnailHover"
        />
      </div>
      <h2 class="text-xl font-semibold">{{ item.name }}</h2>
      <p class="text-gray-700">{{ item.brand.name }}</p>
      <p class="text-green-700"> ₹{{ item.price.finalPrice }}
        <span class="text-red-700" v-if="item.price.getExcludePromo"> Special Price</span>
        <span class="text-green-700 strike" v-else> ₹{{ item.price.msrp }}</span>
      </p>
      <discount :item="item" />
      <ProductReviews :reviews="item.reviews" />
    </div>
  </template>
  
  <script>
  import ProductTags from "./ProductTags.vue";
  import ProductReviews from "./ProductReviews.vue";
  import DynamicAttributes from "./DynamicAttributes.vue";
  import discount from "./discount.vue";
  
  export default {
    components: {
      ProductTags,
      ProductReviews,
      DynamicAttributes,
      discount
    },
    props: {
      item: Object,
    },
    data() {
      return {
        hoveredItem: null,
      }
    },
    methods: {
      getImageSrc(item) {
        if (this.hoveredItem === item.id && item.images?.hoverImage?.src) {
          return item.images.hoverImage.src;
        }
        return item.images?.mainImage?.src || '';
      },
      handleThumbnailHover(webId) {
          console.log(webId);
          console.log(this.item);
          console.log(this.item.items);
        //   Check if 'this.items' and 'this.items.items' are defined
          if (this.item.items && Array.isArray(this.item.items)) {
            console.log("finding:",webId)
              const hoveredProduct = this.item.items.find(
                  (item) => item.webId == webId
              );
              
              if (hoveredProduct) {
                  console.log("found : ",hoveredProduct);
                  this.item = hoveredProduct;
              } else {
                  console.warn(`No item found with webId: ${webId}`);
              }
          } else {
              console.error("this.items or this.items.items is undefined or not an array");
          }
      }
    }
  }
  </script>
  
  <style scoped>
  .product-card {
    background-color: rgb(255, 255, 255);
    position: relative;
  }
  .product-card img {
    max-width: 100%;
    height: auto;
  }
  .strike{
    text-decoration: line-through;
  }
  
  .tag {
    display: inline-block;
    padding: 4px 8px;
    margin-right: 8px;
    border-radius: 4px;
    font-size: 0.875rem; 
    font-weight: bold;
    z-index: 20;
  }
  
  .product-card img.absolute {
    z-index: 0; 
  }
  
  .bg-orange-500 {
    background-color: #f59e0b; 
    color: white; 
  }
  
  .absolute {
    position: absolute; 
    top: 0;
    left: 0;
    z-index: 10; 
  }
  
  .transition-opacity {
    transition: opacity 0.3s ease-in-out;
  }
  
  .thumbnail-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .thumbnail {
    cursor: pointer;
    width: 64px;
    height: 64px;
    object-fit: cover;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>
  








  