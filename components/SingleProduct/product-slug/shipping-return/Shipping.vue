<template>
  <div class="shipping">
    <h2>Shipping & Returns</h2>
    <p>
      <strong>Ships by {{ delivery }}</strong>
    </p>
    <div class="delivery-options">
      <h3>Delivery Options</h3>

      <div v-for="(item, index) of record" :key="index">
        <div>{{ item.title }}</div>
        <div>{{ item.subtitle }}</div>
      </div>

      <a href="#">More About Our Delivery Process</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shipping",
  props: {
    record: {
      type: Array,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.shipping h2 {
  margin-bottom: 10px;
}

.shipping strong {
  display: block;
  margin-bottom: 20px;
}

.delivery-options h3 {
  margin-bottom: 10px;
}

.delivery-options p {
  margin-bottom: 10px;
}

.delivery-options a {
  color: #007bff;
  text-decoration: none;
}

.delivery-options a:hover {
  text-decoration: underline;
}
</style>
