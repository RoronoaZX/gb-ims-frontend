import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useBranchProductsStore = defineStore("branchProducts", () => {
  const branchProduct = ref(null);
  const branchProducts = ref([]);
  const branchId = ref([]);

  const fetchBranchProducts = async (branchId) => {
    const response = await api.get(`/api/branches/${branchId}/products`);
    branchProducts.value = response.data;
  };

  const createBranchProducts = async (data) => {
    const response = await api.post(`/api/branch-products`, data);
    console.log("response", response.data);
    branchProducts.value = response.data;
  };

  const updateBranchProductPrice = async (id) => {
    await api.put(`/api/update-branch-products/${id}`, { price: newPrice });
    const index = branchProducts.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      branchProducts.value[index].price = newPrice;
    }
  };

  const deleteBranchProducts = async (id) => {
    const response = await api.delete(`/api/branch-products/${id}`);
    branchProducts.value = branchProducts.value.filter(
      (branchProduct) => branchProduct.id !== id
    );
  };

  return {
    branchId,
    branchProduct,
    branchProducts,
    fetchBranchProducts,
    createBranchProducts,
    updateBranchProductPrice,
    deleteBranchProducts,
  };
});
