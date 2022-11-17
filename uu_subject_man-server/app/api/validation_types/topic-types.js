/* eslint-disable */

  const topicCreateDtoInType = shape({
    name: uu5String(512).isRequired(),
    state: uu5String(512),
    difficulty: uu5String(512),
    studyMaterialList: array(
      shape({
          id: id()
      })),
  });
  
  const topicGetDtoInType = shape({
    id: id().isRequired(),
  });

  const topicDeleteDtoInType = shape({
    id: id().isRequired()
  })

  const topicUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(512),
    state: uu5String(512),
    difficulty: uu5String(512),
    studyMaterialList: array(
      shape({
          id: id()
    })),
  });