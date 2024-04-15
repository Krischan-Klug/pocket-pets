import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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
};

export default function SundayWalks() {
  const petStart = [
    [8, 7],
    [8, 8],
  ];
  const petFriendStart = [8, 3];
  const scale = 20; // Pixel width & height of each pet
  const defaultSpeed = 500;
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

    for (const segment of newPet) {
      if (head[0] === segment[0] && head[1] === segment[1]) return true;
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

  // everything that happens within gameScreen:
  //   useEffect(() => {
  //     const context = canvasRef.current.getContext("2d"); // 2d means drawing in 2D instead of e.g. in 3D
  //     context.setTransform(scale, 0, 0, scale, 0, 0); // each render cycle the scale is set back to 0. this prevents the scale value from adding up
  //     context.clearRect(0, 0, window.innerWidth, window.innerHeight); // clears the gameScreen befor it is rendered again
  //     context.fillStyle = "pink"; // pet appearance on gameScreen
  //     pet.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
  //     context.fillStyle = "lightblue"; // friend appearance on gameScreen
  //     context.fillRect(friend[0], friend[1], 1, 1);
  //   }, [pet, friend, gameOver]);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d"); // 2d means drawing in 2D instead of e.g. in 3D
    context.setTransform(scale, 0, 0, scale, 0, 0); // each render cycle the scale is set back to 0. this prevents the scale value from adding up
    context.clearRect(0, 0, window.innerWidth, window.innerHeight); // clears the gameScreen befor it is rendered again

    context.fillStyle = "pink"; // pet appearance on gameScreen
    pet.forEach(([x, y]) => context.fillRect(x, y, 1, 1));

    const friendImage = Image;
    console.log("FriendImage: ", friendImage);
    context.fillStyle = "lightblue"; // friend appearance on gameScreen. instead of "lightblue" it should show the image of the pet
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
