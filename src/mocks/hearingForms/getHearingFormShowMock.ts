import { http } from "msw";
import { THearingFormShowResponse } from "../../api/hearingForms/THearingFormShowResponse";

type TProps = {
  status: number;
  response?: THearingFormShowResponse;
  hearingFormId: number;
};

export const getHearingFormShowMock = ({ status, response, hearingFormId }: TProps) => {
  return http.get(`${process.env.REACT_APP_HOST_URL}/leeaf/hearing_forms/${hearingFormId}`, () => {
    return new Response(JSON.stringify(response), {
      status: status,
      headers: { "Content-Type": "application/json" },
    });
  });
};
