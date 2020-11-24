const UserRepo = require("../models/user");

const getAll = async (req, res) => {
  let result = await UserRepo.find();
  return res.send(result);
};
const add = async (req, res) => {
  try {
    let users = [
      {
        firstName: "bbbb",
        lastName: "nguyen",
        role: "admin",
        date: new Date(),
      },
      {
        firstName: "bbbb2",
        lastName: "nguyen",
        role: "admin",
        date: new Date(),
      },
      {
        firstName: "bbbb3",
        lastName: "nguyen",
        role: "admin",
        date: new Date(),
      },
      {
        firstName: "bbbb1",
        lastName: "nguyen",
        role: "admin",
        date: new Date(),
      },
    ];

    await UserRepo.import(users);

    return res.send(200);
  } catch (e) {
    return res.send("Loi");
  }
};
const removeAll = async (req, res) => {
  try {
    await UserRepo.dele({ name: "tiep" });
    res.send(200);
  } catch (e) {
    return res.send("Loip");
  }
};
module.exports = { getAll, add, removeAll };
