<script setup>
import { onMounted } from 'vue';
import { useCharacter } from '../composables/useCharacter';
import { useEnemy } from '../composables/useEnemy';

const { characters, errorMessage, loadCharacters, loadWeapons, loadArmors, getWeaponName, getArmorName } = useCharacter();
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
  <main>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des Classes</h3>
            </div>
            <div class="card-body">
              <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
              <table v-if="!errorMessage" class="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nom</th>
                    <th>HP</th>
                    <th>Mana</th>
                    <th>Force</th>
                    <th>Intelligence</th>
                    <th>Agilité</th>
                    <th>Niveau</th>
                    <th>Gold</th>
                    <th>Arme</th>
                    <th>Armure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="character in characters" :key="character.id">
                    <td><img :src="getImageUrl(character.imageUrl)" alt="Character Image"></td>
                    <td>{{ character.name }}</td>
                    <td>{{ character.health }}</td>
                    <td>{{ character.mana }}</td>
                    <td>{{ character.strength }}</td>
                    <td>{{ character.intelligence }}</td>
                    <td>{{ character.agility }}</td>
                    <td>{{ character.level }}</td>
                    <td>{{ character.gold }}</td>
                    <td>{{ getWeaponName(character.weaponId) }}</td>
                    <td>{{ getArmorName(character.armorId)}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des Ennemis</h3>
            </div>
            <div class="card-body">
              <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
              <table v-if="!errorMessage" class="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nom</th>
                    <th>HP</th>
                    <th>Force</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="enemy in enemies" :key="enemy.id">
                    <td><img :src="getImageUrl(enemy.imageUrl)" alt="Enemy Image"></td>
                    <td>{{ enemy.name }}</td>
                    <td>{{ enemy.health }}</td>
                    <td>{{ enemy.strength }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.card {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f8f9fa;
  padding: 15px;
}

.card-body {
  padding: 15px;
}

img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

</style>
