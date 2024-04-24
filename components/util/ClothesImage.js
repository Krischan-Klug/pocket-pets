import Image from "next/image";
import bedImage from "/public/assets/images/clothes/day-bed-red-yellow.png";

export default function ClothesImage({ width = 18, height = 18 }) {
  return <Image src={bedImage} alt="Bed Image" width={width} height={height} />;
}
