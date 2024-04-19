import AchievementDetailArticle from "@/components/Achievements/AchievementDetailArticle";
import { useAchievementStore } from "@/hooks/stores/achievementStore";
import { StyledStaticBackground } from "@/components/StyledComponents/StyledBackgroundImage";
import { useRouter } from "next/router";
import StyledLink from "@/components/StyledComponents/StyledLink";

export default function AchievementDetailPage({}) {
  const { allAchievements } = useAchievementStore();
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  const currentAchievement = allAchievements.find(
    (achievement) => achievement.id == id
  );

  return (
    <>
      <StyledStaticBackground />
      <header>
        <StyledLink href={"/achievements"}>Back</StyledLink>
        <h1>Achievement</h1>
      </header>
      <main>
        <AchievementDetailArticle
          name={currentAchievement.name}
          icon={currentAchievement.icon}
          description={currentAchievement.description}
          achievementGoal={currentAchievement.achievementGoal}
          currentAmount={currentAchievement.currentAmount}
          unlocked={currentAchievement.unlocked}
        />
      </main>
    </>
  );
}
