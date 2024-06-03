<template>
  <div v-if="abilities.length" class="abilities-container">
    <h3 class="abilities-title">Capacités :</h3>
    <ul class="abilities-list">
      <li v-for="ability in abilities" :key="ability.id" class="ability-item">
        <button class="ability-button" @click="$emit('ability-click', ability)">
          {{ ability.name }}
        </button>
        <br />
        <span class="ability-description">{{ ability.description }}</span>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading abilities...</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  abilities: Array,
});
</script>

<style scoped>
.abilities-container {
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  color: #fff;
  width: 100%;
  max-height: 20rem;
  max-width: 500px;
}

.abilities-title {
  font-size: 2rem;
  margin-bottom: 15px;
}

.abilities-list {
  list-style: none;
  padding: 0;
}

.ability-item {
  margin-bottom: 15px;
}

.ability-button {
  background-color: #ffcc00;
  border: none;
  color: #000;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
}

.ability-button:hover {
  background-color: #ffdd33;
}
.ability-description {
  display: block;
  margin-top: 5px;
  font-size: 1rem;
  color: #ddd;
}

</style>
