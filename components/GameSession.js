import { use, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import SettingPopUp from "@/components/SettingPage/SettingPopUp";
import SettingPageButton from "@/components/SettingPage/SettingPageButton";
import { useRouter } from "next/router";
import { useMoneyStore } from "@/hooks/stores/moneyStore";
import { usePetStore } from "@/hooks/stores/petStore";
import { petEvents, userEvents } from "@/lib/events";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";
import { useTimeStore } from "@/hooks/stores/timeStore";
import { useSession, signIn, signOut } from "next-auth/react";
import { useAchievementStore } from "@/hooks/stores/achievementStore";
import useSWR from "swr";

export default function GameSession({ Component, pageProps }) {
  const addMoney = useMoneyStore((state) => state.addMoney);
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
  const onUpdateActivePetValues = usePetStore(
    (state) => state.onUpdateActivePetValues
  );
  const onResetInventory = useInventoryStore((state) => state.onResetInventory);
  const hour = useTimeStore((state) => state.hour);
  const addHour = useTimeStore((state) => state.addHour);
  const onResetTime = useTimeStore((state) => state.onResetTime);

  const router = useRouter();

  const [settingPageShow, setSettingPage] = useState(false);
  const { data: session } = useSession();

  const allAchievements = useAchievementStore((state) => state.allAchievements);
  const foodInventory = useInventoryStore((state) => state.foodInventory);
  const toyInventory = useInventoryStore((state) => state.toyInventory);
  const money = useMoneyStore((state) => state.money);
  const day = useTimeStore((state) => state.day);
  const season = useTimeStore((state) => state.season);

  const { data, error, isLoading } = useSWR("api/user/");

  useEffect(() => {
    const interval = setInterval(() => {
      saveUserData();
    }, 30000);
    async function saveUserData() {
      const response = await fetch("/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combineUserStats()),
      });

      if (!response.ok) {
        console.log(response.status);
      }
    }

    return () => clearInterval(interval);
  }, []);

  //fix: update pets with new keys when local storage is loaded
  useEffect(() => {
    updatePetsWithNewKeys();
    updateInventoryWithNewKeys();
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

  //Event System
  useEffect(() => {
    if (hour === 0) {
      setDailyEvent(false);
    }
    if (!dailyEvent && eventTime === hour) {
      setEventTime(getRandomDayTime());
      setDailyEvent(true);

      function getRandomArrayIndex(array) {
        return Math.floor(Math.random() * array.length);
      }

      if (isPetActive && !currentPet.isDead) {
        const localPetEvent = petEvents[getRandomArrayIndex(petEvents)];
        setPetEvent(localPetEvent);
        handleEnableIsEventPopUpActive();
        onUpdateActivePetValues({
          hunger: localPetEvent.eventValues.hunger,
          energy: localPetEvent.eventValues.energy,
          happiness: localPetEvent.eventValues.happiness,
        });
        addMoney(localPetEvent.eventValues.money);
      }

      if (!isPetActive) {
        const localUserEvent = userEvents[getRandomArrayIndex(userEvents)];
        setUserEvent(localUserEvent);
        handleEnableIsEventPopUpActive();
        addMoney(localUserEvent.eventValues.money);
      }
    }
  }, [hour]);

  //Main Clock
  useEffect(() => {
    if (session) {
      if (
        router.pathname === "/" ||
        router.pathname === "/pet-detail-page/[id]"
      ) {
        const interval = setInterval(() => {
          addHour();
          console.log("Clock");
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [router.pathname, hour, session]);

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
    onResetTime();
    setSettingPage(false);
  }

  function combineUserStats() {
    let saveData = {};

    saveData.email = "test.123@sdfsdf.de";
    saveData.achievements = allAchievements;
    saveData.foodInventory = foodInventory;
    saveData.toyInventory = toyInventory;
    saveData.money = money;
    saveData.myPets = myPets;
    saveData.hour = hour;
    saveData.day = day;
    saveData.season = season;

    console.log(saveData);

    return saveData;
  }

  return (
    <>
      {session && (
        <>
          <Component
            {...pageProps}
            isRaining={isRaining}
            onEnablePetIsActive={handleEnablePetIsActive}
            onDisablePetIsActive={handleDisablePetIsActive}
            onDisableIsEventPopUpActive={handleDisableIsEventPopUpActive}
            isEventPopUpActive={isEventPopUpActive}
            userEvent={userEvent}
            petEvent={petEvent}
          />
          <SettingPageButton onSettingPageOpen={handleSettingPageOpen} />
        </>
      )}
      {settingPageShow && (
        <SettingPopUp
          onSettingPageClose={handleSettingPageClose}
          handleGameReset={handleGameReset}
        />
      )}
    </>
  );
}
