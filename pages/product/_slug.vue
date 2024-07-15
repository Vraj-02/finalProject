<template>
  <div>
  <TopBar/>
  <div class="container mx-auto py-8">
    
    <div v-if="loading" class="text-center text-gray-600">Loading...</div>
    <div v-else-if="error" class="text-center text-red-600">{{ error.message }}</div>
    <div v-else >
      <div class="flex flex-col md:flex-row">
      <!-- Left half for images -->
      <div class="w-full md:w-1/2">
        <ImageGallery :product="product" :currentImage="currentImage" @update-image="currentImage = $event" />
      </div>
      <!-- Right half for details -->
      <div class="w-full md:w-1/2 pl-0 md:pl-8 mt-4 md:mt-0 rightHalf">
        <ProductNameBrand :product="product" />
        <ProductPrice :product="product" />
        <shippingAdditional :additional="product.additional"/>
        <ProductDescription :product="product" />
        <ProductWeightAndDimensions :product="product" />
        <ProductSpecifications :product="product" />
        <!-- <Reviews :product/> -->     
      </div>
    </div>
    <ProductSlug :product="product" />
    <!-- <Producttest :product="product"/> -->

  </div>
  </div>
</div>
</template>

<script>
import gql from 'graphql-tag';
import TopBar from '@/components/TopBar.vue';
import ImageGallery from '@/components/SingleProduct/ImageGallery.vue';
import ProductNameBrand from '@/components/SingleProduct/ProductNameBrand.vue';
import ProductPrice from '@/components/SingleProduct/ProductPrice.vue';
import ProductDescription from '@/components/singleproduct/ProductDescription.vue';
import ProductWeightAndDimensions from '@/components/singleproduct/ProductWeightAndDimensions.vue';
import shippingAdditional from '@/components/singleproduct/shippingAdditional.vue';
import ProductSpecifications from '@/components/singleproduct/ProductSpecifications.vue';

import Producttest from '@/components/singleproduct/productstest.vue';

import { mapActions } from "vuex";
import ProductSlug from "@/components/singleproduct/product-slug/productslug.vue";

export default {
  components: {
    Producttest,
    TopBar,
    ImageGallery,
    ProductNameBrand,
    ProductPrice,
    ProductDescription,
    ProductWeightAndDimensions,
    shippingAdditional,
    ProductSpecifications,
    ProductSlug
  },
  data() {
    return {
      loading: true,
      error: null,
      product: null,
      currentImage: '',
      slug: this.$route.params.slug,
    };
  },
  created() {
    this.fetchReviewRatingData(this.slug);
    this.fetchShippingReturnData(this.slug);
    this.fetchReviewItemData(this.slug);
  },
  methods: {
    ...mapActions([
      "fetchShippingReturnData",
      "fetchReviewRatingData",
      "fetchReviewItemData",
    ]),


    async fetchData() {
      this.loading = true;
      try {
        const client = this.$apollo.provider.defaultClient;
        const { data } = await client.query({
          query: gql`
            query GetProductBySlug($slug: String!) {
              products {
                productBySlug(slug: $slug) {
                  general {
                    id
                    webId
                    bedTypeId
                    mpn
                    sku
                    masterSku
                    name
                    slug
                    url
                    productType
                    typeId
                    typeGroup
                    labels
                    image {
                      style
                      alt
                      src
                      classes
                      sources {
                        media
                        srcset
                      }
                    }
                    brand {
                      id
                      name
                      slug
                      image {
                        style
                        alt
                        src
                        classes
                        sources {
                          media
                          srcset
                        }
                      }
                      isActive
                      url
                    }
                    collection {
                      id
                      name
                      slug
                    }
                    price {
                      price
                      regularPrice
                      finalPrice
                      msrp
                      relatedCustomPrice
                      totalDiscount
                      youSave
                      selectionPrice
                      discount
                      excludePromo
                      priceMatch
                      priceProtection
                      originalPrice
                      clearanceQty
                      priceValidUntil
                    }
                    tags {
                      primary
                      primaryVisibility
                      secondary
                      secondaryVisibility
                      tertiary
                      tertiaryVisibility
                      banner
                      bannerVisibility
                    }
                    coupon {
                      discount
                      discountType
                      code
                      minPurchase
                    }
                  }
                  gallery {
                    productImages {
                      style
                      alt
                      src
                      classes
                      sources {
                        media
                        srcset
                      }
                    }
                    productThumbImages {
                      style
                      alt
                      src
                      classes
                      sources {
                        media
                        srcset
                      }
                    }
                    youtubeLinks {
                      src  
                    }
                    youtubeThumbLinks {
                      src
                    }
                  }
                  additional {
                      showAffirm
                      showKatapult
                      outOfStock
                      selectionId
                      optionId
                      mattressDesc {
                        comfortLevel
                        thickness
                        type
                        top
                      }
                      desc
                      showDesc
                      specs {
                        name
                        value
                        url
                      }
                      weightAndDim
                      delivery {
                        type
                        method
                        date
                        isFreeShipping
                      }
                      canDisplayMattress
                      canDisplayMattressPopup
                      buildYourOwnEnabled
                      visibility
                      shopMore {
                        key
                        title
                        url
                      }
                      dimensions {
                        height
                        width
                        weight
                        depth
                      }
                      gtin
                      isUseInGoogleFeed
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
              }
            }
          `,
          variables: {
            slug: this.$route.params.slug,
          },
        });

        this.product = data.products.productBySlug;
        console.log(this.product)
        console.log(this.product.shippingAndReturn )
        if (this.product.gallery.productImages.length > 0) {
          this.currentImage = this.product.gallery.productImages[0].src;
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.rightHalf{
  padding-left: 4rem;
  line-height: 2.5;
}

</style>
