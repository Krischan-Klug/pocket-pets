import { achievements } from "@/lib/achievements";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAchievementStore = create(
  persist(
    (set) => ({
      allAchievements: achievements,
      updatedAchievementsWithNewKeys: () => {
        set((state) => ({
          allAchievements: [
            ...state.allAchievements,
            ...achievements.filter(
              (achievement) =>
                !state.allAchievements.some(
                  (item) => item.id === achievement.id
                )
            ),
          ],
        }));
      },
      updateAchievementCurrentAmount: (id, amount) => {
        set((state) => {
          const updatedAchievements = state.allAchievements.map((achievement) =>
            achievement.id === id
              ? {
                  ...achievement,
                  currentAmount: achievement.currentAmount + amount,
                }
              : achievement
          );

          const updatedAndUnlockedAchievements = updatedAchievements.map(
            (achievement) => {
              if (
                achievement.id === id &&
                achievement.currentAmount >= achievement.achievementGoal
              ) {
                return {
                  ...achievement,
                  unlocked: true,
                };
              }
              return achievement;
            }
          );
          console.log(updatedAndUnlockedAchievements);
          return { allAchievements: updatedAndUnlockedAchievements };
        });
      },
    }),
    {
      name: "achievements",
    }
  )
);
