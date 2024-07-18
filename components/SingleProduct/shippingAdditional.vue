<template>
    <div>
        <span v-if="additional.delivery.isFreeShipping">
            📦 Free shiping |
        </span>
        
        <span>
           Ship By {{ additional.delivery.date }}
        </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      additional: Object
    }
  };
  </script>