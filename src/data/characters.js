export const characters = {
  warrior: {
    name: 'Guerrier',
    health: 100,
    strength: 20,
    level: 1,
    experience: 0,
    experienceToNextLevel: 100,
    weapon: {
      name: 'Épée de départ',
      damageBonus: 5
    },
    imageUrl: require('@/assets/warriorInGame-noBg.png'),
    abilities: {
      swordAttack: {
        name: 'Attaque à l\'épée',
        description: 'Inflige des dégâts en fonction de la force.',
        execute(player, enemy) {
          const baseDamage = player.isReinforced ? player.strength * 1.3 : player.strength;
          const damage = baseDamage + player.weapon.damageBonus;
          enemy.health -= damage;
          return `${player.name} utilise Attaque à l'épée et inflige ${damage.toFixed(2)} dégâts.`;
        }
      },
      reinforcement: {
        name: 'Renforcement',
        description: 'Augmente les dégâts infligés de 30% pour les deux prochaines attaques.',
        execute(player) {
          player.isReinforced = true;
          player.reinforcementTurns = 4;
          return `${player.name} utilise Renforcement, ses dégâts sont augmentés de 30% pour les 2 prochaines attaques.`;
        }
      }
    }
  },
  mage: {
    name: 'Mage',
    health: 80,
    strength: 15,
    level: 1,
    experience: 0,
    experienceToNextLevel: 100,
    weapon: {
      name: 'Bâton de départ',
      damageBonus: 5
    },
    imageUrl: require('@/assets/mageInGame-noBg.png'),
  },
  archer: {
    name: 'Archer',
    health: 90,
    strength: 18,
    level: 1,
    experience: 0,
    experienceToNextLevel: 100,
    weapon: {
      name: 'Arc de départ',
      damageBonus: 5
    },
    imageUrl: require('@/assets/archerInGame-noBg.png'),
  },
  assassin: {
    name: 'Assassin',
    health: 85,
    strength: 22,
    level: 1,
    experience: 0,
    experienceToNextLevel: 100,
    weapon: {
      name: 'Dague de départ',
      damageBonus: 5
    },
    imageUrl: require('@/assets/assassinInGame-noBg.png'),
  }
};
