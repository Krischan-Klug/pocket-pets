import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import StyledButton from "@/components/StyledComponents/StyledButton";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";

const PlayGround = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 5px;
  height: 235px;
  width: 235px;
  background-color: var(--accent-color);
  padding: 10px;
  border-radius: 8px;
`;

const Square = styled.div`
  color: black;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  ${(props) => {
    switch (props.$squareColor) {
      case "zahl2":
        return `background: rgb(238, 232, 232);`;
      case "zahl4":
        return `background: rgb(223, 213, 192);`;
      case "zahl8":
        return `background: rgb(218, 177, 125);`;
      case "zahl16":
        return `background: rgb(196, 155, 80);`;
      case "zahl32":
        return `background: rgb(194, 140, 90);`;
      case "zahl64":
        return `background: rgb(190, 175, 87);`;
      case "zahl128":
        return `background: rgb(185, 165, 49);`;
      case "zahl256":
        return `background: rgb(159, 197, 98);`;
      case "zahl512":
        return `background: rgb(134, 189, 61);`;
      case "zahl1024":
        return `background: rgb(90, 177, 162);`;
      case "zahl2048":
        return `background: rgb(54, 165, 173);`;
      default:
        return `background: var(--background-color);`;
    }
  }}
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  gap: 5px;

  & > span {
    font-size: 20px;
  }
