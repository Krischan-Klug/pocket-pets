import { useRouter } from "next/router";
import { useState } from "react";
import ShopTable from "@/components/Shop/ShopTable";
import { clothes } from "@/lib/shop.js";
import MoneyCounter from "@/components/util/MoneyCounter";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import { useMoneyStore } from "@/hooks/stores/moneyStore";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";
import StyledLink from "@/components/StyledComponents/StyledLink";
import { StyledShopBackground } from "@/components/StyledComponents/StyledBackgroundImage";

export default function ClothesShop() {
  const subtractMoney = useMoneyStore((state) => state.subtractMoney);
  const money = useMoneyStore((state) => state.money);
  const [selectedClothesId, setSelectedClothesId] = useState(null);
  const [itemCost, setItemCost] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const onUpdateClothes = useInventoryStore((state) => state.onUpdateClothes);
  const clothesInventory = useInventoryStore((state) => state.clothesInventory);

  function isClothesPurchased(id) {
    return clothesInventory.some((item) => item.id === id && item.purchased);
  }

  function selectClothesItemToBuy(clothesId, cost) {
    if (isClothesPurchased(clothesId)) {
      setSelectedClothesId(-2);
    } else if (money >= cost) {
      setSelectedClothesId(clothesId);
    } else {
      setSelectedClothesId(-1);
    }
    setItemCost(cost);
  }

  function confirmBuy() {
    onUpdateClothes(selectedClothesId);
    setSelectedClothesId(null);
    subtractMoney(itemCost);
  }

  return (
    <>
      <StyledShopBackground />
      <header>
        <StyledLink href={`/${id}/shop`}>Back</StyledLink>
        <h1>Bed Shop</h1>
        <MoneyCounter money={money} />
      </header>
      <main>
        <ShopTable
          data={clothes}
          onItemClick={selectClothesItemToBuy}
          category={"bed"}
        />
      </main>

      {selectedClothesId > 0 && (
        <ConfirmationPopup
          message={`Would you like to buy ${
            clothes.find((item) => item.id === selectedClothesId).name
          }?`}
          onConfirm={confirmBuy}
          onCancel={() => setSelectedClothesId(null)}
          confirmText={"Buy"}
        />
      )}
      {selectedClothesId === -1 && (
        <ConfirmationPopup
          message={`You don't have enough money to buy that!`}
          onConfirm={() => setSelectedClothesId(null)}
        />
      )}
      {selectedClothesId === -2 && (
        <ConfirmationPopup
          message={`You already own this item!`}
          onConfirm={() => setSelectedClothesId(null)}
        />
      )}
    </>
  );
}
