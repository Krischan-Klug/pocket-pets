import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import { useRouter } from "next/router";
import { useState } from "react";
import ShopTable from "@/components/Shop/ShopTable";
import { foods } from "@/lib/shop.js";
import MoneyCounter from "@/components/util/MoneyCounter";
import StyledDefaultHeader from "@/components/StyledComponents/StyledDefaultHeader";
import BuyPopUp from "@/components/util/BuyPopUp";

export default function FoodShop({ userStats }) {
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  function buyFoodItem(id) {
    setSelectedFoodId(id);
  }

  // function handleAddFood({value, id}) {
  //   setUserStats((prevUserStat) => {
  //     return { ...prevUserStat, inventory.food[id]: prevUserStat.inventory.food + value };
  //   });
  // }

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
        <ShopTable data={foods} onItemClick={buyFoodItem} />
      </main>

      {/* neues BuyPopUp zum Kaufen von Essen:  */}
      {selectedFoodId && (
        <BuyPopUp
          message={`How much ${
            foods.find((food) => food.id === selectedFoodId).name
          }s would you like to buy?`}
          onBuy={handleAddFood}
          onCancel={() => setSelectedFoodId(null)}
        />
      )}
    </>
  );
}
