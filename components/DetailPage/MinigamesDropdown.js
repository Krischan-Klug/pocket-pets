import React, { useState } from "react";
import StyledButton from "@/components/StyledComponents/StyledButton";
import StyledLink from "@/components/StyledComponents/StyledLink";

export default function MinigamesDropdown() {
  return (
    <div>
      <StyledLink href={`/${id}/minigames/obstacle-jumper`}>
        Obstacle Jumper
      </StyledLink>
      <StyledButton onClick={() => router.push(`/${id}/minigames/merge-pets/`)}>
        Merge Pets
      </StyledButton>
      <StyledButton
        onClick={() => router.push(`/${id}/minigames/treasure-hunt/`)}
      >
        Treasure Hunt
      </StyledButton>
      <StyledButton
        onClick={() => router.push(`/${id}/minigames/pet-invaders/`)}
      >
        Pet Invaders
      </StyledButton>
    </div>
  );
}
