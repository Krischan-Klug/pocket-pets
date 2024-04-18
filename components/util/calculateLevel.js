let level, xpToNextLevel, xpToThisLevel;

function countLevel(xp) {
  level = 1;
  xpToNextLevel = 150;
  xpToThisLevel = 0;
  while (xp >= xpToNextLevel) {
    level++;
    xpToThisLevel = xpToNextLevel;
    xpToNextLevel = Math.floor(xpToThisLevel * 2.1);
  }
}

export function calculateLevel(xp) {
  countLevel(xp);
  return level;
}

export function percentageLevelProgress(xp) {
  countLevel(xp);

  const xpNeededForNextLevel = xpToNextLevel - xpToThisLevel;
  const xpGainedTowardsNextLevel = xp - xpToThisLevel;
  const progressPercentage =
    (xpGainedTowardsNextLevel / xpNeededForNextLevel) * 100;
  return progressPercentage;
}

// Table with Level and XP for levels 1 to 20
/*
| Level | XP            |
|-------|---------------|
| 1     | 150           |
| 2     | 315           |
| 3     | 661           |
| 4     | 1390          |
| 5     | 2920          |
| 6     | 6132          |
| 7     | 12878         |
| 8     | 27044         |
| 9     | 56794         |
| 10    | 119168        |
| 11    | 250252        |
| 12    | 525529        |
| 13    | 1105611       |
| 14    | 2329784       |
| 15    | 4892546       |
| 16    | 10254357      |
| 17    | 21514150      |
| 18    | 45179615      |
| 19    | 94777191      |
| 20    | 198832602     |
*/
