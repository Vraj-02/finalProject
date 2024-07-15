import gql from "graphql-tag";
import {
  REVIEW_ITEMS_FRAGEMENT,
  REVIEW_RATING_FRAGEMENT,
  SHIPPING_RETURN_FRAGMENT,
} from "../fragments/productInterface";

export const GET_SHIPPING_RETURN_LIST = gql`
  query getShippingList($slug: String!) {
    products {
      productBySlug(slug: $slug) {
        ...ShippingAndReturnFrag
        __typename
      }
    }
  }
  ${SHIPPING_RETURN_FRAGMENT}
`;

export const GET_REVIEW_RATING_LIST = gql`
  query getReviewRatingList($slug: String!) {
    products {
      productBySlug(slug: $slug) {
        ...ReviewRatingFrag
        __typename
      }
    }
  }
  ${REVIEW_RATING_FRAGEMENT}
`;

export const GET_REVIEW_ITEMS_LIST = gql`
  query getReviewItemsList(
    $slug: String!
    $page: Int
    $sortMode: ProductReviewSortModeEnum
    $rating: [Int]
    $searchRequest: String
  ) {
    products {
      productBySlug(slug: $slug) {
        ...ReviewItemFrag
        __typename
      }
    }
  }
  ${REVIEW_ITEMS_FRAGEMENT}
`;
