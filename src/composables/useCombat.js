import { ref, watch } from 'vue';

export function useCombat(character, enemy, getWeaponDamageBonus) {
  const characterHP = ref(character.value ? character.value.health : 0);
  const enemyHP = ref(enemy.value ? character.value.health : 0);
  const message = ref('');
  const previousMessage = ref('');
  const damageBonusTurns = ref(0);  // Nombre de tours où le bonus de dégâts est actif
  const damageBonus = ref(1);  // Multiplicateur de dégâts, par défaut 1 (pas de bonus)

  watch(character, (newVal) => {
    if (newVal) {
      characterHP.value = newVal.health;
    }
  });

  watch(enemy, (newVal) => {
    if (newVal) {
      enemyHP.value = newVal.health;
    }
  });

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function calculateDamage(ability) {
    let baseDamage = 0;  // Dégâts de base

    // Calcul des dégâts en fonction de la classe du personnage
    if (character.value.class === 'archer') {
      baseDamage += character.value.agility + getWeaponDamageBonus(character.value.weaponId);
    } else {
      baseDamage += character.value.strength + getWeaponDamageBonus(character.value.weaponId);
    }

    // Application du bonus de dégâts si actif
    return Math.ceil(baseDamage * damageBonus.value);
  }

  function updateMessage(newMessage) {
    return new Promise((resolve) => {
      previousMessage.value = message.value;
      message.value = '';
      let i = 0;
      const typingSpeed = 10; // Vitesse de l'animation des lettres, plus bas est plus rapide

      function typeLetter() {
        if (i < newMessage.length) {
          message.value += newMessage.charAt(i);
          i++;
          setTimeout(typeLetter, typingSpeed);
        } else {
          resolve();
        }
      }

      typeLetter();
    });
  }

  async function characterAttack(ability) {
    if (character.value && enemy.value) {
      let damage = 0;
      let abilityType = '';

      // Vérifie si l'ability est une attaque de base ou une capacité spéciale
      if ([1, 3, 5, 7].includes(ability.id)) {
        // Attaque de base
        damage = calculateDamage(ability);
        abilityType = 'attaque de base';
      } else {
        // Capacité spéciale
        abilityType = 'capacité spéciale';

        // Exemple de capacité spéciale: Renforcement (ID = 2)
        if (ability.id === 2) {
          damageBonus.value = 1.5;  // Augmente les dégâts de 50%
          damageBonusTurns.value = 3;  // Pour les 3 prochains tours
          await updateMessage(`${character.value.name} utilise ${ability.name} et augmente ses dégâts de 50% pour les 3 prochains tours !`);
          setTimeout(enemyAttack, 1000); // Assure que l'ennemi attaque même après une capacité spéciale
          return;
        }
      }

      // Applique les dégâts si c'est une attaque de base
      if (damage > 0) {
        enemyHP.value -= damage;
        await updateMessage(`${character.value.name} utilise ${ability.name} et inflige ${damage} dégâts à ${enemy.value.name} !`);

        if (enemyHP.value <= 0) {
          enemyHP.value = 0;
          await updateMessage(`${character.value.name} a vaincu ${enemy.value.name} !`);
        } else {
          setTimeout(enemyAttack, 1000);
        }
      }

      // Décrémente le nombre de tours du bonus de dégâts si actif
      if (damageBonusTurns.value > 0) {
        damageBonusTurns.value--;
        if (damageBonusTurns.value === 0) {
          damageBonus.value = 1;  // Réinitialise le bonus de dégâts
        }
      }
    }
  }

  async function enemyAttack() {
    if (character.value && enemy.value) {
      const damage = enemy.value.strength;
      await updateMessage(`${enemy.value.name} attaque ${character.value.name} et inflige ${damage} dégâts !`);
      characterHP.value -= damage;

      if (characterHP.value <= 0) {
        characterHP.value = 0;
        await updateMessage(`${enemy.value.name} a vaincu ${character.value.name} !`);
      }
    }
  }

  return {
    characterHP,
    enemyHP,
    message,
    previousMessage,
    characterAttack,
  };
}
