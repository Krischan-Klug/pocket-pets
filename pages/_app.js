import GlobalStyle from "../styles";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";
import SettingPopUp from "@/components/SettingPage/SettingPopUp";
import SettingPageButton from "@/components/SettingPage/SettingPageButton";
import { useRouter } from "next/router";
import { useMoneyStore } from "@/hooks/stores/moneyStore";
import { usePetStore } from "@/hooks/stores/petStore";
import { petEvents, userEvents } from "@/lib/events";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";
import { useTimeStore } from "@/hooks/stores/timeStore";
import { useAchievementStore } from "@/hooks/stores/achievementStore";

export default function App({ Component, pageProps }) {
  const addMoney = useMoneyStore((state) => state.addMoney);
  const subtractMoney = useMoneyStore((state) => state.subtractMoney);
  const onResetMoney = useMoneyStore((state) => state.onResetMoney);
  const currentPet = usePetStore((state) => state.currentPet);
  const updatePetsWithNewKeys = usePetStore(
    (state) => state.updatePetsWithNewKeys
  );
  const updateInventoryWithNewKeys = useInventoryStore(
    (state) => state.updateInventoryWithNewKeys
  );
  const setMyPets = usePetStore((state) => state.setMyPets);
  const myPets = usePetStore((state) => state.myPets);
  const onUpdatePetEnergy = usePetStore((state) => state.onUpdatePetEnergy);
  const onUpdatePetHappiness = usePetStore(
    (state) => state.onUpdatePetHappiness
  );
  const onUpdatePetHunger = usePetStore((state) => state.onUpdatePetHunger);
  const onResetInventory = useInventoryStore((state) => state.onResetInventory);
  const hour = useTimeStore((state) => state.hour);
  const addHour = useTimeStore((state) => state.addHour);

  const updatedAchievementsWithNewKeys = useAchievementStore(
    (state) => state.updatedAchievementsWithNewKeys
  );
  const updateAchievementCurrentAmount = useAchievementStore(
    (state) => state.updateAchievementCurrentAmount
  );

  const router = useRouter();

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

  //fix: update pets with new keys when local storage is loaded
  useEffect(() => {
    updatePetsWithNewKeys();
    updateInventoryWithNewKeys();
    updatedAchievementsWithNewKeys();
  }, []);

  // daily event
  const [isPetActive, setIsPetActive] = useState(false);
  const [dailyEvent, setDailyEvent] = useState(false);
  const [isEventPopUpActive, setIsEventPopUpActive] = useState(false);
  const [eventTime, setEventTime] = useState(getRandomDayTime());
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
        const localPetEvent = petEvents[getRandomArrayIndex(petEvents)];
        setPetEvent(localPetEvent);
        handleEnableIsEventPopUpActive();
        onUpdatePetEnergy(localPetEvent.eventValues.energy);
        onUpdatePetHappiness(localPetEvent.eventValues.happiness);
        onUpdatePetHunger(localPetEvent.eventValues.hunger);
        addMoney(localPetEvent.eventValues.money);
        if (localPetEvent.id == 5) {
          updateAchievementCurrentAmount(11, 1);
        }
      }

      if (!isPetActive) {
        const localUserEvent = userEvents[getRandomArrayIndex(userEvents)];
        setUserEvent(localUserEvent);
        handleEnableIsEventPopUpActive();
        addMoney(localUserEvent.eventValues.money);
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
      }, 60000);
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

  function handleSettingPageClose() {
    setSettingPage(false);
  }

  function handleSettingPageOpen() {
    setSettingPage(true);
  }

  //TODO: inventory and time
  function handleGameReset() {
    onResetInventory();
    onResetMoney();
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
        onGameUpdate={handleGameUpdate}
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
