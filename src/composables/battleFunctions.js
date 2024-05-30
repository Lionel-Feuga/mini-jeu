{/* <script>
import axios from 'axios';

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
    axios.get(`http://localhost:3000/v1/characters?name=${characterName}`)
      .then(response => {
        const characterData = response.data;
        this.player.name = characterData.name;
        this.player.health = characterData.health;
        this.player.level = characterData.level;
        this.player.experience = characterData.experience;
        this.player.experienceToNextLevel = characterData.experienceToNextLevel;
        this.player.strength = characterData.strength;
        this.player.imageUrl = `@/assets/${characterData.imageUrl}`;
        this.player.abilities = characterData.abilities;
        this.player.weapon = characterData.weapon;
      })
      .catch(error => {
        console.error(`Character data for ${characterName} not found:`, error);
      });

    axios.get('http://localhost:3000/v1/enemies?name=goblin')
      .then(response => {
        const enemyData = response.data;
        this.enemy.name = enemyData.name;
        this.enemy.health = enemyData.health;
        this.enemy.strength = enemyData.strength;
        this.enemy.imageUrl = `@/assets/${enemyData.imageUrl}`;
      })
      .catch(error => {
        console.error('Goblin data not found:', error);
      });
  },
  methods: {
    useAbility(abilityName) {
      if (this.currentTurn === "player" && this.player.abilities[abilityName]) {
        const logEntry = this.player.abilities[abilityName].execute(
          this.player,
          this.enemy
        );
        this.updateLogs(logEntry);
        if (abilityName === 'basicAttack') {
          this.showAttackEffect = true;
          setTimeout(() => {
            this.showAttackEffect = false;
          }, 500);
        }
        this.displayLogLetterByLetter(logEntry, () => {
          setTimeout(() => {
            this.endTurn();
          }, 1800);
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
    },
    enemyDead(){
      if (this.enemy.health <= 0){
        this.player.experience += 25;
        console.log(this.player.experience);
      }
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
</script> */}