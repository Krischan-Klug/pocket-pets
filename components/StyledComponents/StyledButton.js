import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--accent-color);
  color: var(--button-text-color);
  border-radius: var(--border-radius);
  border: none;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: 0.5s;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
`;

export default StyledButton;
