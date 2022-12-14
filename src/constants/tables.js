import { pics } from "../constants";
const coffeeRoom = [
  {
    id: "Sofa",
    classSelector: "targets",
    width: 300,
    alt: "sofa",
    height: 300,
    top: 30,
    fontSize: 25,
    pic: pics.sofa,
    left: 30,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "K7",
    classSelector: "targets",
    width: 200,
    alt: "K7",
    height: 200,
    top: 210,
    pic: pics.K7,
    left: 365,
    rotate: 180,
    backgroundColor: "transparent",
    fontColor: "black",
  },
  {
    id: "K6",
    classSelector: "targets",
    width: 200,
    height: 200,
    alt: "K6",
    top: 10,
    pic: pics.K6,
    left: 585,

    rotate: 180,
    backgroundColor: "transparent",
    fontColor: "black",
  },
  {
    id: "K5",
    classSelector: "targets",
    width: 200,
    height: 200,
    alt: "K5",
    top: 270,
    pic: pics.K5,
    left: 585,

    rotate: 180,
    backgroundColor: "transparent",
    fontColor: "black",
  },
  {
    id: "K4",
    classSelector: "targets",
    width: 200,
    height: 200,
    alt: "K4",
    top: 10,
    pic: pics.K4,
    left: 800,

    rotate: 180,
    backgroundColor: "transparent",
    fontColor: "black",
  },
  {
    id: "K3",
    classSelector: "targets",
    width: 200,
    height: 200,
    alt: "K3",
    top: 10,
    pic: pics.K3,
    left: 1030,
    people: 2,
    rotate: 180,
    backgroundColor: "transparent",
    fontColor: "black",
  },
  {
    id: "K2",
    classSelector: "targets",
    width: 200,
    height: 200,
    top: 10,
    pic: pics.K2,
    alt: "K2",
    people: 2,
    left: 1250,
    rotate: 180,
    backgroundColor: "transparent",
    fontColor: "black",
  },
  {
    id: "K1",
    classSelector: "targets",
    width: 200,
    height: 200,
    alt: "K1",
    top: 150,
    people: 7,
    pic: pics.K1,
    left: 1280,
    rotate: 180,
    backgroundColor: "transparent",
    fontColor: "black",
  },
];

const smokingRoom = [
  {
    id: "F1",
    classSelector: "targets",
    width: 235,
    alt: "F1",
    height: 180,
    top: 295,
    fontSize: 25,
    pic: pics.F1,
    people: 4,
    left: 7,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "F2",
    classSelector: "targets",
    width: 235,
    alt: "F2",
    height: 125,
    top: 185,
    fontSize: 25,
    pic: pics.F2,
    left: 7,
    people: 4,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "F3",
    classSelector: "targets",
    width: 235,
    alt: "F3",
    height: "auto",
    top: 7,
    fontSize: 25,
    pic: pics.F3,
    people: 6,
    left: 7,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "F4",
    classSelector: "targets",
    width: 120,
    alt: "F4",
    height: "auto",
    top: 10,
    fontSize: 25,
    pic: pics.F4,
    left: 220,
    people: 2,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "F5",
    classSelector: "targets",
    width: 180,
    alt: "F5",
    height: "auto",
    top: 30,
    fontSize: 25,
    pic: pics.F5,
    left: 380,
    people: 4,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "F6",
    classSelector: "targets",
    width: 180,
    alt: "F6",
    height: "auto",
    top: 250,
    fontSize: 25,
    pic: pics.F6,
    left: 380,
    people: 4,
    backgroundColor: "transparent",
    fontColor: "white",
  },
];
const terace = [
  {
    id: "T1",
    classSelector: "targets",
    width: 235,
    alt: "T1",
    height: 180,
    top: 7,
    fontSize: 25,
    pic: pics.T1,

    left: 900,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "T2",
    classSelector: "targets",
    width: 235,
    alt: "T2",
    height: 125,
    top: 7,
    fontSize: 25,
    pic: pics.T2,

    left: 650,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "T3",
    classSelector: "targets",
    width: 235,
    alt: "T3",
    height: "auto",
    top: 7,
    fontSize: 25,
    pic: pics.T3,

    left: 400,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "T4",
    classSelector: "targets",
    width: 150,
    alt: "T4",
    height: "auto",
    top: 10,
    fontSize: 25,

    pic: pics.T4,
    left: 220,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "T5",
    classSelector: "targets",
    width: 150,
    alt: "T5",
    height: "auto",
    top: 10,
    fontSize: 25,
    pic: pics.T5,
    left: 30,

    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "T6",
    classSelector: "targets",
    width: 200,
    alt: "T6",
    height: "auto",
    top: 290,
    fontSize: 25,

    pic: pics.T6,
    left: 680,
    backgroundColor: "transparent",
    fontColor: "white",
  },
  {
    id: "T7",
    classSelector: "targets",
    width: 200,
    alt: "T7",
    height: "auto",
    top: 290,
    fontSize: 25,
    pic: pics.T7,
    left: 300,

    backgroundColor: "transparent",
    fontColor: "white",
  },
];
const tableSizes = [
  { name: "T1", people: 5 },
  { name: "T2", people: 5 },
  { name: "T3", people: 5 },
  { name: "T4", people: 4 },
  { name: "T5", people: 4 },
  { name: "T6", people: 2 },
  { name: "T7", people: 2 },
  { name: "Sofa", people: 12 },
  { name: "K1", people: 7 },
  { name: "K2", people: 2 },
  { name: "K3", people: 2 },
  { name: "K4", people: 5 },
  { name: "K5", people: 2 },
  { name: "K6", people: 2 },
  { name: "K7", people: 3 },
  { name: "F1", people: 4 },
  { name: "F2", people: 4 },
  { name: "F3", people: 6 },
  { name: "F4", people: 2 },
  { name: "F5", people: 4 },
  { name: "F6", people: 4 },
];
// eslint-disable-next-line
export default { coffeeRoom, smokingRoom, terace, tableSizes };
