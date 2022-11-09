import fetch from "node-fetch";

//const VALIDKEYS = ['usr','eme','psw','age','loc','fll']

const getValuesFromUser = (str) => {
  const data = str.split(" ").filter((keyValue) => {
    const [key, value] = keyValue.split(":");
    if (key && value) {
      return true;
    } else {
      return false;
    }
  });
  if (data.length < 6) return null;

  const sortedData = data.reduce((acc, keyValue) => {
    const [key, value] = keyValue.split(":");
    acc[key] = value;
    return acc;
  }, {});

  return sortedData;
};
const getUsers = async () => {
  const data = await fetch("http://codember.dev/users.txt");
  const input = await data.text();

  const sortedData = input
    .split("\n")
    .map((data, index, array) => {
      const userInfo = [];
      let flag = index - 1;
      if (data === "") {
        while (array[flag]) {
          userInfo.push(array[flag]);
          flag--;
        }
      }
      return [...userInfo];
    })
    .filter((data) => data.length > 0)
    .map((data) => data.join(" "));

  const validatedData = sortedData.reduce((acc, data) => {
    const validatingData = getValuesFromUser(data);
    if (validatingData) {
      acc.push(validatingData);
    }
    return acc;
  }, []);

  return validatedData;
};

const printSolution = async () => {
  const validUsers = await getUsers();

  console.log(`
    Total:${validUsers.length}
    LastValidUser:${validUsers[validUsers.length - 1].usr}
  `);
};

printSolution();
