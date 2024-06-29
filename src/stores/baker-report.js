import { defineStore } from "pinia";
import { reactive } from "vue";

export const useBakerReportsStore = defineStore("bakerReports", async () => {
  const state = reactive({
    recipes: {
      name: "",
      targetPcs: "",
      actualTarget: "",
      short: "",
      over: "",
      kilo: "",
      breads: [],
    },
  });

  const setRecipe = (recipeData) => {
    state.recipes = {
      ...state.recipes,
      ...recipeData,
      breads: recipeData.bread || [],
    };
  };

  return {
    ...state,
    setRecipe,
  };
});
