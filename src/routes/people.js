'use strict';

const express = require('express');

const { PeopleModel } = require('../models');

const router = express.Router();


router.get('/people', async (req, res, next) => {
  // const users = await User.findAll();
  try {
    const people = await PeopleModel.findAll();
    res.status(200).send(people);
  } catch (e) {
    next(e);
  }
});

router.post('/people', async (req, res, next) => {
  try {
    const newPerson = await PeopleModel.create(req.body);
    res.status(200).send(newPerson);

  } catch (e) {
    next(e);
  }
});

module.exports = router;
