import kaboom from "kaboom";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function ObstacleJumper() {
  const router = useRouter();
  const canvasRef = useRef(null);

  useEffect(() => {
    const k = kaboom({
      fullscreen: true,
      scale: 1,
      global: false,
      background: [214, 210, 210],
      canvas: canvasRef.current,
    });

    let score = 0;

    //Scene Management

    k.scene("start", () => {
      const start = k.add([
        k.text("Press to Start"),
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

      k.onUpdate(() => {
        score++;
        scoreText.text = score;
      });

      // UI
      k.add([k.text("Obstacle Jumper"), k.pos(40, 20)]);

      const scoreText = k.add([k.text("Score: " + score), k.pos(40, 60)]);

      //Player
      k.loadSprite("player", "/assets/images/pets/beaver.png");
      const player = k.add([
        k.sprite("player"),
        k.pos(20, k.height() - 250),
        k.area(),
        k.body(),
        k.scale(0.2),
      ]);

      //Movement
      k.onKeyPress("space", () => {
        if (player.isGrounded()) {
          player.jump();
        }
      });

      k.onTouchStart(() => {
        if (player.isGrounded()) {
          player.jump();
        }
      });

      //Collision detection
      player.onCollide("obstacle", () => {
        k.shake();
        //GameoverLogic here!
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
      const gameOver = k.add([
        k.text("Game Over!"),
        k.pos(k.center()),
        k.anchor("center"),
      ]);
      const scoreText = k.add([
        k.text("Score: " + score),
        k.pos(k.center().x, k.center().y + 50),
        k.anchor("center"),
      ]);

      k.onKeyPress("space", () => {
        router.push("/");
      });

      k.onTouchStart(() => {
        router.push("/");
      });
    });
    // Init game
    k.go("start");
  }, []);

  if (!canvasRef.current) {
    return null;
  }

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
