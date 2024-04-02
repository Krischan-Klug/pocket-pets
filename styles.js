import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root{
    --background-color: #f8f5f2; 
    --text-color: #222525; 
    --button-text-color: #ffffff;
    --accent-color: #078080; 
    --secondary-color: #f45d48;
    --border-radius: 4px;
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
    color: var(--text-color);
    background-color: var(--background-color);
  }

  header {
    padding: 20px;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 10;
  }
   
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  h1 {
    text-align: center;
    margin: 0;
  }
`;
