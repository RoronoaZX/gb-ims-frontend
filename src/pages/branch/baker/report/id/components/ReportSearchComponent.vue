<template>
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
          <q-item v-if="!recipes?.length"> No record found. </q-item>
          <template v-else>
            <q-item
              @click="autoFillProduct(recipe)"
              v-for="recipe in recipes"
              :key="recipe.id"
              clickable
            >
              <q-item-section>
                <q-item-label>{{ recipe.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-card>
    </div>
  </q-input>
</template>

<script setup>
import { ref, watch, computed, reactive } from "vue";
import { useRecipeStore } from "src/stores/recipe";
import { useBakerReportsStore } from "src/stores/baker-report";

const bakerReportsStore = useBakerReportsStore();
const searchQuery = ref("");
const recipeStore = useRecipeStore();
const recipes = computed(() => recipeStore.recipes);

const search = async () => {
  recipeStore.searchRecipe(searchQuery.value);
};

// watch(searchQuery, (newQuery) => {
//
const autoFillProduct = (recipe) => {
  bakerReportsStore.setRecipe(recipe);
};
</script>

<style lang="scss" scoped></style>
