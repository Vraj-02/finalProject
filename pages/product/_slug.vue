<!-- pages/_slug.vue -->
<template>
    
    <div class="container mx-auto py-8">
        <TopBar/>
      <div v-if="loading" class="text-center text-gray-600">Loading...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error.message }}</div>
      <div v-else class="flex flex-col md:flex-row">
        <!-- Left half for images -->
        <div class="w-full md:w-1/2">
           <div class=" h-100"> 
             <img :src="currentImage" alt="Product Image" class="w-full h-100 mb-4 border border-gray-300" />
          </div>
          <div class="overflow-x-auto">
            <div class="flex space-x-2">
              <img 
                v-for="image in product.gallery.productImages" 
                :key="image.src" 
                :src="image.src" 
                :alt="image.alt" 
                class="w-24 h-24 object-cover cursor-pointer border border-gray-300"
                @click="currentImage = image.src"
              />
            </div>
          </div>
        </div>
        <!-- Right half for name and description -->
        <div class="w-full md:w-1/2 pl-0 md:pl-8 mt-4 md:mt-0">
          <h1 class="text-3xl font-bold mb-4">{{ product.general.name }}</h1>
          <p class="font-bold text-red-500">{{product.general.collection.name}} by {{product.general.brand.name}}</p>
          <p>WebId : {{product.general.webId}}</p>
          <span class="text-green-700" v-if="product.general.price.excludePromo"> Special Price</span>
          <p class=" text-3xl"> ₹{{ product.general.price.finalPrice }}
            <span class="text-red-700" v-if="product.general.price.getExcludePromo"> Special Price</span>
            <span class="text-gray-700 text-xl strike" v-else> ₹{{ product.general.price.msrp }}</span>
            <span class="text-green-700 text-xl ">{{ product.general.price.discount }}% off</span>
          </p>

          <!-- <p>{{ product.general.description }}</p> -->
          <!-- Add more details as per your API response -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import gql from 'graphql-tag';
  
  export default {
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
  .strike{
    text-decoration: line-through;
  }
  </style>
  