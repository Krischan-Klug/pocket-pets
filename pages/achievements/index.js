import { useAchievementStore } from "@/hooks/stores/achievementStore";
import { StyledStaticBackground } from "@/components/StyledComponents/StyledBackgroundImage";
import AchievementArticle from "@/components/Achievements/AchievementArticle";
import StyledLink from "@/components/StyledComponents/StyledLink";
import styled from "styled-components";

const StyledSection = styled.section`
  height: calc(100vh - 120px);
  overflow-y: auto;
`;

export default function Achievements({}) {
  const { allAchievements } = useAchievementStore();
  return (
    <>
      <StyledStaticBackground />
      <header>
        <StyledLink href={"/"}>Back</StyledLink>
        <h1>Achievements</h1>
      </header>
      <main>
        <StyledSection>
          {allAchievements.map((achievement) => (
            <AchievementArticle
              key={achievement.id}
              name={achievement.name}
              icon={achievement.icon}
              description={achievement.description}
              id={achievement.id}
              unlocked={achievement.unlocked}
            />
          ))}
        </StyledSection>
      </main>
    </>
  );
}
