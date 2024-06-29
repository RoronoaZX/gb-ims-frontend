import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useWarehousesStore = defineStore("warehouses", () => {
  const warehouse = ref(null);
  const warehouses = ref([]);

  const fetchWarehouses = async () => {
    // Loading.show();
    try {
      const response = await api.get("/api/warehouses");
      warehouses.value = response.data;
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to fetch warehouse",
        setTimeout: 1000,
      });
    } finally {
      // Loading.hide();
    }
  };

  const createWarehouses = async (data) => {
    Loading.show();
    try {
      const response = await api.post("/api/warehouses", data);
      warehouses.value.unshift(response.data);
      Notify.create({
        type: "positve",
        message: "Warehouse created successfully",
        setTimeout: 1000,
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to create warehouse",
        setTimeout: 1000,
      });
    } finally {
      Loading.hide();
    }
  };

  const updateWarehouses = async (id, data) => {
    Loading.show();
    try {
      const response = await api.put(`/api/warehouses/${id}`, data);
      const index = warehouses.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        warehouses.value[index] = response.data;
      }
      Notify.create({
        type: "positive",
        message: "Warehouse updated successfully",
        setTimeout: 1000,
      });
    } catch (error) {
      Notify.create({
        tyoe: "negative",
        message: "Failed to update warehouse",
        setTimeout: 1000,
      });
    } finally {
      Loading.hide();
    }
  };

  const deleteWarehouse = async (id) => {
    Loading.show();
    try {
      const response = await api.delete(`/api/warehouses/${id}`);
      warehouses.value = warehouses.value.filter((item) => item.id !== id);
      Notify.create({
        type: "positive",
        message: "Warehouse deleted successfully",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to delete warehouse",
      });
    } finally {
      Loading.hide();
    }
  };

  return {
    warehouse,
    warehouses,
    fetchWarehouses,
    createWarehouses,
    updateWarehouses,
    deleteWarehouse,
  };
});
