<template>
 <div>
  <TopBar/>
  <div class=" listing mx-auto p-4 flex">
        
    <FilterSidebar
      :filtersBlocks="filtersBlocks"
      :selectedFilters="selectedFilters"
      :handleFilterChange="handleFilterChange"
      :isSelected="isSelected"
    />
  
    
    <div class="w-3/4">
      <h1 class="text-3xl text-center text-white font-bold mb-4 topBar">{{currentCategory}}</h1>

      
      <SortingPagination
        :sortOption="sortOption"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
        :totalPagesArray="totalPagesArray"
        @update:sortOption="updateSortOption"
        @update:itemsPerPage="updateItemsPerPage"
        @update:currentPage="updateCurrentPage"
      />

      
      <AppliedFilters
      :selectedFilters="selectedFilters"
      :filtersBlocks="filtersBlocks"
      :removeFilter="removeFilter"
      />

     
      <ProductListing
      :items="items"
      :itemsCount="itemsCount"
      :loading="loading"
      :error="error"
      :hasMoreItems="hasMoreItems"
      :loadingMore="loadingMore"
      :loadMore="loadMore"
      :get-image-src="getImageSrc" 
    />
    </div>
  </div>
</div>
</template>

<script>
import gql from 'graphql-tag'
import FilterSidebar from '../components/FilterSidebar.vue'
import AppliedFilters from '../components/AppliedFilters.vue'
import SortingPagination from '../components/SortingPagination.vue'
import ProductListing from '../components/ProductListing.vue'
import TopBar from '../components/TopBar.vue'

export default {
  components: {
    FilterSidebar,
    AppliedFilters,
    SortingPagination,
    ProductListing,
    TopBar
  },
  data() {
    return {
      itemsCount: [],
      items: [],
      loading: true,
      loadingMore: false,
      error: null,
      hoveredItem: null,
      currentPage: 1,
      totalPages: 1,
      hasMoreItems: true,
      sortOption: 'RELEVANCE',
      itemsPerPage: 'PER_PAGE_36',
      selectedFilters: {},
      filtersBlocks: [],
      currentCategory: String     
    }
  },
  computed: {
    totalPagesArray() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1)
    },
    categorySlugs() {
      return this.$route.params.category
    }
  },

  watch: {
    '$route.params.category': 'fetchData'
  },
  
  methods: {
    getImageSrc(item) {
      if (this.hoveredItem === item.id && item.images?.hoverImage?.src) {
        return item.images.hoverImage.src
      }
      return item.images?.mainImage?.src || ''
    },
    // /living/living-room-furniture/living-room-sets
    async fetchData(page = 1, append = false) {
      this.loadingMore = true
      try {
        const client = this.$apollo.provider.defaultClient
        const filters = this.buildFiltersArray()
        console.log(String(this.categorySlugs))
        const slugs = String(this.categorySlugs)
        this.currentCategory = slugs
        
        const { data } = await client.query({
          query: gql`
            query($slugs: String!,$page: Int!, $sortBy: catalogSearchFilterSort!, $perPage: catalogSearchResultItemPerPage!, $filters: [catalogSearchFacetInput!]) {
              listing {
                listingCategory(slug: $slugs, request: {
                
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
                      regularPrice
                      msrp
                      discount
                      getSale
                      getExcludePromo
                    }
                    tags {
                      primaryDealTag
                      primaryDealTagVisibility
                      secondaryTag
                      secondaryTagVisibility
                      tertiaryTag
                      tertiaryTagVisibility
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
                      number
                    }
                  }
                }
              }
            }
          `,
          variables: {
            slugs,
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
          this.itemsCount = data.listing.listingCategory.itemsCount
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
      this.loading = true;
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
      this.loading = true;
      await this.fetchData(this.currentPage)
    },
    async handleFilterChange(attrCode, attrValue) {
      this.loading = true;
      if (!this.selectedFilters[attrCode]) {
        this.selectedFilters[attrCode] = [];
      }

      const index = this.selectedFilters[attrCode].indexOf(attrValue);

      if (index === -1) {
        this.selectedFilters[attrCode].push(attrValue);
        // console.log(this.selectedFilters);
      } else {
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
    updateSortOption(newSortOption) {
      this.sortOption = newSortOption;
      this.handleSortChange();
    },
    updateItemsPerPage(newItemsPerPage) {
      this.itemsPerPage = newItemsPerPage;
      this.handleItemsPerPageChange();
    },
    updateCurrentPage(newCurrentPage) {
      this.currentPage = newCurrentPage;
      this.handlePageChange();
    },
  },
  async mounted() {
    await this.fetchData(this.currentPage)
    this.hoveredItem = null;
  }
}
</script>

<style scoped>
body {
  background-color: rgb(27, 3, 121);
  margin: 0%;
}
.container {
  background-color: rgb(27, 3, 121);
}
.listing {
  background-color: rgb(27, 3, 121);
}
</style>






