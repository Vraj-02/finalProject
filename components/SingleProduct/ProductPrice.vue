<template>
    <div>
        <p>
          <span>
            <seasonalSaleTag
                :tags="product.general.tags"
            />
          </span>  
          <span class="text-green-700" v-if="product.general.price.excludePromo"> Special Price</span>
      </p>
      <p class="text-3xl"> ₹{{ product.general.price.finalPrice }}
        
        <span class="text-gray-700 text-xl strike"> ₹{{ product.general.price.msrp }}</span>
        <span class="text-green-700 text-xl ">{{ product.general.price.discount }}% off</span>
        <span class="text-blue-700 text-lg" v-if="product.general.price.priceMatch"> Price Match Guarantee</span>
      </p>
      <ClearanceQuantityTag
            :clearanceQty="product.general.price.clearanceQty"
        />
    </div>
  </template>
  
  <script>

  import seasonalSaleTag from "./tags/seasonalSaleTag.vue"
  
  import ClearanceQuantityTag from "./tags/clearanceQuantityTag.vue";

  export default {

    components: {
        seasonalSaleTag,
        ClearanceQuantityTag
    },
   
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
  