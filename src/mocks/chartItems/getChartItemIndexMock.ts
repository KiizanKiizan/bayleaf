import { http } from "msw";
import { TChartItemsIndexResponse } from "../../api/chartItems/TChartItemsIndexResponse";

type TProps = {
  status: number;
  response?: TChartItemsIndexResponse[];
  chartId: number;
};

export const getChartItemIndexMock = ({ status, response, chartId }: TProps) => {
  return http.get(`${process.env.REACT_APP_HOST_URL}/leeaf/charts/${chartId}/chart_items`, () => {
    return new Response(JSON.stringify(response), {
      status: status,
      headers: { "Content-Type": "application/json" },
    });
  });
};
