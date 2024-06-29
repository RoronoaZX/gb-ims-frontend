import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { api } from "src/boot/axios";
import { Loading, Notify } from "quasar";

export const useRecipeStore = defineStore("recipes", () => {
  const recipe = ref(null);
  const recipes = ref([]);

  const fetchRecipes = async () => {
    const response = await api.get("/api/recipes");
    recipes.value = response.data;
  };

  const createRecipe = async (data) => {
    const response = await api.post("/api/recipes", data);
    recipes.value.unshift(response.data);
  };

  const deleteRecipe = async (id) => {
    Loading.show();

    const response = await api.delete(`/api/recipes/${id}`);
    recipes.value = recipes.value.filter((recipe) => recipe.id !== id);
    Notify.create({
      type: "negative",
      icon: "warning",
      message: "Recipe succesfully deleted",
      timeout: 1000,
    });
    Loading.hide();
  };

  const searchRecipe = async (searchQuery) => {
    const response = await api.get(`/api/search-recipes`, {
      params: { keyword: searchQuery },
    });
    recipes.value = response.data;
    console.log("response", response.data);
  };

  return {
    recipe,
    recipes,
    fetchRecipes,
    createRecipe,
    deleteRecipe,
    searchRecipe,
  };
});
