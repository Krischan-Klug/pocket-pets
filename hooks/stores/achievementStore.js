import { achievements } from "@/lib/achievements";
import { create } from "zustand";

export const useAchievementStore = create((set) => ({
  allAchievements: achievements,
  setAllAchievements: (newAchievements) => {
    set({ allAchievements: newAchievements });
  },
  updatedAchievementsWithNewKeys: () => {
    set((state) => ({
      allAchievements: [
        ...state.allAchievements,
        ...achievements.filter(
          (achievement) =>
            !state.allAchievements.some((item) => item.id === achievement.id)
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
      return { allAchievements: updatedAndUnlockedAchievements };
    });
  },
}));
