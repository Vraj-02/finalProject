<template>
  <div>
    <h3>Related Searches</h3>
    <div v-for="(item, index) of record" :key="index">
      <a class="items" :href="item.link">{{ item.title }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RelatedSearch",
  props: {
    record: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.items {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.related-searches h3 {
  margin-bottom: 10px;
}

.related-searches a {
  display: inline-block;
  margin-right: 10px;
  padding: 8px 15px;
  background-color: #e0e0e0;
  color: #333;
  border-radius: 5px;
  text-decoration: none;
}

.related-searches a:hover {
  background-color: #d4d4d4;
}
</style>
