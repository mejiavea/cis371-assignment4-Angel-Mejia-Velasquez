<template>
  <main class="app">
    <Beverage
      :is-iced="beverageStore.currentTemp === 'Cold'"
      :base-color="selectedBaseColor"
      :creamer-color="selectedCreamerColor"
      :syrup-color="selectedSyrupColor"
      :has-creamer="hasCreamer"
      :has-syrup="hasSyrup"
    />

    <ul class="selections">
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              :id="`r${temp}`"
              v-model="beverageStore.currentTemp"
              type="radio"
              name="temperature"
              :value="temp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="base in beverageStore.bases" :key="base.id">
          <label>
            <input
              :id="`r${base.id}`"
              v-model="beverageStore.selectedBaseId"
              type="radio"
              name="base"
              :value="base.id"
            />
            {{ base.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="syrup in beverageStore.syrups" :key="syrup.id">
          <label>
            <input
              :id="`r${syrup.id}`"
              v-model="beverageStore.selectedSyrupId"
              type="radio"
              name="syrup"
              :value="syrup.id"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="creamer in beverageStore.creamers" :key="creamer.id">
          <label>
            <input
              :id="`r${creamer.id}`"
              v-model="beverageStore.selectedCreamerId"
              type="radio"
              name="creamer"
              :value="creamer.id"
            />
            {{ creamer.name }}
          </label>
        </template>
      </li>
    </ul>

    <div class="recipe-actions">
      <label for="beverage-name">Name</label>
      <input
        id="beverage-name"
        v-model="beverageName"
        type="text"
        placeholder="Beverage Name"
        @keyup.enter="makeBeverage"
      />
      <button type="button" :disabled="!beverageName.trim()" @click="makeBeverage">
        🍺 Make Beverage
      </button>
    </div>

    <div id="beverage-container" class="saved-beverages">
      <button
        v-for="beverage in beverageStore.beverages"
        :key="beverage.id"
        type="button"
        @click="beverageStore.showBeverage(beverage.id)"
      >
        {{ beverage.name }}
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";

const beverageStore = useBeverageStore();
const beverageName = ref("");

const selectedBaseColor = computed(
  () =>
    beverageStore.bases.find((base) => base.id === beverageStore.selectedBaseId)?.color ??
    "transparent"
);
const selectedCreamer = computed(() =>
  beverageStore.creamers.find(
    (creamer) => creamer.id === beverageStore.selectedCreamerId
  )
);
const selectedCreamerColor = computed(
  () => selectedCreamer.value?.color ?? "transparent"
);
const hasCreamer = computed(
  () => selectedCreamer.value !== undefined && selectedCreamer.value.name !== "No Cream"
);
const selectedSyrup = computed(() =>
  beverageStore.syrups.find((syrup) => syrup.id === beverageStore.selectedSyrupId)
);
const selectedSyrupColor = computed(
  () => selectedSyrup.value?.color ?? "transparent"
);
const hasSyrup = computed(
  () => selectedSyrup.value !== undefined && selectedSyrup.value.name !== "No Syrup"
);

function makeBeverage() {
  const name = beverageName.value.trim();
  if (!name) return;

  beverageStore.makeBeverage(name);
  beverageName.value = "";
}
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}

.app {
  text-align: center;
}

.selections {
  list-style: none;
  padding: 0;
}

.selections li,
.recipe-actions,
.saved-beverages {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 0.75rem 0;
}

.selections label,
.recipe-actions {
  align-items: center;
}
</style>
