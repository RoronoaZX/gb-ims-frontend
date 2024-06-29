import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useWarehousesStore } from "./warehouse";
import { api } from "src/boot/axios";
import { Loading, Notify } from "quasar";

export const useBranchesStore = defineStore("branches", () => {
  const branch = ref(null);
  const branches = ref([]);

  const warehousesStore = useWarehousesStore();
  const warehouses = computed(() => warehousesStore.warehouses);
  console.log("warehouses", warehouses.value);

  const fetchBranches = async () => {
    const response = await api.get("/api/branches");
    branches.value = response.data.map((branch) => {
      const data = { ...branch };
      const warehouse = warehouses.value.find(
        (warehouse) => warehouse.id === data.warehouse_id
      );
      data.warehouse = warehouse ? warehouse.name : "No Warehouse";
      return data;
    });
  };

  const fetchBranchesById = async (id) => {
    const response = await api.get(`/api/branches/${id}`);
    branch.value = response.data;
  };

  const createBranches = async (data) => {
    try {
      const response = await api.post("/api/branches", data);
      const warehouse = warehouses.value.find(
        (item) => item.id === data.warehouse_id
      );

      const newBranch = {
        ...response.data,
        warehouse: warehouse ? warehouse.name : "No Warehouse",
      };
      console.log("create branch", newBranch);
      branches.value.unshift(newBranch);
      Notify.create({
        type: "positive",
        message: "Branch created successfully",
        timeout: 1000,
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to create branch",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateBranches = async (id, data) => {
    Loading.show();
    try {
      await api.put(`/api/branches/${id}`, data);
      const index = branches.value.findIndex((item) => item.id === id);
      if (index > -1) {
        branches.value[index] = {
          ...branches.value[index],
          ...data,

          waarehouse: warehouses.value.find(
            (item) => item.id === data.warehouse_id
          ),
        };
      }
      Notify.create({
        type: "positive",
        message: "Branch updated successfully",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to update branch",
      });
    } finally {
      Loading.hide();
    }
  };

  const deleteBranches = async (id) => {
    Loading.show();
    try {
      await api.delete(`/api/branches/${id}`);
      branches.value = branches.value.filter((branch) => branch.id !== id);
      Notify.create({
        type: "positive",
        message: "Branch successfully delete",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to delete branch",
      });
    } finally {
      Loading.hide();
    }
  };

  const fetchWarehouseName = async (warehouse_id) => {
    Loading.show();
    try {
      const response = await api.get(`/api/branches/${warehouse_id}`);
      return response.data.name;
    } catch (error) {
      return null;
    } finally {
      Loading.hide();
    }
  };

  return {
    branch,
    branches,
    fetchBranches,
    createBranches,
    updateBranches,
    deleteBranches,
    fetchWarehouseName,
    fetchBranchesById,
  };
});
