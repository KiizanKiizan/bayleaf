import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { THearing } from "../../../api/hearings/THearing";
import { TNotNullPlanIdMember } from "../../../api/members/TMembersIndexResponse";
import { getHearingFormShowMock } from "../../../mocks/hearingForms/getHearingFormShowMock";
import { server } from "../../../mocks/server";
import { M_PLAN_IDS } from "../../../models/shared/Plans";
import { ContinuedHearingContainer } from "../../../pages/hearing/ContinuedHearingContainer";
import { createQueryWrapper } from "../../utils/MockProvider";

const { queryWrapper: QueryWrapper } = createQueryWrapper();
const AllTheProviders = ({ children }: { children: React.ReactElement }): ReactElement => {
  return (
    <BrowserRouter>
      <QueryWrapper>{children}</QueryWrapper>
    </BrowserRouter>
  );
};

const createMember = (mPlanId: number): TNotNullPlanIdMember => {
  return {
    id: 1,
    email: "stg-replication@kiizan-kiizan.co,jp",
    nextPaymentDate: "2022-11-1",
    mPlanId,
    isLatestChartDelivered: true,
    isReturnRequired: false,
    isFirstTime: true,
    isSuspend: false,
    isPaymentError: false,
    rentalRemainingNum: 1,
    requestedPlanId: null,
    point: 2000,
  };
};

