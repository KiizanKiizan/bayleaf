import { useEffect, useState } from "react";
import { TChartResponse } from "../../api/charts/TChartResponse";
import { useChartIndex } from "../../api/charts/useChartIndex";
import { Page } from "../../components/baseParts/legacy/Page";
import { Typography } from "../../components/baseParts/legacy/Typography";
import { ErrorPage } from "../../components/baseParts/pages/ErrorPage";
import { LoaderPage } from "../../components/baseParts/pages/LoaderPage";
import { ChartList } from "../../components/resourceParts/chart/ChartList";
import { CHART_RENTAL_STATUS } from "../../models/chart/ChartRentalStatus";
import { ReviewStartPage } from "./ReviewStartPage";

export const Review = () => {
  const [selectedChart, setSelectedChart] =
    useState<TChartResponse | undefined>(undefined);
  const { data: chartIndexData, error: chartIndexError } = useChartIndex({
    params: {
      rentalStatus: [CHART_RENTAL_STATUS.WAIT_RENTAL_RETURN],
    },
  });

  useEffect(() => {
    document.title = `レビュー | UWear`;
  }, []);

  useEffect(() => {
    if (chartIndexData === undefined) return;

    if (chartIndexData.charts.length === 1)
      setSelectedChart(chartIndexData.charts[0]);
  }, [chartIndexData]);

  if (chartIndexError) return <ErrorPage message={chartIndexError.message} />;

  if (!chartIndexData) return <LoaderPage />;

  if (chartIndexData.charts.length === 0)
    return (
      <Page className="flex items-center justify-center">
        <Typography>
          <>レビュー対象のレンタルはありません。</>
        </Typography>
      </Page>
    );

  return (
    <>
      {selectedChart ? (
        <ReviewStartPage chartId={selectedChart.id} />
      ) : (
        <Page>
          <ChartList
            chartResponses={chartIndexData.charts}
            onClickChart={setSelectedChart}
          />
        </Page>
      )}
    </>
  );
};
