'use strict';

const express = require('express');

const { CustomerModel } = require('../models/index');

const router = express.Router();


router.get('/customer', async (req, res, next) => {
  // const users = await User.findAll();
  try {
    const customers = await CustomerModel.findAll();
    res.status(200).send(customers);
  } catch(e) {
    next(e);
  }
});

router.get('/customer/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const customerById = await CustomerModel.findAll({where:{id}});
    res.status(200).send(customerById);
  } catch(e) {
    next(e);
  }
});

router.post('/customer', async (req, res, next) => {
  try {
    const newCustomer = await CustomerModel.create(req.body);
    res.status(200).send(newCustomer);
  } catch(e) {
    next(e);
  }
});

router.put('/customer/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedCustomer = await CustomerModel.update(req.body, { where: {id}} );
    res.status(200).send(updatedCustomer);
  } catch(e) {
    next(e);
  }
});


router.delete('/customer/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const customerById = await CustomerModel.destroy({where:{id}});
    res.status(200).send(customerById);
  } catch(e) {
    next(e);
  }
});


module.exports = router;
