import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTimeStore = create(
  persist(
    (set) => ({
      hour: 0,
      setHour: (hourToSet) => set({ hour: hourToSet }),
      day: 1,
      setDay: (dayToSet) => set({ day: dayToSet }),
      season: 0,
      setSeason: (seasonToSet) => set({ season: seasonToSet }),
      addHour: () => {
        set((state) => {
          const { hour, day, season } = state;
          if (hour < 23) {
            return { hour: hour + 1 };
          } else {
            let newDay = day + 1;
            let newSeason = season;
            if ((day + 1) % 8 === 0) {
              newSeason = (season + 1) % 4;
            }
            return { hour: 0, day: newDay, season: newSeason };
          }
        });
      },
      onResetTime: () => {
        set({ hour: 0, day: 1, season: 0 });
      },
    }),
    {
      name: "time",
    }
  )
);
