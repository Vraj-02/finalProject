<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <img :src="imageSrc" class="modal-image" />
        <div class="thumbnail-row">
          <img
            v-for="image in images"
            :src="image.src"
            :key="image.src"
            class="thumbnail"
            @click="selectImage(image.src)"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      imageSrc: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
      selectImage(imageSrc) {
        this.$emit('image-selected', imageSrc);
      }
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
  }
  
  .modal-image {
    max-width: 100%;
    height: 80vh;
    margin-bottom: 20px;
  }
  
  .thumbnail-row {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    cursor: pointer;
    border: 2px solid transparent;
  }
  
  .thumbnail:hover {
    border: 2px solid #3f51b5;
  }
  </style>
  