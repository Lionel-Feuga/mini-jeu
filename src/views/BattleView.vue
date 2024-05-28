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
            <p class="outlined-text">Niveau {{ player.level }} <br>
              Expérience : {{ player.experience }}/{{ player.experienceToNextLevel }}</p>
            <button
              style="border-radius: 50px;"
              @click="useAbility('swordAttack')"
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
              {{ player.name }} : {{ player.health }} HP <br>
            </p>
            <img :src="player.imageUrl" alt="Image du joueur" />
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

<script>
import { characters } from "../data/characters.js";
import { enemies } from "../data/enemies.js";

export default {
  name: "BattleView",
  data() {
    return {
      player: {
        name: "",
        health: 0,
        level: 0,
        experience: 0,
        experienceToNextLevel: 0,
        strength: 0,
        imageUrl: null,
        abilities: {},
        weapon: {},
        isReinforced: false,
        reinforcementTurns: 0,
      },
      enemy: {
        name: "",
        health: 0,
        strength: 0,
        imageUrl: null,
      },
      currentTurn: "player",
      lastLog: "",
      displayedLog: "",
      previousLog: "",
      showAttackEffect: false,
    };
  },
  created() {
    const characterName = this.$route.params.character.toLowerCase();
    const characterData = characters[characterName];
    if (characterData) {
      this.player.name = characterData.name;
      this.player.health = characterData.health;
      this.player.level = characterData.level;
      this.player.experience = characterData.experience;
      this.player.experienceToNextLevel = characterData.experienceToNextLevel;
      this.player.strength = characterData.strength;
      this.player.imageUrl = characterData.imageUrl;
      this.player.abilities = characterData.abilities;
      this.player.weapon = characterData.weapon;
    } else {
      console.error(`Character data for ${characterName} not found`);
    }

    const enemyData = enemies.goblin;
    this.enemy.name = enemyData.name;
    this.enemy.health = enemyData.health;
    this.enemy.strength = enemyData.strength;
    this.enemy.imageUrl = enemyData.imageUrl;
  },
  methods: {
    useAbility(abilityName) {
      if (this.currentTurn === "player" && this.player.abilities[abilityName]) {
        const logEntry = this.player.abilities[abilityName].execute(
          this.player,
          this.enemy
        );
        this.updateLogs(logEntry);
        if (abilityName === 'swordAttack') {
          this.showAttackEffect = true;
          setTimeout(() => {
            this.showAttackEffect = false;
          }, 500); 
        }
        this.displayLogLetterByLetter(logEntry, () => {
          setTimeout(() => {
            this.checkEnemyDeath();
            this.endTurn();
          }, 1000); 
        });
      }
    },
    endTurn() {
      if (this.currentTurn === "player") {
        this.currentTurn = "enemy";
        this.enemyAction();
      } else {
        this.currentTurn = "player";
        if (this.player.isReinforced) {
          this.player.reinforcementTurns -= 1;
          if (this.player.reinforcementTurns <= 0) {
            this.player.isReinforced = false;
          }
        }
      }
    },
    enemyAction() {
      if (this.enemy.health > 0) {
        const damage = this.enemy.strength;
        this.player.health -= damage;
        const logEntry = `L'ennemi attaque et inflige ${damage} dégâts.`;
        this.updateLogs(logEntry);
        this.displayedLog = "";
        this.displayLogLetterByLetter(logEntry, () => {
          setTimeout(() => {
            this.endTurn();
          }, 1000);
        });
      }
    },
    checkEnemyDeath() {
      if (this.enemy.health <= 0) {
        this.gainExperience(25); // Gagne 25 points d'expérience pour avoir tué l'ennemi
      }
    },
    gainExperience(exp) {
      this.player.experience += exp;
      if (this.player.experience >= this.player.experienceToNextLevel) {
        this.levelUp();
      }
    },
    levelUp() {
      this.player.level += 1;
      this.player.experience -= this.player.experienceToNextLevel;
      this.player.experienceToNextLevel *= 1.5; // Augmente l'expérience nécessaire pour le prochain niveau
      this.player.strength += 5; // Augmente la force de 5 à chaque niveau
      this.player.health += 20; // Augmente la santé de 20 à chaque niveau
      this.updateLogs(`${this.player.name} a atteint le niveau ${this.player.level}!`);
    },
    updateLogs(newLog) {
      this.previousLog = this.lastLog;
      this.lastLog = newLog;
      this.displayedLog = "";
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const logContainer = this.$refs.logContainer;
        if (logContainer) {
          logContainer.scrollTop = logContainer.scrollHeight;
        }
      });
    },
    displayLogLetterByLetter(logEntry, callback) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < logEntry.length) {
          this.displayedLog += logEntry[index];
          index++;
        } else {
          clearInterval(interval);
          if (callback) callback();
        }
      }, 7);
    }
  },
  watch: {
    currentTurn(newTurn) {
      if (newTurn === "player" && this.player.isReinforced) {
        this.player.reinforcementTurns -= 1;
        if (this.player.reinforcementTurns <= 0) {
          this.player.isReinforced = false;
        }
      }
    }
  }
};
</script>

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
