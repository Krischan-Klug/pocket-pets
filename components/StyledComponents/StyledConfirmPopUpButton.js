import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";

const StyledConfirmPopUpButton = styled(StyledButton)`
  margin: 0 8px;
  background-color: ${({ $red }) => $red && "red"};
  cursor: pointer;
`;

export default StyledConfirmPopUpButton;
