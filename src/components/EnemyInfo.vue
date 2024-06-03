<template>
  <div v-if="enemy">
    <h1>{{ enemy.name }}</h1>
    <p>HP: {{ enemy.health }}</p>
    <p>Force: {{ enemy.strength }}</p>
    <img
      :src="getImageUrl(enemy.imageUrl)"
      alt="Enemy Image"
      style="width: 22rem; height: auto"
    />
  </div>
  <div v-else>
    <p>Loading enemy...</p>
  </div>
</template>

<script setup>
const props = defineProps({
  enemy: Object,
  getImageUrl: Function,
});
</script>

<style scoped>
p,
h1 {
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
