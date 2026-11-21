<template>
  <div
    class="syrup"
    :style="{
      backgroundImage: `repeating-linear-gradient(45deg, ${color}, ${color} 10px, #e1cf95 10px, #e1cf95 20px)`,
    }"
  ></div>
</template>

<script setup lang="ts">
defineProps<{ color: string }>();
</script>
<style lang="scss" scoped>
.syrup {
  transform: translateY(400%);
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 2s 1s forwards;
  z-index: 2;
}
</style>
