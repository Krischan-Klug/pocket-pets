import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";
import { useState } from "react";
import { toys } from "@/lib/shop";
import InventoryContainer from "./InventoryContainer";
import Link from "next/link";

const ToyInventoryPopUpOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  //the height of the Z index should ensure that this popup is always the top element.
  //Since we work with the z-index in steps of 10, I have chosen 100 here.
  z-index: 100;
`;

const ToyInventoryPopUpContent = styled.div`
  background-color: var(--background-color);
  padding: 15px;
  max-width: 90vw;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  text-align: center;
`;

const StyledToyInventoryContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
`;

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
    <ToyInventoryPopUpOverlay>
      <ToyInventoryPopUpContent>
        <h3>Which toy do you like to use?</h3>
        <StyledToyInventoryContainer>
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
        </StyledToyInventoryContainer>
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
      </ToyInventoryPopUpContent>
    </ToyInventoryPopUpOverlay>
  );
}
