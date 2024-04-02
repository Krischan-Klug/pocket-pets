import styled from "styled-components";

export const InputLabel = styled.label`
  transition: transform 120ms ease-in;
  font-weight: bold;
  line-height: 1.1;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 4px;
  margin: 10px 4px;
  white-space: nowrap;
  transform: translate(0, 0);
  transform-origin: 0 0;
  background: var(--background-color);
`;

export const InputField = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 2px solid currentColor;
  padding: 12px 8px;
  background: transparent;
  border-radius: 4px;
  position: relative;

  &:focus + ${InputLabel}, &:not(:placeholder-shown) + ${InputLabel} {
    transform: translate(0.25rem, -100%) scale(0.8);
    color: var(--accent-color);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

export const Label = styled.label`
  position: relative;
`;
