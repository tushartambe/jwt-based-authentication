const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require('jsonwebtoken');

const EMAIL = "tushar@gmai.com";
const PASSWORD = "pass";
const secret = 'mysecretsshhh';

const app = express();
const port = 8080;

const logger = function(req, res, next) {
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("Cookie:", req.cookies);
  console.log("-------------------------------------------------------------");
  next();
};

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/authenticate', function (req, res) {
  console.log("request came for")
  const {email, password} = req.body;
  if (email !== EMAIL && password !== PASSWORD) {
    console.log("Wronhg")
    res.status(401)
      .json({
        error: 'Incorrect email or password'
      });
  } else {
    // Issue token
    const payload = {email};
    const token = jwt.sign(payload, secret, {
      expiresIn: 30
    });
    res.cookie('token', token, {httpOnly: true}).sendStatus(200);
  }
});