const createHearings = (mPlanId: number): THearing[] => {
  const hearings = [
    {
      coordinateId: 131324,
      categorizedForms: [
        {
          categoryId: 1,
          categoryName: "使いたいシーン",
          forms: [
            {
              title: "借りたコーデをどちらの予定で使いますか？",
              options: [
                {
                  name: "日常の予定",
                  text: null,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  if (mPlanId === M_PLAN_IDS.PREMIUM) {
    hearings.push({
      coordinateId: 131325,
      categorizedForms: [
        {
          categoryId: 2,
          categoryName: "使いたいシーン",
          forms: [
            {
              title: "借りたコーデをどちらの予定で使いますか？",
              options: [
                {
                  name: "日常の予定",
                  text: null,
                },
              ],
            },
          ],
        },
      ],
    });
  }
  return hearings;
};

const createHearingFormResponse = {
  id: 1,
  categoryId: 1,
  categoryName: "使いたいシーン",
  multipleAnswerNextFormId: null,
  title: "借りたコーデをどちらの予定で使いますか？",
  options: [
    {
      id: 1,
      name: "日常の予定",
      nextFormId: null,
      isText: false,
      isSingleAnswer: true,
    },
    {
      id: 2,
      name: "特別な予定",
      nextFormId: null,
      isText: false,
      isSingleAnswer: true,
    },
  ],
};

describe("ContinuedHearingContainer.tsx", () => {
  test("ライトプランで全てのヒアリングに回答し終えたら、RankSelectingFormが表示される", async () => {
    // Arrange
    server.use(
      getHearingFormShowMock({
        status: 200,
        hearingFormId: 1,
        response: createHearingFormResponse,
      }),
    );
    const user = userEvent.setup();

    // Act
    render(
      <ContinuedHearingContainer
        hearings={createHearings(M_PLAN_IDS.LIGHT)}
        member={createMember(M_PLAN_IDS.LIGHT)}
      />,
      {
        wrapper: AllTheProviders,
      },
    );

    // 最初のレンダリングで、「ヒアリングスタート画面」が表示される
    expect(await screen.findByTestId("beforeHearingConfirm")).toBeInTheDocument();
    user.click(await screen.findByTestId("startHearingLabel"));

    // ヒアリングに進むをクリックしたら、「前回のヒアリング画面」が表示される
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();

    // ヒアリングを開始するをクリックしたら、ヒアリングが一つ回答されてランク選択画面が表示される
    user.click(await screen.findByTestId("startHearingBtnLabel"));
    expect(await screen.findByTestId("hearingFormFetcher")).toBeInTheDocument();
    user.click(await screen.findByText("日常の予定"));
    await waitFor(
      () => {
        expect(screen.getByTestId("rankSelectingForm")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // ランク選択画面でAランクを選択したら、ヒアリング確認画面が表示される
    user.click(await screen.findByText("Aランクでコーデを作ってほしい"));
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();
    expect(await screen.findByText("希望しない")).toBeInTheDocument();

    // ひとつ前に戻るをクリックしたら、ランク選択画面が表示される
    user.click(await screen.findByText("ひとつ前に戻る"));
    expect(await screen.findByTestId("rankSelectingForm")).toBeInTheDocument();
  });

  test("スタンダードプランで全てのヒアリングに回答し終えたら、RankSelectingFormが表示される", async () => {
    // Arrange
    server.use(
      getHearingFormShowMock({
        status: 200,
        hearingFormId: 1,
        response: createHearingFormResponse,
      }),
    );
    const user = userEvent.setup();

    // Act
    render(
      <ContinuedHearingContainer
        hearings={createHearings(M_PLAN_IDS.SRTANDARD)}
        member={createMember(M_PLAN_IDS.SRTANDARD)}
      />,
      {
        wrapper: AllTheProviders,
      },
    );

    // 最初のレンダリングで、「ヒアリングスタート画面」が表示される
    expect(await screen.findByTestId("beforeHearingConfirm")).toBeInTheDocument();
    user.click(await screen.findByTestId("startHearingLabel"));

    // ヒアリングに進むをクリックしたら、「前回のヒアリング画面」が表示される
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();

    // ヒアリングを開始するをクリックしたら、ヒアリングが一つ回答されてランク選択画面が表示される
    user.click(await screen.findByTestId("startHearingBtnLabel"));
    expect(await screen.findByTestId("hearingFormFetcher")).toBeInTheDocument();
    user.click(await screen.findByText("日常の予定"));
    await waitFor(
      () => {
        expect(screen.getByTestId("rankSelectingForm")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // ランク選択画面でAランクを選択したら、ヒアリング確認画面が表示される
    user.click(await screen.findByText("Aランクでコーデを作ってほしい"));
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();
    expect(await screen.findByText("希望しない")).toBeInTheDocument();

    // ひとつ前に戻るをクリックしたら、ランク選択画面が表示される
    user.click(await screen.findByText("ひとつ前に戻る"));
    expect(await screen.findByTestId("rankSelectingForm")).toBeInTheDocument();
  });

  test("ライトプランで「前回と同じ内容でコーデを作る」を回答したら、RankSelectingFormが表示される", async () => {
    // Arrange
    server.use(
      getHearingFormShowMock({
        status: 200,
        hearingFormId: 1,
        response: createHearingFormResponse,
      }),
    );
    const user = userEvent.setup();

    // Act
    render(
      <ContinuedHearingContainer
        hearings={createHearings(M_PLAN_IDS.LIGHT)}
        member={createMember(M_PLAN_IDS.LIGHT)}
      />,
      {
        wrapper: AllTheProviders,
      },
    );

    // 最初のレンダリングで、「ヒアリングスタート画面」が表示される
    expect(await screen.findByTestId("beforeHearingConfirm")).toBeInTheDocument();
    user.click(await screen.findByTestId("startHearingLabel"));

    // ヒアリングに進むをクリックしたら、「前回のヒアリング画面」が表示される
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();

    // 「前回と同じ内容でコーデを作る」をクリックしたら、ランク選択画面が表示される
    user.click(await screen.findByTestId("sameHearingBtnLabel"));
    expect(await screen.findByTestId("rankSelectingForm")).toBeInTheDocument();

    // ランク選択画面でAランクを選択したら、ヒアリング確認画面が表示される
    user.click(await screen.findByText("Aランクでコーデを作ってほしい"));
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();
    expect(await screen.findByText("希望しない")).toBeInTheDocument();

    // ひとつ前に戻るをクリックしたら、ランク選択画面が表示される
    user.click(await screen.findByText("ひとつ前に戻る"));
    expect(await screen.findByTestId("rankSelectingForm")).toBeInTheDocument();
  });

  test("プレミアムプランで全てのヒアリングに回答し終えたら、RankSelectingFormが表示される", async () => {
    // Arrange
    server.use(
      getHearingFormShowMock({
        status: 200,
        hearingFormId: 1,
        response: createHearingFormResponse,
      }),
    );
    const user = userEvent.setup();

    // Act
    render(
      <ContinuedHearingContainer
        hearings={createHearings(M_PLAN_IDS.PREMIUM)}
        member={createMember(M_PLAN_IDS.PREMIUM)}
      />,
      {
        wrapper: AllTheProviders,
      },
    );

    // 最初のレンダリングで、「ヒアリングスタート画面」が表示される
    expect(await screen.findByTestId("beforeHearingConfirm")).toBeInTheDocument();
    user.click(await screen.findByTestId("startHearingLabel"));

    // ヒアリングに進むをクリックしたら、「前回のヒアリング画面」が表示される
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();

    // ヒアリングを開始するをクリックしたら、ヒアリングが一つ回答されて二つ目の選択画面が表示される
    user.click(await screen.findByTestId("startHearingBtnLabel"));
    expect(await screen.findByTestId("hearingFormFetcher")).toBeInTheDocument();
    user.click(await screen.findByText("日常の予定"));
    await waitFor(
      () => {
        expect(screen.getByTestId("premiumPlanConfirm")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // 二度目のヒアリングに進むをクリックしたら、「前回のヒアリング画面」が表示される
    user.click(await screen.findByTestId("nextHearingLabel"));
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();

    // ヒアリングを開始するをクリックしたら、ヒアリングが一つ回答されてランク選択画面が表示される
    user.click(await screen.findByTestId("startHearingBtnLabel"));
    expect(await screen.findByTestId("hearingFormFetcher")).toBeInTheDocument();
    user.click(await screen.findByText("日常の予定"));
    await waitFor(
      () => {
        expect(screen.getByTestId("rankSelectingForm")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // ランク選択画面でAランクを選択したら、ヒアリング確認画面が表示される
    user.click(await screen.findByText("Aランクでコーデを作ってほしい"));
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();
    expect(await screen.findByText("希望しない")).toBeInTheDocument();

    // ひとつ前に戻るをクリックしたら、ランク選択画面が表示される
    user.click(await screen.findByText("ひとつ前に戻る"));
    expect(await screen.findByTestId("rankSelectingForm")).toBeInTheDocument();
  });

  test("プレミアムプランで「前回と同じ内容でコーデを作る」を回答したら、RankSelectingFormが表示される", async () => {
    // Arrange
    server.use(
      getHearingFormShowMock({
        status: 200,
        hearingFormId: 1,
        response: createHearingFormResponse,
      }),
    );
    const user = userEvent.setup();

    // Act
    render(
      <ContinuedHearingContainer
        hearings={createHearings(M_PLAN_IDS.PREMIUM)}
        member={createMember(M_PLAN_IDS.PREMIUM)}
      />,
      {
        wrapper: AllTheProviders,
      },
    );

    // 最初のレンダリングで、「ヒアリングスタート画面」が表示される
    expect(await screen.findByTestId("beforeHearingConfirm")).toBeInTheDocument();
    user.click(await screen.findByTestId("startHearingLabel"));

    // ヒアリングに進むをクリックしたら、「前回のヒアリング画面」が表示される
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();

    // 「前回と同じ内容でコーデを作る」をクリックしたら、二つ目の選択画面が表示される
    user.click(await screen.findByTestId("sameHearingBtnLabel"));
    expect(await screen.findByTestId("premiumPlanConfirm")).toBeInTheDocument();

    // 二度目のヒアリングに進むをクリックしたら、「前回のヒアリング画面」が表示される
    user.click(await screen.findByTestId("nextHearingLabel"));
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();

    // 「前回と同じ内容でコーデを作る」をクリックしたら、ランク選択画面が表示される
    user.click(await screen.findByTestId("sameHearingBtnLabel"));
    expect(await screen.findByTestId("rankSelectingForm")).toBeInTheDocument();

    // ランク選択画面でAランクを選択したら、ヒアリング確認画面が表示される
    user.click(await screen.findByText("Aランクでコーデを作ってほしい"));
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();
    expect(await screen.findByText("希望しない")).toBeInTheDocument();

    // ひとつ前に戻るをクリックしたら、ランク選択画面が表示される
    user.click(await screen.findByText("ひとつ前に戻る"));
    expect(await screen.findByTestId("rankSelectingForm")).toBeInTheDocument();
  });

  test("Bランクアイテムが選択できる", async () => {
    // Arrange
    server.use(
      getHearingFormShowMock({
        status: 200,
        hearingFormId: 1,
        response: createHearingFormResponse,
      }),
    );
    const user = userEvent.setup();

    // Act
    render(
      <ContinuedHearingContainer
        hearings={createHearings(M_PLAN_IDS.LIGHT)}
        member={createMember(M_PLAN_IDS.LIGHT)}
      />,
      {
        wrapper: AllTheProviders,
      },
    );

    // 最初のレンダリングで、「ヒアリングスタート画面」が表示される
    expect(await screen.findByTestId("beforeHearingConfirm")).toBeInTheDocument();
    user.click(await screen.findByTestId("startHearingLabel"));

    // ヒアリングに進むをクリックしたら、「前回のヒアリング画面」が表示される
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();

    // ヒアリングを開始するをクリックしたら、ヒアリングが一つ回答されてランク選択画面が表示される
    user.click(await screen.findByTestId("startHearingBtnLabel"));
    expect(await screen.findByTestId("hearingFormFetcher")).toBeInTheDocument();
    user.click(await screen.findByText("日常の予定"));
    await waitFor(
      () => {
        expect(screen.getByTestId("rankSelectingForm")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // ランク選択画面でBランク可を選択したら、ヒアリング確認画面が表示される
    const textMatcher = (content: string) => {
      return (
        content.startsWith("Bランクアイテムがあれば、") &&
        content.includes("Bランク混合でコーデを作ってほしい")
      );
    };
    user.click(await screen.findByText(textMatcher));
    expect(await screen.findByTestId("rankSelectingForm")).toBeInTheDocument();
    expect(await screen.findByTestId("hearingAnswerConfirm")).toBeInTheDocument();
    expect(await screen.findByText("希望する")).toBeInTheDocument();
  });
});
