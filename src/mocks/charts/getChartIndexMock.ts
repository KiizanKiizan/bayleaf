import { http } from "msw";
import { TChartIndexResponse } from "../../api/charts/TChartIndexResponse";

type TProps = {
  status: number;
  response?: TChartIndexResponse;
};

export const getChartIndexMock = ({ status, response }: TProps) => {
  return http.get(`${process.env.REACT_APP_HOST_URL}/leeaf/charts`, () => {
    return new Response(JSON.stringify(response), {
      status: status,
      headers: { "Content-Type": "application/json" },
    });
  });
};
