import { TOption } from "./TOption";

export type THearingFormShowResponse = {
  readonly id: number;
  readonly categoryId: number;
  readonly categoryName: string;
  readonly multipleAnswerNextFormId: number | null;
  readonly title: string;
  readonly options: TOption[];
};
