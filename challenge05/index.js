import fetch from "node-fetch";

const getFinalUser = (users) => {
  let copy = users.map((user, index) => {
    return {
      user,
      index,
    };
  });
  while (copy.length > 1) {
    let shallowCopy = [];
    let index = 0;
    for (let i = 0; i < copy.length; i += 2) {
      shallowCopy[index] = copy[i];
      index++;
      if (i + 1 === copy.length) {
        shallowCopy.shift();
      }
    }
    copy = shallowCopy;
  }
  return copy[0];
};

const printSolution = async () => {
  const data = await fetch("https://codember.dev/mecenas.json");
  const users = await data.json();

  const finalUser = getFinalUser(users);

  console.log(`
        The final User is: ${finalUser.user} with index: ${finalUser.index} 
    `);
};

printSolution();
