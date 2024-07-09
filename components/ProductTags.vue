
<template>
  <div v-if="item.tags">
    <!-- <template v-if="item.tags.primaryDealTag !== ''">
      <div class="tag bg-blue-700 text-white">{{ item.tags.primaryDealTag }}</div>
    </template> -->
    <template v-if="item.tags.primaryDealTag === 'daily_deal'">
      <div class="tag bg-blue-700 text-orange">{{ item.tags.primaryDealTag }}</div>
    </template>
    <template v-else-if="item.tags.primaryDealTag === 'clearance'">
      <div class="tag bg-orange-500 text-white">{{ item.tags.primaryDealTag }}</div>
    </template>
    <template v-if="item.tags.secondaryTagVisibility">
      <div class="tag bg-orange-500 text-white">{{ item.tags.secondaryTag }}</div>
    </template>
    <template v-if="item.tags.tertiaryTagVisibility">
      <div class="tag bg-orange-500 text-white">{{ item.tags.tertiaryTag }}</div>
    </template>
  </div>

 
  
  </template>
  
  <script>
  export default {
    props: {
      item: Object
    },
  }
  </script>
  
  <style scoped>
  .tag {
    display: inline-block;
    padding: 4px 8px;
    margin-right: 8px;
    border-radius: 4px;
    font-size: 0.875rem; 
    font-weight: bold;
    z-index: 20;
  }
  
  .bg-orange-500 {
    background-color: #f59e0b; 
    color: white; 
  }
  </style>
  