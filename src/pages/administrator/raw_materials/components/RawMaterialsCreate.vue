<template>
  <q-btn
    class="q-pa-sm"
    outline
    dense
    elevated
    icon="add_circle"
    label="Add Ingredients"
    @click="open_add_ingredients_dialog"
    size="md"
  />
  <q-dialog v-model="createRawMaterialsDialog">
    <q-card class="my-card" style="width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">Add Raw Materials</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div class="q-my-sm">Raw Materials Name</div>
          <q-input
            v-model="addRawMaterialsForm.name"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div class="q-my-sm">Raw Materials Code</div>
          <q-input
            v-model="addRawMaterialsForm.code"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
            mask="##-AAAAAAAAAAAAAAAAAAAAA"
            placeholder="00-SAMPLE"
          />
        </div>
        <div>
          <div class="q-my-sm">Category</div>
          <q-select
            v-model="addRawMaterialsForm.category"
            :options="rawMaterialsCategory"
            hide-dropdown-icon
            outlined
            dense
            behavior="menu"
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div class="q-my-sm">Unit</div>
          <q-select
            v-model="addRawMaterialsForm.unit"
            :options="ingredientsUnitOptions"
            hide-dropdown-icon
            outlined
            dense
            behavior="menu"
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
        <q-btn @click="create" class="glossy" color="teal" label="Create" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRawMaterialsStore } from "src/stores/raw-material";

const rawMaterialStore = useRawMaterialsStore();
const createRawMaterialsDialog = ref(false);
const rawMaterialsCategory = ["Ingredients", "Packaging Materials"];
const ingredientsUnitOptions = ["Grams", "Pcs"];
const loading = ref(false);
const open_add_ingredients_dialog = () => {
  createRawMaterialsDialog.value = true;
};
const addRawMaterialsForm = reactive({
  name: "",
  code: "",
  category: null,
  unit: null,
});

const create = async () => {
  await rawMaterialStore.createRawMaterials(addRawMaterialsForm);
  createRawMaterialsDialog.value = false;
  resetCreateRawMaterials();
};

const resetCreateRawMaterials = () => {
  addRawMaterialsForm.name = "";
  addRawMaterialsForm.code = "";
  addRawMaterialsForm.category = "";
  addRawMaterialsForm.unit = "";
};
</script>
