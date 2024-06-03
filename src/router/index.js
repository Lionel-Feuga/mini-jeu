import { createRouter, createWebHistory } from 'vue-router';
import CharacterChoiceView from '@/views/CharacterChoiceView.vue';
import BattleView from '@/views/BattleView.vue';
import HomeView from '@/views/HomeView.vue';
import testView from '@/views/testView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/characterChoice',
    name: 'CharacterChoice',
    component: CharacterChoiceView
  },
  {
    path: '/battle',
    name: 'BattleView',
    component: BattleView,
    props: true 
  },
  {
    path: '/characterSheets',
    name: 'testView',
    component: testView
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
