import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import { useRouter } from "next/router";
import { useState } from "react";
import ShopTable from "@/components/Shop/ShopTable";
import { foods } from "@/lib/shop.js";
import MoneyCounter from "@/components/util/MoneyCounter";
import StyledDefaultHeader from "@/components/StyledComponents/StyledDefaultHeader";
import BuyPopUp from "@/components/util/BuyPopUp";

export default function FoodShop({
  userStats,
  onUpdateInventoryFood,
  onSubtractMoney,
}) {
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [itemCost, setItemCost] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  function selectFoodItemToBuy(id, cost) {
    setSelectedFoodId(id);
    setItemCost(cost);
  }

  function confirmBuy(value, id, cost) {
    onUpdateInventoryFood(value, id);
    setSelectedFoodId(null);
    onSubtractMoney(cost * value);
  }

  return (
    <>
      <StyledDefaultHeader>
        <StyledLeftButton onClick={() => router.push(`/${id}/shop`)}>
          Back
        </StyledLeftButton>
        <h1>Food Shop</h1>
        <MoneyCounter money={userStats.money} />
      </StyledDefaultHeader>
      <main>
        <ShopTable data={foods} onItemClick={selectFoodItemToBuy} />
      </main>

      {selectedFoodId && (
        <BuyPopUp
          message={`How many ${
            foods.find((food) => food.id === selectedFoodId).name
          }s would you like to buy?`}
          onBuy={confirmBuy}
          onCancel={() => setSelectedFoodId(null)}
          id={selectedFoodId}
          cost={itemCost}
          money={userStats.money}
        />
      )}
    </>
  );
}