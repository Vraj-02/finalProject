  <template>
    <div>
      <!-- <h2 class="text-xl font-bold mb-2">Specifications</h2> -->
      <button @click="toggleSpecifications" class=" underline mb-2">
        {{ showSpecifications ? 'Hide Specifications' : 'Show Specifications' }}
      </button>
      <div v-if="showSpecifications" class="overflow-x-auto">
        <table class="table-auto border border-gray-300">
          <tbody>
            <tr v-for="(spec, index) in product.additional.specs" :key="index">
              <td class="font-bold border px-4 py-2">{{ spec.name }}</td>
              <td class="border px-4 py-2">{{ spec.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object
    },
    data() {
      return {
        showSpecifications: false
      };
    },
    methods: {
      toggleSpecifications() {
        this.showSpecifications = !this.showSpecifications;
      }
    }
  };
  </script>
  
  <style scoped>
  .table-auto {
    width: 100%;
  }
  </style>
  