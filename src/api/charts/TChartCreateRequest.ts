import { THearingParams } from "./THearingParams";

export type TChartCreateRequest = {
  readonly memberId: number;
  readonly hearings?: THearingParams[];
};
