<template>
  <div class="nan vh-100 d-flex flex-column">
    <video autoplay muted loop playsinline class="background-video">
      <source src="/characterChoiceBackground.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="content ">
      <div class="container text-center">
        <div class="row">
          <div class="col mt-5">
            <h1 class="outlined-text">Choisissez votre personnage</h1>
          </div>
        </div>
      </div>
      <div class="container d-flex justify-content-center mt-5">
        <div class="row">
          <div class="col d-flex flex-column text-center align-items-center">
            <div class="dropdown">
              <img src="@/assets/warrior.webp" alt="Warrior" class="character-image dropdown-toggle" id="dropdownWarrior" data-bs-toggle="dropdown" aria-expanded="false">
              <ul class="dropdown-menu mt-5 ms-5" aria-labelledby="dropdownWarrior">
                <li><WarriorCharacter /></li>
              </ul>
              <button class="mt-3"><h2 class="outlined-text">Guerrier</h2></button>
              <button @click="startBattle('warrior')"><img src="@/assets/fleche-droite.png" alt="Icône de sélection" style="width: 80%;"></button>
            </div>
          </div>
          <div class="col d-flex flex-column text-center align-items-center">
            <div class="dropdown">
              <img src="@/assets/mage.webp" alt="Mage" class="character-image dropdown-toggle" id="dropdownMage" data-bs-toggle="dropdown" aria-expanded="false">
              <ul class="dropdown-menu mt-5 ms-5" aria-labelledby="dropdownMage">
                <li><MageCharacter /></li>
              </ul>
              <button class="mt-3"><h2 class="outlined-text">Mage</h2></button>
              <button @click="startBattle('mage')"><img src="@/assets/fleche-droite.png" alt="Icône de sélection" style="width: 80%;"></button>
            </div>
          </div>
          <div class="col d-flex flex-column text-center align-items-center">
            <div class="dropdown">
              <img src="@/assets/archer.webp" alt="Archer" class="character-image dropdown-toggle" id="dropdownArcher" data-bs-toggle="dropdown" aria-expanded="false">
              <ul class="dropdown-menu mt-5 ms-5" aria-labelledby="dropdownArcher">
                <li><ArcherCharacter /></li>
              </ul>
              <button class="mt-3"><h2 class="outlined-text">Archer</h2></button>
              <button @click="startBattle('archer')"><img src="@/assets/fleche-droite.png" alt="Icône de sélection" style="width: 80%;"></button>
            </div>
          </div>
          <div class="col d-flex flex-column text-center align-items-center">
            <div class="dropdown">
              <img src="@/assets/assassin.webp" alt="Assassin" class="character-image dropdown-toggle" id="dropdownAssassin" data-bs-toggle="dropdown" aria-expanded="false">
              <ul class="dropdown-menu mt-5 ms-5" aria-labelledby="dropdownAssassin">
                <li><AssassinCharacter /></li>
              </ul>
              <button class="mt-3"><h2 class="outlined-text">Assassin</h2></button>
              <button @click="startBattle('assassin')"><img src="@/assets/fleche-droite.png" alt="Icône de sélection" style="width: 80%;"></button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedCharacter" class="character-details-container mt-5">
        <component :is="selectedCharacter"></component>
      </div>
    </div>
  </div>
</template>

<script>
import WarriorCharacter from '../components/WarriorCharacter.vue';
import MageCharacter from '../components/MageCharacter.vue';
import ArcherCharacter from '../components/ArcherCharacter.vue';
import AssassinCharacter from '../components/AssassinCharacter.vue';

export default {
  name: 'CharacterChoiceView',
  components: {
    WarriorCharacter,
    MageCharacter,
    ArcherCharacter,
    AssassinCharacter
  },
  data() {
    return {
      selectedCharacter: null
    };
  },
  methods: {
    selectCharacter(character) {
      this.selectedCharacter = character;
    },
    startBattle(character) {
      this.selectCharacter(character);
      this.$router.push({ name: 'battle', params: { character: character } });
    }
  }
};
</script>

<style scoped>
.nan {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: white;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -1;
}

button {
  border: none;
  background: none;
  color: white;
}

img {
  border-radius: 500px;
}

.content {
  position: relative;
  z-index: 1;
}

img {
  width: 250px;
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.2);
}

.outlined-text {
  color: white;
  text-shadow: 
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000;
}

.character-details-container {
  color: white;
  text-align: center;
}

.dropdown-menu {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}
</style>
