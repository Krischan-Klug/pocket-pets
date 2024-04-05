import styled from "styled-components";

const StyledStatusBarContainer = styled.div`
  background-color: lightgrey;
  border-radius: 12.5px;
  height: 25px;
  width: 80%;
  display: flex;
  align-items: center;
  margin: 5px;
`;

const colors = [
  "#00FF00", //Green
  "#33FF00",
  "#66FF00",
  "#99FF00",
  "#CCFF00",
  "#FFFF00", //Yellow
  "#FFCC00",
  "#FF9900",
  "#FF6600",
  "#FF3300", //Red
];

const StyledStatusBar = styled.p`
  background-color: ${(props) => {
    const index = Math.floor((100 - props.$value) / 10);
    return colors[index];
  }};
  color: black;
  border-radius: 12.5px;
  width: ${(props) => props.$value}%;
  padding-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export default function StatusBar({ text, value }) {
  return (
    <StyledStatusBarContainer>
      <StyledStatusBar $value={Math.floor(value)}>{text}</StyledStatusBar>
    </StyledStatusBarContainer>
  );
}
