import { TFormParams } from "./TFormParams";

export type THearingParams = {
  readonly sameCoordinateId?: number;
  readonly forms?: TFormParams[];
  readonly isDifferentColor?: boolean;
};