`;

const petImageMap = {
  2: "/assets/images/pets/duck.png",
  4: "/assets/images/pets/hen.png",
  8: "/assets/images/pets/chameleon.png",
  16: "/assets/images/pets/jellyfish.png",
  32: "/assets/images/pets/cat.png",
  64: "/assets/images/pets/beaver.png",
  128: "/assets/images/pets/owl.png",
  256: "/assets/images/pets/bear.png",
  512: "/assets/images/pets/elephant.png",
  1024: "/assets/images/pets/whale.png",
  2048: "/assets/images/pets/dragon.png",
};

export default function MergePets({ onAddMoney }) {
  const [grid, setGrid] = useState([]);
  const [points, setPoints] = useState(0);
  const [animalImage, setAnimalImage] = useState(true);
  const [confirmationPopUpContent, setConfirmationPopUpContent] = useState({
    message:
      "The aim of the game is to stack as many animals/numbers as possible until the playing field is full. To do this, either press the arrow keys or swipe across the display. All filled fields move to the respective side and the same fields stack to higher value fields.",
    onConfirm: () => {
      setConfirmationPopUpContent({ ...confirmationPopUpContent, show: false });
    },
    onCancel: null,
    show: true,
  });

  const router = useRouter();
  const id = router.query.id;

  //Create a new grid when the page is loaded
  useEffect(() => {
    const grid = [];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        row.push(0);
      }
      grid.push(row);
    }
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    grid[x][y] = 2;
    setGrid(grid);
  }, []);

  //Recalculate points when grid changes
  useEffect(() => {
    setPoints(() => getPoints());
  }, [grid]);

  //Keyboard Input Detection
  useEffect(() => {
    if (!confirmationPopUpContent.show) {
      const handleKeyDown = (event) => {
        switch (event.keyCode) {
          case 38:
            moveUp();
            break;
          case 40:
            moveDown();
            break;
          case 37:
            moveLeft();
            break;
          case 39:
            moveRight();
            break;
        }
      };

      document.body.addEventListener("keydown", handleKeyDown);

      // Cleanup-Function, to remove the event listener
      return () => {
        document.body.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [confirmationPopUpContent.show]);

  //Touch Input Detection
  useEffect(() => {
    if (!confirmationPopUpContent.show) {
      let startX = 0;
      let startY = 0;

      const handleTouchStart = (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
      };

      const handleTouchEnd = (event) => {
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // Determine the direction of the swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Swipe to right and less vertical than 80px
          if (deltaX > 100 && Math.abs(deltaY) < 80) {
            moveRight();
            // Swipe to left and less vertical than 80px
          } else if (deltaX < -100 && Math.abs(deltaY) < 80) {
            moveLeft();
          }
        } else {
          // swipe to down and less horizontal than 80px
          if (deltaY > 100 && Math.abs(deltaX) < 80) {
            moveDown();
            // swipe to up and less horizontal than 80px
          } else if (deltaY < -100 && Math.abs(deltaX) < 80) {
            moveUp();
          }
        }
      };

      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);

      // Cleanup-Function, to remove the event listener
      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [confirmationPopUpContent.show]);

  //Move all filled cells to the left and merge identical fields
  function moveLeft() {
    const newGrid = [...grid];
    // Iterate over each row of the grid.
    for (let j = 0; j < 4; j++) {
      // Iterate over each cell in the current row.
      for (let i = 1; i < 4; i++) {
        // Check if the current cell is not empty (not equal to 0).
        if (newGrid[j][i] !== 0) {
          let k = i;
          // Move the current number as far left as possible.
          while (k > 0 && newGrid[j][k - 1] === 0) {
            newGrid[j][k - 1] = newGrid[j][k];
            newGrid[j][k] = 0;
            k--;
          }
          // Combine two neighboring numbers if they are the same.
          if (k > 0 && newGrid[j][k - 1] === newGrid[j][k]) {
            newGrid[j][k - 1] *= 2;
            newGrid[j][k] = 0;
          }
        }
      }
    }
    setGrid(newGrid);
    newNumber();
  }

  function moveRight() {
    const newGrid = [...grid];
    for (let j = 0; j < 4; j++) {
      for (let i = 4 - 2; i >= 0; i--) {
        if (newGrid[j][i] !== 0) {
          let k = i;
          while (k < 4 - 1 && newGrid[j][k + 1] === 0) {
            newGrid[j][k + 1] = newGrid[j][k];
            newGrid[j][k] = 0;
            k++;
          }
          if (k < 4 - 1 && newGrid[j][k + 1] === newGrid[j][k]) {
            newGrid[j][k + 1] *= 2;
            newGrid[j][k] = 0;
          }
        }
      }
    }
    setGrid(newGrid);
    newNumber();
  }

  function moveUp() {
    const newGrid = [...grid];
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (newGrid[j][i] !== 0) {
          let k = j;
          while (k > 0 && newGrid[k - 1][i] === 0) {
            newGrid[k - 1][i] = newGrid[k][i];
            newGrid[k][i] = 0;
            k--;
          }
          if (k > 0 && newGrid[k - 1][i] === newGrid[k][i]) {
            newGrid[k - 1][i] *= 2;
            newGrid[k][i] = 0;
          }
        }
      }
    }
    setGrid(newGrid);
    newNumber();
  }

  function moveDown() {
    const newGrid = [...grid];
    for (let i = 0; i < 4; i++) {
      for (let j = 4 - 2; j >= 0; j--) {
        if (newGrid[j][i] !== 0) {
          let k = j;
          while (k < 4 - 1 && newGrid[k + 1][i] === 0) {
            newGrid[k + 1][i] = newGrid[k][i];
            newGrid[k][i] = 0;
            k++;
          }
          if (k < 4 - 1 && newGrid[k + 1][i] === newGrid[k][i]) {
            newGrid[k + 1][i] *= 2;
            newGrid[k][i] = 0;
          }
        }
      }
    }
    setGrid(newGrid);
    newNumber();
  }

  function newNumber() {
    const emptyCells = [];

    // Run through the grid to find empty cells
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        if (grid[j][i] === 0) {
          emptyCells.push([j, i]);
        }
      }
    }

    // Check if there are empty cells
    if (emptyCells.length === 0) {
      gameOver();
      return;
    }

    // Random selection of an empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [newX, newY] = emptyCells[randomIndex];

    // Set the new number in the random cell
    const newGrid = [...grid];
    newGrid[newX][newY] = 2;
    setGrid(newGrid);
  }

  function getPoints() {
    let sum = 0;
    grid.forEach((row) => {
      row.forEach((point) => (sum += point));
    });
    return sum;
  }

  function gameOver() {
    const points = getPoints();
    const money = Math.floor(points / 8);
    setConfirmationPopUpContent({
      ...confirmationPopUpContent,
      show: true,
      message: `Game over, your high score is: ${points}. For this you get ${money} coins!`,
      onConfirm: () => {
        onAddMoney(money);
        router.push(`/pet-detail-page/${id}`);
      },
    });
  }

  function renderSquareContent(value) {
    if (value !== 0) {
      return animalImage ? (
        <ImageContainer>
          <Image
            src={petImageMap[value]}
            alt="Pet Image"
            width={40}
            height={40}
          />
        </ImageContainer>
      ) : (
        value
      );
    }
    return "";
  }

  function renderSquareLegend() {
    let content = [];

    Object.entries(petImageMap).forEach(([val, imgUrl], index) => {
      const backgroundColor = `zahl${val}`;
      content.push(
        <Square key={index} $squareColor={backgroundColor}>
          <Image src={imgUrl} alt="Pet Image" width={40} height={40} />
        </Square>
      );
      // Add arrow if not the last item
      if (index !== Object.keys(petImageMap).length - 1) {
        content.push(<span key={`arrow${index}`}>&rarr;</span>);
      }
    });

    return <StyledLegend>{content}</StyledLegend>;
  }

  const toggleDisplay = () => {
    setAnimalImage(!animalImage);
  };

  return (
    <>
      <header>
        <StyledLeftButton onClick={() => router.push(`/pet-detail-page/${id}`)}>
          Back
        </StyledLeftButton>
        <h1>Merge Pets</h1>
      </header>
      <main>
        <p>Current highscore {points}</p>
        <PlayGround>
          {grid.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <Square
                key={`${rowIndex}-${colIndex}`}
                $squareColor={`zahl${value}`}
              >
                {renderSquareContent(value)}
              </Square>
            ))
          )}
        </PlayGround>
        <StyledButton onClick={toggleDisplay}>
          {animalImage ? "Show Numbers" : "Show Images"}
        </StyledButton>
        {renderSquareLegend()}
      </main>
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
