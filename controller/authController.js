const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data) { this.users = data; }
};

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
  const { usr, pwd } = req.body;

  if (!usr || !pwd)
    return res.status(400).json({
      "message": "Username and Password are required"
    });

  const foundUser = usersDB.users.find(
    user => user.username === usr
  );

  if (!foundUser) return res.sendStatus(401); // Unauthorised

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    const otherUsers = usersDB.users.filter(
      user => user.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([ ...otherUsers, currentUser ]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'user.json'),
      JSON.stringify(usersDB.users)
    );

    res.cookie('jwt', refreshToken,
      {
        httponly: true,
        maxAge: 24 * 60 * 60 * 1000
      }
    );
    res.json({ accessToken });
  }
  else
    res.sendStatus(401);
};

module.exports = { handleLogin };
