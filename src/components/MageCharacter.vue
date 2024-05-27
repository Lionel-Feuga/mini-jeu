<template>
  <div class="character-details">
    <p>Points de vie: {{ character.health }}</p>
    <p>Points de mana: {{ character.mana }}</p>
    <p>Force: {{ character.strength }}</p>
    <p>Intelligence: {{ character.intelligence }}</p>
    <p>Agilité: {{ character.agility }}</p>
  </div>
</template>

<script>
import { characters } from '../data/characters.js';

export default {
  name: 'MageCharacter',
  data() {
    return {
      character: characters.mage
    };
  }
};
</script>

<style scoped>
.character-details {
  color: white;
  text-align: center;
}
</style>
