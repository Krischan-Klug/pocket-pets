import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root{
    --background-color: #f8f5f2; 
    --text-color: #222525; 
    --accent-color: #078080; 
    --secondary-color: #f45d48;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: system-ui;
  }
`;
