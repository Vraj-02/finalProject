<template>
  <div class="container">
    <div class="shipping-returns">
      <!-- <template v-if="shippingReturnLoading">
        Loading for shippingReturn Section...
      </template> -->
      <template >
        <Shipping
          :record="shippingAndReturn.shipping"
          :delivery="delivery.date"
        />s

        <Returns :record="shippingAndReturn.return" />

        <div class="related-searches">
          <RelatedSearch :record="relatedSearch" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Shipping from "./Shipping.vue";
import Returns from "./Returns.vue";
import RelatedSearch from "./RelatedSearch.vue";

import { mapState } from "vuex";

export default {
  name: "ShippingReturns",
  props: {
    shippingAndReturn: Object,
    relatedSearch: Array,
    delivery: Object  
    },
  components: {
    Shipping,
    Returns,
    RelatedSearch,
  },
  mounted() {
    console.log("shippingAndReturn:", this.shippingAndReturn);
    console.log("relatedSearch:", this.relatedSearch);
    console.log("delivery:", this.delivery);
  }
  // computed: {
  //   ...mapState({
  //     shippingReturn: (state) => state.shippingReturn.data,
  //     shippingReturnLoading: (state) => state.shippingReturn.loading,
  //   }),
  // },
};
</script>

<style scoped>
.container {
  background-color: #ffffff;
}

.shipping-returns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.related-searches {
  border-top: 1px solid #ddd;
  padding-top: 20px;
}
</style>
