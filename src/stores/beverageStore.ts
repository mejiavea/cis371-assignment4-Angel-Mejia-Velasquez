import { defineStore } from "pinia";
import basesData from "../data/bases.json";
import creamersData from "../data/creamers.json";
import syrupsData from "../data/syrups.json";
import tempretures from "../data/tempretures.json";

type Ingredient = {
  id: string;
  name: string;
  color: string;
};

type BeverageRecipe = {
  id: number;
  name: string;
  temp: string;
  base: Ingredient;
  syrup: Ingredient;
  creamer: Ingredient;
};

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    bases: basesData,
    creamers: creamersData,
    syrups: syrupsData,
    temps: tempretures,
    currentTemp: tempretures[0],
    selectedBaseId: basesData[0]?.id ?? "",
    selectedCreamerId: creamersData[0]?.id ?? "",
    selectedSyrupId: syrupsData[0]?.id ?? "",
    beverages: [] as BeverageRecipe[],
    nextBeverageId: 1,
  }),

  actions: {
    makeBeverage(name: string) {
      const trimmedName = name.trim();
      if (!trimmedName) {
        throw new Error("A beverage name is required.");
      }

      const base = this.bases.find((ingredient) => ingredient.id === this.selectedBaseId);
      const creamer = this.creamers.find(
        (ingredient) => ingredient.id === this.selectedCreamerId
      );
      const syrup = this.syrups.find((ingredient) => ingredient.id === this.selectedSyrupId);

      if (!base || !creamer || !syrup) {
        throw new Error("The selected beverage ingredients are unavailable.");
      }

      const beverage: BeverageRecipe = {
        id: this.nextBeverageId++,
        name: trimmedName,
        temp: this.currentTemp,
        base,
        creamer,
        syrup,
      };

      this.beverages.push(beverage);
      return beverage;
    },
    showBeverage(id: number) {
      const beverage = this.beverages.find((savedBeverage) => savedBeverage.id === id);
      if (!beverage) {
        throw new Error(`Saved beverage ${id} was not found.`);
      }

      this.currentTemp = beverage.temp;
      this.selectedBaseId = beverage.base.id;
      this.selectedCreamerId = beverage.creamer.id;
      this.selectedSyrupId = beverage.syrup.id;
    },
  },
  persist: true,
});