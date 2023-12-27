import liff from "@line/liff";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { TChartCreateForPlanRequest } from "../../../api/charts/TChartCreateForPlanRequest";
import { TCategorizedForm } from "../../../api/hearings/TCategorizedForm";
import { THearing } from "../../../api/hearings/THearing";
import { TMembersIndexResponse } from "../../../api/members/TMembersIndexResponse";
import { THearingAnswer } from "../../../models/hearing/THearingAnswer";
import {
  HEARING_FORM,
  sortHearingConfirm,
} from "../../../models/hearing/THearingForms";
import { M_PLAN_IDS } from "../../../models/shared/Plans";
import { AnsweredHearings, TAnsweredForm } from "../HearingContainer";

type TArgs = {
  readonly member: TMembersIndexResponse;
  readonly hearings: THearing[];
  readonly currentAnswerNumber: 1 | 2;
  readonly firstAnsweredHearings: AnsweredHearings;
  readonly secondAnsweredHearings: AnsweredHearings;
  readonly nextFormId: number | null;
  readonly isSelectableBRank?: boolean;
  readonly setNextFormId: React.Dispatch<React.SetStateAction<number | null>>;
  readonly setIsBackTransition: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setFirstAnsweredHearings: React.Dispatch<
    React.SetStateAction<AnsweredHearings>
  >;
  readonly setSecondAnsweredHearings: React.Dispatch<
    React.SetStateAction<AnsweredHearings>
  >;
  readonly setCurrentAnswerNumber: React.Dispatch<React.SetStateAction<1 | 2>>;
  readonly setIsHearingStarted: React.Dispatch<React.SetStateAction<boolean>>;
  readonly mutate: UseMutateFunction<
    void | AxiosResponse,
    unknown,
    TChartCreateForPlanRequest,
    unknown
  >;
};
export const getContinuedHearingContainerHandler = ({
  member,
  hearings,
  currentAnswerNumber,
  firstAnsweredHearings,
  secondAnsweredHearings,
  nextFormId,
  isSelectableBRank,
  setNextFormId,
  setIsBackTransition,
  setFirstAnsweredHearings,
  setSecondAnsweredHearings,
  setCurrentAnswerNumber,
  setIsHearingStarted,
  mutate,
}: TArgs) => {
  const handleClickFormStart = () => {
    setNextFormId(HEARING_FORM.FIRST);
  };

  const handleClickHearingStart = () => {
    setIsHearingStarted(true);
  };

  const handleClickBack = () => {
    setCurrentAnswerNumber(1);
  };

  const handleClickPremiumNext = () => {
    setCurrentAnswerNumber(2);
  };

  const handleCancelPremiumNext = () => {
    setSecondAnsweredHearings({ forms: [] });
    setCurrentAnswerNumber(1);
    removeLastAnswer(firstAnsweredHearings.forms, 1);
  };

  const handleSubmitForm = (
    answer: TAnsweredForm,
    nextFormIdArg: number | null
  ) => {
    if (currentAnswerNumber === 1) {
      setFirstAnsweredHearings({
        forms: [...firstAnsweredHearings?.forms, answer],
      });
    } else {
      setSecondAnsweredHearings({
        forms: [...secondAnsweredHearings?.forms, answer],
      });
    }
    setNextFormId(nextFormIdArg);
    setIsBackTransition(false);
  };

  const getAnsweredHearings = (): AnsweredHearings => {
    if (currentAnswerNumber === 1) {
      return firstAnsweredHearings;
    } else {
      return secondAnsweredHearings;
    }
  };

  const handleCancelForm = () => {
    if (currentAnswerNumber === 1) {
      removeLastAnswer(firstAnsweredHearings.forms, 1);
    } else {
      removeLastAnswer(secondAnsweredHearings.forms, 2);
    }
    setIsBackTransition(true);
  };

  const handlePost = () => {
    const hearings = [firstAnsweredHearings, secondAnsweredHearings]
      .filter((h) => h.forms.length !== 0 || !!h.sameCoordinateId)
      .map((hearings) => {
        if (hearings.sameCoordinateId) {
          return {
            sameCoordinateId: hearings.sameCoordinateId,
            isDifferentColor: hearings.isDifferentColor,
          };
        } else if (hearings.forms.length > 0) {
          return {
            forms: hearings.forms.map((hearing) => {
              return {
                id: hearing.id,
                options: hearing.options.map((o) => {
                  return { id: o.id, text: o.text };
                }),
              };
            }),
          };
        } else {
          throw Error("予期せぬエラーが発生しました");
        }
      });
    const params: TChartCreateForPlanRequest = {
      memberId: member.id,
      hearings,
      isSelectableBRank: isSelectableBRank!,
    };
    mutate(params, {
      onSuccess: () => {
        liff.closeWindow();
      },
    });
  };

  const removeLastAnswer = (
    answeredHearings: TAnsweredForm[],
    answerNum: number
  ) => {
    let newAnswers = answeredHearings.slice(0, -1);
    let lastAnswerId = getLastAnswerId(answeredHearings);
    if (answerNum === 1) {
      setFirstAnsweredHearings({ forms: newAnswers });
    } else {
      setSecondAnsweredHearings({ forms: newAnswers });
    }
    setNextFormId(lastAnswerId ?? null);
  };

  const getLastAnswerId = (
    answeredHearing: TAnsweredForm[]
  ): number | undefined => {
    return answeredHearing.slice(-1)[0]?.id;
  };

  // 前回のヒアリングを整形して表示する
  const getPreviousAnswers = (): THearingAnswer[] => {
    if (currentAnswerNumber === 1) {
      return [
        {
          answer: hearings[0].categorizedForms,
        },
      ];
    } else {
      return [
        {
          answer: hearings[1].categorizedForms,
        },
      ];
    }
  };
  const getConfirmAnswers = (): THearingAnswer[] => {
    const formattedAnswer = [firstAnsweredHearings, secondAnsweredHearings]
      .filter((h) => h.forms.length !== 0 || !!h.sameCoordinateId)
      .map((answers) => {
        if (answers.sameCoordinateId) {
          const answer = hearings.find(
            (h) => h.coordinateId === answers.sameCoordinateId
          )?.categorizedForms;
          if (answer === undefined) throw Error("予期せぬエラーが発生しました");
          return { answer };
        } else if (answers.forms.length > 0) {
          return {
            answer: formattedConfirmAnswers(answers),
          };
        } else {
          throw Error("予期せぬエラーが発生しました");
        }
      });
    return formattedAnswer;
  };

  const formattedConfirmAnswers = (
    answers: AnsweredHearings
  ): TCategorizedForm[] => {
    return answers.forms.reduce((answer: TCategorizedForm[], value) => {
      let someCategory = answer.find(
        (h) => h.categoryName === value.categoryName
      );
      if (someCategory) {
        someCategory.forms.push({
          title: value.title,
          options: value.options.map((o) => {
            return {
              name: o.name,
              text: o.text ?? null,
            };
          }),
        });
      } else {
        sortHearingConfirm(answer, value);
      }
      return answer;
    }, []);
  };

  const handleClickSameHearing = (isDifferentColor: boolean) => {
    if (currentAnswerNumber === 1) {
      setFirstAnsweredHearings({
        sameCoordinateId: hearings[0].coordinateId,
        isDifferentColor, 
        forms: [],
      });
    } else {
      setSecondAnsweredHearings({
        sameCoordinateId: hearings[1].coordinateId,
        isDifferentColor,
        forms: [],
      });
    }
  };

  const isAnsweredAll = (): boolean => {
    if (member.mPlanId === M_PLAN_IDS.PREMIUM) {
      return isAnswered(secondAnsweredHearings) && nextFormId === null;
    } else {
      return isAnswered(firstAnsweredHearings) && nextFormId === null;
    }
  };

  const shouldAnswerTwo = (): boolean => {
    return (
      member.mPlanId === M_PLAN_IDS.PREMIUM &&
      !isAnswered(secondAnsweredHearings) &&
      isAnswered(firstAnsweredHearings) &&
      nextFormId === null &&
      currentAnswerNumber === 1
    );
  };

  const isAnswered = (answeredHearings: AnsweredHearings): boolean => {
    return (
      answeredHearings.forms.length > 0 || !!answeredHearings.sameCoordinateId
    );
  };

  return {
    handleClickFormStart,
    handleClickHearingStart,
    handleCancelForm,
    handleClickBack,
    handleClickPremiumNext,
    handleCancelPremiumNext,
    getAnsweredHearings,
    getPreviousAnswers,
    handleSubmitForm,
    handlePost,
    getConfirmAnswers,
    handleClickSameHearing,
    shouldAnswerTwo,
    isAnsweredAll,
  };
};
