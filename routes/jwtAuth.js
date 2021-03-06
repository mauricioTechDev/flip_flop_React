const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const path = require('path')
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");



require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
const EMAIL_SECRET="iHopeYouConfirmYourEmail"

//authorizeentication

router.post("/register", validInfo, async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM user_account WHERE email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      `INSERT INTO user_account (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, email, bcryptPassword]
    );
    // when I create the user I need to send them an email
    // with a jwt confirmation token
    jwt.sign(
      {
        user: newUser.rows[0].user_id,
      },
      EMAIL_SECRET,
      {
        expiresIn: '1d',
      },
      (err, emailToken) => {
        const url = `https://flip-flop-photo-app.herokuapp.com/#/confirmation/${emailToken}`;
        transporter.sendMail({
          to: newUser.rows[0].email,
          subject: 'Confirm Email',
          html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
        });
      },
    );

    // const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    //
    // return res.json({ jwtToken });
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post('/confirmation/:id', async (req, res, next) => {
  try {
    const verificationResponce = jwt.verify(req.params.id, EMAIL_SECRET);
    const id = verificationResponce.user
    const emailConfirmed = true
    const emailConfirmation = await pool.query(`
      UPDATE user_account
      SET confirmed = $1
      WHERE user_id = $2;`,[emailConfirmed, id])
      res.json(emailConfirmation)
  } catch (err) {
    console.error(err.message);
  }

  // return res.redirect('http://localhost:3001/login');
});



router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM user_account WHERE email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// cathc all method
  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build/index.html"))
  })

module.exports = router;
 // inspired by https://github.com/l0609890/db-design-auth-todo-list
