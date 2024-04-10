import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import { useRouter } from "next/router";
import { useState } from "react";
import ShopTable from "@/components/Shop/ShopTable";
import { toys } from "@/lib/shop.js";
import MoneyCounter from "@/components/util/MoneyCounter";
import StyledDefaultHeader from "@/components/StyledComponents/StyledDefaultHeader";
import BuyPopUp from "@/components/util/BuyPopUp";

export default function ToyShop({
  userStats,
  onUpdateInventoryToy,
  onSubtractMoney,
}) {
  const [selectedToyId, setSelectedToyId] = useState(null);
  const [itemCost, setItemCost] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  function selectToyItemToBuy(id, cost) {
    setSelectedToyId(id);
    setItemCost(cost);
  }

  function confirmBuy(value, id, cost) {
    onUpdateInventoryToy(value, id);
    setSelectedToyId(null);
    onSubtractMoney(cost * value);
  }

  return (
    <>
      <StyledDefaultHeader>
        <StyledLeftButton onClick={() => router.push(`/${id}/shop`)}>
          Back
        </StyledLeftButton>
        <h1>Toy Shop</h1>
        <MoneyCounter money={userStats.money} />
      </StyledDefaultHeader>
      <main>
        <ShopTable
          data={toys}
          onItemClick={selectToyItemToBuy}
          category={"toy"}
        />
      </main>

      {selectedToyId && (
        <BuyPopUp
          message={`How many ${
            toys.find((toy) => toy.id === selectedToyId).name
          }s would you like to buy?`}
          onBuy={confirmBuy}
          onCancel={() => setSelectedToyId(null)}
          id={selectedToyId}
          cost={itemCost}
          money={userStats.money}
        />
      )}
    </>
  );
}
