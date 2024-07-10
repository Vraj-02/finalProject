<template>
    <div class="flex justify-center mb-4 space-x-4 topBar">
      <div>
        <label for="sort" class="text-white">Sort by: </label>
        <select id="sort" v-model="localSortOption" @change="emitSortChange" class="p-2 rounded">
          <option value="RELEVANCE">Relevance</option>
          <option value="PRICE_FROM_LOW">Price: Low to High</option>
          <option value="PRICE_FROM_HIGHT">Price: High to Low</option>
          
        </select>
      </div>
  
      <div>
        <label for="itemsPerPage" class="text-white">Items per page: </label>
        <select id="itemsPerPage" v-model="localItemsPerPage" @change="emitItemsPerPageChange" class="p-2 rounded">
          <option value="PER_PAGE_36">36</option>
          <option value="PER_PAGE_48">48</option>
          <option value="PER_PAGE_72">72</option>
        </select>
      </div>
  
      <div>
        <label for="pageNumber" class="text-white">Page: </label>
        <select id="pageNumber" v-model="localCurrentPage" @change="emitPageChange" class="p-2 rounded">
          <option v-for="page in totalPagesArray" :key="page" :value="page">{{ page }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sortOption: String,
      itemsPerPage: String,
      currentPage: Number,
      totalPagesArray: Array,
    },
    data() {
      return {
        localSortOption: this.sortOption,
        localItemsPerPage: this.itemsPerPage,
        localCurrentPage: this.currentPage,
      }
    },
    watch: {
      sortOption(newVal) {
        this.localSortOption = newVal;
      },
      itemsPerPage(newVal) {
        this.localItemsPerPage = newVal;
      },
      currentPage(newVal) {
        this.localCurrentPage = newVal;
      }
    },
    methods: {
      emitSortChange() {
        this.$emit('update:sortOption', this.localSortOption);
      },
      emitItemsPerPageChange() {
        this.$emit('update:itemsPerPage', this.localItemsPerPage);
      },
      emitPageChange() {
        this.$emit('update:currentPage', this.localCurrentPage);
      }
    }
  }
  </script>
  
  <style scoped>
  .topBar {
    background-color: rgb(27, 3, 121);
  }
  </style>

  