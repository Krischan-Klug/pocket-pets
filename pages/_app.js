import GlobalStyle from "../styles";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";
import SettingPopUp from "@/components/SettingPage/SettingPopUp";
import SettingPageButton from "@/components/SettingPage/SettingPageButton";
import { useRouter } from "next/router";
import { useMoneyStore } from "@/hooks/stores/moneyStore";
import { usePetStore } from "@/hooks/stores/petStore";
import { petEvents, userEvents } from "@/lib/events";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";
import { useTimeStore } from "@/hooks/stores/timeStore";
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
