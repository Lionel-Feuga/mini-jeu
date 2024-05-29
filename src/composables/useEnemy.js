import { ref } from 'vue';

export function useEnemy() {
  const enemies = ref([]);
  const enemy = ref(null);
  const errorMessage = ref(null);

  const loadEnemies = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/enemies', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      enemies.value = json.data;
    } catch (error) {
      errorMessage.value = error.message;
      console.error('Failed to fetch enemies:', error);
    }
  };

  const loadEnemy = async (enemyId) => {
    try {
      const response = await fetch(`http://localhost:3000/v1/enemies/${enemyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      enemy.value = json.data;
    } catch (error) {
      errorMessage.value = error.message;
      console.error('Failed to fetch enemy:', error);
    }
  };

  return { enemies, enemy, errorMessage, loadEnemies, loadEnemy };
}
