
<template>
<div class="mb-4">
  <div v-if="Object.keys(selectedFilters).length" class="applied-filters">
    <h3 class="text-white">Applied Filters:</h3>
    <div class="flex flex-wrap space-x-2">
      <div
        v-for="(values, attrCode) in selectedFilters"
        :key="attrCode"
        v-if="values.length"
        class="applied-filter-box"
      >
        <h4 class="text-white">{{ getFilterLabel(attrCode) }}</h4>
        <div v-for="value in values" :key="value" class="applied-filter text-white bg-blue-500 rounded p-2 flex items-center">
          <span>{{ getFacetLabel(attrCode, value) }}</span>
          <button @click="removeFilter(attrCode, value)" class="ml-2 text-white">✕</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    selectedFilters: Object,
    filtersBlocks: Array,
    removeFilter: Function
  },
  methods: {
    getFilterLabel(attrCode) {
      // console.log("selected filters",this.selectedFilters)
      const filterBlock = this.filtersBlocks.find(block => block.attrCode === attrCode);
      return filterBlock ? filterBlock.title : attrCode;
    },
    getFacetLabel(attrCode, attrValue) {
      const filterBlock = this.filtersBlocks.find(block => block.attrCode === attrCode);
      if (filterBlock) {
        const facet = filterBlock.facets.find(facet => facet.attrValue === attrValue);
        return facet ? facet.attrLabel : attrValue;
      }
      return attrValue;
    }
  }
}
</script>

<style scoped>
.applied-filters {
  margin-top: 1rem;
}
.applied-filter-box {
  background-color: #1c4b82;
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
}
.applied-filter {
  background-color: #3182ce;
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  display: flex;
  align-items: center;
}
.applied-filter button {
  margin-left: 0.5rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}
.applied-filter button:hover {
  color: #ff0000;
}
</style>

<!-- <template>
  <h1>hi</h1>
</template> -->






