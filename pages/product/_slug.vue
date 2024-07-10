<template>
  <div>
  <TopBar/>
  <div class="container mx-auto py-8">
    
    <div v-if="loading" class="text-center text-gray-600">Loading...</div>
    <div v-else-if="error" class="text-center text-red-600">{{ error.message }}</div>
    <div v-else class="flex flex-col md:flex-row">
      <!-- Left half for images -->
      <div class="w-full md:w-1/2">
        <ImageGallery :product="product" :currentImage="currentImage" @update-image="currentImage = $event" />
      </div>
      <!-- Right half for details -->
      <div class="w-full md:w-1/2 pl-0 md:pl-8 mt-4 md:mt-0 rightHalf">
        <ProductNameBrand :product="product" />
        <ProductPrice :product="product" />
      </div>
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

export default {
  components: {
    TopBar,
    ImageGallery,
    ProductNameBrand,
    ProductPrice
  },
  data() {
    return {
      loading: true,
      error: null,
      product: null,
      currentImage: '',
    };
  },
  methods: {
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
}
</style>
