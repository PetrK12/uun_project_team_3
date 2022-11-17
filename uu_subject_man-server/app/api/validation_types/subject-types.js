/* eslint-disable */


  const subjectCreateDtoInType = shape({
    name: uu5String(512).isRequired(),
    goal: uu5String(512),
    teacher: uu5String(512),
    degree: uu5String(512),
    language: uu5String(512),
    credits: integer(),
    studyMaterialList: array(
      shape({
          id: id()
    })),
    topicList: array(
      shape({
          id: id()
    })),
  });
  
  const subjectGetDtoInType = shape({
    id: id().isRequired(),
  });

  const subjectDeleteDtoInType = shape({
    id: id().isRequired()
  })

  const subjectUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(512).isRequired(),
    goal: uu5String(512),
    teacher: uu5String(512),
    degree: uu5String(512),
    language: uu5String(512),
    credits: integer(),
    studyMaterialList: array(
      shape({
          id: id()
    })),
    topicList: array(
      shape({
          id: id()
    })),
  });