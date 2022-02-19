const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged In" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.json({ error: "You must be LoggedIn!" });
    }

    const { _id } = payload;
    Admin.findById(_id).then((userdata) => {
      req.user = userdata;
    });
    next();
  });
};
