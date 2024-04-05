import styled from "styled-components";
import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import { useRouter } from "next/router";
import { foods } from "@/lib/shop.js";

const StyledListElement = styled.li`
  list-style: none;
`;

export default function FoodShop() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <header>
        <StyledLeftButton onClick={() => router.push(`/${id}/shop`)}>
          Back
        </StyledLeftButton>
        <h1>Food Shop</h1>
        <p>Money?!</p>
      </header>
      <main>
        <ul>
          {foods.map((food) => (
            <StyledListElement key={food.id}>{food.name}</StyledListElement>
          ))}
        </ul>
      </main>
    </>
  );
}
