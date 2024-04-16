import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import StyledLink from "@/components/StyledComponents/StyledLink";
import styled from "styled-components";
import MoneyImage from "@/components/util/MoneyImage";

const gameScreenSize = [360, 360];
const scale = 18; // Pixel width & height of each pet

const StyledGameScreen = styled.canvas`
  background-color: rgb(134, 189, 61);
  border: 4px solid rgb(194, 140, 90);
  width: ${gameScreenSize[0]}px;
  height: ${gameScreenSize[1]}px;
`;

const StyledEarnedCoins = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const StyledMobileControlsContainer = styled.section`
  padding: 5px;
`;

const ControlButton = styled.button`
  color: var(--button-text-color);
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
  border: none;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 70px;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  gap: 20px;
`;

// object of pet images to use for random new petFriend
const petImages = {
  1: "/assets/images/pets/duck.png",
  2: "/assets/images/pets/hen.png",
  3: "/assets/images/pets/chameleon.png",
  4: "/assets/images/pets/jellyfish.png",
  5: "/assets/images/pets/cat.png",
  6: "/assets/images/pets/beaver.png",
  7: "/assets/images/pets/owl.png",
  8: "/assets/images/pets/bear.png",
  9: "/assets/images/pets/elephant.png",
  10: "/assets/images/pets/whale.png",
  11: "/assets/images/pets/dragon.png",
  100: "/assets/images/dollar.png",
};

