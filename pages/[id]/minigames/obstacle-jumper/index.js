import kaboom from "kaboom";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function ObstacleJumper({ onAddMoney, myPets }) {
  const router = useRouter();
  const id = router.query.id;
  const canvasRef = useRef(null);

  useEffect(() => {
    const k = kaboom({
      fullscreen: true,
      scale: 1,
      global: false,
      background: [214, 210, 210],
      canvas: canvasRef.current,
    });

    const actualPet = myPets.find((myPet) => myPet.id === id);

    if (!actualPet) {
      return;
    }

    let score = 0;

    //Scene Management

    k.scene("start", () => {
      const start = k.add([
        k.text("Press SPACE to Start"),
        k.pos(k.center().x, k.center().y - 100),
        k.anchor("center"),
        k.area(),
      ]);

      start.onKeyPress("space", () => {
        k.go("game");
      });

      start.onTouchStart(() => {
        k.go("game");
      });
    });

    k.scene("game", () => {
      //Globals
      k.setGravity(1400);

      let timeElapsed = 0;

      function customDeltaTime() {
        timeElapsed += k.dt();

        if (timeElapsed >= 1) {
          score++;
          scoreText.text = score;
          timeElapsed -= 1;
        }
      }

      k.onUpdate(() => {
        customDeltaTime();
      });

      // UI
      k.add([k.text("Obstacle Jumper"), k.pos(40, 20)]);

      const scoreText = k.add([k.text("Score: " + score), k.pos(40, 60)]);

      //Player
      k.loadSprite("player", actualPet.image);
      const player = k.add([
        k.sprite("player"),
        k.pos(20, k.height() - 250),
        k.area(),
        k.body(),
        k.scale(0.2),
      ]);

      //Movement
      function jumpLogic() {
        if (player.isGrounded()) {
          player.jump();
        }
      }
      k.onKeyPress("space", () => {
        jumpLogic();
      });

      k.onTouchStart(() => {
        jumpLogic();
      });

      //Collision detection
      player.onCollide("obstacle", () => {
        k.shake();
        k.go("gameover");
      });

      function spawnObstacle() {
        k.wait(k.rand(1.5, 2), () => {
          k.loadSprite("obstacle", "/assets/images/obstaclejumper/crate.png");
          const obstacle = k.add([
            k.sprite("obstacle"),
            k.scale(0.11),
            k.area(),
            k.pos(k.width() - 20, k.height() - 120),
            k.anchor("botleft"),
            k.move(0, -300),
            k.offscreen({ destroy: true }),
            "obstacle",
          ]);
          spawnObstacle();
        });
      }

      spawnObstacle();

      //Ground
      const ground = k.add([
        k.rect(k.width(), 160),
        k.pos(0, k.height() - 120),
        k.area(),
        k.body({ isStatic: true }),
        k.color(77, 150, 9),
      ]);
    });

    k.scene("gameover", () => {
      const moneyToAdd = Math.floor(score * 1.1);
      const gameOver = k.add([
        k.text("Game Over!"),
        k.pos(k.center().x, k.center().y - 100),
        k.anchor("center"),
      ]);
      const scoreText = k.add([
        k.text("Score: " + score),
        k.pos(k.center().x, k.center().y),
        k.anchor("center"),
      ]);

      const moneyEarnText = k.add([
        k.text("You earned: "),
        k.pos(k.center().x, k.center().y + 100),
        k.anchor("center"),
      ]);
      const moneyEarnCount = k.add([
        k.text(moneyToAdd + " Coins"),
        k.pos(k.center().x, k.center().y + 150),
        k.anchor("center"),
      ]);

      const endText = k.add([
        k.text("Press SPACE to End"),
        k.pos(k.center().x, k.center().y + 200),
        k.anchor("center"),
      ]);

      function endGame() {
        onAddMoney(moneyToAdd);

        //Router wont work here, reload is needed!
        window.location.href = `/pet-detail-page/${id}`;
      }

      k.onKeyPress("space", () => {
        endGame();
      });

      k.onTouchStart(() => {
        endGame();
      });
    });
    // Init game
    k.go("start");
  }, []);

  if (!canvasRef.current) {
    return null;
  }

  return <canvas ref={canvasRef}></canvas>;
}
