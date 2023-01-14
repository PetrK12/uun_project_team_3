"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/study-material-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class StudyMaterialAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("studyMaterial");
  }

  async list(awid, dtoIn) {
        //list doesn't have any input variables
        let uuAppErrorMap;
    
        let pageInfo = {};
        pageInfo.pageSize = 100;
        pageInfo.pageIndex = 0;
    
        let data = await this.dao.list(awid, "name", "asc", pageInfo);
    
        let dtoOut = {uuAppErrorMap: uuAppErrorMap, data: data};
        return dtoOut;
  }

  async update(awid, dtoIn) {

    const validationResult = this.validator.validate("studyMaterialUpdateDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,    
      WARNINGS.initUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let material;
    try {
      material = await this.dao.get(awid, dtoIn.id);
      if(material === null)
      {
        throw new Errors.Update.InvalidId({ uuAppErrorMap });        
      }
      else
      {
        let data = dtoIn;
        data.awid = awid;
        material = await this.dao.update(data);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.MaterialDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = {uuAppErrorMap: uuAppErrorMap, data: dtoIn};
    return dtoOut
  }

  async delete(awid, dtoIn) {
    const validationResult = this.validator.validate("studyMaterialDeleteDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,    
      WARNINGS.initUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    
    let material;
    try {
      material = this.dao.get(awid,dtoIn.id);
      if(material === null)
      {
        throw new Errors.Delete.InvalidId({ uuAppErrorMap });        
      }
      else
      {
        let data = dtoIn;
        data.awid = awid;
        material = await this.dao.remove(data);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Delete.MaterialDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // let pageInfo = {};
    // pageInfo.pageSize = 100;
    // pageInfo.pageIndex = 0;
    // let productList = await this.daoProduct.list(awid, "name", "asc", pageInfo);
    // let dataForUpdate = {};
    // for (const item of productList.itemList) {
    //   for (const category of item.categoryIdList)
    //   {
    //     if(category._id.toJSON() === dtoIn.id)
    //     {
    //       dataForUpdate = item;
    //       dataForUpdate.categoryIdList = item.categoryIdList.filter(x => x._id.toJSON() !== category._id.toJSON());
    //       await this.daoProduct.update(dataForUpdate);
    //     }
    //   }
    // }

    let dtoOut = {uuAppErrorMap: uuAppErrorMap, data: dtoIn};
    return dtoOut 
  }

  async get(awid, dtoIn) {
    const validationResult = this.validator.validate("studyMaterialGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,    
      WARNINGS.initUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let material;

    try {
      if(await this.dao.get(awid, dtoIn.id) === null)
      {
        throw new Errors.Get.InvalidId({ uuAppErrorMap });        
      }
      else
      {
        material = await this.dao.get(awid, dtoIn.id);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Get.MaterialDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = {uuAppErrorMap: uuAppErrorMap, material, data: dtoIn};
    return dtoOut
  }

  async create(awid, dtoIn) {
    

    const validationResult = this.validator.validate("studyMaterialCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,    
      WARNINGS.initUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );


    if ("name" in dtoIn && dtoIn.name.trim().length === 0 ) {
      throw new Errors.Create.InvalidName({ uuAppErrorMap }, { name: dtoIn.name });
    }

    let material = await this.dao.getByName(awid, dtoIn.name);

    try {
      if(material !== null)
      {
        throw new Errors.Create.MaterialDuplicate({ uuAppErrorMap });        
      }
      else
      {
        dtoIn.awid = awid;
        material = await this.dao.create(dtoIn);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.MaterialDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 7
    const dtoOut = {
      ...material,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new StudyMaterialAbl();
