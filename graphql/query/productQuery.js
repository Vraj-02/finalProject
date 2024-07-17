import gql from "graphql-tag";

export const GET_REVIEW_RATING_LIST = gql`
  query getReviewRatingList($slug: String!) {
    products {
      productBySlug(slug: $slug) {
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
    }
  }
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
        review {
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
      }
      }
    }
  
  
`;
