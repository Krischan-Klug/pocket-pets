import styled from "styled-components";

const StyledStatusBarContainer = styled.div`
  background-color: lightgrey;
  border-radius: 10px;
  height: 20px;
  width: 80%;
  display: flex;
  align-items: center;
  margin: 5px;
`;

// Interpolating hue from 0 (red) to 120 (green)
function interpolateColor(value) {
  const hue = (120 * value) / 100;
  return `hsl(${hue}, 100%, 50%)`;
}

const StyledStatusBar = styled.p`
  background-color: ${(props) => interpolateColor(props.$value)};
  color: black;
  border-radius: 10px;
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
