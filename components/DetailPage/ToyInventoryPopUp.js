import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";
import { useState } from "react";
import { toys } from "@/lib/shop";
import InventoryContainer from "./InventoryContainer";
import Link from "next/link";

import StyledPopUpOverlay from "@/components/StyledComponents/StyledPopUpOverlay";
import StyledPopUpContent from "@/components/StyledComponents/StyledPopUpContent";
import StyledInventoryContainer from "@/components/StyledComponents/StyledInventoryContainer";

const ConfirmPopUpButton = styled(StyledButton)`
  margin: 0 8px;
  background-color: ${({ $red }) => $red && "red"};
  cursor: pointer;
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const StyledErrorMessage = styled.p`
  color: red;
`;

export default function ToyInventoryPopUp({
  userStats,
  onPlayButton,
  onCancel,
  petId,
}) {
  const [selectedToyItemId, setSelectedToyItemId] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const availableToy = userStats.inventory.toy.filter((toyItems) => {
    if (toyItems.purchased === true) {
      return toyItems;
    }
  });

  function handleConfirmButtonClick() {
    if (selectedToyItemId === 0) {
      setShowErrorMessage(true);
    } else {
      onPlayButton(selectedToyItemId);
      setSelectedToyItemId(true);
    }
  }

  function findToyValuesById(id) {
    const toy = toys.find((toy) => toy.id === id);
    return toy;
  }

  function handleClickOnToyItem(id) {
    setSelectedToyItemId(id);
    setShowErrorMessage(false);
  }

  return (
    <StyledPopUpOverlay>
      <StyledPopUpContent>
        <h3>Which toy do you like to use?</h3>
        <StyledInventoryContainer>
          {availableToy.map((toyItem) => (
            <InventoryContainer
              key={toyItem.id}
              id={toyItem.id}
              name={findToyValuesById(toyItem.id).name}
              value={findToyValuesById(toyItem.id).value}
              image={findToyValuesById(toyItem.id).image}
              isActive={toyItem.id === selectedToyItemId}
              onClickOnItem={handleClickOnToyItem}
              type="Happiness"
            />
          ))}
          {availableToy.length === 0 && (
            <>
              <p>
                You need to purchase Toys from the shop first before you can
                playwith your pet.
              </p>
              <Link href={`/${petId}/shop/`}>To Shop</Link>
            </>
          )}
        </StyledInventoryContainer>
        <ConfirmButtonWrapper>
          <ConfirmPopUpButton onClick={handleConfirmButtonClick}>
            Play
          </ConfirmPopUpButton>
          <ConfirmPopUpButton $red onClick={onCancel}>
            Cancel
          </ConfirmPopUpButton>
        </ConfirmButtonWrapper>
        {showErrorMessage && (
          <StyledErrorMessage>You need to select a toy.</StyledErrorMessage>
        )}
      </StyledPopUpContent>
    </StyledPopUpOverlay>
  );
}
