const { Op } = require('sequelize');
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


};
