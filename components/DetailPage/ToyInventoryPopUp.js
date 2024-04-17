import styled from "styled-components";
import { useState } from "react";
import { toys } from "@/lib/shop";
import InventoryContainer from "./InventoryContainer";
import Link from "next/link";
import StyledPopUpOverlay from "@/components/StyledComponents/StyledPopUpOverlay";
import StyledPopUpContent from "@/components/StyledComponents/StyledPopUpContent";
import StyledInventoryContainer from "@/components/StyledComponents/StyledInventoryContainer";
import StyledConfirmButtonWrapper from "@/components/StyledComponents/StyledConfirmButtonWrapper";
import StyledConfirmPopUpButton from "@/components/StyledComponents/StyledConfirmPopUpButton";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";

const StyledErrorMessage = styled.p`
  color: red;
`;

export default function ToyInventoryPopUp({ onPlayButton, onCancel, petId }) {
  const [selectedToyItemId, setSelectedToyItemId] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const toyInventory = useInventoryStore((state) => state.toyInventory);

  const availableToy = toyInventory.filter((toyItems) => {
    if (toyItems.purchased === true) {
      return toyItems;
    }
  });

  function handleConfirmButtonClick() {
    if (selectedToyItemId === null) {
      setShowErrorMessage(true);
    } else {
      onPlayButton(selectedToyItemId);
      setSelectedToyItemId(null);
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
        <h3>Which toy would you like to use?</h3>
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
        <StyledConfirmButtonWrapper>
          <StyledConfirmPopUpButton onClick={handleConfirmButtonClick}>
            Play
          </StyledConfirmPopUpButton>
          <StyledConfirmPopUpButton $red onClick={onCancel}>
            Cancel
          </StyledConfirmPopUpButton>
        </StyledConfirmButtonWrapper>
        {showErrorMessage && (
          <StyledErrorMessage>You need to select a toy.</StyledErrorMessage>
        )}
      </StyledPopUpContent>
    </StyledPopUpOverlay>
  );
}
