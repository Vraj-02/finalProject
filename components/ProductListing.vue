<template>
  <div>
    <span class="text-white">Items: {{ itemsCount }}</span>
    <div v-if="loading" class="text-center text-white  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Loading... -->
      <SkeletonLoader v-for="n in 6" :key="n" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error.message }}</div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in items" :key="item.id" class="product-card p-4 bg-white shadow rounded relative">
          
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
            
          </div>
          <h2 class="text-xl font-semibold">{{ item.name }}</h2>
          <p class="text-gray-700">{{ item.brand.name }}</p>
          <p class="text-green-700"> ₹{{ item.price.finalPrice }}
          <span class="text-red-700" v-if="item.price.getExcludePromo"> Special Price</span>
          <span class="text-green-700 strike" v-else> ₹{{ item.price.msrp }}</span>
          </p>

        <ProductReviews :reviews="item.reviews" />
        </div>
      </div>
      <div v-if="hasMoreItems" class="mt-4 flex justify-center">
        <button @click="loadMore" :disabled="loadingMore" class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTags from "./ProductTags.vue";
import ProductReviews from "./ProductReviews.vue";
import SkeletonLoader from "./SkeletonLoader.vue";

export default {
  
  components: {
    ProductTags,
    ProductReviews,
    SkeletonLoader
  },
  
  props: {
    items: Array,
    loading: Boolean,
    error: Object,
    hasMoreItems: Boolean,
    loadingMore: Boolean,
    loadMore: Function,
    itemsCount: Array
  },
  data() {
    return {
      hoveredItem: null
    }
  },
  methods: {
  
    getImageSrc(item) {
      if (this.hoveredItem === item.id && item.images?.hoverImage?.src) {
        return item.images.hoverImage.src;
      }
      return item.images?.mainImage?.src || '';
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
</style>




<!-- ============================================================================================================================= -->
<!-- ============================================================================================================================= -->










