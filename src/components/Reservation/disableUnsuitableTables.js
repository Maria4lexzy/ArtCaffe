import { tables } from "../../constants";

export const disableSmallTables = (numberOfPeople, reservedTables) => {
  let smallSizeTables = {};
  //get small table sizes
  tables.tableSizes.forEach((table) => {
    if (table.people < numberOfPeople)
      smallSizeTables[table.name] = table.people;
  });
  //check combining tables

  return smallSizeTables;
};

export const getTableCombinations = (numberOfPeople, reservedTables) => {
  //get free tables
  const freeTables = {};
  tables.tableSizes.forEach((table) => {
    //check if reserved if true table is free
    if (!reservedTables[table.name]) freeTables[table.name] = table.people;
  });

  if (numberOfPeople <= 8)
    return makeTableCombinations8P(numberOfPeople, freeTables);
  else if (numberOfPeople <= 10)
    return makeTableCombinations10P(numberOfPeople, freeTables);
  else return makeTableCombinations13P(numberOfPeople, freeTables);
};
//T1-T5 - 25
//F1-F3 - 15
//F5-F6 - 8
const makeTableCombinations8P = (numberOfPeople, freeTables) => {
  let possibleCombinations = [];
  //T1+T2 / T2+T3
  if (freeTables["T2"]) {
    if (freeTables["T1"]) {
      possibleCombinations.push(["T1", "T2"]);
    }
    if (freeTables["T3"]) {
      possibleCombinations.push(["T3", "T2"]);
    }
  }
  //T5+T4 / T4+T3
  if (freeTables["T4"]) {
    if (freeTables["T3"]) {
      possibleCombinations.push(["T3", "T4"]);
    }
    if (freeTables["T5"]) {
      possibleCombinations.push(["T4", "T5"]);
    }
  }
  //F3+F2 / F2+F1
  if (freeTables["F2"]) {
    if (freeTables["F3"]) {
      possibleCombinations.push(["F2", "F3"]);
    }
    if (freeTables["F1"]) {
      possibleCombinations.push(["F1", "F2"]);
    }
  }
  //F5+F6
  if (freeTables["F5"] && freeTables["F6"])
    possibleCombinations.push(["F5", "F6"]);

  //F5+F4 / F4+F6
  if (numberOfPeople < 7) {
    if (freeTables["F5"] && freeTables["F4"])
      possibleCombinations.push(["F4", "F5"]);
    if (freeTables["F6"] && freeTables["F4"])
      possibleCombinations.push(["F4", "F6"]);
  }
  if (freeTables["Sofa"]) possibleCombinations.push(["Sofa"]);
  console.log(possibleCombinations);
  return possibleCombinations;
};
const makeTableCombinations10P = (numberOfPeople, freeTables) => {
  let possibleCombinations = [];
  //T1+T2 / T2+T3
  if (freeTables["Sofa"]) possibleCombinations.push(["Sofa"]);
  if (freeTables["T2"]) {
    if (freeTables["T1"]) {
      possibleCombinations.push(["T1", "T2"]);
    }
    if (freeTables["T3"]) {
      possibleCombinations.push(["T3", "T2"]);
    }
  }
  //T3+T5
  if (numberOfPeople <= 9) {
    if (freeTables["T5"] && freeTables["T4"]) {
      possibleCombinations.push(["T5", "T4"]);
    }
  }
  //F3+F2
  if (freeTables["F2"] && freeTables["F3"])
    possibleCombinations.push(["F2", "F3"]);
  //F5+F6+F4
  if (freeTables["F5"] && freeTables["F6"] && freeTables["F4"])
    possibleCombinations.push(["F5", "F6", "F4"]);

  console.log(possibleCombinations);
  return possibleCombinations;
};
const makeTableCombinations13P = (numberOfPeople, freeTables) => {
  let possibleCombinations = [];
  //T1+T2+T3
  if (freeTables["T2"] && freeTables["T3"] && freeTables["T1"])
    possibleCombinations.push(["T3", "T2", "T1"]);
  //T2+T3+T5
  if (freeTables["T2"] && freeTables["T3"] && freeTables["T4"])
    possibleCombinations.push(["T3", "T2", "T4"]);
  //T3+T5+T4
  if (freeTables["T3"] && freeTables["T4"] && freeTables["T5"])
    possibleCombinations.push(["T3", "T4", "T5"]);
  //F1+F2+F3
  if (freeTables["F1"] && freeTables["F2"] && freeTables["F3"])
    possibleCombinations.push(["F1", "F2", "F3"]);
  console.log(possibleCombinations);

  if (numberOfPeople <= 12) {
    if (freeTables["Sofa"]) possibleCombinations.push(["Sofa"]);
  }
  return possibleCombinations;
};
