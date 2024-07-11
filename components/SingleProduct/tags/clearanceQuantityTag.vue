<template>
    <div class="tagbg" v-if="clearanceQty>0">
        🛈 Only {{ clearanceQty }} left at this price   !
    </div>
      
  </template>
  
  <script>
  export default {
    props: {
        clearanceQty: Number
    }
  };
  </script>
<style>
.tagbg{
    margin: 1%;
    margin-top: 3%;
    padding: 1%;
    background-color: rgb(232, 203, 168);
    width:fit-content ;
    border-radius: 5px;
}
</style>