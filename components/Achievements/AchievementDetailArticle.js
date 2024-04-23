import styled from "styled-components";
import Image from "next/image";

const StyledAchievementArticle = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 80vw;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
`;

const StyledAchievementText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
  padding-right: 10px;
`;

const StyledAchievementProgress = styled.h3`
  margin-top: 5px;
  padding-right: 10px;
`;

const StyledImageWrapper = styled.div`
  padding-left: 10px;
`;

const StyledName = styled.h2`
  margin-bottom: 0;
`;

export default function AchievementDetailArticle({
  name,
  icon,
  description,
  achievementGoal,
  currentAmount,
  unlocked,
}) {
  return (
    <StyledAchievementArticle>
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
      <StyledAchievementProgress>
        {currentAmount}/{achievementGoal}
      </StyledAchievementProgress>
    </StyledAchievementArticle>
  );
}
