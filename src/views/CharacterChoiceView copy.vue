<template>
  <div>
    <button v-for="character in characters" :key="character.id" @click="selectCharacter(character)">
      {{ character.name }}
    </button>
  </div>
</template>

<script>
import { useCharacter } from '@/composables/useCharacter';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { characters, loadCharacters } = useCharacter();
    const router = useRouter();

    onMounted(() => {
      loadCharacters();
    });

    const selectCharacter = (character) => {
      const characterParam = encodeURIComponent(JSON.stringify(character));
      router.push({ name: 'BattleView', params: { character: characterParam } });
    };

    return {
      characters,
      selectCharacter
    };
  }
};
</script>
