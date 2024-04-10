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
import { foods } from "@/lib/shop";
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
0% {opacity: 1; transform: translateX(0);}
100% {opacity: 0; transform: translateX(100);}
`;

const StyledInteractionImage = styled(Image)`
  position: absolute;
  top: 0;
  right: 30%;
  animation: ${(props) => {
      if (props.animationStyle === "sleeping") return sleepingAnimation;
      if (props.animationStyle === "toy") return toyAnimation;
      if (props.animationStyle === "food") return foodAnimation;
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
  myPets,
  onGameUpdate,
  onUpdatePet,
  userStats,
  onSubtracMoney,
  onUpdateInventoryFood,
  currentTime,
  isRaining,
}) {
  const [currentPet, setCurrentPet] = useState(null);
  const [isInteracting, setIsInteracting] = useState({
    duration: 0,
    interaction: "",
  });
  const [confirmationPopUpContent, setConfirmationPopUpContent] = useState({
    message: "",
    onConfirm: null,
    onCancel: null,
    show: false,
  });
  const [feedButtonPopUp, setFeedButtonPopUp] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  //Gameloop 1.000ms Cycle
  useEffect(() => {
    if (!id) return;

    const pet = myPets.find((myPet) => myPet.id == id);
    if (!pet) return;

    setCurrentPet(pet);

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

  const {
    name,
    type,
    image,
    health,
    hunger,
    happiness,
    energy,
    isDead,
    level,
    xp,
  } = currentPet;

  function handleFeed(foodToGive) {
    if (!currentPet.isDead) {
      const updatedHunger = currentPet.hunger + foodToGive;
      onUpdatePet({
        ...currentPet,
        hunger: updatedHunger > 100 ? 100 : updatedHunger,
        xp: currentPet.xp + foodToGive,
        level: calculateLevel(currentPet.xp),
      });
      setIsInteracting({ interaction: "food", duration: 5 });
    }
  }

  function handleFeedButton(foodItemId) {
    setFeedButtonPopUp(false);
    onUpdateInventoryFood(-1, foodItemId);
    handleFeed(foods.find((food) => food.id === foodItemId).hunger);
  }

  function handlePlay(toyToGive) {
    if (!currentPet.isDead) {
      const updatedHappiness = currentPet.happiness + toyToGive;
      onUpdatePet({
        ...currentPet,
        happiness: updatedHappiness > 100 ? 100 : updatedHappiness,
        xp: currentPet.xp + toyToGive,
        level: calculateLevel(currentPet.xp),
      });

      setIsInteracting({ interaction: "toy", duration: 5 });
    }
  }

  function handleSleep() {
    if (!currentPet.isDead) {
      onUpdatePet({
        ...currentPet,
        xp: currentPet.xp + 15,
        level: calculateLevel(currentPet.xp),
      });
      setIsInteracting({ interaction: "sleeping", duration: 10 });
    }
  }

  function handleConfirm(value) {
    onSubtracMoney(value);
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
        <StyledTimeBackground currentTime={currentTime} />
        {isRaining && <StyledRainBackground />}

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
              onClick={() => router.push(`/${id}/minigames/obstacle-jumper`)}
            >
              Obstacle Jumper
            </StyledButton>
            <StyledButton
              onClick={() => router.push(`/${id}/minigames/merge-pets/`)}
            >
              Merge Pets
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
                  userStats={userStats}
                  petId={id}
                />
              )}
              <button
                onClick={() => handlePlay(10)}
                disabled={isInteracting.duration > 0 || currentPet.isDead}
              >
                <Image
                  alt="Happiness"
                  src={happinessImage}
                  width={50}
                  height={50}
                ></Image>
              </button>
            </SyledInteractionButtonWrapper>
            <StyledPetContainer>
              {isDead && (
                <StyledReviewButton
                  onClick={() => {
                    if (userStats.money >= 200) {
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
                  <MoneyColored cost={200} money={userStats.money} />{" "}
                  <MoneyImage />
                </StyledReviewButton>
              )}
              {isInteracting.duration > 0 && (
                <StyledInteractionImage
                  src={`/assets/images/interaction/${isInteracting.interaction}.png`}
                  alt="interaction icon"
                  height={50}
                  width={50}
                  animationStyle={isInteracting.interaction}
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
    </>
  );
}
