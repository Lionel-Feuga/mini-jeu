<script setup>
import { onMounted } from "vue";
import { useCharacter } from "../composables/useCharacter";

const characterId = 3;
const { character, errorMessage, loadCharacters } = useCharacter();

onMounted(async () => {
  await loadCharacters(characterId);
});
</script>

<template>
  <div v-if="character" class="character-details">
    <p>Points de vie: {{ character.health }}</p>
    <p>Points de mana: {{ character.mana }}</p>
    <p>Force: {{ character.strength }}</p>
    <p>Intelligence: {{ character.intelligence }}</p>
    <p>Agilité: {{ character.agility }}</p>
  </div>
  <div v-else-if="errorMessage" class="alert alert-danger">
    {{ errorMessage }}
  </div>
</template>

<style scoped>
.character-details {
  color: white;
  text-align: center;
}
.alert {
  color: red;
  text-align: center;
}
</style>
