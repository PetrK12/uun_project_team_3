"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");
const IdValidator = require("../components/check-id-valid.js")

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class TopicAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("topic");
    this.materialsDao = DaoFactory.getDao("studyMaterial");
    this.subjectDao = DaoFactory.getDao("subject")
  }

  async create(awid, dtoIn) {

    const validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    let idValidator = new IdValidator("studyMaterial");
    let studyMaterial = await idValidator.checkIdValid(awid, dtoIn.studyMaterialList);
    let topic;

    try {
      if (await this.dao.getByName(awid, { name: dtoIn.name }) !== null) {
        throw new Errors.Create.TopicDuplicate({ uuAppErrorMap });
      }
      else {
        let data = dtoIn;
        data.awid = awid;
        data.studyMaterialList = studyMaterial.existingEntities;
        topic = await this.dao.create(data);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TopicDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 7
    const dtoOut = {
      ...topic,
      uuAppErrorMap,
    };

    if (studyMaterial.existingEntities.length !== 0) {
      uuAppErrorMap.invalidStudyMaterials = studyMaterial.invalidEntities;
    }
    return dtoOut;
  }

  async get(awid, dtoIn) {

    const validationResult = this.validator.validate("topicGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let topic;

    try {
      if (await this.dao.get(awid, dtoIn) === null) {
        throw new Errors.Get.InvalidId({ uuAppErrorMap });
      }
      else {
        topic = await this.dao.get(awid, dtoIn);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Get.TopicDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, topic, data: dtoIn };
    return dtoOut
  }

  async update(awid, dtoIn) {

    const validationResult = this.validator.validate("topicUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let topic;

    for (const file of dtoIn.studyMaterialList) {
      try {
        if (await this.materialsDao.get(awid, file.id) === null) {
          throw new Errors.Update.InvalidStudyMaterialId({ uuAppErrorMap });
        }
      }
      catch (e) {
        if (e instanceof ObjectStoreError) {
          throw new Errors.Update.TopicDaoUpdateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }

    try {
      if (await this.dao.get(awid, dtoIn) === null) {
        throw new Errors.Update.InvalidId({ uuAppErrorMap });
      }
      else {
        let data = dtoIn;
        data.awid = awid;
        topic = await this.dao.update(data);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.TopicDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: topic };
    return dtoOut
  }

  async list(awid, dtoIn) {
    //list doesn't have any input variables
    let uuAppErrorMap;

    let pageInfo = {};
    pageInfo.pageSize = 100;
    pageInfo.pageIndex = 0;

    let data = await this.dao.list(awid, "name", "asc", pageInfo);

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: data };
    return dtoOut;
  }

  async delete(awid, dtoIn) {
    const validationResult = this.validator.validate("topicDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let topic = await this.dao.get(awid, dtoIn.id);

    try {
      if (topic === null) {
        throw new Errors.Delete.InvalidId({ uuAppErrorMap });
      }
      else {
        let data = dtoIn;
        data.awid = awid;
        topic = await this.dao.remove(data);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Delete.TopicDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let pageInfo = {};
    pageInfo.pageSize = 100;
    pageInfo.pageIndex = 0;
    let subjects = await this.subjectDao.list(awid, "name", "asc", pageInfo);
    let dataForUpdate = {};

    for (const item of subjects.itemList) {
      for (const topic of item.topicList) {
        if (topic.id === dtoIn.id) {
          dataForUpdate = item;
          dataForUpdate.topicList = item.topicList.filter(x => x.id !== topic.id);
          await this.subjectDao.update(dataForUpdate)
        }
      }
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: dtoIn };
    return dtoOut
  }

}

module.exports = new TopicAbl();
