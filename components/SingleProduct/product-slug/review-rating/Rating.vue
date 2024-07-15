<template>
  <div class="review-container">
    <div class="review-title">Reviews & Ratings</div>
    <div class="review-flex">
      <div class="review-header">
        <div class="rating-summary">
          <span class="rating-score">{{ record.rating }}</span>
          <div class="stars">
            <span v-for="n in 5" :key="n" class="star">★</span>
          </div>
          <span class="review-count">{{ record.number }} reviews</span>
        </div>
        <button class="write-review">Write a Review</button>
      </div>

      <div class="review-details">
        <div
          v-for="vote in record.votes"
          :key="vote.voteName"
          class="review-bar"
        >
          <input
            type="checkbox"
            :value="parseInt(vote.voteName)"
            v-model="selectedRatings"
            @change="updateRatings"
          />
          <label>{{ vote.voteName }} <span class="star">★</span></label>
          <div class="bar">
            <div class="fill" :style="{ width: vote.votePercent + '%' }"></div>
          </div>
          <span>{{ vote.voteCount }}</span>
        </div>
      </div>
    </div>

    <hr />
  </div>
</template>

<script>
export default {
  name: "RatingComponent",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedRatings: [], // Array to store selected rating values as integers
    };
  },
  methods: {
    updateRatings() {
      // Commit selected ratings to Vuex store
      this.$store.commit("SET_SELECTED_RATINGS", this.selectedRatings);
      // Fetch updated review data
      this.$store.dispatch("fetchReviewItemData", this.$route.params.slug);
    },
  },
  watch: {
    // Optional: if you need to reactively update the component based on Vuex state changes
    selectedRatings(newRatings) {
      this.updateRatings();
    },
  },
};
</script>

<style scoped>
.review-title {
  font-size: 25px;
  color: black;
  font-weight: 600;
  margin-bottom: 20px;
}

.review-flex {
  display: flex;
  gap: 30px;
}

.review-header {
  display: flex;
  flex-direction: column;
}

.rating-summary {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.rating-score {
  font-size: 48px;
  font-weight: bold;
}

.stars {
  display: flex;
  font-size: 24px;
  color: #de521c;
  margin: 5px 0;
}

.star {
  font-size: 24px;
  color: #de521c;
}

.review-count {
  font-size: 16px;
  color: blue;
  text-decoration: underline;
}

.write-review {
  padding: 10px 25px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
}

.review-details {
  flex: 0.5;
}

.review-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.review-bar label {
  width: 50px;
  margin-left: 10px;
}

.bar {
  flex: 1;
  height: 10px;
  background-color: #f0f0f0;
  margin: 0 10px;
  border-radius: 5px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background-color: #3f51b5;
}
</style>
