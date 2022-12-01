'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models/index.js');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('REST API', () => {
  test('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });
  test('Create a customer', async () => {
    let response = await request.post('/customer').send({
      name: 'tester',
      age: 42,
      pronouns: 'they/them',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tester');
    expect(response.body.age).toEqual(42);
    expect(response.body.pronouns).toEqual('they/them');
  });

  test('finds all customers', async () => {
    let response = await request.get('/customer');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('tester');
    expect(response.body[0].age).toEqual(42);
    expect(response.body[0].pronouns).toEqual('they/them');
  });

  // test('finds a customer by id', async () => {
  //   let response = await request.get('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('updates a customer by id', async () => {
  //   let response = await request.update('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('deletes a customer by id', async () => {
  //   let response = await request.destroy('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  test('Create an order', async () => {
    let response = await request.post('/order').send({
      productName: 'tester',
      amount: 1,
      shippingSpeed: 'Standard',
    });

    expect(response.status).toEqual(200);
    expect(response.body.productName).toEqual('tester');
    expect(response.body.amount).toEqual(1);
    expect(response.body.shippingSpeed).toEqual('Standard');
  });



  test('finds all orders', async () => {
    let response = await request.get('/order');

    expect(response.status).toEqual(200);
    expect(response.body[0].productName).toEqual('tester');
    expect(response.body[0].amount).toEqual(1);
    expect(response.body[0].shippingSpeed).toEqual('Standard');
  });

  // test('finds a order by id', async () => {
  //   let response = await request.get('/order/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('updates a order by id', async () => {
  //   let response = await request.update('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('deletes a customer by id', async () => {
  //   let response = await request.destroy('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });



  test('Create a new person', async () => {
    let response = await request.post('/people').send({
      name: 'tester',
      age: 42,
      pronouns: 'they/them',
      // phone: 2065555555,
      // email: 'hello@world.com',
    });

    // expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tester');
    expect(response.body.age).toEqual(42);
    expect(response.body.pronouns).toEqual('they/them');
    // expect(response.body.phone).toEqual(2065555555);
    // expect(response.body.email).toEqual('hello@world.com');
  });

  test('finds all people', async () => {
    let response = await request.get('/people');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('tester');
    expect(response.body[0].age).toEqual(42);
    expect(response.body[0].pronouns).toEqual('they/them');
    // expect(response.body[0].phone).toEqual(2065555555);
    // expect(response.body[0].email).toEqual('hello@world.com');
  });


  // test('finds people by id', async () => {
  //   let response = await request.get('/people/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('updates people by id', async () => {
  //   let response = await request.update('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('deletes people by id', async () => {
  //   let response = await request.destroy('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

});
