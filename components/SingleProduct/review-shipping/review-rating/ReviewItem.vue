<template>
  <div class="reviews-container">
    <div class="search-sort">
      <input
        type="text"
        placeholder="Search Reviews"
        class="search-bar"
        v-model="searchRequest"
      />
      <button class="search-button" @click="fetchReviews"> 🔍</button>
    </div>
    <div class="review-header-flex">
      <div class="review-count">Showing {{ reviewRange }}</div>
      <select class="sort-select" v-model="sortMode" @change="fetchReviews">
        <option value="by_most_relevant">Most Relevant</option>
        <option value="by_date">Latest</option>
        <option value="by_rating_desc">Highest Rating</option>
        <option value="by_rating_asc">Lowest Rating</option>
        <option value="by_helpful">Most Helpful</option>
      </select>
    </div>

    <div v-if="record.items.length > 0" class="review-list">
      <div class="review-item" v-for="review in record.items" :key="review.id">
        <div class="review-list-flex">
          <div class="review-header">
            <h3>{{ review.author && review.author.name }}</h3>
            <span class="location">
              {{ review.address && review.address.city }},
              {{ review.address && review.address.regionCode }}
            </span>
            <div class="review-body">
              <div class="review-rating">
                <span class="star" v-for="n in review.rating" :key="n">★</span>
              </div>
            </div>
            <span class="verified-purchase">VERIFIED PURCHASE</span>
          </div>

          <div>
            <p>{{ review.text }}</p>
            <div class="review-date">{{ review.date }}</div>
            <div class="review-product">
              Reviewed on:
              <a :href="review.productLink">{{
                review.product && review.product.name
              }}</a>
              <div class="review-images">
                <img
                  v-for="image in review.images"
                  :src="image.src"
                  
                  class="review-image"
                  :key="image.src"
                />
              </div>
            </div>
          </div>

          <div>
            <button class="helpful-button">Helpful</button>
          </div>
        </div>
      </div>
      <div
        v-if="record.items.length < record.totalQty"
        @click="showMoreReviews"
        class="show-more-reviews"
      >
        Show More Reviews
      </div>
    </div>
    <div v-else>
      Sorry. We couldn’t find any results Try checking your spelling or use more
      general terms.
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewItem",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      searchRequest: "",
      sortMode: this.$store.state.reviewItem.sortMode,
    };
  },
  computed: {
    reviewRange() {
      const itemCount = this.record.items.length;
      if (itemCount === 0) {
        return '0 reviews';
      }
      const start = 1;
      const end = itemCount;
      return `${start}-${end} of ${this.record.totalQty} reviews`;
    },
  },
  methods: {
    fetchReviews() {
      this.$store.commit("SET_REVIEW_ITEM_SEARCH_REQUEST", this.searchRequest);
      this.$store.commit("SET_REVIEW_ITEM_SORT_MODE", this.sortMode);
      this.$store.commit("SET_REVIEW_ITEM_PAGE", 1);
      this.$store.dispatch("fetchReviewItemData", this.$route.params.slug);
    },
    showMoreReviews() {
      this.$store.commit(
        "SET_REVIEW_ITEM_PAGE",
        this.$store.state.reviewItem.page + 1
      );
      this.$store.dispatch("fetchReviewItemData", this.$route.params.slug);
    },
  },
  watch: {
    sortMode() {
      this.fetchReviews();
    },
  },
};
</script>

<style scoped>
.review-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-list-flex {
  display: flex;
  align-items: start;
}

.reviews-container {
  padding: 20px;
  background-color: #fff;
}

.search-sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.search-button {
  padding: 10px 20px;
  border: none;
  background-color: #3f51b5;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #2c387e;
}

.sort-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.review-list {
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
}

.review-count {
  margin-bottom: 20px;
}

.review-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.review-header h3 {
  margin: 0;
}

.location {
  font-size: 14px;
  color: #777;
}

.verified-purchase {
  font-size: 12px;
  color: #777;
}

.review-body {
  margin-bottom: 10px;
}

.review-rating {
  color: #ff9800;
}

.review-rating .star {
  margin-right: 2px;
}

.review-date {
  font-size: 12px;
  color: #777;
}

.review-product {
  font-size: 14px;
}

.review-product a {
  color: #3f51b5;
  text-decoration: none;
}

.review-product a:hover {
  text-decoration: underline;
}

.helpful-button {
  padding: 5px 10px;
  background-color: #fff;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 5px;
  cursor: pointer;
}

.helpful-button:hover {
  background-color: #3f51b5;
  color: #fff;
}

.show-more-reviews{
  cursor: pointer;
}

.show-more-reviews:hover{
  text-decoration: underline;
}

.review-images {
  display: flex;
  margin-top: 10px;
}

.review-image {
  width: 80px; /* Adjust the width as needed */
  height: 80px; /* Adjust the height as needed */
  object-fit: cover;
  margin-right: 5px;
  border-radius: 5px;
}
</style>
