import styled from "styled-components";
import { useState } from "react";
import { foods } from "@/lib/shop";
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
const StyledInventoryContainerScroll = styled(StyledInventoryContainer)`
  height: calc(95vh - 160px);
  overflow-y: auto;
`;

export default function HungerInventoryPopUp({
  onFeedButton,
  onCancel,
  petId,
}) {
  const [selectedFoodItemId, setSelectedFoodItemId] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const foodInventory = useInventoryStore((state) => state.foodInventory);

  const availableFoods = foodInventory.filter((fooditem) => fooditem.value > 0);

  function handleConfirmButtonClick() {
    if (selectedFoodItemId === 0) {
      setShowErrorMessage(true);
    } else {
      onFeedButton(selectedFoodItemId);
      setSelectedFoodItemId(true);
    }
  }

  function findFoodValuesById(id) {
    const food = foods.find((food) => food.id === id);
    return food;
  }

  function handleClickOnFoodItem(id) {
    setSelectedFoodItemId(id);
    setShowErrorMessage(false);
  }

  return (
    <StyledPopUpOverlay>
      <StyledPopUpContent>
        <h3>What food item would you like to feed?</h3>
        <StyledInventoryContainerScroll>
          {availableFoods.map((fooditem) => (
            <InventoryContainer
              key={fooditem.id}
              id={fooditem.id}
              name={findFoodValuesById(fooditem.id).name}
              value={findFoodValuesById(fooditem.id).value}
              image={findFoodValuesById(fooditem.id).image}
              quantity={fooditem.value}
              isActive={fooditem.id === selectedFoodItemId}
              onClickOnItem={handleClickOnFoodItem}
              type="Hunger"
            />
          ))}
          {availableFoods.length === 0 && (
            <>
              <p>
                You need to purchase food items from the shop first before you
                can feed them to your pet.
              </p>
              <Link href={`/${petId}/shop/`}>To Shop</Link>
            </>
          )}
        </StyledInventoryContainerScroll>
        <StyledConfirmButtonWrapper>
          <StyledConfirmPopUpButton onClick={handleConfirmButtonClick}>
            Feed
          </StyledConfirmPopUpButton>
          <StyledConfirmPopUpButton $red onClick={onCancel}>
            Cancel
          </StyledConfirmPopUpButton>
        </StyledConfirmButtonWrapper>
        {showErrorMessage && (
          <StyledErrorMessage>
            You need to select a food item.
          </StyledErrorMessage>
        )}
      </StyledPopUpContent>
    </StyledPopUpOverlay>
  );
}
