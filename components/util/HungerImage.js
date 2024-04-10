import Image from "next/image";
import hungerImage from "/public/assets/images/interaction/hunger.png";

export default function HungerImage({ width = 18, height = 18 }) {
  return (
    <Image src={hungerImage} alt="Hunger Image" width={width} height={height} />
  );
}
