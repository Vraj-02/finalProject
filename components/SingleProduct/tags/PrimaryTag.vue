<template>
    <div class="tag text-white tagWidth" v-if="tags.primary =='Seasonal Sale'">
        🏷 4th july deal 
    </div>

    <div class="tag text-white clearancetag" v-else-if="tags.primary =='Clearance'">
      Clearance 
    </div>

    <div class="tag text-white Dailydealtag" v-else-if="tags.primary =='Daily Deal'">
      Daily deal 
  </div>


      
  </template>
  
  <script>
  export default {
    props: {
      tags: Object
    }
  };
  </script>
<style>
.tagWidth{
    background-color: rgb(213, 8, 8);
    width: fit-content;
    display: inline;
    margin: 1%;
}

.clearancetag{
    background-color: rgb(213, 141, 8);
    width: fit-content;
    display: inline;
    margin: 1%;  
}

.Dailydealtag{
    background-color: rgb(7, 20, 134);
    width: fit-content;
    display: inline;
    margin: 1%;
}
</style>  