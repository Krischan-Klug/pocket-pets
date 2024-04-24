import { useRouter } from "next/router";
import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import styled from "styled-components";
import HungerImage from "@/components/util/HungerImage";
import ToyImage from "@/components/util/ToyImage";
import { StyledShopBackground } from "@/components/StyledComponents/StyledBackgroundImage";

const StyledShopCategoryButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: var(--border-radius);
  background-color: #f2e8da;
  border-color: lightgrey;
`;

export default function Shop() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <StyledShopBackground />
      <header>
        <StyledLeftButton onClick={() => router.push(`/pet-detail-page/${id}`)}>
          Back
        </StyledLeftButton>
        <h1>Shop</h1>
      </header>
      <main>
        <StyledShopCategoryButton
          onClick={() => router.push(`/${id}/shop/food`)}
        >
          <HungerImage height={120} width={120} />
          Food
        </StyledShopCategoryButton>
        <StyledShopCategoryButton
          onClick={() => router.push(`/${id}/shop/toy`)}
        >
          <ToyImage height={120} width={120} />
          Toys
        </StyledShopCategoryButton>
      </main>
    </>
  );
}
