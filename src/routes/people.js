'use strict';

const express = require('express');

const { PeopleModel, peopleInterface } = require('../models/index');

const router = express.Router();


router.get('/people', async (req, res, next) => {
  // const users = await User.findAll();
  try {
    const people = await peopleInterface.read();
    res.status(200).send(people);
  } catch (e) {
    next(e);
  }
});

router.get('/people/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const personById = await peopleInterface.read(id);
    res.status(200).send(personById);
  } catch(e) {
    next(e);
  }
});

router.post('/people', async (req, res, next) => {
  try {
    const newPerson = await peopleInterface.create(req.body);
    res.status(200).send(newPerson);

  } catch (e) {
    next(e);
  }
});


router.put('/people/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedPerson = await peopleInterface.update(req.body, id );
    res.status(200).send(updatedPerson);
  } catch(e) {
    next(e);
  }
});


router.delete('/people/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const personById = await peopleInterface.delete(id);
    res.status(200).send(personById);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
