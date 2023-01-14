"use strict";

const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const STUDY_PROGRAM_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}studyProgram/`;

const CreateStudyProgram = {
  UC_CODE: `${STUDY_PROGRAM_ERROR_PREFIX}createStudyProgram/`,
  MaterialDuplicate: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateStudyProgram.UC_CODE}duplicateMaterial`;
      this.message = "Study material already exists.";
    }
  },
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateStudyProgram.UC_CODE}invalidDtoIn`;
      this.message = "Given dtoIn is not valid.";
    }
  },
  DaoCreateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateStudyProgram.UC_CODE}daoFailed`;
      this.message = "Create record in database failed.";
    }
  }
};

const GetStudyProgram = {
  UC_CODE: `${STUDY_PROGRAM_ERROR_PREFIX}getStudyProgram/`,

  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetStudyProgram.UC_CODE}invalidDtoIn`;
      this.message = "Given dtoIn is not valid.";
    }
  },
  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetStudyProgram.UC_CODE}invalidId`;
      this.message = "Record with given Id does not exists.";
    }
  },
  DaoGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetStudyProgram.UC_CODE}daoFailed`;
      this.message = "Get record in database failed.";
    }
  }
};

const UpdateStudyProgram = {
  UC_CODE: `${STUDY_PROGRAM_ERROR_PREFIX}updateStudyProgram/`,
 
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateStudyProgram.UC_CODE}invalidDtoIn`;
      this.message = "Given dtoIn is not valid.";
    }
  },
  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateStudyProgram.UC_CODE}invalidId`;
      this.message = "Record with given Id does not exists.";
    }
  },
  DaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateStudyProgram.UC_CODE}daoFailed`;
      this.message = "Get record in database failed.";
    }
  }
};

const ListStudyProgram = {
  UC_CODE: `${STUDY_PROGRAM_ERROR_PREFIX}listStudyProgram/`,

  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListStudyProgram.UC_CODE}invalidDtoIn`;
      this.message = "Given dtoIn is not valid.";
    }
  },
  DaoListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListStudyProgram.UC_CODE}daoFailed`;
      this.message = "Get record in database failed.";
    }
  }
};

const DeleteStudyProgram = {
  UC_CODE: `${STUDY_PROGRAM_ERROR_PREFIX}deleteStudyProgram/`,

  DaoDeleteFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteStudyProgram.UC_CODE}daoFailed`;
      this.message = "Delete record in database failed.";
    }
  },
  InvalidId: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteStudyProgram.UC_CODE}invalidId`;
      this.message = "Record with given Id does not exists.";
    }
  },
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteStudyProgram.UC_CODE}invalidDtoIn`;
      this.message = "Given dtoIn is not valid.";
    }
  }
};

module.exports = {
  DeleteStudyProgram,
  ListStudyProgram,
  UpdateStudyProgram,
  GetStudyProgram,
  CreateStudyProgram
};
