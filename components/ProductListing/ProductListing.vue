
<template>
  <div>
    <span class="text-white">Items: {{ itemsCount }}</span>
    <div v-if="loading" class="text-center text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SkeletonLoader v-for="n in 6" :key="n" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error.message }}</div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
        <ProductDetails
          v-for="item in items"
          :key="item.id"
          :item="item"
          :dynamicItem="item" 
          @click.native="goToProductDetails(item.slug)"      
        />
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
import ProductDetails from "./ProductDetails.vue";
import SkeletonLoader from "./SkeletonLoader.vue";

export default {
  components: {
    ProductDetails,
    SkeletonLoader,
  },
  props: {
    items: Array,
    loading: Boolean,
    error: Object,
    hasMoreItems: Boolean,
    loadingMore: Boolean,
    loadMore: Function,
    itemsCount: Number
  },
  methods: {
    goToProductDetails(slug) {
     console.log('Navigating to product with slug:', slug); 
      this.$router.push({ name: 'product-details', params: { slug } });
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>






<!-- ============================================================================================================================= -->
<!-- ============================================================================================================================= -->



<!-- <template>
  <div>
    <span class="text-white">Items: {{ itemsCount }}</span>
    <div v-if="loading" class="text-center text-white  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
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


           <template v-if="item.dynamicAttribute">
            <div class="thumbnail-container mt-2 flex space-x-2" v-if="item.dynamicAttribute?.items">
              <img
                v-for="(thumb, index) in item.dynamicAttribute.items"
                :key="index"
                :src="thumb.image"
                alt="Thumbnail"
                class="thumbnail cursor-pointer w-16 h-16 object-cover border border-gray-300 rounded"
                @click="changeMainImage(item.id, thumb.image)"
              />
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
        <discount :item="item"/>
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
import discount from "./discount.vue";

export default {
  
  components: {
    ProductTags,
    ProductReviews,
    SkeletonLoader,
    discount
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
      hoveredItem: null,
      displayItem: this.items,
      currentMainImages: {},
      
    }
  },
  methods: {
  
    getImageSrc(item) {
      // console.log(this.items[0].dynamicAttribute.items)
      if (this.hoveredItem === item.id && item.images?.hoverImage?.src) {
        return item.images.hoverImage.src;
      }
      return item.images?.mainImage?.src || '';
    },
    // handleThumbnailHover(webId) {
    //   console.log(webId);
    //   const hoveredProduct = this.items.items.find(
    //     (item) => item.webId == webId
    //   );
    //   if (hoveredProduct) {
    //     console.log(hoveredProduct);
    //     this.item = hoveredProduct;
    //   }
    // },
    handleThumbnailHover(webId) {
          console.log(webId);
          console.log(this.item);
          // console.log(this.item.items);
          // Check if 'this.items' and 'this.items.items' are defined
          // if (this.item.items && Array.isArray(this.item.items)) {
          //   console.log("finding:",webId)
          //     const hoveredProduct = this.item.items.find(
          //         (item) => item.webId == webId
          //     );
              
          //     if (hoveredProduct) {
          //         console.log("found : ",hoveredProduct);
          //         this.item = hoveredProduct;
          //     } else {
          //         console.warn(`No item found with webId: ${webId}`);
          //     }
          // } else {
          //     console.error("this.items or this.items.items is undefined or not an array");
          // }
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

 -->





