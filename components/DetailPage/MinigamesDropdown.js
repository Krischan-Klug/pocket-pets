import React from "react";
import StyledLink from "@/components/StyledComponents/StyledLink";
import StyledPopUpOverlay from "@/components/StyledComponents/StyledPopUpOverlay";
import StyledPopUpContent from "@/components/StyledComponents/StyledPopUpContent";
import styled from "styled-components";

const StyledMinigameLink = styled(StyledLink)`
  width: 90%;
`;

const StyledMinigameContent = styled(StyledPopUpContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default function MinigamesDropdown({ id, closePopUp }) {
  function handleOverlayClick(event) {
    if (!event.target.closest("a")) {
      closePopUp();
    }
  }

  return (
    <StyledPopUpOverlay onClick={handleOverlayClick}>
      <StyledMinigameContent>
        <StyledMinigameLink href={`/${id}/minigames/obstacle-jumper`}>
          Obstacle Jumper
        </StyledMinigameLink>
        <StyledMinigameLink href={`/${id}/minigames/merge-pets/`}>
          Merge Pets
        </StyledMinigameLink>
        <StyledMinigameLink href={`/${id}/minigames/treasure-hunt/`}>
          Treasure Hunt
        </StyledMinigameLink>
        <StyledMinigameLink href={`/${id}/minigames/pet-invaders/`}>
          Pet Invaders
        </StyledMinigameLink>
      </StyledMinigameContent>
    </StyledPopUpOverlay>
  );
}
