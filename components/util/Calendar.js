import styled from "styled-components";

const SyledCalendarWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 80px;
  background-color: red;
  border-radius: 10px 10px 0 0;
  width: 55px;
  height: 40px;
`;

const CalendarSeason = styled.div`
  padding: 5px;
  color: white;
  text-align: center;
  font-size: 0.75rem;
  height: 20px;
`;

const CalendarDay = styled.div`
  background-color: white;
  color: black;
  padding: 5px;
  margin-top: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 1.1rem;
  height: 35px;
`;

const BlackDecoration = styled.div`
  position: absolute;
  top: -6px;
  left: ${({ positionleft }) => positionleft}px;
  height: 12px;
  width: 8px;
  border-radius: 4px;
  background-color: black;
  z-index: 1;
`;

export default function Calendar({ day, season }) {
  const seasonText = () => {
    switch (season) {
      case 0:
        return "Spring";
      case 1:
        return "Summer";
      case 2:
        return "Autumn";
      case 3:
        return "Winter";
      default:
        return "Unknown Season";
    }
  };

  return (
    <>
      <SyledCalendarWrapper>
        <CalendarSeason>{seasonText()}</CalendarSeason>
        <BlackDecoration positionleft={9} />
        <BlackDecoration positionleft={24} />
        <BlackDecoration positionleft={41} />
        <CalendarDay>{day}</CalendarDay>
      </SyledCalendarWrapper>
    </>
  );
}
