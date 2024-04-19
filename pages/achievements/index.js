import { useAchievementStore } from "@/hooks/stores/achievementStore";
import StyledDefaultHeader from "@/components/StyledComponents/StyledDefaultHeader";
import { StyledStaticBackground } from "@/components/StyledComponents/StyledBackgroundImage";
import AchievementArticle from "@/components/Achievements/AchievementArticle";
import { useRouter } from "next/router";
import StyledLink from "@/components/StyledComponents/StyledLink";

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
      </main>
    </>
  );
}
