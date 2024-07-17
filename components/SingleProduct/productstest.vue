<template>
    <div class="main-container">   
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductSlug",
    props: {
      product: Object 
      },
    mounted() {
        console.log("hello",this.product).
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
  