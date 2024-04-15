import styled from "styled-components";
import backgroundImage from "public/assets/images/backgrounds/background1.png";
import staticBackgroundImage from "public/assets/images/backgrounds/background2.png";
import rainBackground from "public/assets/images/backgrounds/rain.gif";
import snowBackground from "public/assets/images/backgrounds/snowing.gif";

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
  // Spring
  [
    "rgb(0, 17, 26)", // 0 Uhr
    "rgb(0, 17, 26)", // 1 Uhr
    "rgb(0, 17, 26)", // 2 Uhr
    "rgb(0, 17, 26)", // 3 Uhr
    "rgb(0, 17, 26)", // 4 Uhr
    "rgb(0, 30, 46)", // 5 Uhr
    "rgb(0, 61, 94)", // 6 Uhr
    "rgb(0, 98, 153)", // 7 Uhr
    "rgb(0, 137, 214)", // 8 Uhr
    "rgb(0, 163, 255)", // 9 Uhr
    "rgb(0, 163, 255)", // 10 Uhr
    "rgb(0, 163, 255)", // 11 Uhr
    "rgb(0, 163, 255)", // 12 Uhr
    "rgb(0, 163, 255)", // 13 Uhr
    "rgb(0, 163, 255)", // 14 Uhr
    "rgb(0, 163, 255)", // 15 Uhr
    "rgb(0, 163, 255)", // 16 Uhr
    "rgb(0, 116, 181)", // 17 Uhr
    "rgb(0, 71, 110)", // 18 Uhr
    "rgb(0, 43, 66)", // 19 Uhr
    "rgb(0, 17, 26)", // 20 Uhr
    "rgb(0, 17, 26)", // 21 Uhr
    "rgb(0, 17, 26)", // 22 Uhr
    "rgb(0, 17, 26)", // 23 Uhr
  ],
  // Summer
  [
    "rgb(0, 17, 26)", // 0 Uhr
    "rgb(0, 17, 26)", // 1 Uhr
    "rgb(0, 17, 26)", // 2 Uhr
    "rgb(0, 17, 26)", // 3 Uhr
    "rgb(0, 30, 46)", // 4 Uhr
    "rgb(0, 61, 94)", // 5 Uhr
    "rgb(0, 98, 153)", // 6 Uhr
    "rgb(0, 137, 214)", // 7 Uhr
    "rgb(0, 137, 214)", // 8 Uhr
    "rgb(0, 163, 255)", // 9 Uhr
    "rgb(0, 163, 255)", // 10 Uhr
    "rgb(0, 163, 255)", // 11 Uhr
    "rgb(0, 163, 255)", // 12 Uhr
    "rgb(0, 163, 255)", // 13 Uhr
    "rgb(0, 163, 255)", // 14 Uhr
    "rgb(0, 163, 255)", // 15 Uhr
    "rgb(0, 163, 255)", // 16 Uhr
    "rgb(0, 163, 255)", // 17 Uhr
    "rgb(0, 163, 255)", // 18 Uhr
    "rgb(0, 163, 255)", // 19 Uhr
    "rgb(0, 163, 255)", // 20 Uhr
    "rgb(0, 163, 255)", // 21 Uhr
    "rgb(0, 98, 153)", // 22 Uhr
    "rgb(0, 61, 94)", // 23 Uhr
  ],
  // Autumn
  [
    "rgb(0, 17, 26)", // 0 Uhr
    "rgb(0, 17, 26)", // 1 Uhr
    "rgb(0, 17, 26)", // 2 Uhr
    "rgb(0, 17, 26)", // 3 Uhr
    "rgb(0, 17, 26)", // 4 Uhr
    "rgb(0, 30, 46)", // 5 Uhr
    "rgb(0, 61, 94)", // 6 Uhr
    "rgb(0, 98, 153)", // 7 Uhr
    "rgb(0, 137, 214)", // 8 Uhr
    "rgb(0, 163, 255)", // 9 Uhr
    "rgb(0, 163, 255)", // 10 Uhr
    "rgb(0, 163, 255)", // 11 Uhr
    "rgb(0, 163, 255)", // 12 Uhr
    "rgb(0, 163, 255)", // 13 Uhr
    "rgb(0, 163, 255)", // 14 Uhr
    "rgb(0, 163, 255)", // 15 Uhr
    "rgb(0, 163, 255)", // 16 Uhr
    "rgb(0, 116, 181)", // 17 Uhr
    "rgb(0, 71, 110)", // 18 Uhr
    "rgb(0, 43, 66)", // 19 Uhr
    "rgb(0, 17, 26)", // 20 Uhr
    "rgb(0, 17, 26)", // 21 Uhr
    "rgb(0, 17, 26)", // 22 Uhr
    "rgb(0, 17, 26)", // 23 Uhr
  ],
  // Winter
  [
    "rgb(0, 17, 26)", // 0 Uhr
    "rgb(0, 17, 26)", // 1 Uhr
    "rgb(0, 17, 26)", // 2 Uhr
    "rgb(0, 17, 26)", // 3 Uhr
    "rgb(0, 17, 26)", // 4 Uhr
    "rgb(0, 17, 26)", // 5 Uhr
    "rgb(0, 30, 46)", // 6 Uhr
    "rgb(0, 30, 46)", // 7 Uhr
    "rgb(0, 61, 94)", // 8 Uhr
    "rgb(0, 98, 153)", // 9 Uhr
    "rgb(0, 137, 214)", // 10 Uhr
    "rgb(0, 163, 255)", // 11 Uhr
    "rgb(0, 163, 255)", // 12 Uhr
    "rgb(0, 163, 255)", // 13 Uhr
    "rgb(0, 163, 255)", // 14 Uhr
    "rgb(0, 163, 255)", // 15 Uhr
    "rgb(0, 163, 255)", // 16 Uhr
    "rgb(0, 116, 181)", // 17 Uhr
    "rgb(0, 71, 110)", // 18 Uhr
    "rgb(0, 43, 66)", // 19 Uhr
    "rgb(0, 17, 26)", // 20 Uhr
    "rgb(0, 17, 26)", // 21 Uhr
    "rgb(0, 17, 26)", // 22 Uhr
    "rgb(0, 17, 26)", // 23 Uhr
  ],
];

export const StyledTimeBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ currentseason, currenttime }) => {
    const currentHourColor = timeColor[currentseason][currenttime];
    return currentHourColor || "rgb(0, 17, 26)";
  }};
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

export const StyledRainBackground = styled.div`
  background-image: ${({ iswinter }) =>
    iswinter === "true"
      ? `url(${snowBackground.src})`
      : `url(${rainBackground.src})`};
  background-size: cover;
  background-position-x: center;
  background-position-y: top;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -20;
`;
