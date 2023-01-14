"use strict";
const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  TopicDaoCreateFailed: class extends SubjectManUseCaseError {
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
  TopicDuplicate: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}duplicateName`;
      this.message = "Subject name is already used.";
    }
  },
};

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,

  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidId`;
      this.message = "Subject with given Id does not exists.";
    }
  },
  SubjectDaoGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}daoFailed`;
      this.message = "Get record from database failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}delete/`,
  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidId`;
      this.message = "Subject with given Id does not exists.";
    }
  },
  SubjectDaoDeleteFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}daoFailed`;
      this.message = "Delete record from database failed.";
    }
  },
};

const Update = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}update/`,
  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidId`;
      this.message = "Topic with given Id does not exists.";
    }
  },
  TopicDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}daoFailed`;
      this.message = "Update record in database failed.";
    }
  },
  InvalidStudyMaterialId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidId`;
      this.message = "Material with given Id does not exists.";
    }
  },
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "Dto In is not valid.";
    }
  },
};

const List = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}list/`,

  DaoListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}daoFailed`;
      this.message = "List records from database failed.";
    }
  },
};

module.exports = {
  List,
  Update,
  Delete,
  Get,
  Create
};
