import { createRouter, createWebHistory } from 'vue-router';
import CharacterChoiceView from '@/views/CharacterChoiceView.vue';
import BattleView from '@/views/BattleView.vue';

const routes = [
  {
    path: '/',
    name: 'CharacterChoice',
    component: CharacterChoiceView
  },
  {
    path: '/character',
    name: 'BattleView',
    component: BattleView,
    props: true // Cette ligne permet de passer les paramètres de route en tant que props
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
