import { http } from "msw";
import { TMembersIndexResponse } from "../../api/members/TMembersIndexResponse";

type TProps = {
  status: number;
  response?: TMembersIndexResponse[];
};

export const getMemberIndexMock = ({ status, response }: TProps) => {
  return http.get(`${process.env.REACT_APP_HOST_URL}/leeaf/members`, () => {
    return new Response(JSON.stringify(response), {
      status: status,
      headers: { "Content-Type": "application/json" },
    });
  });
};
