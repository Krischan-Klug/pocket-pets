import Image from "next/image";
import hungerImage from "/public/assets/images/interaction/toy.png";

export default function ToyImage({ width = 18, height = 18 }) {
  return (
    <Image src={hungerImage} alt="Toy Image" width={width} height={height} />
  );
}
