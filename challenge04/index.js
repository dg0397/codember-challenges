function checkOrder(string) {
  let [first, second, third, fourth, fifth] = string.split("");

  if (
    Number(first) <= Number(second) &&
    Number(second) <= Number(third) &&
    Number(third) <= Number(fourth) &&
    Number(fourth) <= Number(fifth)
  )
    return true;

  return false;
}
let allNumbersInRange = new Array(100000)
  .fill(0, 0)
  .map((val, index) => index)
  .map((num) => {
    if (num < 10) {
      return "0000" + String(num);
    } else if (num < 100) {
      return "000" + String(num);
    } else if (num < 1000) {
      return "00" + String(num);
    } else if (num < 10000) {
      return "0" + String(num);
    } else {
      return String(num);
    }
  });

let numbersWithAtLeastTwo3s = allNumbersInRange.filter((num, index, array) => {
  if (
    num.split("").filter((val) => val === "5").length >= 2 &&
    Number(num) >= 11098 &&
    Number(num) <= 98123
  ) {
    return num;
  }
});

let checkingCondition = numbersWithAtLeastTwo3s.filter(checkOrder);

console.log(`
    Solution:${checkingCondition.length}-${checkingCondition[55]}
`);
