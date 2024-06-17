<template>
  <div class="container mx-auto p-4 flex">
    <!-- Filters Sidebar -->
    <div class="w-1/4 pr-4 sideBar">
      <h2 class="text-xl text-white mb-2">Filters</h2>
      <div class="space-y-2" v-for="(filterBlock, blockIndex) in filtersBlocks" :key="blockIndex">
        <details>
          <summary><h3 class="text-lg text-white font-bold">{{ filterBlock.title }}</h3></summary>
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
        </details>
      </div>
    </div>
  
    <!-- Main Content -->
    <div class="w-3/4">
      <h1 class="text-3xl text-center text-white font-bold mb-4 topBar">Product Listing</h1>

      <!-- Sorting and Pagination -->
      <div class="flex justify-center mb-4 space-x-4 topBar">
        <div>
          <label for="sort" class="text-white">Sort by: </label>
          <select id="sort" v-model="sortOption" @change="handleSortChange" class="p-2 rounded">
            <option value="PRICE_FROM_LOW">Price: Low to High</option>
            <option value="PRICE_FROM_HIGHT">Price: High to Low</option>
            <option value="RELEVANCE">Relevance</option>
          </select>
        </div>
        
        <div>
          <label for="itemsPerPage" class="text-white">Items per page: </label>
          <select id="itemsPerPage" v-model="itemsPerPage" @change="handleItemsPerPageChange" class="p-2 rounded">
            <option value="PER_PAGE_36">36</option>
            <option value="PER_PAGE_48">48</option>
            <option value="PER_PAGE_72">72</option>
          </select>
        </div>
        
        <div>
          <label for="pageNumber" class="text-white">Page: </label>
          <select id="pageNumber" v-model="currentPage" @change="handlePageChange" class="p-2 rounded">
            <option v-for="page in totalPagesArray" :key="page" :value="page">{{ page }}</option>
          </select>
        </div>
      </div>

      <!-- Applied Filters -->
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

      <!-- Product Listing  -->
      <div v-if="loading" class="text-center text-white">Loading...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error.message }}</div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="item in items"
            :key="item.id"
            class="product-card p-4 bg-white shadow rounded"
          >
            <img
              :src="getImageSrc(item)"
              :alt="item.images?.mainImage?.alt || 'Product Image'"
              class="w-full h-auto mb-4"
              @mouseover="hoveredItem = item.id"
              @mouseleave="hoveredItem = null"
            />
            <h2 class="text-xl font-semibold">{{ item.name }}</h2>
            <p class="text-gray-700">{{ item.brand.name }}</p>
            <p class="text-green-700">₹{{ item.price.finalPrice }}</p>
            <p class="text-yellow-700">Rating: {{ item.reviews.rating }}</p>
          </div>
        </div>
        <div v-if="hasMoreItems" class="mt-4 flex justify-center">
          <button
            @click="loadMore"
            :disabled="loadingMore"
            class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      items: [],
      loading: true,
      loadingMore: false,
      error: null,
      hoveredItem: null,
      currentPage: 1,
      totalPages: 1,
      hasMoreItems: true,
      sortOption: 'PRICE_FROM_LOW',
      itemsPerPage: 'PER_PAGE_36', 
      selectedFilters: {}, // Selected filters 
      filtersBlocks: [] // Array to store filter blocks and facets
    }
  },
  computed: {
    totalPagesArray() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1)
    }
  },
  methods: {
    getImageSrc(item) {
      if (this.hoveredItem === item.id && item.images?.hoverImage?.src) {
        return item.images.hoverImage.src
      }
      return item.images?.mainImage?.src || ''
    },
    async fetchData(page = 1, append = false) {
      this.loadingMore = true
      try {
        const client = this.$apollo.provider.defaultClient
        const filters = this.buildFiltersArray()
        const { data } = await client.query({
          query: gql`
            query($page: Int!, $sortBy: catalogSearchFilterSort!, $perPage: catalogSearchResultItemPerPage!, $filters: [catalogSearchFacetInput!]) {
              listing {
                listingCategory(slug: "bedroom/beds", request: {
                  page: $page,
                  perPage: $perPage,
                  sortBy: $sortBy,
                  facet: $filters
                }) {
                  itemsCount
                  pages
                  filtersBlock {
                    title
                    attrCode
                    facets {
                      itemCount
                      attrLabel
                      attrValue
                      virtualCategoryLink
                    }
                  }
                  items {
                    id
                    name
                    brand {
                      name
                    }
                    price {
                      finalPrice
                    }
                    images {
                      mainImage {
                        src
                        alt
                      }
                      hoverImage {
                        src
                      }
                    }
                    reviews {
                      rating
                    }
                  }
                }
              }
            }
          `,
          variables: {
            page,
            sortBy: this.sortOption,
            perPage: this.itemsPerPage,
            filters: filters
          }
        })

        console.log("GraphQL Data:", data);

        if (data && data.listing && data.listing.listingCategory) {
          const fetchedItems = data.listing.listingCategory.items || []
          if (append) {
            this.items = [...this.items, ...fetchedItems]
          } else {
            this.items = fetchedItems
          }
          this.filtersBlocks = data.listing.listingCategory.filtersBlock || []
          this.totalPages = data.listing.listingCategory.pages
          this.hasMoreItems = this.currentPage < this.totalPages
        } else {
          this.error = new Error('Invalid data structure')
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loadingMore = false
        this.loading = false
      }
    },
    buildFiltersArray() {
      const filters = []
      for (const [attrCode, values] of Object.entries(this.selectedFilters)) {
        if (values.length > 0) {
          filters.push({ attributeCode: attrCode, value: values })
        }
      }
      return filters
    },
    async loadMore() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1
        await this.fetchData(this.currentPage, true)
      }
    },
    async handleSortChange() {
      this.currentPage = 1
      this.hasMoreItems = true
      await this.fetchData(this.currentPage)
    },
    async handleItemsPerPageChange() {
      this.currentPage = 1
      this.hasMoreItems = true
      await this.fetchData(this.currentPage)
    },
    async handlePageChange() {
      await this.fetchData(this.currentPage)
    },
    async handleFilterChange(attrCode, attrValue) {
        if (!this.selectedFilters[attrCode]) {
          this.selectedFilters[attrCode] = [];
        }

        const index = this.selectedFilters[attrCode].indexOf(attrValue);

        if (index === -1) {
          // Checkbox is checked, add the filter value
          this.selectedFilters[attrCode].push(attrValue);
        } else {
          // Checkbox is unchecked, remove the filter value
          this.selectedFilters[attrCode].splice(index, 1);
        }

        this.currentPage = 1;
        this.hasMoreItems = true;
        await this.fetchData(this.currentPage);
    },
    isSelected(attrCode, attrValue) {
      return this.selectedFilters[attrCode] && this.selectedFilters[attrCode].includes(attrValue)
    },
    async removeFilter(attrCode, attrValue) {
      const index = this.selectedFilters[attrCode].indexOf(attrValue);
      if (index !== -1) {
        this.selectedFilters[attrCode].splice(index, 1);
        this.currentPage = 1;
        this.hasMoreItems = true;
        await this.fetchData(this.currentPage);
      }
    },
    getFilterLabel(attrCode) {
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
  },
  async mounted() {
    await this.fetchData(this.currentPage)
  }
}
</script>


<style scoped>
body {
  background-color: rgb(27, 3, 121);
  margin: 0%;
}

.sideBar,
.topBar {
  background-color: rgb(27, 3, 121);
}
.product-card {
  background-color: rgb(255, 255, 255);
}
.product-card img {
  max-width: 100%;
  height: auto;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.container {
  background-color: rgb(27, 3, 121);
}
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

