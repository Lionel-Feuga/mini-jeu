import { ref } from 'vue';

export function useCombat(character, enemy) {
  const characterHP = ref(character.health);
  const enemyHP = ref(enemy.health);
  const message = ref('');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function characterAttack(ability) {
    const damage = ability.strength + getRandomInt(0, 5);
    enemyHP.value -= damage;
    message.value = `${character.name} attacks ${enemy.name} with ${ability.name} and deals ${damage} damage!`;

    if (enemyHP.value <= 0) {
      enemyHP.value = 0;
      message.value = `${character.name} has defeated ${enemy.name}!`;
    } else {
      setTimeout(enemyAttack, 1000); 
    }
  }

  function enemyAttack() {
    const damage = enemy.strength + getRandomInt(0, 5);
    characterHP.value -= damage;
    message.value = `${enemy.name} attacks ${character.name} and deals ${damage} damage!`;

    if (characterHP.value <= 0) {
      characterHP.value = 0;
      message.value = `${enemy.name} has defeated ${character.name}!`;
    }
  }

  return {
    characterHP,
    enemyHP,
    message,
    characterAttack,
  };
}
