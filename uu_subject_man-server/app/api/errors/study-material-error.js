"use strict";

const { update } = require("../../abl/study-material-abl.js");
const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const STUDY_MATERIAL_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}studyMaterial/`;

const Create = {
  UC_CODE: `${STUDY_MATERIAL_ERROR_PREFIX}create/`,
  MaterialDaoCreateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}daoFailed`;
      this.message = "Create record in database failed.";
    }
  },
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  MaterialDuplicate: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}duplicateName`;
      this.message = "Material name is already used.";
    }
  },
  InvalidName: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidName`;
      this.message = "Name can not be empty.";
    }
  },
};

const Get = {
  UC_CODE: `${STUDY_MATERIAL_ERROR_PREFIX}get/`,

  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidId`;
      this.message = "Material with given Id does not exists.";
    }
  },
  MaterialDaoGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}daoFailed`;
      this.message = "Get record from database failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${STUDY_MATERIAL_ERROR_PREFIX}delete/`,
  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidId`;
      this.message = "Material with given Id does not exists.";
    }
  },
  MaterialDaoDeleteFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}daoFailed`;
      this.message = "Delete record from database failed.";
    }
  },
};

const Update = {
  UC_CODE: `${STUDY_MATERIAL_ERROR_PREFIX}update/`,
  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidId`;
      this.message = "Material with given Id does not exists.";
    }
  },
  MaterialDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}daoFailed`;
      this.message = "Update record in database failed.";
    }
  },
};

const List = {
  UC_CODE: `${STUDY_MATERIAL_ERROR_PREFIX}list/`,
  
};

module.exports = {
  List,
  Update,
  Delete,
  Get,
  Create
};
