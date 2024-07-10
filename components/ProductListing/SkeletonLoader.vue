
<template>
    <div class="skeleton-loader">
      <div class="skeleton-image"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
      <div class="skeleton-price"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SkeletonLoader"
  }
  </script>
  
  <style scoped>
  .skeleton-loader {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #f2f2f2;
    padding: 16px;
    border-radius: 8px;
  }
  
  .skeleton-image {
    width: 100%;
    height: 200px;
    background-color: #e0e0e0;
    border-radius: 8px;
  }
  
  .skeleton-text {
    width: 100%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
  }
  
  .skeleton-text.short {
    width: 60%;
  }
  
  .skeleton-price {
    width: 40%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
  }
  </style>
  





   
