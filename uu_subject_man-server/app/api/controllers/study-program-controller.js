"use strict";
const StudyProgramAbl = require("../../abl/study-program-abl.js");

class StudyProgramController {

  deleteStudyProgram(ucEnv) {
    return StudyProgramAbl.deleteStudyProgram(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listStudyProgram(ucEnv) {
    return StudyProgramAbl.listStudyProgram(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  updateStudyProgram(ucEnv) {
    return StudyProgramAbl.updateStudyProgram(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getStudyProgram(ucEnv) {
    return StudyProgramAbl.getStudyProgram(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  createStudyProgram(ucEnv) {
    return StudyProgramAbl.createStudyProgram(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new StudyProgramController();
