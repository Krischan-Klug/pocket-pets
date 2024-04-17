export const petEvents = [
  {
    id: 1,
    eventName: "Your pet is sick",
    description: `Your pet is sick. You need to pay 100 medical costs and your pet lost 20 energy.`,
    eventValues: {
      happiness: 0,
      hunger: 0,
      energy: -20,
      money: -100,
    },
  },

  {
    id: 2,
    eventName: "Birthday Party",
    description: `It's your pet's birthday and you're throwing a big party with all of its pet friends. Pay 50 pet coins.`,
    eventValues: {
      happiness: 100,
      hunger: 100,
      energy: 30,
      money: -50,
    },
  },
  {
    id: 3,
    eventName: "Big walk",
    description: `After a long walk your pet is very happy. However, all the playing and exploring also made your pet tired and hungry. Your happiness increases by 80 but you lose 20 energy and 10 hunger.`,
    eventValues: {
      happiness: 80,
      hunger: 0,
      energy: -20,
      money: 0,
    },
  },
  {
    id: 4,
    eventName: "Sleepy pet",
    description: `After a good sleep your pet is full of energy again but also really hungry. You win 60 energy and lose 20 hunger.`,
    eventValues: {
      happiness: 0,
      hunger: -20,
      energy: 100,
      money: 0,
    },
  },
  {
    id: 5,
    eventName: "Sad news",
    description: `The doorbell rings and you find yourself face to face with a police officer. Unfortunately, she has to tell you that your pet was hit by a car. Your pet dies.`,
    eventValues: {
      happiness: -100,
      hunger: -100,
      energy: -100,
      money: 0,
    },
  },
  {
    id: 6,
    eventName: "Archaeological find",
    description: `Your pet digs up an archaeological find. You sell it for 1200 pet coins.`,
    eventValues: {
      happiness: 0,
      hunger: 0,
      energy: 0,
      money: 1200,
    },
  },
  {
    id: 7,
    eventName: "Mr/s barking",
    description: `Your pet stays up all night barking at the neighbor's cat. Energy decreases by 30.`,
    eventValues: {
      happiness: 0,
      hunger: 0,
      energy: -30,
      money: 0,
    },
  },

  {
    id: 8,
    eventName: "Baking hour",
    description: `Your pet smells freshly baked cookies and begs for a treat. Hunger increases by 15.`,
    eventValues: {
      happiness: 0,
      hunger: -15,
      energy: 0,
      money: 0,
    },
  },
  {
    id: 9,
    eventName: "Lost toy",
    description: `Your pet favorite toy gets lost. Happiness decreases by 40.`,
    eventValues: {
      happiness: -40,
      hunger: 0,
      energy: 0,
      money: 0,
    },
  },
  {
    id: 10,
    eventName: "A nice friend",
    description: `Your pet receives cuddles and belly rubs from a loved one. Happiness increases by 60.`,
    eventValues: {
      happiness: 60,
      hunger: 0,
      energy: 0,
      money: 0,
    },
  },
  {
    id: 11,
    eventName: "Piece of sh**",
    description: `Your pet accidentally destroys your favorite piece of furniture. You lose 90 pet coins for repairs.`,
    eventValues: {
      happiness: 0,
      hunger: 0,
      energy: 0,
      money: -90,
    },
  },
  {
    id: 12,
    eventName: "Bye bye my friend",
    description: `Your pet best friend moves away. Happiness decreases by 50.`,
    eventValues: {
      happiness: -50,
      hunger: 0,
      energy: 0,
      money: 0,
    },
  },
  {
    id: 13,
    eventName: "Bad sleep",
    description: `Your pet has a restless night due to thunderstorms. Energy decreases by 40.`,
    eventValues: {
      happiness: 0,
      hunger: 0,
      energy: -40,
      money: 0,
    },
  },
  {
    id: 14,
    eventName: "Coin hunter",
    description: `Your pet finds a forgotten stash of coins hidden in the couch cushions. You gain 100 pet coins in a stroke of luck.`,
    eventValues: {
      happiness: 0,
      hunger: 0,
      energy: 0,
      money: 100,
    },
  },
];

export const userEvents = [
  {
    id: 1,
    eventName: "Wrong investment",
    description: "You bought the wrong cryptocurrency. You lose 200 coins.",
    eventValues: {
      money: -200,
    },
  },
  {
    id: 2,
    eventName: "Right investment",
    description:
      "Elon Musk tweets something about your pet coin. Your wealth grows by 200 coins.",
    eventValues: {
      money: 200,
    },
  },
  {
    id: 3,
    eventName: "Winner winner chicken dinner",
    description:
      "Your pet becomes second to last in the beauty contest. You receive 100 pet coins consolation money.",
    eventValues: {
      money: 100,
    },
  },
  {
    id: 4,
    eventName: "Lost Key",
    description:
      "You have lost your keys and now have to pay 100 coins to replace them",
    eventValues: {
      money: -100,
    },
  },
];
