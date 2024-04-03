import styled from "styled-components";

const StyledMoneyColor = styled.p`
  color: ${({ red }) => (red ? "red" : null)};
  font-weight: bold;
  padding: 0 5px;
`;

export default function MoneyColored({ cost, money }) {
  return (
    <StyledMoneyColor red={money <= cost ? true : false}>
      {cost}
    </StyledMoneyColor>
  );
}
