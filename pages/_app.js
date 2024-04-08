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
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime < 23) {
        setCurrentTime((prevCurrentTime) => prevCurrentTime + 1);
      } else {
        setCurrentTime(0);
      }
      console.log(currentTime);
    }, 600);

    return () => clearInterval(interval);
  }, [currentTime]);

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

  function handleSubtracMoney(value) {
    setUserStats((prevUserStat) => {
      return { ...prevUserStat, money: prevUserStat.money - value };
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
        onSubtracMoney={handleSubtracMoney}
        onAddMoney={handleAddMoney}
        currentTime={currentTime}
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
