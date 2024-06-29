<template>
  <div>
    <q-input
      class="q-pb-lg q-pl-md"
      v-model="filter"
      outlined
      placeholder="Search"
      debounce="1000"
      style="width: 500px; max-width: 1500px; min-width: 100px"
      flat
      dense
      rounded
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>

  <div v-else>
    <div v-if="filteredRows.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>

    <q-table
      v-else
      class="table-container"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="productListColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 400px"
    >
      <template v-slot:body-cell-price="props">
        <q-td :props="props" class="cursor-pointer">
          <span>{{ props.row.price }}</span>
          <q-popup-edit
            @update:model-value="(val) => updatedPrice(props.row, val)"
            v-model="props.row.price"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              couonter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td class="q-gutter-x-md" :props="props">
          <!-- <ProductEdit /> -->
          <ProductDelete :delete="props" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import ProductEdit from "./ProductEdit.vue";
import ProductDelete from "./ProductDelete.vue";
import { api } from "src/boot/axios";
import { useBranchProductsStore } from "src/stores/branch-product";
import { Notify } from "quasar";
import { useRoute } from "vue-router";

// const props = defineProps({
//   branchId: {
//     type: Number,
//     required: true,
//   },
// });
const route = useRoute();

const branchId = route.params.branch_id; // Initial logging
const branchProductStore = useBranchProductsStore();
const filter = ref("");
const loading = ref(true);
const branchProducts = ref([]);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const branchProductRows = computed(() => branchProductStore.branchProducts);

const filteredRows = computed(() => {
  if (!filter.value) {
    return branchProductRows.value;
  }
  return branchProductRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  console.log("props.branchId in onMounted:", branchId); // Logging in onMounted
  if (branchId) {
    await reloadTableData(branchId);
  }
});

// watch(
//   () => props.branchId,
//   async (newBranchId) => {
//     console.log("props.branchId in watch:", newBranchId); // Logging in watch
//     if (newBranchId) {
//       await reloadTableData(newBranchId);
//     }
//   }
// );

const reloadTableData = async (branchId) => {
  console.log("Fetching products for branch ID:", branchId); // Logging before API call
  try {
    loading.value = true;
    const response = await branchProductStore.fetchBranchProducts(branchId);
    branchProductRows.value = response;
    if (!branchProductRows.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("Branch product", branchProductRows.value);
  } catch (error) {
    console.log("Error fetching branch product:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDataMessage.value = filteredRows.value.length === 0;
});

async function updatedPrice(data, val) {
  try {
    const response = await api.put("/update-branch-product/" + data.id, {
      price: parseInt(val),
    });
    if (response.status === 200) {
      const i = branchProducts.value.findIndex((item) => item.id == data.id);
      branchProducts.value[i] = parseInt(val);

      Notify.create({
        type: "positive",
        message: response.data.message,
        timout: 1000,
        position: "top",
      });
    }
  } catch (error) {
    console.error("Error updating price:", error);
  }
}

const productListColumns = [
  {
    name: "name",
    label: "Product Name",
    align: "center",
    field: (row) => row.product.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category",
    align: "center",
    label: "Category",
    field: (row) => row.product.category,
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
    sortable: true,
  },
];
</script>

<style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}
</style>
