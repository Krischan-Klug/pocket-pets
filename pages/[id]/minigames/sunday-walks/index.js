import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import StyledLink from "@/components/StyledComponents/StyledLink";

const StyledGameScreen = styled.section`
  background-color: lightgreen;
`;

export default function SundayWalks() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <header>
        <StyledLink href={`/pet-detail-page/${id}`}>Back</StyledLink>
        <h1>Sunday Walks</h1>
      </header>
      <main>
        {/* <p>Current highscore {points}</p> */}
        <StyledGameScreen></StyledGameScreen>
        <button>Cancel</button>
      </main>
    </>
  );
}
