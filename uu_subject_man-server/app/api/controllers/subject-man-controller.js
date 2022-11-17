"use strict";
const SubjectManAbl = require("../../abl/subject-man-abl.js");

class SubjectManController {
  init(ucEnv) {
    return SubjectManAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return SubjectManAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return SubjectManAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new SubjectManController();
