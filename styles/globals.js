import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
  }

  body {
    margin: 0;
    padding: 0;
    font-family: system-ui;
  }
`;
