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

  test('Creates a customer', async () => {
    let newCustomer = await request.post('/customer').send({
      name: 'tester',
      age: 42,
      pronouns: 'they/them',
    });
    let newCustomerTwo = await request.post('/customer').send({
      name: 'Raphael',
      age: 38,
      pronouns: 'he/him',
    });
    expect(newCustomer.status).toEqual(200);
    expect(newCustomer.body.name).toEqual('tester');
    expect(newCustomer.body.age).toEqual(42);
    expect(newCustomer.body.pronouns).toEqual('they/them');

    expect(newCustomerTwo.status).toEqual(200);
    expect(newCustomerTwo.body.name).toEqual('Raphael');
    expect(newCustomerTwo.body.age).toEqual(38);
    expect(newCustomerTwo.body.pronouns).toEqual('he/him');
  });

  test('finds all customers', async () => {
    let response = await request.get('/customer');
    console.log('-----------', response.body);

    expect(response.status).toEqual(200);

    // if using sqlite:memory, be sure and delete the memory file!
    expect(response.body.length).toEqual(2);
    expect(response.body[0].name).toEqual('tester');
    expect(response.body[0].age).toEqual(42);
    expect(response.body[0].pronouns).toEqual('they/them');

    expect(response.body[1].name).toEqual('Raphael');
    expect(response.body[1].age).toEqual(38);
    expect(response.body[1].pronouns).toEqual('he/him');
  });

  test('finds a single customer', async () => {
    let response = await request.get('/customer/2');

    expect(response.body.name).toEqual('Raphael');
    expect(response.body.age).toEqual(38);
    expect(response.body.pronouns).toEqual('he/him');
  });

  test('updates a single customer', async () => {
    await request.put('/customer/1').send({
      name: 'Mr. Tester',
      age: 42,
      pronouns: 'he/him',
    });

    let response = await request.get('/customer/1');

    expect(response.body.name).toEqual('Mr. Tester');
    expect(response.body.age).toEqual(42);
    expect(response.body.pronouns).toEqual('he/him');
  });

  test('deletes a single customer', async () => {
    await request.delete('/customer/1');

    let response = await request.get('/customer');

    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual('Raphael');
    expect(response.body[0].age).toEqual(38);
    expect(response.body[0].pronouns).toEqual('he/him');
  });

  //Create an order
  //------------demo sample----------------
  test('Creates an order', async () => {
    let response = await request.post('/order').send({
      productName: 'tester',
      amount: 2,
      shippingSpeed: 'Standard',
    });
    let newOrderTwo = await request.post('/order').send({
      productName: 'tester2',
      amount: 3,
      shippingSpeed: 'Standard',
    });
    expect(response.status).toEqual(200);
    expect(response.body.productName).toEqual('tester');
    expect(response.body.amount).toEqual(2);
    expect(response.body.shippingSpeed).toEqual('Standard');

    expect(newOrderTwo.body.productName).toEqual('tester2');
    expect(newOrderTwo.body.amount).toEqual(3);
    expect(newOrderTwo.body.shippingSpeed).toEqual('Standard');
  });

  //------------------------------------------
  test('finds all orders', async () => {
    let response = await request.get('/order');

    expect(response.status).toEqual(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].productName).toEqual('tester');
    expect(response.body[0].amount).toEqual(2);
    expect(response.body[0].shippingSpeed).toEqual('Standard');
    expect(response.body[1].productName).toEqual('tester2');
    expect(response.body[1].amount).toEqual(3);
    expect(response.body[1].shippingSpeed).toEqual('Standard');

  });

  test('finds a single order', async () => {
    let response = await request.get('/order/1');

    expect(response.body.productName).toEqual('tester');
    expect(response.body.amount).toEqual(2);
    expect(response.body.shippingSpeed).toEqual('Standard');
  });

  test('updates a single order', async () => {
    await request.put('/order/1').send({
      productName: 'tester',
      amount: 4,
      shippingSpeed: 'Next Day',
    });

    let response = await request.get('/order/1');

    expect(response.body.productName).toEqual('tester');
    expect(response.body.amount).toEqual(4);
    expect(response.body.shippingSpeed).toEqual('Next Day');
  });

  test('deletes a single order', async () => {
    await request.delete('/order/1');

    let response = await request.get('/order');

    expect(response.body.length).toEqual(1);
    expect(response.body[0].productName).toEqual('tester2');
    expect(response.body[0].amount).toEqual(3);
    expect(response.body[0].shippingSpeed).toEqual('Standard');
  });


  test('Creates a person', async () => {
    let newPerson = await request.post('/people').send({
      name: 'tester',
      age: 42,
      pronouns: 'they/them',
      // phone: 2065555555,
      // email: 'hello@world.com',
    });
    let newPersonTwo = await request.post('/people').send({
      name: 'Raphael',
      age: 38,
      pronouns: 'he/him',
      // phone: 2065555555,
      // email: 'hello@world.com',
    });

    expect(newPerson.status).toEqual(200);
    expect(newPerson.body.name).toEqual('tester');
    expect(newPerson.body.age).toEqual(42);
    expect(newPerson.body.pronouns).toEqual('they/them');

    expect(newPersonTwo.status).toEqual(200);
    expect(newPersonTwo.body.name).toEqual('Raphael');
    expect(newPersonTwo.body.age).toEqual(38);
    expect(newPersonTwo.body.pronouns).toEqual('he/him');
    // expect(newPersonTwo.body.phone).toEqual(2065555555);
    // expect(newPersonTwo.body.email).toEqual('hello@world.com');
  });



  test('finds all people', async () => {
    let response = await request.get('/people');

    expect(response.status).toEqual(200);
    // if using sqlite:memory, be sure and delete the memory file!
    expect(response.body.length).toEqual(2);
    expect(response.body[0].name).toEqual('tester');
    expect(response.body[0].age).toEqual(42);
    expect(response.body[0].pronouns).toEqual('they/them');
    expect(response.body[1].name).toEqual('Raphael');
    expect(response.body[1].age).toEqual(38);
    expect(response.body[1].pronouns).toEqual('he/him');
    // expect(response.body[0].phone).toEqual(2065555555);
    // expect(response.body[0].email).toEqual('hello@world.com');
  });

  test('finds a single person', async () => {
    let response = await request.get('/people/2');
    console.log(response.body);
    expect(response.body.name).toEqual('Raphael');
    expect(response.body.age).toEqual(38);
    expect(response.body.pronouns).toEqual('he/him');
  });

  test('updates a single person', async () => {
    await request.put('/people/1').send({
      name: 'Mr. Tester',
      age: 42,
      pronouns: 'he/him',
    });
    let response = await request.get('/people/1');

    expect(response.body.name).toEqual('Mr. Tester');
    expect(response.body.age).toEqual(42);
    expect(response.body.pronouns).toEqual('he/him');
  });

  test('deletes a single person', async () => {
    await request.delete('/people/1');
    let response = await request.get('/people');

    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual('Raphael');
    expect(response.body[0].age).toEqual(38);
    expect(response.body[0].pronouns).toEqual('he/him');
  });

});
