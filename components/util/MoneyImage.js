import Image from "next/image";
import moneyImage from "/public/assets/images/dollar.png";

export default function MoneyImage({ width = 18, height = 18 }) {
  return (
    <Image src={moneyImage} alt="Money Image" width={width} height={height} />
  );
}
