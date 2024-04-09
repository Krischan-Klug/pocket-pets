import styled from "styled-components";

const StyledXPBar = styled.p`
  background: linear-gradient(
    to right,
    #00a7e1 ${(props) => props.$value}%,
    #f0f8ff ${(props) => props.$value}%
  );
  font-size: 0.8rem;
  border: 2px solid black;
  border-radius: 50px;
  padding: 2px 5px;
  display: inline-block;
  box-sizing: border-box;
  position: absolute;

  top: 10px;
`;

export default StyledXPBar;
