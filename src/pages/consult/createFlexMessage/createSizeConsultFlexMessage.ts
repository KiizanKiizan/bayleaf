import { ITEM_TEST_IMAGE_URL } from "../../../images/TestImageUrl";
import { TSizeAnswer } from "../../../models/consult/TSizeAnswer";

/**
 * 着こなし相談のサイズFlexメッセージをJSON文字列で返却
 */
export const createSizeConsultFlexMessage = (
  formAnswers: TSizeAnswer[]
): string => {
  const flexMessage = {
    type: "flex",
    altText: "[相談内容]サイズが気になる",
    sender: true,
    contents: {
      type: "carousel",
      contents: formAnswers.map((answer) => {
        return {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "■相談内容",
                weight: "bold",
                size: "sm",
                wrap: true,
              },
              {
                type: "text",
                text: "サイズが気になる",
                size: "xl",
                margin: "md",
                wrap: true,
              },
              {
                type: "text",
                text: "■サイズが合ってないと感じるアイテム",
                margin: "lg",
                weight: "bold",
                size: "sm",
                wrap: true,
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "image",
                        url:
                          process.env.REACT_APP_ENV === "development"
                            ? ITEM_TEST_IMAGE_URL.original
                            : answer.item.imagePaths.original,
                        margin: "none",
                      },
                      {
                        type: "text",
                        text: `${answer.item.categoryName}／${answer.item.colorName}`,
                        size: "xxs",
                        wrap: true,
                        margin: "md",
                        weight: "bold",
                      },
                    ],
                    alignItems: "center",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: (() => {
                      let results = answer.parts.map((part) => {
                        return {
                          type: "text",
                          text: `・${part.name}が「${part.option}」`,
                          size: "xxs",
                          wrap: true,
                        };
                      });
                      if (answer.additionalText !== undefined) {
                        results.push({
                          type: "text",
                          text: `・その他\n${answer.additionalText}`,
                          size: "xxs",
                          wrap: true,
                        });
                      }
                      return results;
                    })(),
                    margin: "none",
                  },
                ],
                margin: "md",
                alignItems: "center",
              },
            ],
          },
        };
      }),
    },
  };

  return JSON.stringify(flexMessage);
};
