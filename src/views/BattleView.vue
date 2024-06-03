<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CharacterInfo from "../components/CharacterInfo.vue";
import EnemyInfo from "../components/EnemyInfo.vue";
import AbilitiesList from "../components/AbilitiesList.vue";
import { useGameData } from "../composables/useGameData";
import { useCombat } from "../composables/useCombat";

const route = useRoute();
const { character, enemies, abilities, loadEnemy, loadAbilities, getImageUrl } = useGameData();
const characterData = ref(null);
const enemyData = ref(null);

onMounted(() => {
  const characterParam = route.params.character;
  if (characterParam) {
    character.value = JSON.parse(decodeURIComponent(characterParam));
    loadAbilities(character.value.id);
  }
  loadEnemy(1);
});

watch(character, (newVal) => {
  if (newVal) {
    characterData.value = newVal;
  }
});

watch(enemies, (newVal) => {
  if (newVal) {
    enemyData.value = newVal;
  }
});

const { characterHP, enemyHP, message, characterAttack } = useCombat(characterData, enemyData);

function handleAbilityClick(ability) {
  if (characterData.value && enemyData.value) {
    characterAttack(ability);
  }
}
</script>

<template>
  <body>
    <div class="battleGround">
      <div class="container">
        <div class="row text-center mt-2">
          <div class="col">
            <h1 class="outlined-text">COMBAT</h1>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-3 d-flex align-items-center justify-content-center">
            <AbilitiesList :abilities="abilities" @ability-click="handleAbilityClick" />
          </div>

          <div class="col-4 d-flex justify-content-center text-center">
            <CharacterInfo :character="character" :getImageUrl="getImageUrl" />
          </div>

          <div class="col-5 d-flex text-center justify-content-center">
            <EnemyInfo :enemy="enemies" :getImageUrl="getImageUrl" />
          </div>
        </div>
        
        <div class="container mt-3">
          <div class="row">
            <div class="col d-flex text-center justify-content-center">
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  background-image: url(../assets/battleBackground3.webp);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
  width: auto;
  height: 100vh;
  overflow: hidden;
}

.battleGround .container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.row {
  flex: 1;
}

.col-4 {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

p,
h1 {
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}

p {
  font-size: 1.5rem;
}
</style>
