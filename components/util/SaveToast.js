import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fillWidth = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: calc(50% - 75px);
  width: 150px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  animation: ${slideUp} 0.5s ease-in-out forwards,
    ${fadeOut} 0.5s ease-in-out 3s forwards;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #fff;
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
  animation: ${fillWidth} 3.5s linear forwards;
`;

export default function SaveToast() {
  return (
    <ToastContainer>
      Game saved
      <ProgressBar />
    </ToastContainer>
  );
}
