import fetch from "node-fetch";

const splitSecret = (secret) => {
  let copy = secret;
  const sol = [];

  while (copy.length > 0) {
    if (Number(copy.substr(0, 2)) >= 97 && Number(copy.substr(0, 2)) < 100) {
      const sliced = copy.substr(0, 2);
      copy = copy.substr(2);
      sol.push(sliced);
    } else {
      sol.push(copy.substr(0, 3));
      copy = copy.substr(3);
    }
  }
  return sol;
};

const printSolution = async () => {
  const data = await fetch("https://codember.dev/encrypted.txt");
  const SECRECT_MESSAGE = await data.text();

  const sol = SECRECT_MESSAGE.split(" ")
    .map((secret) => {
      const splitedSecret = splitSecret(secret);
      const secretResolved = splitedSecret.map((secret) =>
        String.fromCharCode(Number(secret))
      );

      return secretResolved.join("");
    })
    .join(" ");

  console.log(`
    The secret message is: ${sol}.
  `);
};

printSolution();
