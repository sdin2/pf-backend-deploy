const Stripe = require("stripe");
const axios = require("axios");
require("dotenv").config();
const { Router } = require("express");
const { SECRET_KEY_STRIPE } = process.env;
const { User } = require("../db");
// const express = require ('express')

const router = Router();
const stripe = new Stripe(SECRET_KEY_STRIPE);

router.post("/", async (req, res) => {
  const { id, amount, dataUser } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
      dataUser,
    });
    let user = await axios.get(
      `https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`
    );
    console.log(dataUser.id);
    console.log(user.data);
    axios.put(
      `https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`,
      {
        plan: true,
      }
    );
    res.status(200).json("Purchase completed!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
