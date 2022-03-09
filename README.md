# MERN Stack
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
<br />
Learning MERN stack with building goal setter app.

## Backend

- MongoDB, Mongoose 
- Express
- NodeJS
- bcrypt.js
- JWT(JSON Web Token)

## Frontend

- React
- React Redux
- Redux Toolkit

## API

### Authentication

- Without Token
    - Register new user : [POST] /api/users
    - Log in user       : [POST] /api/users/login

- With Token
    - Get user data     : [GET]  /api/users/me
    - Log out user      : [POST] /api/users/logout


### Goal Setter

- With Token
    - Create new goal  : [POST]   /api/goals
    - Get user's goals : [GET]    /api/goals
    - Update goal      : [PUT]    /api/goals/:id
    - Delete goal      : [DELETE] /api/goals/:id
