import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";
import Link from "next/link";
import { useState } from "react";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const StyledSettingPopUp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  //the height of the Z index should ensure that this popup is always the top element.
  //Since we work with the z-index in steps of 10, I have chosen 90 here.
  z-index: 90;
  gap: 10px;
  padding-top: 20px;
`;
const StyledCloseButton = styled(StyledButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const StyledImpressum = styled.div`
  position: absolute;
  bottom: 20px;
`;

export default function SettingPopUp({ onSettingPageClose, handleGameReset }) {
  const [confirmationPopUpContent, setConfirmationPopUpContent] = useState({
    message: "",
    onConfirm: null,
    onCancel: null,
    show: false,
  });
  const router = useRouter();
  const { data: session } = useSession();

  function handleReset() {
    setConfirmationPopUpContent({
      message: "Do you really want to reset your score?",
      onConfirm: onConfirmGameReset,
      onCancel: () => {
        setConfirmationPopUpContent({
          ...confirmationPopUpContent,
          show: false,
        });
      },
      show: true,
    });
  }

  function onConfirmGameReset() {
    handleGameReset();
    setConfirmationPopUpContent({
      ...confirmationPopUpContent,
      show: false,
    });
    router.push("/");
  }

  return (
    <StyledSettingPopUp>
      <h1>Settings</h1>
      <StyledCloseButton onClick={onSettingPageClose}>Close</StyledCloseButton>
      <StyledButton onClick={handleReset}>Reset Game</StyledButton>

      <br />
      Signed in as {session.user.email} <br />
      <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
      

      <StyledImpressum>
        <u>Impressum</u>
        <p>
          This Project is from:{" "}
          <Link href={"https://github.com/Krischan-Klug"} target="_blank">
            Krischan
          </Link>
          ,{" "}
          <Link href={"https://github.com/Miningmark"} target="_blank">
            Markus
          </Link>
          ,{" "}
          <Link href={"https://github.com/ninagw"} target="_blank">
            Nina
          </Link>
        </p>

        <p>
          Images from:{" "}
          <Link href={"https://www.flaticon.com/"} target="_blank">
            Flaticon
          </Link>
        </p>
        <p>
          Music from:{" "}
          <Link
            href={
              "https://www.musicfox.com/info/kostenlose-gemafreie-musik.php"
            }
            target="_blank"
          >
            Musicfox
          </Link>
        </p>
      </StyledImpressum>
      {confirmationPopUpContent.show && (
        <ConfirmationPopup
          message={confirmationPopUpContent.message}
          onConfirm={confirmationPopUpContent.onConfirm}
          onCancel={confirmationPopUpContent.onCancel}
        />
      )}
    </StyledSettingPopUp>
  );
}
