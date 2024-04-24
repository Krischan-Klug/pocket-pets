import GlobalStyle from "../styles";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";
import { SessionProvider } from "next-auth/react";
import LoginComponent from "@/components/util/LoginComponent";
import GameSession from "@/components/GameSession";
import { SWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <SessionProvider session={pageProps.session}>
          <GlobalStyle />
          <LoginComponent />
          <GameSession
            Component={Component}
            pageProps={pageProps}
          ></GameSession>
          <AudioInterface />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
