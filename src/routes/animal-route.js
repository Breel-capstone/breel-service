const animalRouter = require('express').Router();

module.exports = class AnimalRoute {
  constructor(animalController) {
    this.animalController = animalController;
  }

  /** 
   * @swagger
   * components:
   *   schemas:
   *     Animal:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         name:
   *           type: string
  */

  getRoutes() {
    animalRouter
      /**
       * @swagger
       * /v1/animal/{animalId}:
       *   get:
       *     summary: Get animal by id
       *     tags: [Animal]
       *     parameters:
       *       - in: path
       *         name: animalId
       *         required: true
       *     responses:
       *        200:
       *          content:
       *            application/json:
       *              schema:
       *                allOf:
       *                  - $ref: '#/components/schemas/Animal'
       *                  - $ref: '#/components/schemas/UtilityField'
       */
      .get('/:animalId', this.animalController.getAnimalById)
      /**
       * @swagger
       * /v1/animal:
       *   post:
       *     summary: Create new animal
       *     tags: [Animal]
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               name:
       *                 type: string
       *     responses:
       *        200:
       *          content:
       *            application/json:
       *              schema:
       *                allOf:
       *                  - $ref: '#/components/schemas/Animal'
       *                  - $ref: '#/components/schemas/UtilityField'
       */
      .post('/', this.animalController.createAnimal);

    return animalRouter;
  }
};
