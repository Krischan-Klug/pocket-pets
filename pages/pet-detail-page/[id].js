import { useRouter } from "next/router";
import Image from "next/image";
import editIcon from "/public/assets/icons/edit_round_outline_black.png";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import StatusBar from "@/components/DetailPage/StatusBar";
import { useEffect } from "react";
import { useState } from "react";
import StyledButton from "@/components/StyledComponents/StyledButton";
import MoneyImage from "@/components/util/MoneyImage";
import MoneyColored from "@/components/util/MoneyColored";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import HungerInventoryPopUp from "@/components/DetailPage/HungerInventoryPopUp";
import ToyInventoryPopUp from "@/components/DetailPage/ToyInventoryPopUp";
import { foods, toys } from "@/lib/shop";
import StyledXPBar from "@/components/DetailPage/StyledXPBar";
import {
  calculateLevel,
  percentageLevelProgress,
} from "@/components/DetailPage/calculateLevel";
import StyledLink from "@/components/StyledComponents/StyledLink";
import hungerImage from "/public/assets/images/interaction/hunger.png";
import happinessImage from "/public/assets/images/interaction/happiness.png";
import energyImage from "/public/assets/images/interaction/energy.png";
import graveImage from "/public/assets/images/grave.png";
import {
  StyledBackgroundImageWrapper,
  StyledTimeBackground,
  StyledWallBackground,
  StyledRainBackground,
} from "@/components/StyledComponents/StyledBackgroundImage";
import { useMoneyStore } from "@/hooks/stores/moneyStore";
import { usePetStore } from "@/hooks/stores/petStore";
import Calendar from "@/components/util/Calendar";
import Clock from "@/components/util/Clock";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";
import { useTimeStore } from "@/hooks/stores/timeStore";

const StyledEditImage = styled(Image)`
  transform: scale(1);
  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
    cursor: pointer;
  }
`;

const StyledPetDetailPageMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

const StyledPetContainer = styled.section`
  position: relative;
  bottom: 0;
`;

const StyledPetImage = styled(Image)`
  margin: 40px 0;
`;

const sleepingAnimation = keyframes`
  0% {transform: translateY(0);}
  50% {transform: translateY(-10px);}
  100% {transform: translateY(0);}
`;

const toyAnimation = keyframes`
  0% {transform: translateY(10px) translateX(-10px) scale(1);}
  50% {transform: translateY(-10px) translateX(10px) scale(0.5);}
  100% {transform: translateY(10px) translateX(-10px) scale(1);}
`;

const foodAnimation = keyframes`
  0% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);}
  20% {clip-path: polygon(0 0, 80% 0, 80% 100%, 0 100%);}
  40% {clip-path: polygon(0 0, 60% 0, 60% 100%, 0 100%);}
  60% {clip-path: polygon(0 0, 40% 0, 40% 100%, 0 100%);}
  80% {clip-path: polygon(0 0, 20% 0, 20% 100%, 0 100%);}
  100% {clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);}
`;

const StyledInteractionImage = styled(Image)`
  position: absolute;
  top: 0;
  right: 30%;
  animation: ${(props) => {
      if (props.$animationstyle === "sleeping") return sleepingAnimation;
      if (props.$animationstyle === "toy") return toyAnimation;
      if (props.$animationstyle === "food") return foodAnimation;
    }}
    1s ease-in-out infinite;
`;

const SyledInteractionButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledGameArea = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

const StatusBarWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 30px;
  align-items: center;

  & > :first-child {
    margin-bottom: 15px;
  }
`;
const StyledMoneyHandleSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;

const StyledNameSection = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledNameWrapper = styled.div`
  display: flex;
  background-color: rgb(255, 255, 255, 0.7);
  padding: 0 5px;
  border-radius: var(--border-radius);
`;

const StyledReviewButton = styled(StyledButton)`
  position: absolute;
  top: -20px;
