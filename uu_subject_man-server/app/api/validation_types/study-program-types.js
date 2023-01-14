/* eslint-disable */
/* eslint-disable */
const studyProgramCreateDtoInType = shape({
    name: uu5String(512).isRequired(),
    degree: uu5String(512),
    language: uu5String(512),
    numberOfCredits: integer(),
    subjectList: array(
        shape({
            id: id(),
            type: uu5String(512)
    }))
    // subjectList: array(
    //     shape({
    //         id: id()
    //   }))
  });
  
  const studyProgramGetDtoInType = shape({
    id: id().isRequired(),
  });

  const studyProgramDeleteDtoInType = shape({
    id: id().isRequired()
  });

  const studyProgramListDtoInType = shape({
    sortBy: oneOf(["name", "uuIdentity"]),
    order: oneOf(["asc", "desc"]),
    categoryIdList: array(id(), 1, 10),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });

  const studyProgramUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(512),
    degree: uu5String(512),
    language: uu5String(512),
    numberOfCredits: integer(),
    subjectList: array(
        shape({
            id: id()
      }))
  });