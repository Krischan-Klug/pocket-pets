import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import StyledLink from "@/components/StyledComponents/StyledLink";
import StyledButton from "@/components/StyledComponents/StyledButton";
import styled from "styled-components";

const gameScreenSize = [400, 400];

const StyledGameScreen = styled.canvas`
  /* background-color: rgb(159, 197, 98); */
  background-color: rgb(134, 189, 61);
  border: 4px solid rgb(194, 140, 90);
  width: ${gameScreenSize[0]}px;
  height: ${gameScreenSize[1]}px;
`;

export default function SundayWalks() {
  const petStart = [
    [8, 7],
    [8, 8],
  ];
  const petFriendStart = [8, 3];
  const scale = 20; // Pixel width & height of each pet
  const defaultSpeed = 500;
  const DIRECTIONS = {
    38: [0, -1], // up -> not moving on the x-axis but 1 up on the y-axis
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0], // right
  };

  const [pet, setPet] = useState(petStart);
  const [friend, setFriend] = useState(petFriendStart);
  const [dir, setDir] = useState([0, -1]); // first move of currentPet is UP
  const [speed, setSpeed] = useState(null); // pet does not move before the Start button is clicked
  const [gameOver, setGameOver] = useState(false);

  const canvasRef = useRef();
  const router = useRouter();
  const { id } = router.query;

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

  function endGame() {
    setSpeed(null);
    setGameOver(true);
  }

  const movePet = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]); // as soon as a key is pressed the key becomes the keyCode

  const createFriend = () =>
    friend.map((_a, i) =>
      Math.floor(Math.random() * (gameScreenSize[i] / scale))
    );

  const checkCollision = (piece, snk = pet) => {
    if (
      piece[0] * scale >= gameScreenSize[0] ||
      piece[0] < 0 ||
      piece[1] * scale >= gameScreenSize[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  function checkFriendCollision(newPet) {
    if (newPet[0][0] === friend[0] && newPet[0][1] === friend[1]) {
      let newFriend = createFriend();
      while (checkCollision(newFriend, newPet)) {
        newFriend = createFriend();
      }
      setFriend(newFriend);
      return true;
    }
    return false;
  }

  function gameLoop() {
    const petCopy = JSON.parse(JSON.stringify(pet)); // the complete line of pets
    const newPetHead = [petCopy[0][0] + dir[0], petCopy[0][1] + dir[1]]; // first take the x-coordinate than the y-coordinate
    petCopy.unshift(newPetHead);
    if (checkCollision(newPetHead)) endGame();
    if (!checkFriendCollision(petCopy)) petCopy.pop(); // will delete first element of array
    setPet(petCopy);
  }

  function startGame() {
    setPet(petStart);
    setFriend(petFriendStart);
    setDir([0, -1]);
    setSpeed(defaultSpeed);
    setGameOver(false);
  }

  // everything that happens within gameScreen:
  useEffect(() => {
    const context = canvasRef.current.getContext("2d"); // 2d means drawing in 2D instead of e.g. in 3D
    context.setTransform(scale, 0, 0, scale, 0, 0); // each render cycle the scale is set back to 0. this prevents the scale value from adding up
    context.clearRect(0, 0, window.innerWidth, window.innerHeight); // clears the gameScreen befor it is rendered again
    context.fillStyle = "pink"; // pet appearance on gameScreen
    pet.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "lightblue"; // friend appearance on gameScreen
    context.fillRect(friend[0], friend[1], 1, 1);
  }, [pet, friend, gameOver]);

  return (
    <div role="button" tabIndex="0" onKeyDown={(e) => movePet(e)}>
      <header>
        <StyledLink href={`/pet-detail-page/${id}`}>Back</StyledLink>
        <h1>Sunday Walks</h1>
      </header>
      <main>
        {/* <p>Current highscore {points} / Current earned {coins}</p> */}
        <StyledGameScreen ref={canvasRef} />
        {gameOver && <div>GAME OVER!</div>}
        <StyledButton onClick={startGame}>Start Game</StyledButton>
      </main>
    </div>
  );
}
