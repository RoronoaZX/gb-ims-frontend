<template>
  <div>
    <div class="text-h6 q-ma-sm"></div>
  </div>
  <div class="row q-gutter-sm">
    <div>
      Target Pcs
      <div>
        <q-field
          readonly
          outlined
          type="number"
          dense
          style="width: 100px; max-width: 300px; min-width: 50px"
        />
      </div>
    </div>
    <div>
      Actual Target
      <div>
        <q-field
          readonly
          outlined
          dense
          label
          style="width: 100px; max-width: 300px; min-width: 50px"
        />
      </div>
    </div>
  </div>
  <div class="row q-mt-sm q-gutter-sm">
    <div>
      Short
      <div>
        <q-field
          readonly
          outlined
          type="number"
          dense
          label="0"
          style="width: 100px; max-width: 300px; min-width: 50px"
        />
      </div>
    </div>
    <div>
      Over
      <div>
        <q-field
          readonly
          label="0"
          outlined
          dense
          style="width: 100px; max-width: 300px; min-width: 50px"
        />
      </div>
    </div>
  </div>
  <div class="q-mb-md">
    <div class="q-mt-sm">Kilo</div>
    <div>
      <q-input
        outlined
        dense
        type="number"
        placeholder="kgs"
        style="width: 210px; max-width: 300px; min-width: 50px"
      />
    </div>
  </div>
  <div class="q-mt-md q-gutter-md">
    <div>
      <div>Bread Name</div>
      <div>
        <q-input
          outlined
          dense
          type="number"
          placeholder="Pcs"
          style="width: 210px; max-width: 300px; min-width: 50px"
        />
      </div>
    </div>
    <div>
      <!-- <div v-for="(bread, index) in recipe.breads" :key="index"> -->
      <div>Bread Name {{ index + 1 }}</div>
      <div>
        <q-input
          outlined
          dense
          type="number"
          placeholder="Pcs"
          style="width: 210px; max-width: 300px; min-width: 50px"
        />
      </div>
    </div>
    <!-- </div> -->
  </div>
  <div class="q-mt-sm">
    <ReportAddListButton />
  </div>
</template>

<script setup>
import { computed } from "vue";
import ReportAddListButton from "./ReportAddListButton.vue";
import { useBakerReportsStore } from "src/stores/baker-report";

const bakerReportStore = useBakerReportsStore();
const recipe = computed(() => bakerReportStore.recipes);
console.log("recipe", recipe);
</script>

<style lang="scss" scoped></style>
