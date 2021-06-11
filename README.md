# Homeiva API Server

Homeiva API Server provides API endpoints with which users can signup into our Homeiva app and explore various functionalities. 

## Technology Stack

For designing this API server we have used the following:
  - `Javascript`
  - `Node.js`
  - `MongoDB`
  - `GraphQL`

## Prerequisites

- [Node.js](https://nodejs.org) v10.0.0+
- [Docker](https://www.docker.com/)

## Getting Started

Install the required npm packages using the following npm command

``` bash
$ npm install
```

MongoDB is used as the database for storing user and apartment informations. Please ensure that the required environment variables are filled in the docker-compose file before starting the mongo container. Definitions for environement variables are provided in the [section].

Start mongo container using the following command.

``` bash
$ docker-compose up -d
```

### Start a Local API Server

Inorder to test the application you can start the application locally. 

```bash
$ npm start
```
If you havent changed the `.env` file, the API server should be up and running in port `9000`.

The GraphQL play ground should be available in http://localhost:9000.


## Query Examples

1. User Sign up
```
mutation{
  signUpUser(user: {
    firstName: "Andy"
    lastName: "Newman"
    emailId: "andy@homeiva.com"
    password: "somepassword"
    address: "ABC street"
    city: "Houston"
    state: "TX"
    country:"USA"
    zipCode: 99623
  }) {
    token
  }
}
```

2. User Login
```
mutation {
  loginUser(email: "andy@homeiva.com", password: "seomepassword") {
    token 
  }
}
```

3. GET all users
```
query {
  users {
    firstName
    lastName
    emailId
    address
    city
    state
    country
    zipCode
  }
}
```

4. GET user by Id
```
query {
 user(id: "60c1a3264abd723054e0f568") {
  firstName
    lastName
    emailId
    address
    city
    state
    country
    zipCode
  } 
}
```

5. Update user
```
mutation{
  updateUser(id: "60c1a3264abd723054e0f568") {
    id
    firstName
    lastName
  }
}
```

6. Add apartment for user
```
mutation {
  createApartment (apartment: {
    name: "Vallur House"
    address: "ABC street"
    city: "Houston"
    state: "TX"
    country: "USA"
    rooms: 3
    zipCode: 99623
  }) {
    userId
  }
}
```

7. GET all apartments
```
query {
  apartments {
    name
    rooms
  }
}
```

8. GET apartment by id
```
query {
  apartment(id: "60c1a3264abd723054e0f568") {
    name
    rooms
  }
}
```

9. Update apartment
```
mutation {
  updateApartment(id: "60c1a3264abd723054e0f568") {
    id
    name
  }
}
```

10. Add apartment to favorites
```
mutation {
  addApartmentAsFavorite(apartmentId: "60c1a968a6e31946fce2aa75") {
    favorites {
      name
      zipCode
    }
  }
}
```

11. Remove apartment from favorites
```
mutation {
  removeApartmentFromFavorite(apartmentId: "60c1a968a6e31946fce2aa75") {
    favorites {
      name
    }
  }
}

```
12. Search apartments. Search can be done by either city, country, rooms.
```
query {
  searchApartment(city: "Houston") {
    address
  }
}
```
13. Search apartment by distance.
```
query {
  searchApartmentByDistance(zipcode: 12301, distance:0) {
    address
  }
}
```

The overview of the schema for each type can be found in the graphql playground itself.


### Authorization

The authorization header can be passsed in the following format:

```
{
  "Authorization": "some very long string"
}
```

## Folder Structure

The fol;der structure has been designed in a scalable way.

```
|- /config    - config files
  |- environment - environment specifi configurations
|- /db   - Database related files (used by `package.json`)
  |- index.js - MongoDB connection handling
  |- /models - DB models
|- /graphql - GraphQL application
  |- /resolvers - GraphQL resolvers
  |- /typedefs - GraphQL typedefinitions
|- /mongo-entrypoint.db - Mongo container initialization scripts
|- /utilities - Application utilities
|- app.js - Express and appolo server initialization
|- index.js - DB connection and server startup
|- /tests        - tests written in [ava](https://github.com/avajs/ava) framework
```


## Environment Variables

All configurations are fetched from environment variables. Application related environment variables should be added in `.env` file, and mongo container related environment variables should be added in `docker-compose.yml`.

Please find the details of all the environment variables used in this application:

Env variable name | Description | Example | Defaults |
--- | --- | --- | --- |
`MONGO_INITDB_ROOT_USERNAME` | MongoDB admin user name | `root` |
`MONGO_INITDB_ROOT_PASSWORD` | MongoDB admin password | `root` |
`MONGO_USERNAME` | MongoDB username | `homeiva` |
`MONGO_PASSWORD` | MongoDB password | `pass` |
`MONGO_PORT` | MongoDB port | `27017` | `27017`
`MONGO_HOSTNAME` | MongoDB host name | `localhost` | `localhost` |
`MONGO_DB` | MongoDB database name | `homeiva` |
`NODE_ENV` | Node environment | `development` | `development` |
`PORT` | Application server port number | `9000` | `9000` |
`JWT_SECRET` | JWT secret for signing | `supersecret` | 


