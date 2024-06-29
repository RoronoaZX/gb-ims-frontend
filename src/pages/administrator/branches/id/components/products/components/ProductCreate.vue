<template>
  <q-btn
    outline
    class="text-dark q-pa-sm"
    push
    dense
    elevated
    icon="add_circle"
    label="Create Product"
    @click="open_create_bread_dialog"
  />
  <q-dialog v-model="dialog" persistent>
    <q-card
      class="my-card"
      style="width: 400px; max-width: 500px; min-width: 100px"
    >
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Create Branch Product</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-ma-md q-gutter-y-sm">
        <div class="q-mb-lg">
          <q-input
            v-model="searchQuery"
            @update:model-value="search"
            debounce="1000"
            outlined
            rounded
            placeholder="Search product"
            dense
          >
            <template v-slot:append>
              <div>
                <q-icon name="search" />
              </div>
            </template>
            <div v-if="searchQuery" class="custom-list z-top">
              <q-card>
                <q-list separator>
                  <q-item v-if="!productData?.length">
                    No record found.
                  </q-item>
                  <template v-else>
                    <q-item
                      @click="autoFillProduct(product)"
                      v-for="product in productData"
                      :key="product.id"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>{{ product.name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>
        <div>
          <div>Product Name</div>
          <q-input
            v-model="addNewBranchProductForm.product_name"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Category</div>
          <q-input
            v-model="addNewBranchProductForm.category"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Price</div>
          <q-input
            v-model="addNewBranchProductForm.price"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            outlined
            dense
          />
        </div>
      </q-card-section>
      <!-- <q-separator /> -->
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn class="glossy" color="teal" label="Create" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useProductsStore } from "src/stores/product";
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productStore = useProductsStore();
const productData = computed(() => productStore.products);
const branchProducts = useBranchProductsStore();

const searchQuery = ref("");
const search = async () => {
  productStore.searchProducts(searchQuery.value);
};

const dialog = ref(false);
const open_create_bread_dialog = () => {
  dialog.value = true;
};

const autoFillProduct = (data) => {
  addNewBranchProductForm.product_id = data.id;
  addNewBranchProductForm.product_name = data.name;
  addNewBranchProductForm.price = data.price;
  addNewBranchProductForm.category = data.category;
};
const addNewBranchProductForm = reactive({
  product_id: "",
  product_name: "",
  price: "",
  branches_id: route.params.branch_id,
});

const save = async () => {
  try {
    const { product_name, ...data } = addNewBranchProductForm;
    await branchProducts.createBranchProducts(data);
    console.log("data to send", data);

    dialog.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>
