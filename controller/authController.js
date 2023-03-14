const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data) { this.users = data; }
};

const bcrypt = require('bcrypt');

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
    // create JWTs
    //
    res.json({
      "success": `Logged in as ${usr}.`
    });
  }
  else
    res.sendStatus(401);
};

module.exports = { handleLogin };
