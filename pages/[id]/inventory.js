import { useRouter } from "next/router";
import StyledLink from "@/components/StyledComponents/StyledLink";
import { useState } from "react";
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
  flex: 1;
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
  display: ${({ active }) => (active ? "flex" : "none")};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-height: 400px;
  width: 100%;
  overflow-y: auto;
`;

export default function Inventory({ userStats }) {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const { id } = router.query;

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
      <header>
        <StyledLink href={`/pet-detail-page/${id}`}>Back</StyledLink>
        <h1>Inventory</h1>
      </header>
      <main>
        <TabContainer>
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
          <Content active={activeTab === 0}>
            {availableFood.map((fooditem) => (
              <ItemCard
                key={fooditem.id}
                id={fooditem.id}
                name={findFoodValuesById(fooditem.id).name}
                value={findFoodValuesById(fooditem.id).value}
                image={findFoodValuesById(fooditem.id).image}
                description={findFoodValuesById(fooditem.id).description}
                quantity={fooditem.value}
                type="Hunger"
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
          <Content active={activeTab === 1}>
            {availableToys.map((toyitem) => (
              <ItemCard
                key={toyitem.id}
                id={toyitem.id}
                name={findToyValuesById(toyitem.id).name}
                value={findToyValuesById(toyitem.id).value}
                image={findToyValuesById(toyitem.id).image}
                description={findToyValuesById(toyitem.id).description}
                type="Play"
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
        </ContentContainer>
      </main>
    </>
  );
}
