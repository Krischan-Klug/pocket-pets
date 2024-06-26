import { achievements } from "@/lib/achievements";
import {
  initialFoods,
  initialToys,
  initialClothes,
} from "@/lib/defaultInventory";
import initialMyPets from "@/lib/initialPet.js";

const initialSaveData = {
  achievements: achievements,
  day: 1,
  foodInventory: initialFoods,
  hour: 0,
  money: 1000,
  myPets: initialMyPets,
  season: 0,
  toyInventory: initialToys,
  clothesInventory: initialClothes,
};

export default initialSaveData;
