# Lab Class 03

## Project: Basic-API-server

Create a basic api server.
Dynamic API Phase 2: Perform CRUD Operations on a database.

### Author: Raphael Chookagian

### Problem Domain

Build a REST API using Express, by creating a proper series of endpoints that perform CRUD operations on a database, using the REST standard

Dynamic API Phase 2: Perform CRUD Operations on a database.

### Links and Resources

- [ci,cd](https://github.com/cesarderio/class3)
- [prod deployment](https://basic-express-server-tg63.onrender.com)
<!-- - [dev deployment](https://server-dev-6rxb.onrender.com/) -->

### Setup

### `.env` requirements

see `.env.sample`

i.e.

- `PORT`
- `DATABASE_URL` - URL to the running Postgres instance/db

#### How to initialize/run your application (where applicable)

- nodemon

#### Features / Routes

- Feature One: Details of feature
- GET : `/` - specific route to hit
- GET : `/customers` - specific route to hit
- GET : `bad` - specific route to hit

#### Tests

- How do you run tests?
  - npm test
- Any tests of note?
  - validator
  - logger
  - handles root path
  - handles errors
  handles invalid requests

- 404 on a bad route
- 404 on a bad method

The correct status codes and returned data for each REST route:

- Create a record using POST
- Read a list of records using GET
- Read a record using GET
- Update a record using PUT
- Destroy a record using DELETE

### Whiteboard

#### UML

![UML](./assets/uml.png)

## Terminology

- Query Parameter: `/person?name=Raphael`
- Path (URL) Parameter: `/person/name`
-
