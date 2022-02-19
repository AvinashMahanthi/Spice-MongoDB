const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const connectToDB = require("./db/connection");

const Response = require("./model/responseModel");

const Admin = require("./model/adminModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN, JWT_SECRET } = require("./keys");
const requireLogin = require("./middleware/adminLogin");

connectToDB();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Spice!");
});

// Admin SignUp

app.post("/signUp", (req, res) => {
  const { email, name, password, confirmPassword } = req.body;
  if (!email || !password || !name || !confirmPassword) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  if (password == confirmPassword) {
    Admin.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already Exists!" });
      }
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const registerAdmin = new Admin({
          email,
          name,
          password: hashedPassword,
        });
        registerAdmin
          .save()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        res.json({ msg: "Login Information saved!" });
      });
    });
  }
});

// Admin login

app.post("/signIn", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  Admin.findOne({ email: email })
    .then((savedUser) => {
      bcrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          res.json(token);
          res.json({ msg: "Logged in sucessfully!" });
        } else {
          res.status(422).json({ error: "Invalid Email or Password" });
        }
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
});

// Registering the team

app.post("/register", (req, res) => {
  const {
    teamName,
    teamSize,
    graduationType,
    mentorName,
    mentorDesignation,
    teamLeaderName,
    teamLeaderEmail,
    mobileNumber,
    alternateMobileNumber,
    institutionName,
    city,
    state,
    teamMembers,
    domain,
    projectTitle,
    projectAbstract,
  } = req.body;
  // console.log(req.body);
  const response = new Response({
    teamName,
    teamSize,
    graduationType,
    mentorName,
    mentorDesignation,
    teamLeaderName,
    teamLeaderEmail,
    mobileNumber,
    alternateMobileNumber,
    institutionName,
    city,
    state,
    teamMembers,
    domain,
    projectTitle,
    projectAbstract,
  });
  response
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({ msg: "Response saved!" });
});

// Deleting the response

app.delete("/responses/:id", requireLogin, (req, res) => {
  const id = req.params.id;
  Response.deleteOne({ _id: id })
    .then(() => res.json({ msg: "Response deleted!" }))
    .catch((err) => {
      console.log(err);
    });
});

// Updating the response

app.put("/responses/update/:id", requireLogin, (req, res) => {
  const {
    teamName,
    teamSize,
    graduationType,
    mentorName,
    mentorDesignation,
    teamLeaderName,
    teamLeaderEmail,
    mobileNumber,
    alternateMobileNumber,
    institutionName,
    city,
    state,
    teamMembers,
    domain,
    projectTitle,
    projectAbstract,
  } = req.body;
  const update = {
    teamName,
    teamSize,
    graduationType,
    mentorName,
    mentorDesignation,
    teamLeaderName,
    teamLeaderEmail,
    mobileNumber,
    alternateMobileNumber,
    institutionName,
    city,
    state,
    teamMembers,
    domain,
    projectTitle,
    projectAbstract,
  };
  Response.findByIdAndUpdate(req.params.id, update, { new: true })
    .then(() => res.json({ msg: "Response updated sucessfully!" }))
    .catch((e) => {
      console.log(e);
    });
});

// Getting all the responces

app.get("/responses", requireLogin, (req, res) => {
  Response.find().then((response) => {
    res.json({ response });
  });
});

// Getting the responce of a particular id

app.get("/responses/:id", requireLogin, (req, res) => {
  Response.find({ _id: req.params.id }).then((response) => {
    res.json({ response });
  });
});

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});
