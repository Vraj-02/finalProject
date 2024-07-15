import { GET_SHIPPING_RETURN_LIST, GET_REVIEW_RATING_LIST, GET_REVIEW_ITEMS_LIST } from "~/graphql/query/productQuery.js";

export const state = () => ({
  shippingReturn: {
    data: {},
    loading: false,
    error: null,
  },
  reviewRating: {
    data: { review: { rating: {} } },
    loading: false,
    error: null,
  },
  reviewItem: {
    data: { review: { items: [] } },
    loading: false,
    error: null,
    page: 1,
    sortMode: 'by_most_relevant',
    rating: [],
    searchRequest: ''
  }
});

export const mutations = {
  SET_SHIPPING_RETURN(state, shippingReturn) {
    state.shippingReturn.data = shippingReturn;
  },
  SET_SHIPPING_RETURN_LOADING(state, loading) {
    state.shippingReturn.loading = loading;
  },
  SET_SHIPPING_RETURN_ERROR(state, error) {
    state.shippingReturn.error = error;
  },

  SET_REVIEW_RATING(state, reviewRating) {
    state.reviewRating.data = reviewRating;
  },
  SET_REVIEW_RATING_LOADING(state, loading) {
    state.reviewRating.loading = loading;
  },
  SET_REVIEW_RATING_ERROR(state, error) {
    state.reviewRating.error = error;
  },

  SET_REVIEW_ITEM(state, item) {
    state.reviewItem.data = item;
  },
  SET_REVIEW_ITEM_LOADING(state, loading) {
    state.reviewItem.loading = loading;
  },
  SET_REVIEW_ITEM_ERROR(state, error) {
    state.reviewItem.error = error;
  },

  SET_REVIEW_ITEM_PAGE(state, page) {
    state.reviewItem.page = page;
  },
  SET_REVIEW_ITEM_SORT_MODE(state, sortMode) {
    state.reviewItem.sortMode = sortMode;
  },
  SET_REVIEW_ITEM_RATING(state, rating) {
    state.reviewItem.rating = rating;
  },
  SET_REVIEW_ITEM_SEARCH_REQUEST(state, searchRequest) {
    state.reviewItem.searchRequest = searchRequest;
  },
  APPEND_REVIEW_ITEMS(state, items) {
    items.review.items.items.forEach((item) => {
      state.reviewItem.data.review.items.push(item);
    });
  },
  SET_SELECTED_RATINGS(state, ratings) {
    state.reviewItem.rating = ratings.map(Number);
  },
};

export const actions = {
  async fetchShippingReturnData({ commit }, slug) {
    commit("SET_SHIPPING_RETURN_LOADING", true);
    commit("SET_SHIPPING_RETURN_ERROR", null);
    try {
      const { data } = await this.app.apolloProvider.defaultClient.query({
        query: GET_SHIPPING_RETURN_LIST,
        variables: {
          slug: slug,
        },
      });
      commit("SET_SHIPPING_RETURN", data.products.productBySlug);
    } catch (err) {
      console.log("Error fetching data: ", err);
      commit("SET_SHIPPING_RETURN_ERROR", err);
    } finally {
      commit("SET_SHIPPING_RETURN_LOADING", false);
    }
  },

  async fetchReviewRatingData({ commit }, slug) {
    commit("SET_REVIEW_RATING_LOADING", true);
    commit("SET_REVIEW_RATING_ERROR", null);
    try {
      const { data } = await this.app.apolloProvider.defaultClient.query({
        query: GET_REVIEW_RATING_LIST,
        variables: {
          slug: slug,
        },
      });
      console.log("Fetched review rating data: ", data);
      commit("SET_REVIEW_RATING", data.products.productBySlug);
    } catch (err) {
      console.log("Error fetching data: ", err);
      commit("SET_REVIEW_RATING_ERROR", err);
    } finally {
      commit("SET_REVIEW_RATING_LOADING", false);
    }
  },

  async fetchReviewItemData({ commit, state }, slug) {
    commit("SET_REVIEW_ITEM_LOADING", true);
    commit("SET_REVIEW_ITEM_ERROR", null);
    try {
      const { data } = await this.app.apolloProvider.defaultClient.query({
        query: GET_REVIEW_ITEMS_LIST,
        variables: {
          slug: slug,
          page: state.reviewItem.page,
          sortMode: state.reviewItem.sortMode,
          rating: state.reviewItem.rating,
          searchRequest: state.reviewItem.searchRequest,
        },
      });
      if (state.reviewItem.page === 1) {
        commit("SET_REVIEW_ITEM", data.products.productBySlug);
      } else {
        commit("APPEND_REVIEW_ITEMS", data.products.productBySlug);
      }
    } catch (err) {
      console.log("Error fetching data: ", err);
      commit("SET_REVIEW_ITEM_ERROR", err);
    } finally {
      commit("SET_REVIEW_ITEM_LOADING", false);
    }
  },
};
