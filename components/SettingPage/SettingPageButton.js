import styled from "styled-components";
import Image from "next/image";

import settingIcon from "/public/assets/icons/round_settings_black.png";

const StyledSettingPageButton = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: var(--accent-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 90;
`;

export default function SettingPageButton({ onSettingPageOpen }) {
  return (
    <>
      <StyledSettingPageButton onClick={onSettingPageOpen}>
        <Image
          src={settingIcon}
          alt="Setting Icon"
          width={20}
          height={20}
        ></Image>
      </StyledSettingPageButton>
    </>
  );
}
