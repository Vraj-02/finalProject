<template>
    <div>
      <button @click="toggleWeightAndDim" class="underline">
        {{ showWeightAndDim ? 'Hide Weight and Dimensions' : 'Show Weight and Dimensions' }}
      </button>
      <div v-if="showWeightAndDim" class="mt-2">
        <div v-html="formattedWeightAndDim"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object
    },
    data() {
      return {
        showWeightAndDim: false
      };
    },
    computed: {
      formattedWeightAndDim() {
        let weightAndDimHtml = this.product.additional.weightAndDim;
      // Wrap the table rows with <table> and add <hr> between rows
        weightAndDimHtml = weightAndDimHtml.replace(/<\/tr>/g, '</tr><hr>');
        return `<table>${weightAndDimHtml}</table>`;
      }
    },
    methods: {
      toggleWeightAndDim() {
        this.showWeightAndDim = !this.showWeightAndDim;
      }
    }
  };
  </script>
  
  <style scoped>
  .text-blue-500 {
    color: #3B82F6;
  }
  </style>
  