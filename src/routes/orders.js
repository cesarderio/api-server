'use strict';

const express = require('express');

const { OrdersModel } = require('../models/orders.schema');

const router = express.Router();


router.get('/orders', async (req, res, next) => {
  // const users = await User.findAll();
  try {
    const orders = await OrdersModel.findAll();
    res.status(200).send(orders);
  } catch (e) {
    next(e);
  }
});

router.post('/orders', async (req, res, next) => {
  try {
    const newOrder = await OrdersModel.create(req.body);
    res.status(200).send(newOrder);

  } catch (e) {
    next(e);
  }
});

module.exports = router;
