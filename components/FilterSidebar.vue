<template>
  <div class="w-1/4 pr-4 sideBar">
    <h2 class="text-xl text-white mb-2">Filters</h2>
    <div class="space-y-2  filter-options" v-for="(filterBlock, blockIndex) in filtersBlocks" :key="blockIndex">
      <details>
        <summary>
          <h3 class="text-lg text-white font-bold">{{ filterBlock.title }}</h3>
        </summary>
        <div class="titleBlock">
        <div v-if="filterBlock.title === 'Brand'" class="mb-2">
          <input
            type="text"
            v-model="brandSearch"
            placeholder="Search brands"
            class="w-full p-1 search"
          />
        </div>
        <div v-for="(facet, index) in filterBlock.facets" :key="index" class="flex items-center">
          <input
            type="checkbox"
            :id="`${filterBlock.attrCode}-${index}`"
            :value="facet.attrValue"
            :checked="isSelected(filterBlock.attrCode, facet.attrValue)"
            @change="handleFilterChange(filterBlock.attrCode, facet.attrValue)"
            class="mr-2"
          />
          <label :for="`${filterBlock.attrCode}-${index}`" class="text-white">{{ facet.attrLabel }} ({{ facet.itemCount }})</label>
        </div>
      </div>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filtersBlocks: Array,
    selectedFilters: Object,
    handleFilterChange: Function,
    isSelected: Function,
  },
  data() {
    return {
      brandSearch: "",
    };
  },
  methods: {
     filteredFacets() {
      if (filterBlocks.title === 'Brand'){
      }
        return filtersBlocks;
      }
    },
  watch: {
    brandSearch(newSearch) {
      console.log('brandSearch changed to:', newSearch);
    },   
  }
}
</script>

<style scoped>
.sideBar {
  background-color: rgb(27, 3, 121);
}

.search{
  border-radius: 25px;
}

</style>





