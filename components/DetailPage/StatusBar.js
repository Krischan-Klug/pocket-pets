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

const StyledStatusBar = styled.div`
  background-color: green;
  color: white;
  border-radius: 10px;
  width: 75%;
  padding-left: 20px;
`;

export default function StatusBar({ text }) {
  return (
    <StyledStatusBarContainer>
      <StyledStatusBar>{text}</StyledStatusBar>
    </StyledStatusBarContainer>
  );
}
