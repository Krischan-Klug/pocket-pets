import styled from "styled-components";
import AchievementsImage from "./AchievementsImage";
import Link from "next/link";
import { useAchievementStore } from "@/hooks/stores/achievementStore";

const StyledAchievementsLink = styled(Link)`
  position: absolute;
  bottom: 45px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: black;
  text-decoration: none;
`;

export default function AchievemetsLink({}) {
  const allAchievements = useAchievementStore((state) => state.allAchievements);
  const solvedAchievements = allAchievements.filter(
    (achievement) => achievement.unlocked
  );

  return (
    <StyledAchievementsLink href="/achievements">
      <AchievementsImage />
      {solvedAchievements.length} / {allAchievements.length}
    </StyledAchievementsLink>
  );
}
