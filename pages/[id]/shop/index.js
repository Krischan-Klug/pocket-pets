import { useRouter } from "next/router";
import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import styled from "styled-components";
import HungerImage from "@/components/util/HungerImage";

const StyledShopCategoryButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: var(--border-radius);
`;

export default function Shop() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
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
      </main>
    </>
  );
}
