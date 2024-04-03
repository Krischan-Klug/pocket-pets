import GlobalStyle from "../styles";
import initialMyPets from "@/lib/initialPet";
import defaultMyPet from "@/lib/myPetTemplate";
import defaultUserStats from "@/lib/defaultUserStats";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";

export default function App({ Component, pageProps }) {
  const [myPets, setMyPets] = useLocalStorageState("myPets", {
    defaultValue: initialMyPets,
  });
  const [userStats, setUserStats] = useLocalStorageState("userStats", {
    defaultValue: defaultUserStats,
  });

  //fix: update pets with new keys when local storage is loaded
  useEffect(() => {
    function updatePetsWithNewKeys() {
      setMyPets((prevPets) => {
        return prevPets.map((pet) => {
          const updatedPet = { ...defaultMyPet, ...pet };
          return updatedPet;
        });
      });
    }
    function updateUserStatsWithNewkeys() {
      setUserStats((prevUserStat) => {
        return { ...defaultUserStats, ...prevUserStat };
      });
    }

    updatePetsWithNewKeys();
    updateUserStatsWithNewkeys();
  }, []);

  function handleAddPet(newPet) {
    setMyPets([...myPets, newPet]);
  }

  function handleUpdatePet(updatedPet) {
    setMyPets(
      myPets.map((myPet) => (myPet.id === updatedPet.id ? updatedPet : myPet))
    );
  }

  function handleDeletePet(id) {
    setMyPets(myPets.filter((myPet) => myPet.id !== id));
  }

  function handleAddMoney(value) {
    setUserStats((prevUserStat) => {
      return { ...prevUserStat, money: prevUserStat.money + value };
    });
  }

  function handleSubtracMoney(value) {
    setUserStats((prevUserStat) => {
      return { ...prevUserStat, money: prevUserStat.money - value };
    });
  }

  function handleGameUpdate(updateId, isSleep) {
    setMyPets(
      myPets.map((pet) =>
        pet.id === updateId
          ? {
              ...pet,
              health: (pet.hunger + pet.happiness + pet.energy) / 3,
              hunger: Math.max(pet.hunger - 1, 0),
              happiness: Math.max(pet.happiness - 0.75, 0),
              energy: isSleep ? 100 : Math.max(pet.energy - 0.5, 0),
              isDead: pet.health > 10 ? false : true,
            }
          : pet
      )
    );
  }

  return (
    <>
      <GlobalStyle />
      <button onClick={() => setUserStats({ ...setUserStats, money: 1000 })}>
        Cheat
      </button>
      <Component
        {...pageProps}
        myPets={myPets}
        userStats={userStats}
        onAddPet={handleAddPet}
        onUpdatePet={handleUpdatePet}
        onDeletePet={handleDeletePet}
        onGameUpdate={handleGameUpdate}
        onSubtracMoney={handleSubtracMoney}
        addMoney={handleAddMoney}
      />
      <AudioInterface />
    </>
  );
}
