import GlobalStyle from "../styles";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";
import { SessionProvider } from "next-auth/react";
import LoginComponent from "@/components/util/LoginComponent";
import GameSession from "@/components/GameSession";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <GlobalStyle />
        <LoginComponent />
        <GameSession Component={Component} pageProps={pageProps}></GameSession>

        <AudioInterface />
      </SessionProvider>
    </>
  );
}
