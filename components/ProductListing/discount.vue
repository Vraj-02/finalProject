<template>
    <div class="tag bg-red-800 text-white" v-if="item.price.getSale">
     🏷 4th july deal
    </div>

    <div class="tag bg-blue-800 text-white" v-else-if="item.price.getExcludePromo">
     📣 10% discount 
      </div>
 
    </template>
    
    <script>
    export default {
      props: {
        item: Object
      },
    }
    </script>