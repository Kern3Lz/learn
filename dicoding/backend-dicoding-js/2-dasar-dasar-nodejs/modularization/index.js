const Tiger = require("./Tiger");
const Wolf = require("./Wolf");
// import Tiger from "./Tiger.js"; ES6
// import Wolf from "./Wolf.js"; ES6

const fighting = (tiger, wolf) => {
  if (tiger.strength > wolf.strength) {
    tiger.growl();
    return;
  }

  if (wolf.strength > tiger.strength) {
    wolf.howl();
    return;
  }

  console.log("Tiger and Wolf have same strength");
};

const tiger = new Tiger();
const wolf = new Wolf();

fighting(tiger, wolf);
