//@@viewOn:imports
import {Utils, createVisualComponent, useEffect} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import StudyProgramDetailBrick from "../bricks/study-program-detail-brick";
//@@viewOff:imports

//@@viewOn:constants
const subjects =
  {
    softwareDevelopment: {
      mandatory: [
        {
          id: 1,
          name: "Frontendové systémy",
          goal: "Cílem předmětu je poskytnout studentům znalosti v oblasti frontendových webových technologií.",
          teacher: "Jan Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 2,
          name: "Backendové systémy",
          goal: "Cílem předmětu je poskytnout studentům přehled v oblasti backendového vývoje.",
          teacher: "Karel Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 9,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 3,
          name: "Diskrétní matematika",
          goal: "Získáte praktické znalosti pochopení základů lineární algebry a maticového počtu.",
          teacher: "Karel Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },      {
          id: 4,
          name: "Matematická analýza",
          goal: "Získáte znalosti z matematických formalit a základních témat z matematické analýzy.",
          teacher: "Jan Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        }
      ],
      compulsoryOptional: [
        {
          id: 5,
          name: "Umělá inteligence",
          goal: "Cílem předmětu je představit některé základní myšlenky vybraných oborů umělé inteligence.",
          teacher: "Jan Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 9,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 6,
          name: "Vývoj v Python",
          goal: "Základní znalost vývoje v jazyku Python.",
          teacher: "Karel Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
      ],
      optional: [
        {
          id: 7,
          name: "Německý jazyk 1",
          goal: "Cílem Německého jazyka pro začátečníky 1 je seznámit studenty se základy němčiny.",
          teacher: "Jan Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 3,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 8,
          name: "Německý jazyk 2",
          goal: "Cílem je seznámit studenty se základy němčiny tak, aby mohli na jednoduché úrovni komunikovat v nejběžnějších situacích.",
          teacher: "Karel Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 3,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 9,
          name: "Programování v Java",
          goal: "Základní znalosti vývoje v jazyku Java.",
          teacher: "Karel Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 10,
          name: "Testování aplikací",
          goal: "Cílem předmětu je poskytnout studentům úvod do procesů a přístupů testování aplikací.",
          teacher: "Jan Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        }
      ]
    },
    businessManagement: {
      mandatory: [
        {
          id: 11,
          name: "Management",
          goal: "Cílem předmětu je poskytnout studentům znalosti v oblasti managementu.",
          teacher: "Jan Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 2,
          name: "Účetnictví",
          goal: "Cílem předmětu je poskytnout studentům přehled v oblasti účetnictví.",
          teacher: "Karel Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 9,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 3,
          name: "Diskrétní matematika",
          goal: "Získáte praktické znalosti pochopení základů lineární algebry a maticového počtu.",
          teacher: "Karel Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },      {
          id: 4,
          name: "Matematická analýza",
          goal: "Získáte znalosti z matematických formalit a základních témat z matematické analýzy.",
          teacher: "Jan Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        }
      ],
      compulsoryOptional: [
        {
          id: 5,
          name: "Mikroekonomie",
          goal: "Cílem předmětu je představit základy mikroekonomie.",
          teacher: "Jan Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 9,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 6,
          name: "Makroekonomie",
          goal: "Základní znalost makroekonomie.",
          teacher: "Karel Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
      ],
      optional: [
        {
          id: 7,
          name: "Německý jazyk 1",
          goal: "Cílem Německého jazyka pro začátečníky 1 je seznámit studenty se základy němčiny.",
          teacher: "Jan Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 3,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 8,
          name: "Německý jazyk 2",
          goal: "Cílem je seznámit studenty se základy němčiny tak, aby mohli na jednoduché úrovni komunikovat v nejběžnějších situacích.",
          teacher: "Karel Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 3,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 9,
          name: "Řízení podnikových financí",
          goal: "Základní znalosti v řízení podnikových financí.",
          teacher: "Karel Novák",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        },
        {
          id: 10,
          name: "Řízení lidských zdrojů",
          goal: "Cílem předmětu je poskytnout studentům úvod do procesů a postupů při řízení lidských zdrojů.",
          teacher: "Jan Dlouhý",
          degree: "Bachalor",
          language: "Czech",
          credits: 6,
          studyMaterialList: [1, 2, 3],
          topicList: [1, 2, 3]
        }
      ]
    }

}

const studyPrograms = {
  softwareDevelopment: {
    studyProgramId: "1",
    name: "Softwarový vývoj",
    degree: "Bakalář",
    language: "Český",
    numberOfCredits: 260,
    subjectList: ["147258", "741963"]
  },
  businessManagement: {
    studyProgramId: "1",
    name: "Business Management",
    degree: "Bakalář",
    language: "Český",
    numberOfCredits: 250,
    subjectList: ["147258", "741963"]
  },
}

//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let StudyProgramDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StudyProgramDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    // TODO connect to backend
    useEffect(() => {
      //setVideoList(videos)

      /*
      fetch('/video/list')
        .then(response => response.json())
        .then(data => setVideoList(data))

      fetch("topic/list")
        .then(response => response.json())
        .then(data => {
          let names = []
          data.forEach(topic => {
            names.push(topic.name)
          })
          setTopicListNames(names)
          setTopicList(data)
        })
       */
    }, [])
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <>
        <RouteBar />
        <StudyProgramDetailBrick studyProgram={studyPrograms[props.studyProgram]} subjects={subjects[props.studyProgram]} />
      </>
    );
    //@@viewOff:render
  },
});

StudyProgramDetail = withRoute(StudyProgramDetail, { authenticated: true });

//@@viewOn:exports
export { StudyProgramDetail };
export default StudyProgramDetail;
//@@viewOff:exports
