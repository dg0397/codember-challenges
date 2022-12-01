import fetch from "node-fetch";

const printSolution = async () => {
  const data = await fetch("https://codember.dev/colors.txt");
  const textData = await data.text();
  const COLORS = JSON.parse(textData);

  let sol = COLORS.reduce(
    (acc, color, index, array) => {
      if (array[index - 1] === array[index + 1] && color !== array[index + 1]) {
        acc.serie++;

        if (acc.longestSerie < acc.serie) {
          acc.longestSerie = acc.serie;
          acc.index = index + 1;
        }
        return acc;
      }
      if (array[index - 1] !== array[index + 1]) {
        acc.serie = 2;
        return acc;
      }
      return acc;
    },
    { index: 0, longestSerie: 1, serie: 1 }
  );
  console.log(`color:${COLORS[sol.index]} - LongestSerie:${sol.longestSerie}`);
};

printSolution();
