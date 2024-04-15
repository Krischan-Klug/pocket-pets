import GlobalStyle from "../styles";
import defaultUserStats from "@/lib/defaultUserStats";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";
import SettingPopUp from "@/components/SettingPage/SettingPopUp";
import SettingPageButton from "@/components/SettingPage/SettingPageButton";
import { useRouter } from "next/router";
import { useMoneyStore } from "@/components/stores/moneyStore";
import { usePetStore } from "@/components/stores/petStore";

export default function App({ Component, pageProps }) {
  const money = useMoneyStore((state) => state.money);
  const addMoney = useMoneyStore((state) => state.addMoney);
  const subtractMoney = useMoneyStore((state) => state.subtractMoney);

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

  const [currentTime, setCurrentTime] = useLocalStorageState("currentTime", {
    defaultValue: 0,
  });

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
        const petEvents = [
          {
            id: 1,
            eventName: "Your pet is sick",
            description: `your pet is sick. You need to pay 100 medical costs. and your pet lost 20 engergy.`,
            event: () => {
              onUpdatePetEnergy(-20);
              subtractMoney(100);
            },
          },

          {
            id: 2,
            eventName: "Birthday Party",
            description: `It's your pet birthday and you're throwing a big party with all of his pet friends. Pay 50 pet coins.`,
            event: () => {
              onUpdatePetHappiness(100);
              onUpdatePetHunger(100);
              onUpdatePetEnergy(-30);
              subtractMoney(50);
            },
          },
          {
            id: 3,
            eventName: "Big walk",
            description: `After a long walk your pet is very happy. However, all the playing and exploring also made your pet tired and hungry. Your happiness increases by 80 but you lose 20 energy and 10 hunger.`,
            event: () => {
              onUpdatePetHappiness(80);
              onUpdatePetHunger(-10);
              onUpdatePetEnergy(-20);
            },
          },
          {
            id: 4,
            eventName: "Sleepy pet",
            description: `After a good sleep your pet is full of energy again but also really hungry. You win 60 energy and lose 20 hunger.`,
            event: () => {
              onUpdatePetHappiness(80);
              onUpdatePetHunger(-10);
              onUpdatePetEnergy(-20);
            },
          },
          {
            id: 5,
            eventName: "Sad news",
            description: `The doorbell rings and you find yourself face to face with a police officer. Unfortunately, she has to tell you that your pet was hit by a car. Your pet dies.`,
            event: () => {
              onUpdatePetHappiness(-100);
              onUpdatePetHunger(-100);
              onUpdatePetEnergy(-100);
            },
          },
          {
            id: 6,
            eventName: "Archaeological find",
            description: `your pet digs up an archaeological find. You sell it for 1200 pet coins.`,
            event: () => {
              addMoney(1200);
            },
          },
          {
            id: 7,
            eventName: "Mr/s barking",
            description: `your pet stays up all night barking at the neighbor's cat. Energy decreases by 30.`,
            event: () => {
              onUpdatePetEnergy(-30);
            },
          },

          {
            id: 8,
            eventName: "baking hour",
            description: `your pet smells freshly baked cookies and begs for a treat. Hunger increases by 15.`,
            event: () => {
              onUpdatePetHunger(-15);
            },
          },
          {
            id: 9,
            eventName: "Lost toy",
            description: `your pet favorite toy gets lost. Happiness decreases by 40.`,
            event: () => {
              onUpdatePetHappiness(-40);
            },
          },
          {
            id: 10,
            eventName: "a nice friend",
            description: `your pet receives cuddles and belly rubs from a loved one. Happiness increases by 60.`,
            event: () => {
              onUpdatePetHappiness(60);
            },
          },
          {
            id: 11,
            eventName: "piece of sh**",
            description: `your pet accidentally destroys your favorite piece of furniture. You lose 90 pet coins for repairs.`,
            event: () => {
              subtractMoney(90);
            },
          },
          {
            id: 12,
            eventName: "Bye bye my friend",
            description: `your pet best friend moves away. Happiness decreases by 50.`,
            event: () => {
              onUpdatePetHappiness(-50);
            },
          },
          {
            id: 13,
            eventName: "Bad sleep",
            description: `your pet has a restless night due to thunderstorms. Energy decreases by 40.`,
            event: () => {
              onUpdatePetEnergy(-40);
            },
          },
          {
            id: 14,
            eventName: "Coin hunter",
            description: `your pet finds a forgotten stash of coins hidden in the couch cushions. You gain 100 pet coins in a stroke of luck.`,
            event: () => {
              addMoney(100);
            },
          },
        ];
        const petEvent = petEvents[getRandomArrayIndex(petEvents)];
        setPetEvent(petEvent);
        handleEnableIsEventPopUpActive();
        petEvent.event();
      }

      if (!isPetActive) {
        const userEvents = [
          {
            id: 1,
            eventName: "Wrong investment",
            description:
              "You bought the wrong cryptocurrency. You lose 20% of your money.",
            event: () => {
              subtractMoney(Math.floor((money * 20) / 100));
            },
          },
          {
            id: 2,
            eventName: "Right investment",
            description:
              "Elon Musk tweets something about your pet coin. Your wealth grows by 20%.",
            event: () => {
              addMoney(Math.floor((money * 20) / 100));
            },
          },
          {
            id: 3,
            eventName: "Winner winner chicken dinner",
            description:
              "Your pet becomes second to last in the beauty contest. You  receive 100 pet coins consolation money.",
            event: () => {
              addMoney(100);
            },
          },
          {
            id: 4,
            eventName: "Lost Key",
            description:
              "You have lost your keys and now have to pay 100 coins to replace them",
            event: () => {
              subtractMoney(100);
            },
          },
        ];
        const userEvent = userEvents[getRandomArrayIndex(userEvents)];
        setUserEvent(userEvent);
        handleEnableIsEventPopUpActive();
        userEvent.event();
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
        }
      }, 12000);

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