export default function SundayWalks({ onAddMoney, myPets }) {
  const petStart = [
    [12, 16],
    [12, 17],
    [12, 18],
  ];
  const petFriendStart = [12, 7];
  const defaultSpeed = 300;
  const defaultDirections = {
    38: [0, -1], // up -> not moving on the x-axis but 1 up on the y-axis
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0], // right
  };

  const [pet, setPet] = useState(petStart);
  const [friend, setFriend] = useState(petFriendStart);
  const [direction, setDirection] = useState([0, -1]); // first move of currentPet is UP
  const [speed, setSpeed] = useState(null); // pet does not move before the Start button is clicked
  const [coins, setCoins] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startPopUpContent, setStartPopUpContent] = useState({
    message:
      "The aim of the game is to collect as many pet coins as you can. But be careful not to stumble over yourself or harm yourself on the park fences. To change directions use the control buttons on the display. Good luck!",
    onConfirm: () => {
      setStartPopUpContent({ ...startPopUpContent, show: false });
      startGame();
    },
    onCancel: null,
    show: true,
    confirmText: "Start Game",
  });

  const canvasRef = useRef();
  const router = useRouter();
  const { id } = router.query;

  //   useEffect(() => {
  //     const handleResize = () => {
  //       setShowMobileControls(window.innerWidth < 600);
  //     };
  //     handleResize(); // Initial check
  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);

  // Invtervall function using custom hook by Dan Abramov
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => gameLoop(), speed); // to start the game loop

  function startGame() {
    setPet(petStart);
    setFriend(petFriendStart);
    setDirection([0, -1]);
    setSpeed(defaultSpeed);
    setGameOver(false);
  }

  function endGame() {
    setSpeed(null);
    setGameOver(true);
  }

  const movePet = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDirection(defaultDirections[keyCode]); // as soon as a key is pressed the key becomes the keyCode

  function movePetMobile(event, keyCode) {
    if (keyCode >= 37 && keyCode <= 40) {
      setDirection(defaultDirections[keyCode]);
    }
  }

  const createFriend = () =>
    friend.map((_, i) =>
      Math.floor(Math.random() * (gameScreenSize[i] / scale))
    );

  // ceck collision park fence or with pet crew
  const checkCollision = (head, newPet = pet) => {
    if (
      head[0] * scale >= gameScreenSize[0] ||
      head[0] < 0 ||
      head[1] * scale >= gameScreenSize[1] ||
      head[1] < 0
    )
      return true;

    for (const body of newPet) {
      if (head[0] === body[0] && head[1] === body[1]) return true;
    }
    return false;
  };

  // meet and collect new friend
  function checkFriendCollision(newPet) {
    if (newPet[0][0] === friend[0] && newPet[0][1] === friend[1]) {
      let newFriend = createFriend();
      while (checkCollision(newFriend, newPet)) {
        newFriend = createFriend();
      }
      setFriend(newFriend);
      setCoins(coins + 5); // Add coins
      return true;
    }
    return false;
  }

  function gameLoop() {
    const petCopy = JSON.parse(JSON.stringify(pet)); // the complete line of pets
    const newPetHead = [
      petCopy[0][0] + direction[0],
      petCopy[0][1] + direction[1],
    ]; // first take the x-coordinate than the y-coordinate
    petCopy.unshift(newPetHead);
    if (checkCollision(newPetHead)) {
      endGame();
    }
    if (!checkFriendCollision(petCopy)) {
      petCopy.pop();
    } // delete first element of array
    setPet(petCopy);
  }

  useEffect(() => {
    const context = canvasRef.current.getContext("2d"); // 2d means drawing in 2D instead of e.g. in 3D
    context.setTransform(scale, 0, 0, scale, 0, 0); // each render cycle the scale is set back to 0. this prevents the scale value from adding up
    context.clearRect(0, 0, window.innerWidth, window.innerHeight); // clears the gameScreen before it is rendered again

    // create pet image:
    // const currentPet = myPets.find((myPet) => myPet.id === id);
    // console.log("currentPet: ", currentPet);

    // const petImage = new Image();
    // petImage.onload = () => {
    //   context.drawImage(petImage, pet[0] * 1, pet[1] * 1, 1, 1);
    // };
    // petImage.src = currentPet.image;

    context.fillStyle = "#f45d48"; // pet appearance on gameScreen
    pet.forEach(([x, y]) => context.fillRect(x, y, 1, 1));

    // create coin image:
    const friendImage = new Image();
    friendImage.onload = () => {
      context.drawImage(friendImage, friend[0] * 1, friend[1] * 1, 1, 1);
    };
    friendImage.src = petImages[100];
    context.fillStyle = "rgb(134, 189, 61)";
    context.fillRect(friend[0], friend[1], 1, 1);
  }, [pet, friend, gameOver]);

  return (
    <div>
      <header>
        <StyledLink href={`/pet-detail-page/${id}`}>Back</StyledLink>
        <h1>Treasure Hunt</h1>
        <StyledEarnedCoins>
          <MoneyImage />
          {coins}
        </StyledEarnedCoins>
      </header>
      <main role="button" tabIndex="0" onKeyDown={(event) => movePet(event)}>
        <StyledGameScreen
          ref={canvasRef}
          width={gameScreenSize[0]}
          height={gameScreenSize[1]}
        />
        <StyledMobileControlsContainer>
          <ButtonContainer>
            <ControlButton
              type="button"
              onClick={(event) => movePetMobile(event, 38)}
            >
              Up
            </ControlButton>
          </ButtonContainer>
          <ButtonContainer>
            <ControlButton
              type="button"
              onClick={(event) => movePetMobile(event, 37)}
            >
              Left
            </ControlButton>
            <ControlButton
              type="button"
              onClick={(event) => movePetMobile(event, 39)}
            >
              Right
            </ControlButton>
          </ButtonContainer>
          <ButtonContainer>
            <ControlButton
              type="button"
              onClick={(event) => movePetMobile(event, 40)}
            >
              Down
            </ControlButton>
          </ButtonContainer>
        </StyledMobileControlsContainer>
        {startPopUpContent.show && (
          <ConfirmationPopup
            message={startPopUpContent.message}
            onConfirm={startPopUpContent.onConfirm}
            onCancel={startPopUpContent.onCancel}
            confirmText={startPopUpContent.confirmText}
          />
        )}
        {gameOver && (
          <ConfirmationPopup
            message={`Congrats, you found ${coins} pet coins!`}
            onConfirm={() => {
              onAddMoney(coins);
              router.push(`/pet-detail-page/${id}`);
            }}
          />
        )}
      </main>
    </div>
  );
}
