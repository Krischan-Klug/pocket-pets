import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(Link)`
  background-color: var(--accent-color);
  color: var(--button-text-color);
  border-radius: var(--border-radius);
  border: none;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  width: 50px;
  transform: scale(1);
  transition: 0.5s;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }

  position: left;
`;

export default StyledLink;
