<template>
  <div v-if="character">
    <h1>{{ character.name }}</h1>
    <p>HP: {{ character.health }}</p>
    <p>Mana: {{ character.mana }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const character = ref(null);

    onMounted(() => {
      const characterParam = route.params.character;
      if (characterParam) {
        character.value = JSON.parse(decodeURIComponent(characterParam));
      }
    });

    return {
      character
    };
  }
};
</script>
