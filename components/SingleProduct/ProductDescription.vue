<template>
    <div>
      <button @click="toggleDescription" class=" underline desc">
        {{ showDescription ? 'Hide Details & Overview' : 'Show Details & Overview' }}
      </button>
      <div v-if="showDescription" class="mt-2">
        <div v-html="formattedDescription"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object
    },
    computed: {
    formattedDescription() {
      
    let descriptionHtml = this.product.additional.desc.replace(/\n/g, '<br>');

      descriptionHtml = descriptionHtml.replace(/<li>/g, '<li class="list-disc">');
      descriptionHtml = `<ul>${descriptionHtml}</ul>`;

      return descriptionHtml;
    }
  },
    data() {
      return {
        showDescription: false
      };
    },
    methods: {
      toggleDescription() {
        this.showDescription = !this.showDescription;
      }
    }
  };

  </script>

  <style>
.desc{
    line-height: 1;
}
 </style>
  