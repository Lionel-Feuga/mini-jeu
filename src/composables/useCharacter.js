import { ref } from 'vue';

export function useCharacter() {
  const characters = ref([]);
  const weapons = ref([]);
  const armors = ref([]);
  const errorMessage = ref(null);

  const loadCharacters = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/characters', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      characters.value = json.data;
    } catch (error) {
      errorMessage.value = error.message;
      console.error('Failed to fetch characters:', error);
    }
  };
  
  const loadWeapons = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/weapons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      weapons.value = json.data;
    } catch (error) {
      errorMessage.value = error.message;
      console.error('Failed to fetch weapons:', error);
    }
  };

  const loadArmors = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/armors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      armors.value = json.data;
    } catch (error) {
      errorMessage.value = error.message;
      console.error('Failed to fetch armors:', error);
    }
  };

  const getWeaponName = (weaponId) => {
    const weapon = weapons.value.find(c => c.id === weaponId);
    return weapon ? weapon.name : ''
  };
  const getArmorName = (armorId) => {
    const armor = armors.value.find(c => c.id === armorId);
    return armor ? armor.name : ''
  };

  return { characters, weapons, armors, errorMessage, loadCharacters, loadWeapons, loadArmors, getWeaponName, getArmorName };
}
