import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";
import Link from "next/link";
import { useState } from "react";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import { useRouter } from "next/router";

const StyledSettingPage = styled.div`
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
  margin-top: 20px;
`;
const StyledCloseButton = styled(StyledButton)`
  position: absolute;
  top: 0;
  right: 20px;
`;

export default function SettingPage({ onSettingPageClose, handleGameReset }) {
  const [confirmationPopUpContent, setConfirmationPopUpContent] = useState({
    message: "",
    onConfirm: null,
    onCancel: null,
    show: false,
  });
  const router = useRouter();

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
    <StyledSettingPage>
      <h1>Settings</h1>
      <StyledCloseButton onClick={onSettingPageClose}>Close</StyledCloseButton>
      <StyledButton onClick={handleReset}>Reset Game</StyledButton>
      <div>
        <p>Impressum</p>
        <p>This Project is from: Krischan, Markus, Nina</p>
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
      </div>
      {confirmationPopUpContent.show && (
        <ConfirmationPopup
          message={confirmationPopUpContent.message}
          onConfirm={confirmationPopUpContent.onConfirm}
          onCancel={confirmationPopUpContent.onCancel}
        />
      )}
    </StyledSettingPage>
  );
}