`;

export default function PetDetailPage({
  onGameUpdate,
  isRaining,
  onEnablePetIsActive,
  petEvent,
  isEventPopUpActive,
  onDisableIsEventPopUpActive,
}) {
  const myPets = usePetStore((state) => state.myPets);
  const subtractMoney = useMoneyStore((state) => state.subtractMoney);
  const onUpdatePet = usePetStore((state) => state.onUpdatePet);
  const currentPet = usePetStore((state) => state.currentPet);
  const onSetCurrentPet = usePetStore((state) => state.onSetCurrentPet);
  const onUpdateFood = useInventoryStore((state) => state.onUpdateFood);
  const money = useMoneyStore((state) => state.money);
  const hour = useTimeStore((state) => state.hour);
  const day = useTimeStore((state) => state.day);
  const season = useTimeStore((state) => state.season);

  const [isInteracting, setIsInteracting] = useState({
    duration: 0,
    interaction: "",
    image: "",
  });
  const [confirmationPopUpContent, setConfirmationPopUpContent] = useState({
    message: "",
    onConfirm: null,
    onCancel: null,
    show: false,
  });
  const [feedButtonPopUp, setFeedButtonPopUp] = useState(false);
  const [playButtonPopUp, setPlayButtonPopUp] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  //enable pet active events
  useEffect(() => {
    onEnablePetIsActive();
  }, []);

  //Gameloop 1.000ms Cycle
  useEffect(() => {
    if (!id) return;

    const pet = myPets.find((myPet) => myPet.id == id);
    if (!pet) return;
    onSetCurrentPet(pet);
    if (pet.isDead) return;

    const interval = setInterval(() => {
      if (
        isInteracting.interaction === "sleeping" &&
        isInteracting.duration > 0
      ) {
        onGameUpdate(id, true);
      } else {
        onGameUpdate(id, false);
      }
      setIsInteracting((prevIsInteracting) => ({
        ...prevIsInteracting,
        duration:
          prevIsInteracting.duration > 0
            ? (prevIsInteracting.duration -= 1)
            : 0,
      }));
    }, 1000);

    // Cleaning up the component unmount
    return () => clearInterval(interval);
  }, [id, myPets]);

  if (!id) {
    return (
      <>
        <h1>No valid id.</h1>
        <Link href="/">Return to your pets collection.</Link>
      </>
    );
  }

  if (!currentPet) {
    return (
      <>
        <h1>Pet not found.</h1>
        <Link href="/">Return to your pets collection.</Link>
      </>
    );
  }

  const { name, type, image, isDead, xp } = currentPet;

  function handleFeedButton(foodItemId) {
    if (!currentPet.isDead) {
      setFeedButtonPopUp(false);
      onUpdateFood(-1, foodItemId);
      const foodToGive = foods.find((food) => food.id === foodItemId).value;
      const updatedHunger = currentPet.hunger + foodToGive;
      onUpdatePet({
        ...currentPet,
        hunger: updatedHunger > 100 ? 100 : updatedHunger,
        xp: currentPet.xp + foodToGive,
        level: calculateLevel(currentPet.xp),
      });
      const foodImage = foods.find((food) => food.id === foodItemId).image;
      setIsInteracting({ interaction: "food", duration: 5, image: foodImage });
    }
  }

  function handlePlayButton(toyItemId) {
    if (!currentPet.isDead) {
      const toyToGive = toys.find((toy) => toy.id === toyItemId).value;
      setPlayButtonPopUp(false);
      const updatedHappiness = currentPet.happiness + toyToGive;
      onUpdatePet({
        ...currentPet,
        happiness: updatedHappiness > 100 ? 100 : updatedHappiness,
        xp: currentPet.xp + toyToGive,
        level: calculateLevel(currentPet.xp),
      });
      const toyImage = toys.find((toy) => toy.id === toyItemId).image;
      setIsInteracting({ interaction: "toy", duration: 5, image: toyImage });
    }
  }

  function handleSleep() {
    if (!currentPet.isDead) {
      onUpdatePet({
        ...currentPet,
        xp: currentPet.xp + 15,
        level: calculateLevel(currentPet.xp),
      });
      setIsInteracting({
        interaction: "sleeping",
        duration: 10,
        image: `/assets/images/interaction/sleeping.png`,
      });
    }
  }

  function handleConfirm(value) {
    subtractMoney(value);
    setConfirmationPopUpContent({ ...confirmationPopUpContent, show: false });
    onUpdatePet({
      ...currentPet,
      isDead: false,
      hunger: 50,
      happiness: 25,
      energy: 50,
      health: 42,
    });
  }

  return (
    <>
      <StyledBackgroundImageWrapper>
        <StyledTimeBackground currenttime={hour} currentseason={season} />
        {isRaining && (
          <StyledRainBackground
            iswinter={season === 3 ? "true" : "false"}
            currentseason={season}
          />
        )}

        <StyledWallBackground />

        <header>
          <StyledLink href={"/"}>Back</StyledLink>

          <StyledNameSection>
            <StyledNameWrapper>
              <h1 onClick={() => router.push(`/edit/${id}`)}>{name}</h1>
              <StyledEditImage
                src={editIcon}
                alt="edit button"
                height={20}
                width={20}
                onClick={() => router.push(`/edit/${id}`)}
              />
            </StyledNameWrapper>
            <StyledXPBar $value={percentageLevelProgress(xp)}>
              Level: <span>{calculateLevel(xp)}</span>
            </StyledXPBar>
          </StyledNameSection>
          <Calendar day={day} season={season} />
          <Clock hour={hour} />
          <StatusBarWrapper>
            <StatusBar text={"Health"} value={currentPet.health} />
            <StatusBar text={"Hunger"} value={currentPet.hunger} />
            <StatusBar text={"Happiness"} value={currentPet.happiness} />
            <StatusBar text={"Energy"} value={currentPet.energy} />
          </StatusBarWrapper>
          <StyledMoneyHandleSection>
            <StyledButton
              onClick={() => {
                router.push(`/${id}/shop/`);
              }}
            >
              Shop
            </StyledButton>
            <StyledButton
              onClick={() => {
                router.push(`/${id}/inventory`);
              }}
            >
              inventory
            </StyledButton>
            <StyledButton
              onClick={() => router.push(`/${id}/minigames/obstacle-jumper`)}
            >
              Obstacle Jumper
            </StyledButton>
            <StyledButton
              onClick={() => router.push(`/${id}/minigames/merge-pets/`)}
            >
              Merge Pets
            </StyledButton>
            <StyledButton
              onClick={() => router.push(`/${id}/minigames/treasure-hunt/`)}
            >
              Treasure Hunt
            </StyledButton>
          </StyledMoneyHandleSection>
        </header>
        <StyledPetDetailPageMain>
          <StyledGameArea>
            <SyledInteractionButtonWrapper>
              <button
                disabled={isInteracting.duration > 0 || currentPet.isDead}
                onClick={() => setFeedButtonPopUp(true)}
              >
                <Image
                  alt="Hunger"
                  src={hungerImage}
                  width={50}
                  height={50}
                ></Image>
              </button>
              {feedButtonPopUp !== false && (
                <HungerInventoryPopUp
                  onFeedButton={handleFeedButton}
                  onCancel={() => setFeedButtonPopUp(false)}
                  petId={id}
                />
              )}
              <button
                onClick={() => setPlayButtonPopUp(true)}
                disabled={isInteracting.duration > 0 || currentPet.isDead}
              >
                <Image
                  alt="Happiness"
                  src={happinessImage}
                  width={50}
                  height={50}
                ></Image>
              </button>
              {playButtonPopUp !== false && (
                <ToyInventoryPopUp
                  onPlayButton={handlePlayButton}
                  onCancel={() => setPlayButtonPopUp(false)}
                  petId={id}
                />
              )}
            </SyledInteractionButtonWrapper>
            <StyledPetContainer>
              {isDead && (
                <StyledReviewButton
                  onClick={() => {
                    if (money >= 200) {
                      setConfirmationPopUpContent({
                        ...confirmationPopUpContent,
                        show: true,
                        message: `Are you sure you want to revive ${name}? `,
                        onConfirm: () => handleConfirm(200),
                        onCancel: () =>
                          setConfirmationPopUpContent({
                            ...confirmationPopUpContent,
                            show: false,
                          }),
                      });
                    } else {
                      setConfirmationPopUpContent({
                        ...confirmationPopUpContent,
                        show: true,
                        message: `You don't have enough money for this. `,
                        onConfirm: () =>
                          setConfirmationPopUpContent({
                            ...confirmationPopUpContent,
                            show: false,
                          }),
                        onCancel: null,
                      });
                    }
                  }}
                >
                  Revive {name} costs
                  <MoneyColored cost={200} money={money} /> <MoneyImage />
                </StyledReviewButton>
              )}
              {isInteracting.duration > 0 && (
                <StyledInteractionImage
                  src={isInteracting.image}
                  alt="interaction icon"
                  height={50}
                  width={50}
                  $animationstyle={isInteracting.interaction}
                />
              )}
              <StyledPetImage
                src={isDead ? graveImage : image}
                alt={type}
                height={150}
                width={150}
              />
            </StyledPetContainer>
            <SyledInteractionButtonWrapper>
              <button
                onClick={() => handleSleep(100)}
                disabled={isInteracting.duration > 0 || currentPet.isDead}
              >
                <Image
                  alt="Energy"
                  src={energyImage}
                  width={50}
                  height={50}
                ></Image>
              </button>
            </SyledInteractionButtonWrapper>
          </StyledGameArea>
        </StyledPetDetailPageMain>
      </StyledBackgroundImageWrapper>
      {confirmationPopUpContent.show && (
        <ConfirmationPopup
          message={confirmationPopUpContent.message}
          onConfirm={confirmationPopUpContent.onConfirm}
          onCancel={confirmationPopUpContent.onCancel}
        />
      )}
      {isEventPopUpActive && petEvent && (
        <ConfirmationPopup
          onConfirm={onDisableIsEventPopUpActive}
          message={petEvent.description}
        />
      )}
    </>
  );
}
