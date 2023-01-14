"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/study-program-error.js");
const IdValidator = require("../components/check-id-valid.js")

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.CreateStudyProgram.UC_CODE}unsupportedKeys`,
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class StudyProgramAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("studyProgram");
  }

  async deleteStudyProgram(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("studyProgramDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.DeleteStudyProgram.InvalidDtoIn
    );

    try {
      let studyProgram = await this.dao.get(awid, dtoIn.id);

      if (studyProgram === null) {
        throw new Errors.DeleteStudyProgram.InvalidId({ uuAppErrorMap });
      }
      let data = dtoIn;
      data.awid = awid;
      await this.dao.remove(data);
    }
    catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.DeleteStudyProgram.DaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: dtoIn };
    return dtoOut
  }

  async listStudyProgram(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("studyProgramListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.ListStudyProgram.InvalidDtoIn
    );

    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    let list;
    try{
      list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }
    catch(e)
    {
      if (e instanceof ObjectStoreError) {
        throw new Errors.ListStudyProgram.DaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...list,
      uuAppErrorMap,
      dtoIn
    };
    return dtoOut
  }

  async updateStudyProgram(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("studyProgramUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.UpdateStudyProgram.InvalidDtoIn
    );

    //check if shopping list exists
    let studyProgram;
    try {
      studyProgram = await this.dao.get(awid, dtoIn.id);
      if (studyProgram === null) {
        throw new Errors.UpdateStudyProgram.InvalidId({ uuAppErrorMap });
      }
    }
    catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateStudyProgram.DaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let idValidator = new IdValidator("subject");
    let subjects;
    if(dtoIn.subjectList !== undefined){
      subjects = await idValidator.checkIdValid(awid, dtoIn.subjectList);
    }

    try {
      let data = dtoIn;
      data.awid = awid;
      if(subjects !== undefined){
        data.subjectList = subjects.existingEntities;
      }
      await this.dao.update(data);
    }
    catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateStudyProgram.DaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    if(dtoIn.subjectList !== undefined){
      if (subjects.invalidEntities.length !== 0) {
        uuAppErrorMap.invalidSubjectIds = subjects.invalidEntities
      }
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: dtoIn };
    return dtoOut
  
  }

  async getStudyProgram(awid, dtoIn) {
    const validationResult = this.validator.validate("studyProgramGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.GetStudyProgram.InvalidDtoIn
    );

    let studyProgram;

    try {
      studyProgram = await this.dao.get(awid, dtoIn.id);
      if (studyProgram === null) {
        throw new Errors.GetStudyProgram.InvalidId({ uuAppErrorMap });
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.GetStudyProgram.DaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, studyProgram, data: dtoIn };
    return dtoOut  
  }

  async createStudyProgram(awid, dtoIn) {
    const validationResult = this.validator.validate("studyProgramCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.CreateStudyProgram.InvalidDtoIn
    );


    let subjectIds = [];

    let i = 0;
  //   while (i < dtoIn.subjectList.length) {
  //     subjectIds.push({"id": dtoIn.subjectList[i].id})
  //     i++;
  // }

  //   let idValidator = new IdValidator("subject");
  //   let subject = await idValidator.checkIdValid(awid, subjectIds);
    let studyProgram;

    try {
      if (await this.dao.getByName(awid, { name: dtoIn.name }) !== null) {
        throw new Errors.CreateStudyProgram.MaterialDuplicate({ uuAppErrorMap });
      }
      else {
        let data = dtoIn;
        data.awid = awid;
        if(dtoIn.subjectList !== undefined)
        {
          data.subjectList = subject.existingEntities;
        }
        studyProgram = await this.dao.create(data);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.CreateStudyProgram.DaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 7
    const dtoOut = {
      ...studyProgram,
      uuAppErrorMap,
    };

    // if (subject.existingEntities.length !== 0) {
    //   uuAppErrorMap.invalidSubjects = subject.invalidEntities;
    // }
    return dtoOut;
  }

}

module.exports = new StudyProgramAbl();
