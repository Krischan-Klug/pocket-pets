import GlobalStyle from "../styles";
import initialMyPets from "@/lib/initialPet";
import defaultMyPet from "@/lib/myPetTemplate";
import defaultUserStats from "@/lib/defaultUserStats";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";
import SettingPopUp from "@/components/SettingPage/SettingPopUp";
import SettingPageButton from "@/components/SettingPage/SettingPageButton";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
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
  }, []);

  function handleSetCurrentPet(myPet) {
    setCurrentPet(myPet);
  }

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
      //will be outsourced in future, problems with access on functions, i know zustand is the way to go

      if (isPetActive && !currentPet.isDead) {
        const petEvents = [
          {
            id: 1,
            eventName: "Your pet is sick",
            description: `${currentPet.name} is sick. You need to pay 100 medical costs. and ${currentPet.name} lost 20 engergy.`,
            event: () => {
              handleUpdatePetEnergy(-20);
              handleSubtractMoney(100);
            },
          },

          {
            id: 2,
            eventName: "Birthday Party",
            description: `It's ${currentPet.name} birthday and you're throwing a big party with all of his pet friends. Pay 50 pet coins.`,
            event: () => {
              handleUpdatePetHappiness(100);
              handleUpdatePetHunger(100);
              handleUpdatePetEnergy(-30);
              handleSubtractMoney(50);
            },
          },
          {
            id: 3,
            eventName: "Big walk",
            description: `After a long walk ${currentPet.name} is very happy. However, all the playing and exploring also made ${currentPet.name} tired and hungry. Your happiness increases by 80 but you lose 20 energy and 10 hunger.`,
            event: () => {
              handleUpdatePetHappiness(80);
              handleUpdatePetHunger(-10);
              handleUpdatePetEnergy(-20);
            },
          },
          {
            id: 4,
            eventName: "Sleepy pet",
            description: `After a good sleep ${currentPet.name} is full of energy again but also really hungry. You win 60 energy and lose 20 hunger.`,
            event: () => {
              handleUpdatePetHappiness(80);
              handleUpdatePetHunger(-10);
              handleUpdatePetEnergy(-20);
            },
          },
          {
            id: 5,
            eventName: "Sad news",
            description: `The doorbell rings and you find yourself face to face with a police officer. Unfortunately, she has to tell you that ${currentPet.name} was hit by a car. Your pet dies.`,
            event: () => {
              handleUpdatePetHappiness(-100);
              handleUpdatePetHunger(-100);
              handleUpdatePetEnergy(-100);
            },
          },
          {
            id: 6,
            eventName: "Archaeological find",
            description: `${currentPet.name} digs up an archaeological find. You sell it for 1200 pet coins.`,
            event: () => {
              handleAddMoney(1200);
            },
          },
          {
            id: 7,
            eventName: "Mr/s barking",
            description: `${currentPet.name} stays up all night barking at the neighbor's cat. Energy decreases by 30.`,
            event: () => {
              handleUpdatePetEnergy(-30);
            },
          },

          {
            id: 8,
            eventName: "baking hour",
            description: `${currentPet.name} smells freshly baked cookies and begs for a treat. Hunger increases by 15.`,
            event: () => {
              handleUpdatePetHunger(-15);
            },
          },
          {
            id: 9,
            eventName: "Lost toy",
            description: `${currentPet.name} favorite toy gets lost. Happiness decreases by 40.`,
            event: () => {
              handleUpdatePetHappiness(-40);
            },
          },
          {
            id: 10,
            eventName: "a nice friend",
            description: `${currentPet.name} receives cuddles and belly rubs from a loved one. Happiness increases by 60.`,
            event: () => {
              handleUpdatePetHappiness(60);
            },
          },
          {
            id: 11,
            eventName: "piece of sh**",
            description: `${currentPet.name} accidentally destroys your favorite piece of furniture. You lose 90 pet coins for repairs.`,
            event: () => {
              handleSubtractMoney(90);
            },
          },
          {
            id: 12,
            eventName: "Bye bye my friend",
            description: `${currentPet.name} best friend moves away. Happiness decreases by 50.`,
            event: () => {
              handleUpdatePetHappiness(-50);
            },
          },
          {
            id: 13,
            eventName: "Bad sleep",
            description: `${currentPet.name} has a restless night due to thunderstorms. Energy decreases by 40.`,
            event: () => {
              handleUpdatePetEnergy(-40);
            },
          },
          {
            id: 14,
            eventName: "Coin hunter",
            description: `${currentPet.name} finds a forgotten stash of coins hidden in the couch cushions. You gain 100 pet coins in a stroke of luck.`,
            event: () => {
              handleAddMoney(100);
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
              handleSubtractMoney(Math.floor((userStats.money * 20) / 100));
            },
          },
          {
            id: 2,
            eventName: "Right investment",
            description:
              "Elon Musk tweets something about your pet coin. Your wealth grows by 20%.",
            event: () => {
              handleAddMoney(Math.floor((userStats.money * 20) / 100));
            },
          },
          {
            id: 3,
            eventName: "Winner winner chicken dinner",
            description:
              "Your pet becomes second to last in the beauty contest. You  receive 100 pet coins consolation money.",
            event: () => {
              handleAddMoney(100);
            },
          },
          {
            id: 4,
            eventName: "Lost Key",
            description:
              "You have lost your keys and now have to pay 100 coins to replace them",
            event: () => {
              handleSubtractMoney(100);
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
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentTime, router.pathname]);

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

  function handleUpdatePetEnergy(energyToUpdate) {
    if (!currentPet.isDead) {
      const updatedEnergy = currentPet.energy + energyToUpdate;

      handleUpdatePet({
        ...currentPet,
        energy: Math.min(Math.max(updatedEnergy, 0), 100),
      });
    }
  }

  function handleUpdatePetHappiness(HappinessToUpdate) {
    if (!currentPet.isDead) {
      const updatedHappiness = currentPet.happiness + HappinessToUpdate;

      handleUpdatePet({
        ...currentPet,
        happiness: Math.min(Math.max(updatedHappiness, 0), 100),
      });
    }
  }

  function handleUpdatePetHunger(HungerToUpdate) {
    if (!currentPet.isDead) {
      const updatedHunger = currentPet.hunger + HungerToUpdate;

      handleUpdatePet({
        ...currentPet,
        hunger: Math.min(Math.max(updatedHunger, 0), 100),
      });
    }
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
        currentDay={currentDay}
        currentSeason={currentSeason}
        isRaining={isRaining}
        onEnablePetIsActive={handleEnablePetIsActive}
        onDisablePetIsActive={handleDisablePetIsActive}
        onSetCurrentPet={handleSetCurrentPet}
        currentPet={currentPet}
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
