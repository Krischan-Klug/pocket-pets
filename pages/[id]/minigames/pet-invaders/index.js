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
      const TIME_LEFT = 30;
      const BULLET_SPEED = 400;

      k.loadSprite("largealien", "/assets/images/pet-invaders/LargeAlien.png");
      k.loadSprite("enemie1", "/assets/images/pets/bear.png");

      //Player
      const player = k.add([
        k.sprite("player-image"),
        k.pos(k.width() / 2 - 20, 470),
        k.area({ scale: 3, offset: k.vec2(-130, 0) }),
        k.body(),
        k.scale(0.07),
        "player",
      ]);
      player.add([k.sprite("ufo-image"), k.pos(-550, -600), k.scale(3.5)]);

      //playerborder
      const leftBorder = k.add([
        k.sprite("wall"),
        k.pos(k.width() / 2 - 215, 485),
        k.area(),
        k.body({ isStatic: true }),
        "leftBorder",
      ]);
      const rightBorder = k.add([
        k.sprite("wall"),
        k.pos(k.width() / 2 + 180, 485),
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

      k.addLevel(
        [
          "        ",
          " &&&&&& ",
          " &&&&&& ",
          " &&&&&& ",
          " &&&&&& ",
          "        ",
          "        ",
        ],
        {
          tileWidth: 48,
          tileHeight: 48,
          tiles: {
            "!": () => [
              k.sprite("largealien"),
              k.scale(0.04),
              k.area(),
              "space-invader",
            ],
            "&": () => [
              k.sprite("enemie1"),
              k.scale(0.094),
              k.area(),
              "space-invader",
            ],
          },
        }
      );

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
        //k.destroy(s);
        score.value++;
        score.text = score.value;
      });

      const score = k.add([
        k.text("0"),
        k.pos(50, 50),
        k.scale(2),
        {
          value: 0,
        },
      ]);

      /*
      layer(["obj", "ui"], "obj");

      addLevel(
        [
          "!^^^^^^^^^^^^    &",
          "!^^^^^^^^^^^^    &",
          "!^^^^^^^^^^^^    &",
          "!                &",
          "!                &",
          "!                &",
          "!                &",
          "!                &",
          "!                &",
          "!                &",
          "!                &",
          "!                &",
        ],
        {
          width: 30,
          height: 22,
          "^": [sprite("space-invader"), scale(0.7), "space-invader"],
          "!": [sprite("wall"), "left-wall"],
          "&": [sprite("wall"), "right-wall"],
        }
      );

      const player = add([
        sprite("space-ship"),
        pos(width() / 2, height() / 2),
        origin("center"),
      ]);

      keyDown("left", () => {
        player.move(-MOVE_SPEED, 0);
      });

      keyDown("right", () => {
        player.move(MOVE_SPEED, 0);
      });

      function spawnBullet(p) {
        add([
          rect(6, 18),
          pos(p),
          origin("center"),
          color(0.5, 0.5, 1),
          "bullet",
        ]);
      }

      keyPress("space", () => {
        spawnBullet(player.pos.add(0, -25));
      });

      action("bullet", (b) => {
        b.move(0, -BULLET_SPEED);
        if (b.pos.y < 0) {
          destroy(b);
        }
      });

      collides("bullet", "space-invader", (b, s) => {
        camShake(4);
        destroy(b);
        destroy(s);
        score.value++;
        score.text = score.value;
      });

      const score = add([
        text("0"),
        pos(50, 50),
        layer("ui"),
        scale(3),
        {
          value: 0,
        },
      ]);

      const timer = add([
        text("0"),
        pos(100, 50),
        scale(2),
        layer("ui"),
        {
          time: TIME_LEFT,
        },
      ]);

      timer.action(() => {
        timer.time -= dt();
        timer.text = timer.time.toFixed(2);
        if (timer.time <= 0) {
          go("lose", { score: score.value });
        }
      });

      action("space-invader", (s) => {
        s.move(CURRENT_SPEED, 0);
      });

      collides("space-invader", "right-wall", () => {
        CURRENT_SPEED = -INVADER_SPEED;
        every("space-invader", (s) => {
          s.move(0, LEVEL_DOWN);
        });
      });

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
