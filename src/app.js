const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { CORS_URL } = process.env;
require("./db.js");
const Stripe = require("stripe");

const server = express();

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE);
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUREURL,
};

server.name = "API";

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CORS_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);
server.post("/api/checkout", async (req, res) => {
  const { id, amount, dataUser } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
    });
    let user = await axios.get(
      `https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`
    );
    console.log(user.data);
    axios.put(
      `https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`,
      {
        plan: true,
      }
    );
    res.status(200).json(payment);
  } catch (error) {
    res.send(error.raw.message);
  }
});
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
