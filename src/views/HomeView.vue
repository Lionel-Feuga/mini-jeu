<script>
import GlowingButton from '../components/GlowingButton.vue';
import { useRouter } from 'vue-router';


export default {
  name: 'HomeView',
  components: {
    GlowingButton
  },
  setup() {
    const router = useRouter();
    const lancerPartie = () => {
      router.push('/characterChoice');
    };
    return {
      lancerPartie
    };
  }
};
</script>

<template>
  <body>
    
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
      <div class="content text-center">
        <h1 class="mb-5 outlined-text">Bienvenue dans mon Jeu de Combat</h1>
        <GlowingButton @click="lancerPartie">Lancer la Partie</GlowingButton>
        <RouterLink class="test nav-link mt-5" to="/characterSheets">TEST</RouterLink>
      </div>
    </div>
  </body>
</template>


<style scoped>
.d-flex {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: white;
}

body {
  background-image: url('@/assets/fondjpg.webp');
}

.test {
  position: absolute;
  top: 85%;
  left: 92%;
  border: solid 2px black;
  background-color: gray;
  width: 5rem;
}
.outlined-text {
  color: white;
  text-shadow: 
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000;
}
</style>
