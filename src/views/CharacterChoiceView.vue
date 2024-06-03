<script>
import { useCharacter } from '@/composables/useCharacter';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

function getImageUrl(imageUrl) {
  try {
    const images = require.context('../assets', true, /\.(png|jpe?g|svg|webp)$/);
    return images(`./${imageUrl}`);
  } catch (e) {
    console.error(`Error loading image: ${imageUrl}`, e);
    return require('../assets/warrior.webp');
  }
}

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
      selectCharacter,
      getImageUrl
    };
  }
};
</script>

<template>
  <div class="video-background">
    <video autoplay muted loop playsinline>
      <source src="/characterChoiceBackgroundVideo5.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="video-overlay content">
      <div class="container d-flex align-items-center">
        <div class="row">
          <div class="col">
            <table class="table">
              <tbody style="border: none;" class="d-flex">
                <tr v-for="character in characters" :key="character.id">
                  <td  style="background: none; border: none;" class="d-flex align-items-center flex-column">
                    <img :src="getImageUrl(character.imageUrl)" alt="Character Image" class="img-fluid">
                    <button @click="selectCharacter(character)" class="btn btn-primary mb-2 mt-3 outlined-text">
                      {{ character.name }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}

video {
  width: 100%;
  height: 100%;
  object-fit:cover;
  position: absolute;
  top: 0;
  left: 0;
}

.video-overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
}

.content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 18.75rem;
  height: auto;
  transition: transform 0.3s ease-in-out;
  border-radius: 500px;
}

img:hover {
  transform: scale(1.2);
}

button {
  border: none;
  background-color: black;
  color: white;
  text-shadow:
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000;
}
</style>
