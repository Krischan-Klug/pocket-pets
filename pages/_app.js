import GlobalStyle from "../styles";
import initialMyPets from "@/lib/initialPet";
import defaultMyPet from "@/lib/myPetTemplate";
import defaultUserStats from "@/lib/defaultUserStats";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";
import SettingPopUp from "@/components/SettingPage/SettingPopUp";
import SettingPageButton from "@/components/SettingPage/SettingPageButton";

export default function App({ Component, pageProps }) {
  const [myPets, setMyPets] = useLocalStorageState("myPets", {
    defaultValue: initialMyPets,
  });
  const [userStats, setUserStats] = useLocalStorageState("userStats", {
    defaultValue: defaultUserStats,
  });
  const [settingPageShow, setSettingPage] = useState(false);

  //Clock
  const [currentTime, setCurrentTime] = useLocalStorageState("currentTime", {
    defaultValue: 0,
  });
  //Day
  const [currentDay, setCurrentDay] = useLocalStorageState("currentDay", {
    defaultValue: 0,
  });
  //Season
  const [currentSeason, setCurrentSeason] = useLocalStorageState(
    "currentSeason",
    {
      defaultValue: 0,
    }
  );
  console.log("Hour: ", currentTime);
  console.log("Day: ", currentDay);
  console.log("Season: ", currentSeason);

  //Interval 60.000
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime < 23) {
        setCurrentTime((prevCurrentTime) => prevCurrentTime + 1);
      } else {
        setCurrentTime(0);
        setCurrentDay((prevCurrentDay) => prevCurrentDay + 1);
        if ((currentDay + 1) % 8 === 0) {
          setCurrentSeason((prevSeason) => (prevSeason + 1) % 4);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  //Rain mechanic
  const [isRaining, setIsRaining] = useLocalStorageState("isRaining", {
    defaultValue: false,
  });

  function getRandomRainTime(min, max) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    const rainTime = getRandomRainTime(30000, 60000);
    if (!isRaining) {
      const startRain = setInterval(() => {
        setIsRaining(true);
      }, rainTime);
      return () => clearInterval(startRain);
    }

    if (isRaining) {
      const endRain = setInterval(() => {
        setIsRaining(false);
      }, rainTime);
      return () => clearInterval(endRain);
    }
  }, [isRaining]);

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
    //TODO: Object auf allen untergeordneten Ebenen überprüfen ob sich etwas geändert hat zum Save
    function updateUserStatsWithNewKeys() {
      setUserStats((prevUserStat) => {
        return { ...defaultUserStats, ...prevUserStat };
      });
    }

    updatePetsWithNewKeys();
    updateUserStatsWithNewKeys();
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

  function handleSubtractMoney(value) {
    setUserStats((prevUserStat) => {
      return { ...prevUserStat, money: prevUserStat.money - value };
    });
  }

  function handleUpdateInventoryFood(value, newFoodId) {
    setUserStats((prevStats) => {
      const updatedInventory = { ...prevStats.inventory };
      const foodIndex = updatedInventory.food.findIndex(
        (item) => item.id === newFoodId
      );
      if (foodIndex !== -1) {
        updatedInventory.food[foodIndex].value =
          updatedInventory.food[foodIndex].value + value;
      }
      return { ...prevStats, inventory: updatedInventory };
    });
  }

  function handleUpdateInventoryToy(newToyId) {
    setUserStats((prevStats) => {
      const updatedInventory = { ...prevStats.inventory };
      const toyIndex = updatedInventory.toy.findIndex(
        (item) => item.id === newToyId
      );
      if (toyIndex !== -1) {
        updatedInventory.toy[toyIndex].purchased = true;
      }
      return { ...prevStats, inventory: updatedInventory };
    });
  }

  function handleSettingPageClose() {
    setSettingPage(false);
  }

  function handleSettingPageOpen() {
    setSettingPage(true);
  }

  function handleGameReset() {
    setUserStats(defaultUserStats);
    setMyPets([]);
    setSettingPage(false);
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
      <Component
        {...pageProps}
        myPets={myPets}
        userStats={userStats}
        onAddPet={handleAddPet}
        onUpdatePet={handleUpdatePet}
        onDeletePet={handleDeletePet}
        onGameUpdate={handleGameUpdate}
        onSubtractMoney={handleSubtractMoney}
        onUpdateInventoryFood={handleUpdateInventoryFood}
        onUpdateInventoryToy={handleUpdateInventoryToy}
        onAddMoney={handleAddMoney}
        currentTime={currentTime}
        currentSeason={currentSeason}
        isRaining={isRaining}
      />
      <SettingPageButton onSettingPageOpen={handleSettingPageOpen} />
      {settingPageShow && (
        <SettingPopUp
          onSettingPageClose={handleSettingPageClose}
          handleGameReset={handleGameReset}
        />
      )}
      <AudioInterface />
    </>
  );
}
