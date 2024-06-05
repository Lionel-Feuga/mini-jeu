import { ref } from "vue";

export function useGameData() {
  const character = ref(null);
  const enemies = ref(null);
  const abilities = ref([]);
  const weapons = ref([]);

  async function loadEnemy(id) {
    let response = await fetch("http://localhost:3000/v1/enemies/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      let json = await response.json();
      enemies.value = json.data;
    } else {
      console.error("Failed to load enemy with ID " + id);
    }
  }

  async function loadAbilities(characterId) {
    try {
      let response = await fetch(
          `http://localhost:3000/v1/characters/${characterId}/abilities`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
      if (response.ok) {
        let json = await response.json();
        abilities.value = json.data;
      } else {
        console.error("Failed to load abilities for character ID " + characterId);
      }
    } catch (error) {
      console.error("Failed to fetch abilities:", error);
    }
  }

  async function loadWeapons() {
    try {
      let response = await fetch('http://localhost:3000/v1/weapons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        let json = await response.json();
        weapons.value = json.data;
      } else {
        console.error("Failed to load weapons");
      }
    } catch (error) {
      console.error("Failed to fetch weapons:", error);
    }
  }

  function getWeaponDamageBonus(weaponId) {
    const weapon = weapons.value.find(w => w.id === weaponId);
    return weapon ? weapon.damageBonus : 0;
  }

  function getImageUrl(imageUrl) {
    try {
      const images = require.context(
          "../assets",
          true,
          /\.(png|jpe?g|svg|webp)$/
      );
      return images(`./${imageUrl}`);
    } catch (e) {
      console.error(`Error loading image: ${imageUrl}`, e);
      return require("../assets/warrior.webp");
    }
  }

  return {
    character,
    enemies,
    abilities,
    weapons,
    loadEnemy,
    loadAbilities,
    loadWeapons,
    getWeaponDamageBonus,
    getImageUrl,
  };
}
