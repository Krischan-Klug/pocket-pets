import { useRouter } from "next/router";
import StyledLink from "@/components/StyledComponents/StyledLink";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { foods, toys, clothes } from "@/lib/shop";
import Link from "next/link";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";

import ItemCard from "@/components/Inventory/ItemCard";

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Tab = styled.div`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border: 2px solid lightgrey;
  border-radius: var(--border-radius);

  ${({ active }) =>
    active === "true" &&
    `
    background: var(--accent-color); 
    color: var(--button-text-color);
  `}
`;

const ContentContainer = styled.div`
  overflow: hidden;
`;

const Content = styled.div`
  display: ${({ active }) => (active === "true" ? "flex" : "none")};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-height: calc(
    100vh -
      ${({ $headerheight, $tabcontainerheight }) =>
        $headerheight + $tabcontainerheight}px - 30px
  );

  width: 100%;
  overflow-y: auto;
  padding: 0 20px;
`;

export default function Inventory({ userStats }) {
  const [activeTab, setActiveTab] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabContainerHeight, setTabContainerHeight] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const headerRef = useRef(null);
  const tabContainerRef = useRef(null);

  const foodInventory = useInventoryStore((state) => state.foodInventory);
  const toyInventory = useInventoryStore((state) => state.toyInventory);
  const clothesInventory = useInventoryStore((state) => state.clothesInventory);

  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
    setTabContainerHeight(tabContainerRef.current.offsetHeight);
  }, []);

  const availableFood = foodInventory.filter((fooditem) => {
    if (fooditem.value > 0) {
      return fooditem;
    }
  });

  const availableToys = toyInventory.filter((toyitem) => {
    if (toyitem.purchased === true) {
      return toyitem;
    }
  });

  const availableClothes = clothesInventory.filter((clothesitem) => {
    if (clothesitem.purchased === true) {
      return clothesitem;
    }
  });

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  function findFoodValuesById(id) {
    const food = foods.find((food) => food.id === id);
    return food;
  }

  function findToyValuesById(id) {
    const toy = toys.find((toy) => toy.id === id);
    return toy;
  }

  function findClothesValuesById(id) {
    const clothesItem = clothes.find((item) => item.id === id);
    return clothesItem;
  }

  return (
    <>
      <header ref={headerRef}>
        <StyledLink href={`/pet-detail-page/${id}`}>Back</StyledLink>
        <h1>Inventory</h1>
      </header>
      <main>
        <TabContainer ref={tabContainerRef}>
          <Tab
            active={activeTab === 0 ? "true" : "false"}
            onClick={() => handleTabClick(0)}
          >
            Food
          </Tab>
          <Tab
            active={activeTab === 1 ? "true" : "false"}
            onClick={() => handleTabClick(1)}
          >
            Toys
          </Tab>
          <Tab
            active={activeTab === 2 ? "true" : "false"}
            onClick={() => handleTabClick(2)}
          >
            Beds
          </Tab>
        </TabContainer>
        <ContentContainer>
          <Content
            active={activeTab === 0 ? "true" : ""}
            $headerheight={headerHeight}
            $tabcontainerheight={tabContainerHeight}
          >
            {availableFood.map((fooditem) => (
              <ItemCard
                key={fooditem.id}
                name={findFoodValuesById(fooditem.id).name}
                image={findFoodValuesById(fooditem.id).image}
                description={findFoodValuesById(fooditem.id).description}
                quantity={fooditem.value}
              />
            ))}
            {availableFood.length === 0 && (
              <>
                <p>
                  You need to purchase food in the shop first before you can
                  feed it to your pet.
                </p>
                <Link href={`/${id}/shop/`}>To Shop</Link>
              </>
            )}
          </Content>
          <Content
            active={activeTab === 1 ? "true" : ""}
            $headerheight={headerHeight}
            $tabcontainerheight={tabContainerHeight}
          >
            {availableToys.map((toyitem) => (
              <ItemCard
                key={toyitem.id}
                name={findToyValuesById(toyitem.id).name}
                image={findToyValuesById(toyitem.id).image}
                description={findToyValuesById(toyitem.id).description}
              />
            ))}
            {availableToys.length === 0 && (
              <>
                <p>
                  You need to purchase toys in the shop first before you can
                  play with your pet.
                </p>
                <Link href={`/${id}/shop/`}>To Shop</Link>
              </>
            )}
          </Content>
          <Content
            active={activeTab === 2 ? "true" : ""}
            $headerheight={headerHeight}
            $tabcontainerheight={tabContainerHeight}
          >
            {availableClothes.map(
              (clothesitem) =>
                clothesitem.id > 0 && (
                  <ItemCard
                    key={clothesitem.id}
                    name={findClothesValuesById(clothesitem.id).name}
                    image={findClothesValuesById(clothesitem.id).image}
                    description={
                      findClothesValuesById(clothesitem.id).description
                    }
                  />
                )
            )}
            {availableClothes.length === 1 && (
              <>
                <p>
                  You need to purchase a bed in the shop first before you can
                  gift it to your pet.
                </p>
                <Link href={`/${id}/shop/`}>To Shop</Link>
              </>
            )}
          </Content>
        </ContentContainer>
      </main>
    </>
  );
}
