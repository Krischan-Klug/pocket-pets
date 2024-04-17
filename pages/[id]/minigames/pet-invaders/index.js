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
      background: [32, 32, 32],
      canvas: canvasRef.current,
    });

    const actualPet = myPets.find((myPet) => myPet.id === id);

    if (!actualPet) {
      return;
    }

    let score = 0;

    //Scene Management
    k.scene("start", () => {
      const space = k.add([
        k.text("Press SPACE"),
        k.pos(k.center().x, k.center().y - 100),
        k.anchor("center"),
        k.area(),
      ]);

      const start = k.add([
        k.text("to Start"),
        k.pos(k.center().x, k.center().y - 50),
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
      const MOVE_SPEED = 200;
      let MOVE_DOWN = 72;
      const BULLET_SPEED = 400;

      k.loadSprite("largealien", "/assets/images/pet-invaders/LargeAlien.png");
      k.loadSprite("enemie1", "/assets/images/pets/bear.png");
      k.loadSprite("wall", "/assets/images/pets/hen.png");

      //Player
      k.loadSprite("player", actualPet.image);
      const player = k.add([
        k.sprite("player"),
        k.pos(k.width() / 2 - 51, 400),
        k.area(),
        k.body(),
        k.scale(0.2),
        "player",
      ]);

      k.onKeyDown("left", () => {
        player.move(-MOVE_SPEED, 0);
      });

      k.onKeyDown("right", () => {
        player.move(MOVE_SPEED, 0);
      });

      k.onClick(() => {
        player.move(MOVE_SPEED, 0);
      });

      // UI
      k.add([k.text("Pet Invaders"), k.pos(40, 20)]);

      const level = [
        "! &&&&&&&&?",
        "! &&&&&&&&?",
        "! &&&&&&&&?",
        "! &&&&&&&&?",
        "! &&&&&&&&?",
        "!         ?",
        "!         ?",
        "!         ?",
        "!         ?",
        "!         ?",
        "!         ?",
        "!         ?",
      ];

      k.addLevel(level, {
        tileWidth: 36,
        tileHeight: 36,
        tiles: {
          "!": () => [k.sprite("wall"), k.scale(0.001), k.area(), "wall-left"],
          "?": () => [k.sprite("wall"), k.scale(0.001), k.area(), "wall-right"],
          "&": () => [
            k.sprite("enemie1"),
            k.scale(0.07),
            k.area(),
            patrol(),
            "space-invader",
          ],
        },
      });

      function patrol(INVADER_SPEED = 120, dir = 1) {
        return {
          id: "patrol",
          require: ["area"],
          add() {
            k.onCollide("wall-right", "space-invader", () => {
              dir = -1;
              this.move(0, MOVE_DOWN);
            });
            k.onCollide("wall-left", "space-invader", () => {
              dir = 1;
              this.move(0, MOVE_DOWN);
            });
          },
          update() {
            this.move(INVADER_SPEED * dir, 0);
          },
        };
      }

      function spawnBullet(pos) {
        const bullet = k.add([
          k.rect(4, 20),
          k.pos(pos),
          k.area(),
          k.color(0, 0, 255),
          k.offscreen({ destroy: true }),
          k.move(-90, BULLET_SPEED),
          "bullet",
        ]);
      }

      k.onKeyPress("space", () => {
        spawnBullet(player.pos.add(20, -25));
      });

      k.onCollide("bullet", "space-invader", (bullet, enemy) => {
        k.shake(1);
        k.destroy(bullet);
        k.destroy(enemy);
        score++;
        scoreText.text = score;
      });

      k.onCollide("player", "space-invader", (bullet, enemy) => {
        k.shake(5);
        k.go("gameover");
      });

      const scoreText = k.add([k.text("0"), k.pos(50, 50), k.scale(2)]);

      const timer = k.add([
        k.text("0"),
        k.pos(50, 100),
        k.scale(2),
        {
          time: TIME_LEFT,
        },
      ]);

      function customTime() {
        timeElapsed += k.dt();
        timer.value = timeElapsed;
        timer.text = timer.value;
      }

      k.onUpdate(() => {
        customTime();
        if (score == 40) {
          k.go("win");
        }
      });
    });

    k.scene("win", () => {
      const moneyToAdd = Math.floor(score * 2);
      k.add([
        k.text("Win!"),
        k.pos(k.center().x, k.center().y - 100),
        k.anchor("center"),
      ]);
      k.add([
        k.text("Score: " + score),
        k.pos(k.center().x, k.center().y),
        k.anchor("center"),
      ]);

      k.add([
        k.text("You earned: "),
        k.pos(k.center().x, k.center().y + 100),
        k.anchor("center"),
      ]);
      k.add([
        k.text(moneyToAdd + " Coins"),
        k.pos(k.center().x, k.center().y + 150),
        k.anchor("center"),
      ]);

      k.add([
        k.text("Press SPACE to End"),
        k.pos(k.center().x, k.center().y + 200),
        k.anchor("center"),
      ]);

      function endGame() {
        onAddMoney(moneyToAdd);

        //Router wont work here, reload is needed!
        window.location.href = `/pet-detail-page/${id}`;
      }

      player.overlaps("space-invader", () => {
        go("lose", { score: score.value });
      });

      action("space-invader", (s) => {
        if (s.pos.y >= 12 * 22) {
          // if (s.pos.y >= height() /2) {
          go("lose", { score: score.value });
        }
      });
    });

    k.scene("gameover", () => {
      const moneyToAdd = Math.floor(score * 1.5);
      k.add([
        k.text("Game Over!"),
        k.pos(k.center().x, k.center().y - 100),
        k.anchor("center"),
      ]);
      k.add([
        k.text("Score: " + score),
        k.pos(k.center().x, k.center().y),
        k.anchor("center"),
      ]);

      k.add([
        k.text("You earned: "),
        k.pos(k.center().x, k.center().y + 100),
        k.anchor("center"),
      ]);
      k.add([
        k.text(moneyToAdd + " Coins"),
        k.pos(k.center().x, k.center().y + 150),
        k.anchor("center"),
      ]);

      k.add([
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
