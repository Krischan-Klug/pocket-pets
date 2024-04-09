import styled from "styled-components";
import backgroundImage from "public/assets/images/backgrounds/background1.png";
import staticBackgroundImage from "public/assets/images/backgrounds/background2.png";

export const StyledBackgroundImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const timeColor = [
  "rgb(0, 17, 26)", // 0 Uhr
  "rgb(0, 17, 26)", // 1 Uhr
  "rgb(0, 17, 26)", // 2 Uhr
  "rgb(0, 17, 26)", // 3 Uhr
  "rgb(0, 17, 26)", // 4 Uhr
  "rgb(0, 30, 46)", // 5 Uhr
  "rgb(0, 43, 66)", // 6 Uhr
  "rgb(0, 61, 94)", // 7 Uhr
  "rgb(0, 71, 110)", // 8 Uhr
  "rgb(0, 82, 128)", // 9 Uhr
  "rgb(0, 98, 153)", // 10 Uhr
  "rgb(0, 116, 181)", // 11 Uhr
  "rgb(0, 137, 214)", // 12 Uhr
  "rgb(0, 153, 240)", // 13 Uhr
  "rgb(0, 163, 255)", // 14 Uhr
  "rgb(0, 163, 255)", // 15 Uhr
  "rgb(0, 163, 255)", // 16 Uhr
  "rgb(0, 135, 212)", // 17 Uhr
  "rgb(0, 114, 179)", // 18 Uhr
  "rgb(0, 86, 135)", // 19 Uhr
  "rgb(0, 62, 97)", // 20 Uhr
  "rgb(0, 41, 64)", // 21 Uhr
  "rgb(0, 17, 26)", // 22 Uhr
  "rgb(0, 17, 26)", // 23 Uhr
];

export const StyledTimeBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => timeColor[props.currentTime]};
  position: absolute;
  top: 0;
  left: 0;

  z-index: -30;
`;

export const StyledWallBackground = styled.div`
  background-image: url(${backgroundImage.src});
  background-size: cover;
  background-position-x: center;
  background-position-y: bottom;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -10;
`;

export const StyledStaticBackground = styled.div`
  background-image: url(${staticBackgroundImage.src});
  background-size: cover;
  background-position-x: center;
  background-position-y: top;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -10;
`;
