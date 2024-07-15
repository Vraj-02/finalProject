import gql from "graphql-tag";

export const SHIPPING_RETURN_FRAGMENT = gql`
  fragment ShippingAndReturnFrag on ProductInterface {
    additional {
      delivery {
        date
      }
    }
    shippingAndReturn {
      shipping {
        title
        subtitle
      }
      return {
        title
        subtitle
        subtitleSlug
        isMattress
        url
        merchantReturnDays
      }
      popupType
      urlShippingDetails
      transitTime {
        minValue
        maxValue
      }
    }
    relatedSearch {
      link
      title
      internalRoute
    }
  }
`;

export const REVIEW_RATING_FRAGEMENT = gql`
  fragment ReviewRatingFrag on ProductInterface {
    review {
      images {
        style
        alt
        src
        classes
        sources {
          media
          srcset
        }
      }
      rating {
        number
        rating
        votes {
          voteName
          voteCount
          votePercent
        }
      }
    }
  }
`;

export const ITEMS_REVIEW = gql`
  fragment ListReview on Review {
    items(
      pageId: $page
      sortMode: $sortMode
      rating: $rating
      searchRequest: $searchRequest
      isJsonLD: false
    ) {
      totalQty
      items {
        id
        author {
          name
        }
        address {
          city
          regionCode
        }
        product {
          name
          url
        }
        text
        date
        summary
        rating
        isVerifiedPurchase
        helpfulCount
        images {
          style
          alt
          src
          classes
          sources {
            media
            srcset
            
          }
        }
      }
    }
  }
`;

export const REVIEW_ITEMS_FRAGEMENT = gql`
  fragment ReviewItemFrag on ProductInterface {
    review {
      ...ListReview
      __typename
    }
    
  }
  ${ITEMS_REVIEW}
`;
