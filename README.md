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

### Whiteboard

#### UML

![UML](./assets/uml.png)

## Terminology

- Query Parameter: `/person?name=Raphael`
- Path (URL) Parameter: `/person/name`
-
