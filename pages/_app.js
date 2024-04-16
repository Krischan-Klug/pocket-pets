import GlobalStyle from "../styles";
import defaultUserStats from "@/lib/defaultUserStats";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";
import SettingPopUp from "@/components/SettingPage/SettingPopUp";
import SettingPageButton from "@/components/SettingPage/SettingPageButton";
import { useRouter } from "next/router";
import { useMoneyStore } from "@/hooks/stores/moneyStore";
import { usePetStore } from "@/hooks/stores/petStore";
import { petEvents, userEvents } from "@/lib/events";

export default function App({ Component, pageProps }) {
  const addMoney = useMoneyStore((state) => state.addMoney);

  const currentPet = usePetStore((state) => state.currentPet);
  const updatePetsWithNewKeys = usePetStore(
    (state) => state.updatePetsWithNewKeys
  );
  const setMyPets = usePetStore((state) => state.setMyPets);
  const myPets = usePetStore((state) => state.myPets);
  const onUpdatePetEnergy = usePetStore((state) => state.onUpdatePetEnergy);
  const onUpdatePetHappiness = usePetStore(
    (state) => state.onUpdatePetHappiness
  );
  const onUpdatePetHunger = usePetStore((state) => state.onUpdatePetHunger);

  const router = useRouter();

  const [userStats, setUserStats] = useLocalStorageState("userStats", {
    defaultValue: defaultUserStats,
  });
  const [settingPageShow, setSettingPage] = useState(false);

  //Hour
  const [currentTime, setCurrentTime] = useLocalStorageState("currentTime", {
    defaultValue: 0,
  });
  //Day
  const [currentDay, setCurrentDay] = useLocalStorageState("currentDay", {
    defaultValue: 1,
  });
  //Season
  const [currentSeason, setCurrentSeason] = useLocalStorageState(
    "currentSeason",
    {
      defaultValue: 0,
    }
  );

  // daily event
  const [isPetActive, setIsPetActive] = useState(false);
  const [dailyEvent, setDailyEvent] = useState(false);
  const [isEventPopUpActive, setIsEventPopUpActive] = useState(false);
  const [eventTime, setEventTime] = useState(20);
  const [userEvent, setUserEvent] = useState(null);
  const [petEvent, setPetEvent] = useState(null);

  function handleDisableIsEventPopUpActive() {
    setIsEventPopUpActive(false);
  }

  function handleEnableIsEventPopUpActive() {
    setIsEventPopUpActive(true);
  }

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

      function getRandomArrayIndex(array) {
        return Math.floor(Math.random() * array.length);
      }

      if (isPetActive && !currentPet.isDead) {
        console.log("pet event", petEvents);
        const localPetEvent = petEvents[getRandomArrayIndex(petEvents)];
        setPetEvent(localPetEvent);
        console.log("pet event", petEvent);
        handleEnableIsEventPopUpActive();
        onUpdatePetEnergy(petEvent.eventValues.energy);
        onUpdatePetHappiness(petEvent.eventValues.happiness);
        onUpdatePetHunger(petEvent.eventValues.hunger);
        addMoney(petEvent.eventValues.money);
      }

      if (!isPetActive) {
        console.log("user events", userEvents);
        const localUserEvent = userEvents[getRandomArrayIndex(userEvents)];

        setUserEvent(localUserEvent);
        //pls help !!!
        if (!userEvent) {
          console.log("user event", userEvent);
          handleEnableIsEventPopUpActive();
          addMoney(userEvent.eventValues.money);
        }
      }
    }
  }, [currentTime]);

  //Clock

  useEffect(() => {
    if (
      router.pathname === "/" ||
      router.pathname === "/pet-detail-page/[id]"
    ) {
      const interval = setInterval(() => {
        if (currentTime < 23) {
          setCurrentTime((prevCurrentTime) => prevCurrentTime + 1);
        } else {
          setCurrentTime(0);
          setDailyEvent(false);
          setCurrentDay((prevCurrentDay) => prevCurrentDay + 1);
          if ((currentDay + 1) % 8 === 0) {
            setCurrentSeason((prevSeason) => (prevSeason + 1) % 4);
          }
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [currentTime, router.pathname, setCurrentTime]);

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
    //TODO: Object auf allen untergeordneten Ebenen überprüfen ob sich etwas geändert hat zum Save
    function updateUserStatsWithNewKeys() {
      setUserStats((prevUserStat) => {
        return { ...defaultUserStats, ...prevUserStat };
      });
    }
    updatePetsWithNewKeys();
    updateUserStatsWithNewKeys();
  }, []);

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
        userStats={userStats}
        onGameUpdate={handleGameUpdate}
        onUpdateInventoryFood={handleUpdateInventoryFood}
        onUpdateInventoryToy={handleUpdateInventoryToy}
        currentTime={currentTime}
        currentDay={currentDay}
        currentSeason={currentSeason}
        isRaining={isRaining}
        onEnablePetIsActive={handleEnablePetIsActive}
        onDisablePetIsActive={handleDisablePetIsActive}
        onDisableIsEventPopUpActive={handleDisableIsEventPopUpActive}
        isEventPopUpActive={isEventPopUpActive}
        userEvent={userEvent}
        petEvent={petEvent}
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
