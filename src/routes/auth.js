const authRouter = require('express').Router();

module.exports = class AuthLib {
  constructor(controller) {
    this.controller = controller;
  }

  routes = authRouter
    .post('/login', this.controller.login)
    /*
        * @swagger
        * /auth/register:
        *  post:
        *   tags:
        *   - Auth
        *  summary: Register a new user
        * 
     */
    .post('/register', this.controller.register);
};
