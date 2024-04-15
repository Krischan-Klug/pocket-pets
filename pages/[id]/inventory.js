import { useRouter } from "next/router";
import StyledLink from "@/components/StyledComponents/StyledLink";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { foods, toys } from "@/lib/shop";
import Link from "next/link";

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

  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
    setTabContainerHeight(tabContainerRef.current.offsetHeight);
  }, []);

  const availableFood = userStats.inventory.food.filter((fooditem) => {
    if (fooditem.value > 0) {
      return fooditem;
    }
  });

  const availableToys = userStats.inventory.toy.filter((toyitem) => {
    if (toyitem.purchased === true) {
      return toyitem;
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
                  You need to purchase food items from the shop first before you
                  can feed them to your pet.
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
                  You need to purchase toy items from the shop first before you
                  can play with your pet.
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
