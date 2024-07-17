<template>
  <div>
    <template v-if="reviewRatingLoading">
      Loading for reviewRating...
    </template>
    <template v-else>
      <Rating :record="reviewRating?.review?.rating ?? {}" />
    </template>

    <template v-if="reviewItemLoading">
      Loading for reviewItem...
    </template>
    <template v-else>
      <ReviewItem :record="reviewItem?.review?.items ?? { items: [] }" />
    </template>
  </div>
</template>

<script>
import Rating from "./Rating.vue";
import ReviewItem from "./ReviewItem.vue";
import { mapState } from "vuex";

export default {
  name: "ReviewRating",
  components: {
    Rating,
    ReviewItem,
  },
  computed: {
    ...mapState({
      reviewRating: (state) => state.reviewRating.data,
      reviewRatingLoading: (state) => state.reviewRating.loading,
      reviewItem: (state) => state.reviewItem.data,
      reviewItemLoading: (state) => state.reviewItem.loading,
    }),
  },
  watch: {
    reviewRating(newVal) {
      console.log("reviewRating changed:", newVal);
      if (newVal && newVal.review) {
        console.log(newVal.review);
      } else {
        console.log("reviewRating or reviewRating.review is undefined");
      }
    }
  },
  created() {
    console.log("Initial reviewRating:", this.reviewRating);
    if (this.reviewRating && this.reviewRating.review) {
      console.log(this.reviewRating.review);
    } else {
      console.log("Initial reviewRating or reviewRating.review is undefined");
    }
  }
};
</script>

<style scoped></style>
