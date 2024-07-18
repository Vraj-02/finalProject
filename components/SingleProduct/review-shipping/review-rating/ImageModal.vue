<template>
    <div v-if="isVisible" class="modal" @click.self="close">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <img :src="imageSrc" class="modal-image" />
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
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .modal-content {
    position: relative;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .modal-image {
    height: 80vh;
    max-width: 100%;
    
  }
  </style>
  