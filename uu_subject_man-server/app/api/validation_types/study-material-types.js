/* eslint-disable */
  const studyMaterialCreateDtoInType = shape({
    name: uu5String(512).isRequired(),
    state: uu5String(512),
    type: uu5String(512),
    difficulty: uu5String(512),
    length: uu5String(512),
    material: uu5String(512)
  });
  
  const studyMaterialGetDtoInType = shape({
    id: id().isRequired(),
  });

  const studyMaterialDeleteDtoInType = shape({
    id: id().isRequired()
  })

  const studyMaterialUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(512),
    state: uu5String(512),
    type: uu5String(512),
    difficulty: uu5String(512),
    length: uu5String(512),
  });