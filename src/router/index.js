import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CharacterChoiceView from '../views/CharacterChoiceView.vue';
import BattleView from '../views/BattleView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/characterChoice',
    name: 'characterChoice',
    component: CharacterChoiceView
  },
  {
    path: '/battle',
    name: 'battle',
    component: BattleView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;