<template>
    <div class="top-bar flex items-center justify-between p-4 bg-blue-500 text-white">
      <div class="logo text-2xl font-bold">
        <img src="https://www.1stopbedrooms.com/_nuxt/img/logo-white-167x57.e92b71e.svg">
      </div>
      <nav class="nav-links flex space-x-4">
        <a href="#" class="hover:underline">Account</a>
        <a href="#" class="hover:underline">Wishlist</a>
        <a href="#" class="hover:underline">Cart</a>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TopBar'
  }
  </script>
  
  <style scoped>
  .top-bar {
    background-color: rgb(27, 3, 121); /* Blue color */
    border-bottom: 0.5rem solid white;
  }
  </style>
  