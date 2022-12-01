import fetch from "node-fetch";

const splitSecret = (secret) => {
  let copy = secret;
  const sol = [];

  while (copy.length > 0) {
    if (Number(copy.substr(0, 2)) >= 33 && Number(copy.substr(0, 2)) < 100) {
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
  //const ANOTHER_SECRECT_MESSAGE = "73 107110111119 121111117 121111117 100111 110111116 107110111119 109101 73 97109 1199711699104105110103 121111117 73 97109 102111108108111119105110103 121111117 68111 121111117 11997110116 116111 11210897121 8010897121 119105116104 109101 79107 7610111639115 11210897121 82117110 116104105115 9911110910997110100 11511798109105116 116561181061045651505752561029911097108"
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
