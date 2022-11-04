export const getFirstDayIndex = (date) => {
  let firstDayIndex = date.getDay();
  //logic to put sunday as last(6) and monday as first(0)
  if (firstDayIndex === 0) firstDayIndex = 6;
  else firstDayIndex--;

  return firstDayIndex;
};

export const getWeekNumbers = (date) => {
  let weekNumbers = [];
  for (let a = 0; a < 6; a++) {
    weekNumbers.push(date.getWeekNumber());
    date.setDate(date.getDate() + 7);
  }
  return weekNumbers;
};
// eslint-disable-next-line no-extend-native
Date.prototype.getWeekNumber = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

export const getFirstDateFromWeekNo = (weekNumber, year) => {
  var simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
};

export const weeksInYear = (year) => {
  var d = new Date(year, 11, 31);
  return d.getWeekNumber();
};

export const getLastDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
export const getFirstDayIndexOfMonth = (date) => {
  let firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  if (firstDayIndex === 0) firstDayIndex = 6;
  else firstDayIndex--;

  return firstDayIndex;
};

export const getMonthName = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getMonth()];
};
