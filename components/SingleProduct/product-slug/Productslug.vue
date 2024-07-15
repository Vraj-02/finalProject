<template>
  <div class="main-container">
    <!-- <ReviewRating /> -->
    <ShippingReturns
      :shippingAndReturn="product.shippingAndReturn"
      :relatedSearch="product.relatedSearch"
      :delivery="product.additional.delivery"
    />
  </div>
</template>

<script>
import ShippingReturns from "./shipping-return/ShippingReturns.vue";
import ReviewRating from "./review-rating/ReviewRating.vue";

export default {
  name: "ProductSlug",
  props: {
    product: Object 
    },
  components: {
    ShippingReturns,
    ReviewRating,
  },
  mounted() {
    console.log("shippingAndReturn index:", this.product.shippingAndReturn);
    console.log("relatedSearch index:", this.product.relatedSearch);
    console.log("delivery index:", this.product.additional.delivery);
  }
};
</script>

<style>
.main-container {
  background-color: #fff;
  width: 1200px;
  margin: 0 auto;
}
</style>
