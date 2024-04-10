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
  const [currentPet, setCurrentPet] = useState(null);
  const [userStats, setUserStats] = useLocalStorageState("userStats", {
    defaultValue: defaultUserStats,
  });
  const [settingPageShow, setSettingPage] = useState(false);

  const [currentTime, setCurrentTime] = useLocalStorageState("currentTime", {
    defaultValue: 0,
  });

  function handleSetCurrentPet(myPet) {
    setCurrentPet(myPet);
  }

  // daily event
  const [isPetActive, setIsPetActive] = useState(false);
  const [dailyEvent, setDailyEvent] = useState(false);
  const [eventTime, setEventTime] = useState(20);

  function handleEnablePetIsActive() {
    setIsPetActive(true);
  }

  function handleDisablePetIsActive() {
    setIsPetActive(false);
  }
  function getRandomDayTime() {
    return Math.floor(Math.random() * 24);
  }

  useEffect(() => {
    if (!dailyEvent && eventTime === currentTime) {
      setEventTime(getRandomDayTime());
      setDailyEvent(true);

      if (isPetActive) {
        // active pet events here
      }

      if (!isPetActive) {
        // inactive pet events here
      }

      console.log("event Started");
    }
    //console.log("event time: ", eventTime);
    //console.log("current time: ", currentTime);
    //console.log("daily event happend: ", dailyEvent);
    console.log("is pet active: ", isPetActive);
  }, [currentTime]);

  //Clock

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime < 23) {
        setCurrentTime((prevCurrentTime) => prevCurrentTime + 1);
      } else {
        setCurrentTime(0);
        setDailyEvent(false);
      }
    }, 6000);

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
        onAddMoney={handleAddMoney}
        currentTime={currentTime}
        isRaining={isRaining}
        onEnablePetIsActive={handleEnablePetIsActive}
        onDisablePetIsActive={handleDisablePetIsActive}
        onSetCurrentPet={handleSetCurrentPet}
        currentPet={currentPet}
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
