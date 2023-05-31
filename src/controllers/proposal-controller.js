module.exports = class ProposalController {
  constructor(
    log,
    helper,
    proposalModel,
    userModel,
    projectModel,
  ) {
    this.log = log;
    this.helper = helper;
    this.proposalModel = proposalModel;
    this.userModel = userModel;
    this.projectModel = projectModel;
  }

  getProposalById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const proposalDetail = await this.proposalModel.findOne({
        where: {id},
        logging: this.log.logSqlQuery(req.context),
      });

      this.helper.httpRespSuccess(
        req,
        res,
        200,
        proposalDetail,
      );    
    
    } catch (error) {
      next(error);
    }
  };


};
