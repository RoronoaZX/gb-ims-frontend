<template>
  <q-btn
    @click="openEditForm"
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog v-model="dialog" persistent>
    <q-card class="my-card" style="width: 400px">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Edit Branch</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div>Name of Branch</div>
          <q-input v-model="editBranchesForm.name" outlined dense />
        </div>
        <div>
          <div>Location</div>
          <q-input v-model="editBranchesForm.location" outlined dense />
        </div>
        <div>
          <div>Person In-charge</div>
          <q-input v-model="editBranchesForm.person_incharge" outlined dense />
        </div>
        <div>
          <div>Under Warehouse</div>
          <q-select
            v-model="editBranchesForm.warehouse_id"
            use-input
            input-debounce="0"
            :options="warehouses"
            stack-label
            outlined
            dense
            emit-value
            map-options
            option-label="name"
            option-value="id"
          />
        </div>
        <div class="row q-gutter-x-sm">
          <div class="col-6">
            <div>Phone Number</div>
            <q-input
              v-model="editBranchesForm.phone"
              outlined
              dense
              mask="(+63) ### - ### - ####"
              placeholder="(+63) ### - ### - ####"
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="col-5">
            <div>Status</div>
            <q-select
              v-model="editBranchesForm.status"
              outlined
              dense
              :options="statusOptions"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedBranches"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { reactive, ref, onMounted, computed } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { useBranchesStore } from "src/stores/branch";

const branchesStore = useBranchesStore();
const warehousesStore = useWarehousesStore();
const warehouses = computed(() => warehousesStore.warehouses);
const props = defineProps(["edit"]);
const dialog = ref(false);
const warehouseOptions = ref([]);
let editRow = props.edit.row;
const statusOptions = ["Open", "Open soon", "Close"];

const editBranchesForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  warehouse_id: null,
  phone: "",
  status: null,
});

const openEditForm = () => {
  console.log("Edit Row Data:", editRow);
  editBranchesForm.name = editRow.name;
  editBranchesForm.location = editRow.location;
  editBranchesForm.person_incharge = editRow.person_incharge;
  editBranchesForm.warehouse_id = editRow?.warehouse_id
    ? editRow.warehouse_id
    : editRow?.warehouse?.id
    ? editRow?.warehouse?.id
    : "";
  editBranchesForm.phone = editRow.phone;
  editBranchesForm.status = editRow.status;
  dialog.value = true;
  console.log("Edit Data:", editBranchesForm);
};

const saveEditedBranches = async () => {
  try {
    await branchesStore.updateBranches(editRow.id, editBranchesForm);

    dialog.value = false;
  } catch (error) {
    Notify.create({
      type: "negative",
      message: "Error updating branch",
    });
    console.error("Error updating branch:", error);
  }
};
</script>
