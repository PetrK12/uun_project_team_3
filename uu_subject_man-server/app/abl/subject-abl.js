"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");
const IdValidator = require("../components/check-id-valid.js")

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.materialsDao = DaoFactory.getDao("studyMaterial");
    this.topicDao = DaoFactory.getDao("topic")
  }

  async create(awid, dtoIn, session) {
    let uuAppErrorMap;
    const validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    let idValidator = new IdValidator("topic");
    let topics;
    let studyMaterials;
    let data = dtoIn;

    if(dtoIn.topicList !== undefined){
      topics = await idValidator.checkIdValid(awid, dtoIn.topicList);
      data.topicList = topics.existingEntities;
    }

    idValidator = new IdValidator("studyMaterial");
    if(dtoIn.studyMaterialList !== undefined){
      studyMaterials = await idValidator.checkIdValid(awid, dtoIn.studyMaterialList);
      data.studyMaterialList = studyMaterials.existingEntities;
    }

    data.awid = awid;
    let subject = await this.dao.create(data);

    const dtoOut = {
      ...subject,
      uuAppErrorMap,
    };

    if(dtoIn.topicList !== undefined)
    {
      if(topics.invalidEntities.length !== 0 )
      {
        uuAppErrorMap.invalidTopicIds = topics.invalidEntities
      }
    }

    if(dtoIn.studyMaterialList !== undefined)
    {
      if(studyMaterials.invalidEntities.length !== 0 )
      {
        uuAppErrorMap.invalidStudyMaterialsIds = studyMaterials.invalidEntities
      }
    }

    return dtoOut

  }

  async delete(awid, dtoIn) {

    let uuAppErrorMap;

    const validationResult = this.validator.validate("subjectDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    try {
      let subject = await this.dao.get(awid, dtoIn.id);

      if (subject === null) {
        throw new Errors.Delete.InvalidId({ uuAppErrorMap });
      }
      let data = dtoIn;
      data.awid = awid;
      await this.dao.remove(data);
    }
    catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Delete.SubjectDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: dtoIn };
    return dtoOut
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let subject;
    try {
      subject = await this.dao.get(awid, dtoIn.id)
      if (subject === null) {
        throw new Errors.Get.InvalidId({ uuAppErrorMap });
      }
    }
    catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Get.SubjectDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, subject, data: dtoIn };
    return dtoOut
  }

  async update(awid, dtoIn) {

    let uuAppErrorMap;


    const validationResult = this.validator.validate("subjectUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );


    //check if shopping list exists
    let subject;
    try {
      subject = await this.dao.get(awid, dtoIn.id);
      if (subject === null) {
        throw new Errors.Update.InvalidId({ uuAppErrorMap });
      }
    }
    catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.SubjectDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let topics;
    let studyMaterials;
    let data = dtoIn;

    let idValidator = new IdValidator("topic");
    if(dtoIn.topicList !== undefined){
      topics = await idValidator.checkIdValid(awid, dtoIn.topicList);
      data.topicList = topics.existingEntities;
    }

    idValidator = new IdValidator("studyMaterial");
    if(dtoIn.studyMaterialList !== undefined){
      studyMaterials = await idValidator.checkIdValid(awid, dtoIn.studyMaterialList);
      data.studyMaterialList = studyMaterials.existingEntities;
    }

    try {
      data.awid = awid;
      await this.dao.update(data);
    }
    catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.SubjectDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if(dtoIn.topicList !== undefined)
    {
      if(topics.invalidEntities.length !== 0 )
      {
        uuAppErrorMap.invalidTopicIds = topics.invalidEntities
      }
    }

    if(dtoIn.studyMaterialList !== undefined)
    {
      if(studyMaterials.invalidEntities.length !== 0 )
      {
        uuAppErrorMap.invalidStudyMaterialsIds = studyMaterials.invalidEntities
      }
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: dtoIn };
    return dtoOut
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("subjectListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
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
        throw new Errors.List.DaoListFailed({ uuAppErrorMap }, e);
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
}

module.exports = new SubjectAbl();
