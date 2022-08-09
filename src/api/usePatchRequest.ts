import { useContext } from "react";
import { useMutation } from "react-query";
import * as Sentry from "@sentry/react";
import { IdTokenContext, StylistIdContext } from "../App";
import { customAxios } from "./customAxios";

export const usePatchRequest = <T>(path: string, params: T) => {
  const idToken = useContext(IdTokenContext);
  const stylistId = useContext(StylistIdContext);

  const { mutate, isLoading } = useMutation(
    path,
    () =>
      customAxios().patch(
        `${process.env.REACT_APP_HOST_URL}/${path}`,
        {
          ...params,
          stylistId,
        },
        {
          headers: {
            Authorization: idToken,
          },
        }
      ),
    {
      onError: (error) => {
        Sentry.captureException(error);
      },
    }
  );

  return { mutate, isLoading };
};
