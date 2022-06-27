import { TMembersIndexResponse } from "./../../../api/members/TMembersIndexResponse";
import { HEARING_FORM } from "./../../../models/hearing/THearingForms";
import { THearing } from "../../../api/hearings/THearing";
import { THearingAnswer } from "../../../models/hearing/THearingAnswer";
import { AnsweredHearings, TAnsweredForm } from "../HearingContainer";
import { TCategorizedForm } from "../../../api/hearings/TCategorizedForm";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { TChartCreateRequest } from "../../../api/charts/TChartCreateRequest";
import liff from "@line/liff/dist/lib";

type TAfterSecondHearingContainerHandler = {
  readonly handleClickStart: () => void;
  readonly getPreviousAnswers: () => THearingAnswer[];
  readonly handleCancelForm: () => void;
  readonly handleClickPremiumNext: () => void;
  readonly handleCancelPremiumNext: () => void;
  readonly getAnsweredHearings: () => AnsweredHearings;
  readonly handleSubmitForm: (
    answer: TAnsweredForm,
    nextFormIdArg: number | null
  ) => void;
  readonly handleClickReset: () => void;
  readonly handlePost: () => void;
  readonly getConfirmAnswers: () => THearingAnswer[];
  readonly handleClickSameHearing: () => void;
  readonly isAnswered: (answeredHearings: AnsweredHearings) => boolean;
};

type TArgs = {
  readonly member: TMembersIndexResponse;
  readonly hearings: THearing[];
  readonly currentAnswerNumber: 1 | 2;
  readonly firstAnsweredHearings: AnsweredHearings;
  readonly secondAnsweredHearings: AnsweredHearings;
  readonly setNextFormId: React.Dispatch<React.SetStateAction<number | null>>;
  readonly setIsBackTransition: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setFirstAnsweredHearings: React.Dispatch<
    React.SetStateAction<AnsweredHearings>
  >;
  readonly setSecondAnsweredHearings: React.Dispatch<
    React.SetStateAction<AnsweredHearings>
  >;
  readonly setCurrentAnswerNumber: React.Dispatch<React.SetStateAction<1 | 2>>;
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    TChartCreateRequest,
    unknown
  >;
};
export const getAfterSecondHearingContainerHandler = ({
  member,
  hearings,
  currentAnswerNumber,
  firstAnsweredHearings,
  secondAnsweredHearings,
  setNextFormId,
  setIsBackTransition,
  setFirstAnsweredHearings,
  setSecondAnsweredHearings,
  setCurrentAnswerNumber,
  mutate,
}: TArgs): TAfterSecondHearingContainerHandler => {
  const handleClickStart = () => {
    setNextFormId(HEARING_FORM.FIRST);
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

  // 各フォームの戻るボタンをクリック
  const handleCancelForm = () => {
    if (currentAnswerNumber === 1) {
      removeLastAnswer(firstAnsweredHearings.forms, 1);
    } else {
      removeLastAnswer(secondAnsweredHearings.forms, 2);
    }
    setIsBackTransition(true);
  };

  const handlePost = () => {
    if (
      window.confirm(
        "次のコーディネートはこのヒアリングをもとに作成します。よろしいですか？"
      )
    ) {
      const hearings = [firstAnsweredHearings, secondAnsweredHearings]
        .filter((h) => h.forms.length !== 0 || !!h.sameCoordinateId)
        .map((hearings) => {
          if (hearings.sameCoordinateId) {
            return {
              sameCoordinateId: hearings.sameCoordinateId,
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
      const params: TChartCreateRequest = {
        memberId: member.id,
        hearings,
      };
      mutate(params, {
        onSuccess: () => {
          liff.closeWindow();
        },
      });
    }
  };

  // 答えの配列の最後を削除する
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

  const handleClickReset = () => {
    setNextFormId(null);
    setCurrentAnswerNumber(1);
    setFirstAnsweredHearings({ forms: [] });
    setSecondAnsweredHearings({ forms: [] });
  };

  // 確認画面へ渡すために答えた情報を整形する
  const getConfirmAnswers = (): THearingAnswer[] => {
    const formattedAnswer = [firstAnsweredHearings, secondAnsweredHearings]
      .filter((h) => h.forms.length !== 0 || !!h.sameCoordinateId)
      .map((answers) => {
        if (answers.sameCoordinateId) {
          return {
            answer: hearings.find(
              (h) => h.coordinateId === answers.sameCoordinateId
            )?.categorizedForms as TCategorizedForm[],
          };
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
        answer.push({
          categoryName: value.categoryName,
          forms: [
            {
              title: value.title,
              options: value.options.map((o) => {
                return {
                  name: o.name,
                  text: o.text ?? null,
                };
              }),
            },
          ],
        });
      }
      return answer;
    }, []);
  };

  const handleClickSameHearing = () => {
    if (currentAnswerNumber === 1) {
      setFirstAnsweredHearings({
        sameCoordinateId: hearings[0].coordinateId,
        forms: [],
      });
    } else {
      setSecondAnsweredHearings({
        sameCoordinateId: hearings[1].coordinateId,
        forms: [],
      });
    }
  };

  const isAnswered = (answeredHearings: AnsweredHearings): boolean => {
    return (
      answeredHearings.forms.length > 0 || !!answeredHearings.sameCoordinateId
    );
  };

  return {
    handleClickStart,
    handleCancelForm,
    handleClickPremiumNext,
    handleCancelPremiumNext,
    getAnsweredHearings,
    getPreviousAnswers,
    handleSubmitForm,
    handleClickReset,
    handlePost,
    getConfirmAnswers,
    handleClickSameHearing,
    isAnswered,
  };
};
