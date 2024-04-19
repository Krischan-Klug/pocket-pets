import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

const StyledAchievementArticle = styled.article`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 80vw;
  height: 15vh;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
`;

const StyledAchievementText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
`;

const StyledImageWrapper = styled.div`
  padding-left: 10px;
`;

const StyledName = styled.h2`
  margin-bottom: 0;
`;

export default function AchievementArticle({
  id,
  name,
  icon,
  description,
  unlocked,
}) {
  const router = useRouter();

  return (
    <StyledAchievementArticle
      key={id}
      onClick={() => router.push(`/achievements/${id}`)}
    >
      <StyledImageWrapper>
        <Image
          src={unlocked ? icon : "/assets/icons/trophy-grey.png"}
          alt={name}
          width={50}
          height={50}
        />
      </StyledImageWrapper>
      <div>
        <StyledName>{name}</StyledName>
        <StyledAchievementText>{description}</StyledAchievementText>
      </div>
    </StyledAchievementArticle>
  );
}
