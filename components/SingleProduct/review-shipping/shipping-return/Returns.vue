<template>
  <div class="returns">
    <h3>{{ record.title }}</h3>
    <p>
      {{ record.subtitle }}
      <a :href="record.url" _blank>here</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "Returns",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.returns h3 {
  margin-bottom: 10px;
}

.returns p {
  margin-bottom: 10px;
}

.returns a {
  color: #007bff;
  text-decoration: none;
}

.returns a:hover {
  text-decoration: underline;
}
</style>
