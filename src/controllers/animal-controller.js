module.exports = class AnimalController {
  constructor(animalModel, helper, log) {
    this.animalModel = animalModel;
    this.helper = helper;
    this.log = log;
  }

  createAnimal = async (req, res, next) => {
    const { name } = req.body;
    try {
      await this.animalModel.create(
        {
          name,
        },
        {
          logging: this.log.logSqlQuery(req.context),
        },
      );
      this.helper.httpRespSuccess(
        req,
        res,
        201,
        'successfully created new animal',
        null,
      );
    } catch (error) {
      next(error);
    }
  };

  getAnimalById = async (req, res, next) => {
    const { animalId } = req.params;
    try {
      const animal = await this.animalModel.findByPk(animalId, {
        logging: this.log.logSqlQuery(req.context),
      });
      this.helper.httpRespSuccess(req, res, 200, animal, null);
    } catch (error) {
      next(error);
    }
  };
};
