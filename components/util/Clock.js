import styled, { keyframes } from "styled-components";

const ClockContainer = styled.div`
  position: absolute;
  top: 150px;
  left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HourHand = styled.div`
  position: absolute;
  top: 8px;
  left: 21px;
  transform-origin: 50% 100%;
  width: 4px;
  height: 15px;
  border-radius: 2px;
  background-color: #333;
  transform: ${({ hour }) => `rotate(${hour * 30}deg)`};
`;

const rotateMinuteHand = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const MinuteHand = styled.div`
  position: absolute;
  top: 3px;
  left: 22px;
  transform-origin: 50% 100%;
  width: 2px;
  height: 20px;
  background-color: #333;
  animation: ${rotateMinuteHand} 60s linear infinite;
`;

const ClockMark = styled.div`
  position: absolute;
  width: 2px;
  height: 4px;
  background-color: #333;
`;

const generateClockMarks = () => {
  const marks = [];
  for (let i = 1; i <= 12; i++) {
    const angle = i * 30;
    marks.push(
      <ClockMark
        key={i}
        style={{ transform: `rotate(${angle}deg) translateY(-22px)` }}
      />
    );
  }
  return marks;
};

const CenterDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: black;
`;

export default function Clock({ hour }) {
  return (
    <ClockContainer>
      {generateClockMarks()}
      <HourHand hour={hour} />
      <MinuteHand />
      <CenterDot />
    </ClockContainer>
  );
}
