import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import { useRouter } from "next/router";
import { useState } from "react";
import ShopTable from "@/components/Shop/ShopTable";
import { toys } from "@/lib/shop.js";
import MoneyCounter from "@/components/util/MoneyCounter";
import StyledDefaultHeader from "@/components/StyledComponents/StyledDefaultHeader";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import { useMoneyStore } from "@/hooks/stores/moneyStore";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";
import { StyledShopBackground } from "@/components/StyledComponents/StyledBackgroundImage";

export default function ToyShop() {
  const subtractMoney = useMoneyStore((state) => state.subtractMoney);
  const money = useMoneyStore((state) => state.money);
  const [selectedToyId, setSelectedToyId] = useState(null);
  const [itemCost, setItemCost] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const onUpdateToy = useInventoryStore((state) => state.onUpdateToy);
  const toyInventory = useInventoryStore((state) => state.toyInventory);

  function isToyPurchased(id) {
    return toyInventory.some((toy) => toy.id === id && toy.purchased);
  }

  function selectToyItemToBuy(toyId, cost) {
    if (isToyPurchased(toyId)) {
      setSelectedToyId(-2);
    } else if (money >= cost) {
      setSelectedToyId(toyId);
    } else {
      setSelectedToyId(-1);
    }
    setItemCost(cost);
  }

  function confirmBuy() {
    onUpdateToy(selectedToyId);
    setSelectedToyId(null);
    subtractMoney(itemCost);
  }

  return (
    <>
      <StyledShopBackground />
      <StyledDefaultHeader>
        <StyledLeftButton onClick={() => router.push(`/${id}/shop`)}>
          Back
        </StyledLeftButton>
        <h1>Toy Shop</h1>
        <MoneyCounter money={money} />
      </StyledDefaultHeader>
      <main>
        <ShopTable
          data={toys}
          onItemClick={selectToyItemToBuy}
          category={"toy"}
        />
      </main>

      {selectedToyId > 0 && (
        <ConfirmationPopup
          message={`Would you like to buy a ${
            toys.find((toy) => toy.id === selectedToyId).name
          }?`}
          onConfirm={confirmBuy}
          onCancel={() => setSelectedToyId(null)}
          confirmText={"Buy"}
        />
      )}
      {selectedToyId === -1 && (
        <ConfirmationPopup
          message={`You don't have enough money to buy that!`}
          onConfirm={() => setSelectedToyId(null)}
        />
      )}
      {selectedToyId === -2 && (
        <ConfirmationPopup
          message={`You already own this toy!`}
          onConfirm={() => setSelectedToyId(null)}
        />
      )}
    </>
  );
}
