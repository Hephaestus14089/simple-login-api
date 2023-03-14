const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data) { this.users = data; }
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { usr, pwd } = req.body;

  if (!usr || !pwd)
    return res.status(400).json({
      "message": "Username and Password are required"
    });

  const duplicate = usersDB.users.find(
    user => user.username === usr
  );

  if (duplicate)
    return res.sendStatus(409); // Conflict

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = {
      "username": usr,
      "password": hashedPwd
    };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(usersDB.users)
    );

    res.status(201).json({
      "success": `New user ${usr} created`
    })
  }
  catch (err) {
    res.status(500).json({
      "message": err.message
    });
  }
};

module.exports = { handleNewUser };
