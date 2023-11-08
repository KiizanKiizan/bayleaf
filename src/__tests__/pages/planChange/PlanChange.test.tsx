import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { getChartIndexMock } from "../../../mocks/charts/getChartIndexMock";
import { getMemberIndexMock } from "../../../mocks/members/getMemberIndexMock";
import { server } from "../../../mocks/server";
import { LIGHT_PLAN, M_PLAN_IDS, PREMIUM_PLAN } from "../../../models/shared/Plans";
import { PlanChange } from "../../../pages/planChange/PlanChange";
import { createQueryWrapper } from "../../utils/MockProvider";

const { queryWrapper } = createQueryWrapper();

const router = createMemoryRouter(
  [
    {
      path: "/plan_change",
      element: <PlanChange />,
    },
  ],
  { initialEntries: ["/plan_change"] },
);

describe("PlanChange.tsx", () => {
  test("初回ユーザーの場合、PlanSelectingForPreMemberContainerに遷移", async () => {
    server.use(getChartIndexMock({ status: 200, response: { charts: [] } }));
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: PREMIUM_PLAN.id,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: true,
            isSuspend: false,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });

    expect(await screen.findByTestId("PlanSelectingForPreMemberContainer")).toBeInTheDocument();
  });

  test("二回目以降ユーザーの場合、PlanSelectingContainerに遷移", async () => {
    server.use(getChartIndexMock({ status: 200, response: { charts: [] } }));
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: PREMIUM_PLAN.id,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: false,
            isSuspend: false,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });

    expect(await screen.findByTestId("PlanSelectingContainer")).toBeInTheDocument();
  });

  test("UWearレンタル中ユーザーの場合、PlanSelectingContainerに遷移", async () => {
    server.use(
      getChartIndexMock({
        status: 200,
        response: {
          charts: [
            {
              id: 1,
              rentalStatus: 4,
              rentalStartedAt: "2022/03/12",
              itemImagePaths: [
                "https://stg.leeap.jp/files/preregistered_item/168/16899/large_thumb_IMG_3977.JPG",
              ],
              planName: `${LIGHT_PLAN.jpName}プラン`,
              planId: M_PLAN_IDS.LIGHT,
            },
          ],
        },
      }),
    );
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: M_PLAN_IDS.LIGHT,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: false,
            isSuspend: false,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });
    expect(await screen.findByTestId("PlanSelectingContainer")).toBeInTheDocument();
  });

  test("初回ユーザーでレンタル中の場合、PlanSelectingContainerに遷移", async () => {
    server.use(
      getChartIndexMock({
        status: 200,
        response: {
          charts: [
            {
              id: 1,
              rentalStatus: 4,
              rentalStartedAt: "2022/03/12",
              itemImagePaths: [
                "https://stg.leeap.jp/files/preregistered_item/168/16899/large_thumb_IMG_3977.JPG",
              ],
              planName: PREMIUM_PLAN.jpName,
              planId: PREMIUM_PLAN.id,
            },
          ],
        },
      }),
    );
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: PREMIUM_PLAN.id,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: true,
            isSuspend: false,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });

    expect(await screen.findByTestId("PlanSelectingContainer")).toBeInTheDocument();
  });

  test("ユーザーが複数いる場合、バリデーションをする", async () => {
    server.use(getChartIndexMock({ status: 200, response: { charts: [] } }));
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication+1@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: PREMIUM_PLAN.id,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: true,
            isSuspend: false,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
          {
            id: 3,
            email: "stg-replication+3@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: PREMIUM_PLAN.id,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: true,
            isSuspend: false,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });

    expect(await screen.findByTestId("isMultpleMembers")).toBeInTheDocument();
  });

  test("旧プラン利用でレンタル中ユーザーの場合、バリデーションメッセージを表示する", async () => {
    server.use(
      getChartIndexMock({
        status: 200,
        response: {
          charts: [
            {
              id: 1,
              rentalStatus: 4,
              rentalStartedAt: "2022/03/12",
              itemImagePaths: [
                "https://stg.leeap.jp/files/preregistered_item/168/16899/large_thumb_IMG_3977.JPG",
              ],
              planName: "カジュアルプラン",
              planId: M_PLAN_IDS.CASUAL,
            },
          ],
        },
      }),
    );
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: M_PLAN_IDS.CASUAL,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: false,
            isSuspend: false,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });

    expect(await screen.findByTestId("isStatusNotRentable")).toBeInTheDocument();
  });

  test("初回ユーザーでコーデ登録待ちの場合、バリデーションメッセージを表示する", async () => {
    server.use(
      getChartIndexMock({
        status: 200,
        response: {
          charts: [
            {
              id: 1,
              rentalStatus: 2,
              rentalStartedAt: "2022/03/12",
              itemImagePaths: [
                "https://stg.leeap.jp/files/preregistered_item/168/16899/large_thumb_IMG_3977.JPG",
              ],
              planName: PREMIUM_PLAN.jpName,
              planId: PREMIUM_PLAN.id,
            },
          ],
        },
      }),
    );
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: PREMIUM_PLAN.id,
            isLatestChartDelivered: false,
            isReturnRequired: false,
            isFirstTime: true,
            isSuspend: false,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });
    expect(await screen.findByTestId("isFirstUserPreparingCoordinate")).toBeInTheDocument();
  });

  test("GET /chartsが500エラーの場合、バリデーションをする", async () => {
    server.use(getChartIndexMock({ status: 500 }));
    server.use(getMemberIndexMock({ status: 200, response: [] }));
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });
    expect(await screen.findByText("予期せぬエラーが発生しました")).toBeInTheDocument();
  });

  test("GET /membersが500エラーの場合、バリデーションをする", async () => {
    server.use(getChartIndexMock({ status: 200, response: { charts: [] } }));
    server.use(getMemberIndexMock({ status: 500 }));
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });
    expect(await screen.findByText("予期せぬエラーが発生しました")).toBeInTheDocument();
  });

  test("GET /membersとGET /charts両方500エラーの場合、バリデーションをする", async () => {
    server.use(getChartIndexMock({ status: 500 }));
    server.use(getMemberIndexMock({ status: 500 }));
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });
    expect(await screen.findByText("予期せぬエラーが発生しました")).toBeInTheDocument();
  });

  test("決済エラー停止ユーザーの場合、バリデーションメッセージを表示する", async () => {
    server.use(getChartIndexMock({ status: 200, response: { charts: [] } }));
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: PREMIUM_PLAN.id,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: false,
            isSuspend: true,
            isPaymentError: true,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/unsuspend");
    });
  });

  test("停止ユーザーの場合、Unsuspend.tsxにリダイレクトする", async () => {
    server.use(getChartIndexMock({ status: 200, response: { charts: [] } }));
    server.use(
      getMemberIndexMock({
        status: 200,
        response: [
          {
            id: 1,
            email: "stg-replication@kiizan-kiizan.co,jp",
            nextPaymentDate: "2022-11-1",
            mPlanId: PREMIUM_PLAN.id,
            isLatestChartDelivered: true,
            isReturnRequired: false,
            isFirstTime: false,
            isSuspend: true,
            isPaymentError: false,
            rentalRemainingNum: 1,
            requestedPlanId: null,
            point: 2000,
          },
        ],
      }),
    );
    render(<RouterProvider router={router} />, {
      wrapper: queryWrapper,
    });

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/unsuspend");
    });
  });
});
