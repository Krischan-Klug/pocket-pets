import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import StyledLink from "@/components/StyledComponents/StyledLink";
import StyledButton from "@/components/StyledComponents/StyledButton";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";

const StyledGameScreen = styled.canvas`
  /* background-color: rgb(159, 197, 98); */
  background-color: rgb(134, 189, 61);
  border: 4px solid rgb(194, 140, 90);
  height: 300px;
  width: 300px;
`;

export default function SundayWalks() {
  const currentPetStart = [
    [8, 7],
    [8, 8],
  ];
  const newPetStart = [8, 3];
  const scale = 40; // Pixel width & height of currentPet
  // const speed = 100;
  const directions = {
    38: [0, -1], // Up –> not moving on the x-axis but 1 up on the y-axis
    40: [0, 1], // Down
    37: [-1, 0], // Left
    39: [1, 0], // Right
  };

  const [currentPet, setCurrentPet] = useState(currentPetStart);
  const [newPet, setNewPet] = useState(newPetStart);
  const [direction, setDirection] = useState([0, -1]); // first move of currentPet is UP
  const [speed, setSpeed] = useState(0); // OR (null) which would mean currentPet does not move before the Start button is clicked
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
  const router = useRouter(null);
  const { id } = router.query;

  function startGame() {}

  function endGame() {}

  function moveCurrentPet() {}

  function createNewPet() {}

  function checkCollisionFence() {}

  function checkCollisionPetFriends() {}

  function gameLoop() {}

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
      const gameScreenActivity = gameScreenRef.getContext("2d"); // 2D means drawing in 2D instead e.g. in 3D
      if (gameScreenActivity) {
        gameScreenActivity.setTransform(scale, 0, 0, scale, 0, 0); // each render cycle the scale is set back to 0. this prevents the scale value from adding up
        gameScreenActivity.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        ); // clears the gameScreen befor it is rendered again

        gameScreenActivity.fillStyle = "red"; // currentPet on gameScreen
        currentPet.forEach(([x, y]) => gameScreenActivity.fillRect(x, y, 1, 1)); // 1px is enough because the scale value defines the size on the gameScreen

        gameScreenActivity.fillStyle = "blue"; // newPet on gameScreen
        gameScreenActivity.fillRect(newPet[0], newPet[1], 1, 1);
      }
    }
  }, [currentPet, newPet, gameOver]);

  //   useEffect(() => {
  //     const gameScreenActivity = StyledGameScreenRef.current.getContext("2d");
  //     gameScreenActivity.setTransform(scale, 0, 0, scale, 0, 0);
  //     gameScreenActivity.clearRect(0, 0, window.innerWidth, window.innerHeight);

  //     gameScreenActivity.fillStyle = "red";
  //     currentPet.forEach(([x, y]) => gameScreenActivity.fillRect(x, y, 1, 1));

  //     gameScreenActivity.fillStyle = "blue";
  //     newPet.fillRect(newPet[0], newPet[1], 1, 1);

  //     //MARKUS CODE FÜR GAME OVER:
  //     //     if (gameOver) {
  //     //       const endPoints = getPoints();
  //     //       const money = Math.floor(endPoints / 8);
  //     //       setConfirmationPopUpContent({
  //     //         ...confirmationPopUpContent,
  //     //         show: true,
  //     //         message: `Game over, your high score is: ${endPoints}. For this you get ${money} 🪙!`,
  //     //         onConfirm: () => {
  //     //           onAddMoney(money);
  //     //           router.push(`/pet-detail-page/${id}`);
  //     //         },
  //     //       });
  //     //     }
  //     //MARKUS CODE ENDE.
  //   }, [currentPet, newPet, gameOver]);

  return (
    <div
      role="button"
      tableIndex="0"
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
      {startPopUpContent.show && (
        <ConfirmationPopup
          message={startPopUpContent.message}
          onConfirm={startPopUpContent.onConfirm}
          onCancel={startPopUpContent.onCancel}
          confirmText={startPopUpContent.confirmText}
        />
      )}
    </div>
  );
}
