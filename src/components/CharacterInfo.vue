<template>
  <div v-if="character">
    <h1>{{ character.name }}</h1>
    <p>HP {{ character.health }}</p>
    <p>Mana: {{ character.mana }}</p>
    <img
      :src="getImageUrl(character.imageUrl)"
      alt="Character Image"
      style="width: 22rem; height: auto"
    />
  </div>
  <div v-else>
    <p>Loading character...</p>
  </div>
</template>

<script setup>
const props = defineProps({
  character: Object,
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
