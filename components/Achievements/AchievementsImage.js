import Image from "next/image";
import trophy from "/public/assets/icons/trophy.png";

export default function AchievementsImage({ width = 18, height = 18 }) {
  return (
    <Image src={trophy} alt="Trophy Image" width={width} height={height} />
  );
}
