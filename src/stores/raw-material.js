import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useRawMaterialsStore = defineStore("rawMaterials", () => {
  const rawMaterial = ref(null);
  const rawMaterials = ref([]);
  const ingredients = ref([]);

  const fetchRawMaterials = async () => {
    // Loading.show();
    const response = await api.get("/api/raw-materials");
    rawMaterials.value = response.data;
    // Loading.hide();
  };

  const createRawMaterials = async (data) => {
    Loading.show();
    try {
      const response = await api.post("/api/raw-materials", data);
      rawMaterials.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Products successfully created",
      });
    } catch (error) {
      Loading.hide();
    }
  };

  const updateRawMaterials = async (id, data) => {
    Loading.show();

    const response = await api.put(`/api/raw-materials/${id}`, data);
    const updatedRawMaterial = rawMaterials.value.findIndex(
      (rawMaterial) => rawMaterial.id === id
    );
    if (updatedRawMaterial !== -1) {
      rawMaterials.value[updatedRawMaterial] = response.data;
    }
    Notify.create({
      type: "positive",
      message: "Raw Materials updated successfully",
      timeout: 1000,
    });

    Loading.hide();
  };

  const deleteRawMaterials = async (id) => {
    Loading.show();
    const response = await api.delete(`/api/raw-materials/${id}`);
    rawMaterials.value = rawMaterials.value.filter(
      (rawMaterial) => rawMaterial.id !== id
    );
    Notify.create({
      type: "negative",
      icon: "warning",
      message: `Raw Materials successfully deleted`,
      timeout: 1000,
    });
    Loading.hide();
  };

  const fetchIngredients = async (category) => {
    const response = await api.get("/api/ingredients", category);
    ingredients.value = response.data;
  };

  return {
    rawMaterial,
    rawMaterials,
    ingredients,
    createRawMaterials,
    fetchRawMaterials,
    updateRawMaterials,
    deleteRawMaterials,
    fetchIngredients,
  };
});
