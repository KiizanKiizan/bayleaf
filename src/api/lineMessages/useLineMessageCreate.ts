import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePostRequest } from "../usePostRequest";

type TLineMessageCreate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse,
    any,
    TLineMessageCreateParams,
    unknown
  >;
  readonly isLoading: boolean;
};

export type TLineMessageCreateParams = {
  readonly messages: any[];
};

export const useLineMessageCreate = (): TLineMessageCreate => {
  const { mutate, isLoading } = usePostRequest<TLineMessageCreateParams>(
    "line_messages",
    (input) => "stylistId" !== input
  );

  return { mutate, isLoading };
};
