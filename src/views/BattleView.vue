<script setup>
import { onMounted } from 'vue';
import { useCharacter } from '../composables/useCharacter';
import { useEnemy } from '../composables/useEnemy';

const { loadCharacters, loadWeapons, loadArmors } = useCharacter();
const { enemies, loadEnemies } = useEnemy();

function getImageUrl(imageUrl) {
  try {
    const images = require.context('../assets', true, /\.(png|jpe?g|svg|webp)$/);
    return images(`./${imageUrl}`);
  } catch (e) {
    console.error(`Error loading image: ${imageUrl}`, e);
    return require('../assets/warrior.webp');
  }
}

onMounted(async () => {
  await loadCharacters();
  await loadEnemies();
  await loadWeapons();
  await loadArmors();
  console.log(enemies.value);
});
</script>

<template>
  <div class="battle-container vh-100 d-flex flex-column">
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <h1 class="mt-3 outlined-text">Combat</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-6 d-flex align-items-center justify-content-between">
          <div class="d-flex flex-column justify-content-center gap-2 actions mb-4">
            <p class="outlined-text">Niveau {{ characters.level }} <br> Expérience : {{ characters.experience }}/{{ characters.experienceToNextLevel }}</p>
            <button
              style="border-radius: 50px;"
              @click="useAbility('basicAttack')"
              class="action-buttons-attack px-3"
            >
              Attaque à l'épée
            </button>
            <button
              style="border-radius: 50px;"
              @click="useAbility('reinforcement')"
              class="action-buttons"
            >
              Renforcement
            </button>
          </div>
          <div class="">
            <p class="outlined-text text-center">
              {{ characters.name }} : {{ characters.health }} HP <br>
            </p>
            <img :src="getImageUrl(character.imageUrl)" alt="Image du joueur" />
          </div>
        </div>
        <div class="col-6 d-flex flex-column align-items-center position-relative">
          <p class="outlined-text">{{ enemy.name }}: {{ enemy.health }} HP</p>
          <img :src="enemy.imageUrl" alt="Image de l'ennemi" />
          <img v-if="showAttackEffect" src="@/assets/vfx_slash2.png" alt="Effet d'attaque" class="attack-effect" />
        </div>
      </div>
      <div class="log mt-4" ref="logContainer">
        <p>{{ previousLog }}</p>
        <p ref="logText">{{ displayedLog }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.battle-container {
  font-family: "Cinzel", serif;
  background-image: url("@/assets/battleBackground3.webp");
  background-size: cover;
  background-position: center;
  color: white;
  font-size: 2rem;
  overflow: hidden; 
}

.outlined-text {
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}

img {
  width: 300px;
  border-radius: 300px;
}

h1 {
  font-size: 4rem;
}

.log {
  border: 5px solid black;
  padding: 15px;
  background-color: #6c757d;
  font-size: 1.5rem;
  height: 7rem;
}

.attack-effect {
  position: absolute;
  top: -5%;
  left: 58%;
  width: 60rem; 
  height: 60rem; 
  transform: translate(-50%, -50%) rotate(25deg);
  pointer-events: none; 
}
</style>
