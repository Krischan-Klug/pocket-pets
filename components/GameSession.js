import { useEffect, useRef, useState } from "react";
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
  const setHour = useTimeStore((state) => state.setHour);

  const router = useRouter();

  const [settingPageShow, setSettingPage] = useState(false);
  const { data: session } = useSession();

  const allAchievements = useAchievementStore((state) => state.allAchievements);
  const setAllAchievements = useAchievementStore(
    (state) => state.setAllAchievements
  );
  const foodInventory = useInventoryStore((state) => state.foodInventory);
  const setAllfoodInvetory = useInventoryStore(
    (state) => state.setAllfoodInvetory
  );
  const toyInventory = useInventoryStore((state) => state.toyInventory);
  const setAllToyInventory = useInventoryStore(
    (state) => state.setAllToyInventory
  );
  const money = useMoneyStore((state) => state.money);
  const setAllMoney = useMoneyStore((state) => state.setAllMoney);
  const day = useTimeStore((state) => state.day);
  const setDay = useTimeStore((state) => state.setDay);
  const season = useTimeStore((state) => state.season);
  const setSeason = useTimeStore((state) => state.setSeason);

  const { data: userData, error, isLoading } = useSWR("api/user/");
  const [userExist, setUserExist] = useState(false);

  const [saveData, setSaveData] = useState({});
  const dataRef = useRef(saveData);
  console.log(userData);

  //fix: update pets with new keys when local storage is loaded and init game
  useEffect(() => {
    if (userData) {
      setUserExist(true);
      setAllAchievements(userData.achievements);
      setAllfoodInvetory(userData.foodInventory);
      setAllToyInventory(userData.toyInventory);
      setAllMoney(userData.money);
      setMyPets(userData.myPets);
      setHour(userData.hour);
      setDay(userData.day);
      setSeason(userData.season);
    }
    updatePetsWithNewKeys();
    updateInventoryWithNewKeys();
  }, [userData]);

  useEffect(() => {
    dataRef.current = saveData;
  }, [saveData]);

  function combineSaveData() {
    if (session) {
      setSaveData({
        email: session.user.email,
        achievements: allAchievements,
        foodInventory: foodInventory,
        toyInventory: toyInventory,
        money: money,
        myPets: myPets,
        hour: hour,
        day: day,
        season: season,
      });
    }

    console.log("Combined DATA", dataRef.current);
  }

  useEffect(() => {
    combineSaveData();
  }, [
    allAchievements,
    foodInventory,
    toyInventory,
    money,
    myPets,
    hour,
    day,
    season,
  ]);

  async function saveUserData(data) {
    const response = await fetch("/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response.status);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      combineSaveData();
      //saveUserData(dataRef.current);
      console.log("saved data", dataRef.current);
    }, 10000);

    return () => clearInterval(interval);
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
