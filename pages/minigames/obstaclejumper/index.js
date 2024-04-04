import kaboom from "kaboom";
import { useRef, useEffect } from "react";

export default function ObstacleJumper() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const k = kaboom({
      fullscreen: true,
      scale: 1,
      global: false,
      background: [214, 210, 210],
      canvas: canvasRef.current,
    });
    //Globals
    k.setGravity(1100);

    // Title
    k.add([k.text("Obstacle Jumper"), k.pos(40, 20)]);

    //Player
    k.loadSprite("player", "/assets/images/pets/beaver.png");
    const player = k.add([
      k.sprite("player"),
      k.pos(0, k.height() - 150),
      k.area(),
      k.body(),
      k.scale(0.2),
    ]);

    //Jump
    k.onKeyPress("space", () => {
      if (player.isGrounded()) {
        player.jump();
      }
    });

    //Collision detection
    player.onCollide("obstacle", () => {
      k.shake();
      //GameoverLogic here!
    });

    k.loop(3, () => {
      //Obstacle
      const obstacle = k.add([
        k.rect(50, 50),
        k.area(),
        k.pos(k.width() - 20, k.height() - 20),
        k.anchor("botleft"),
        k.color(255, 0, 0),
        k.move(0, -250),
        k.offscreen({ destroy: true }),
        "obstacle",
      ]);
    });

    //Ground
    const ground = k.add([
      k.rect(k.width(), 20),
      k.pos(0, k.height() - 20),
      k.area(),
      k.body({ isStatic: true }),
      k.color(77, 150, 9),
    ]);
  }, []);

  if (!canvasRef.current) {
    return null;
  }

  return (
    <>
      <canvas
        style={{ width: "100vw", height: "90vw" }}
        ref={canvasRef}
      ></canvas>
    </>
  );
}
