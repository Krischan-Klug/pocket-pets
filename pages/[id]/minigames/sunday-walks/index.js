import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import StyledLink from "@/components/StyledComponents/StyledLink";
import StyledButton from "@/components/StyledComponents/StyledButton";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";

const gameScreenSize = [800, 800];

const StyledGameScreen = styled.canvas`
  /* background-color: rgb(159, 197, 98); */
  /* background-color: rgb(134, 189, 61); */
  border: 4px solid rgb(194, 140, 90);
  /* height: 800px; */
  /* width: 800px; */
  width: ${gameScreenSize[0]}px;
  height: ${gameScreenSize[1]}px;
`;

export default function SundayWalks() {
  const currentPetStart = [
    [8, 7],
    [8, 8],
  ];
  const newPetStart = [8, 3];
  const scale = 40; // Pixel width & height of currentPet
  const defaultSpeed = 100;
  const directions = {
    38: [0, -1], // Up –> not moving on the x-axis but 1 up on the y-axis
    40: [0, 1], // Down
    37: [-1, 0], // Left
    39: [1, 0], // Right
  };

  const [currentPet, setCurrentPet] = useState(currentPetStart);
  const [newPet, setNewPet] = useState(newPetStart);
  const [direction, setDirection] = useState([0, -1]); // first move of currentPet is UP
  const [speed, setSpeed] = useState(null); // OR (null) which would mean currentPet does not move before the Start button is clicked
  const [gameOver, setGameOver] = useState(false);
  const [startPopUpContent, setStartPopUpContent] = useState({
    message:
      "The aim of the game is to meet as many of your pet friends and family members to enjoy a nice day in the park. But be careful that nobody harms himself/herself on the park fences or stumbles over a beloved one. To do this, either press the arrow keys or swipe across the display. Have a nice stroll!",
    onConfirm: () => {
      setStartPopUpContent({ ...startPopUpContent, show: false });
    },
    onCancel: null,
    show: true,
    confirmText: "Start Game",
  });

  const StyledGameScreenRef = useRef();
  const router = useRouter();
  const { id } = router.query;

  function startGame() {
    setCurrentPet(currentPetStart);
    setNewPet(newPetStart);
    setDirection([0, -1]);
    setSpeed(defaultSpeed);
    setGameOver(false);
  }

  function endGame() {
    setSpeed(null);
    setGameOver(true);
  }

  function moveCurrentPet({ keyCode }) {
    keyCode >= 37 && keyCode <= 40 && setDirection(directions[keyCode]);
  } // as soon as a key is pressed the key becomes the keyCode

  function createNewPet() {
    newPet.map((_, i) =>
      Math.floor((Math.random() * gameScreenSize[i]) / scale)
    );
  }

  function checkCollisionFence(headOfThePetLine, pet = currentPet) {
    if (
      headOfThePetLine[0] * scale > gameScreenSize[0] ||
      headOfThePetLine[0] < 0 ||
      headOfThePetLine[1] * scale >= gameScreenSize[1] ||
      headOfThePetLine[1] < 0
    )
      return true;

    for (const segment of pet) {
      if (
        headOfThePetLine[0] === segment[0] &&
        headOfThePetLine[1] === segment[1]
      )
        return true;
    }
    return false;
  }

  function checkCollisionPetFriends(newAnimal) {
    if (newAnimal[0][0] === newPet[0] && newAnimal[0][1] === newPet[1]) {
      let newPetFriend = createNewPet();
      while (checkCollisionFence(newPetFriend, newAnimal)) {
        newPetFriend = createNewPet();
      }
      setNewPet(newPetFriend);
      return true;
    }
    return false;
  }

  function gameLoop() {
    const currentPetCopy = JSON.parse(JSON.stringify(currentPet)); // the complete line of pets
    const petHead = [
      currentPetCopy[0][0] + direction[0],
      currentPetCopy[0][1] + direction[1],
    ]; // first we take the x-coordinate, than the y-coordinate
    currentPetCopy.unshift(petHead);
    if (checkCollisionFence(petHead)) endGame();
    if (!checkCollisionPetFriends(currentPetCopy));
    currentPetCopy.pop(); // will delete first element of array
    setNewPet(currentPetCopy);
  }

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

  // everything that happens in my GameScreen & Game Over:
  useEffect(() => {
    const gameScreenRef = StyledGameScreenRef.current;
    if (gameScreenRef) {
      const context = gameScreenRef.getContext("2d"); // 2d means drawing in 2D instead e.g. in 3D
      if (context) {
        context.setTransform(scale, 0, 0, scale, 0, 0); // each render cycle the scale is set back to 0. this prevents the scale value from adding up
        context.clearRect(0, 0, gameScreenRef.width, gameScreenRef.height); // clears the gameScreen befor it is rendered again

        context.fillStyle = "red"; // currentPet on gameScreen
        currentPet.forEach(([x, y]) =>
          context.fillRect(x * scale, y * scale, scale, scale)
        );
        console.log("CURRENTPET: ", currentPet);

        context.fillStyle = "blue"; // newPet on gameScreen
        context.fillRect(newPet[0] * scale, newPet[1] * scale, scale, scale);
        console.log("NEWPET: ", newPet);
      }
    }
  }, [currentPet, newPet, gameOver]);

  //   //MARKUS CODE FÜR GAME OVER:
  //   //     if (gameOver) {
  //   //       const endPoints = getPoints();
  //   //       const money = Math.floor(endPoints / 8);
  //   //       setConfirmationPopUpContent({
  //   //         ...confirmationPopUpContent,
  //   //         show: true,
  //   //         message: `Game over, your high score is: ${endPoints}. For this you get ${money} 🪙!`,
  //   //         onConfirm: () => {
  //   //           onAddMoney(money);
  //   //           router.push(`/pet-detail-page/${id}`);
  //   //         },
  //   //       });
  //   //     }

  // to start the game loop
  useInterval(() => gameLoop(), speed);

  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={(event) => moveCurrentPet(event)}
    >
      <header>
        <StyledLink href={`/pet-detail-page/${id}`}>Back</StyledLink>
        <h1>Sunday Walks</h1>
      </header>
      <main>
        {/* <p>Current highscore {points} / Current earned {coins}</p> */}
        <StyledGameScreen ref={StyledGameScreenRef}></StyledGameScreen>
        <StyledButton>Cancel</StyledButton>
      </main>
      {gameOver && <p>GAME OVER!</p>}
      {/* {startPopUpContent.show && (
        <ConfirmationPopup
          message={startPopUpContent.message}
          onConfirm={startPopUpContent.onConfirm}
          onCancel={startPopUpContent.onCancel}
          confirmText={startPopUpContent.confirmText}
        />
      )} */}
    </div>
  );
}