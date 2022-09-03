const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { CORS_URL } = process.env;
require("./db.js");
const Stripe = require("stripe");
const server = express();
const axios = require("axios");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const { instrument } = require("@socket.io/admin-ui");

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE);
// server.use(cors);

// const config = {
//   authRequired: false,
//   auth0Logout: false,
//   secret: process.env.SECRET,
//   baseURL: process.env.BASEURL,
//   clientID: process.env.CLIENTID,
//   issuerBaseURL: process.env.ISSUREURL,
// };

//socket io//////////
const socketServerIo = http.createServer(server);
const io = new Server(socketServerIo, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);

  socket.on("room",(room)=>{
    console.log(room);
    socket.join(room.room)
    console.log("joined to room")
  })

  socket.on("messege", (messege) => {
    console.log(messege);
    socket.to(messege.room).emit("messegeFromBack", messege);
  });
});

instrumen(io, {auth : false})
/////////////////////////

server.name = "API";

// server.use(
//   cors({
//     origin: ["*", "*"],
//   })
// );
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
  try {
    const { id, amount, dataUser } = req.body;
    console.log("id", id, "ammount", amount, "dataUser", dataUser, "fin");
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
    });
    let user = await axios.get(
      `https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`
    );
    console.log("userData", user.data);
    axios.put(
      `https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`,
      {
        plan: true,
      }
    );
    res.status(200).json(payment);
  } catch (error) {
    console.log("error", error, "datastripe", error.StripeCardError);
    res.send(error);
  }
});
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.error(err);
});

module.exports = socketServerIo;
