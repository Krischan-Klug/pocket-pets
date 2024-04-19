import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";
import Image from "next/image";

import pocketpetsLogo from "/public/assets/images/pocket-pet-logo.png";

const StyledLoginPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: large;
`;
const StyledLoginButton = styled(StyledButton)`
  font-size: large;
`;

export default function LoginComponent() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <StyledLoginPage>
        <Image src={pocketpetsLogo} alt="Logo" width={300} height={300}></Image>
        You are not signed in!
        <StyledLoginButton onClick={() => signIn()}>Sign in</StyledLoginButton>
      </StyledLoginPage>
    );
  }
}
