import { DeliveryPage } from "../../components/delivery/DeliveryPage";
import { useDeliveryDateUpdate } from "../../api/deliveryDates/useDeliveryDateUpdate";
import { TChartDeliveryDateResponse } from "../../api/deliveryDates/TChartDeliveryDateResponse";
import { useState } from "react";
import { AlertDialog } from "../../components/baseParts/dialogs/AlertDialog";
import { useQueryClient } from "react-query";

type Props = {
  chartId: number;
  deliveryDateShowData: TChartDeliveryDateResponse;
  nextPaymentsDate: string;
};
export const DeliveryPageContainer = ({
  chartId,
  deliveryDateShowData,
  nextPaymentsDate,
}: Props) => {
  const [isDiscountEnabled, setIsDiscountDateEnabled] = useState(
    deliveryDateShowData.discountSelectableDatePeriod !== null
  );
  const [isShortest, setIsShortest] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState(
    deliveryDateShowData.chartDeliveryTime?.time.toString() ??
      deliveryDateShowData.memberDeliveryTime.toString()
  );
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const selectableDateRange = isDiscountEnabled
    ? {
        min: deliveryDateShowData.discountSelectableDatePeriod?.start as string,
        max: deliveryDateShowData.discountSelectableDatePeriod?.end as string,
      }
    : {
        min: deliveryDateShowData.selectableDatePeriod?.start as string,
        max: deliveryDateShowData.selectableDatePeriod?.end as string,
      };

  const today = new Date().toLocaleDateString();
  const shortestDateRange = {
    min:
      new Date(nextPaymentsDate) > new Date(selectableDateRange.max)
        ? today
        : nextPaymentsDate,
    max: selectableDateRange.min,
  };
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDeliveryDateUpdate({
    chartId,
    deliveryDate: isShortest ? null : selectedDate,
    shipmentDate: isShortest ? shortestDateRange.min : null,
    time: Number(time),
  });

  const isDiscountSelectable =
    deliveryDateShowData.selectableDatePeriod !== null &&
    deliveryDateShowData.discountSelectableDatePeriod !== null;

  return (
    <>
      <DeliveryPage
        chartDeliveryTime={deliveryDateShowData.chartDeliveryTime}
        deliveryTimeOptions={deliveryDateShowData.deliveryTimeOptions}
        isDiscountSelectable={isDiscountSelectable}
        onDiscountChange={(isChecked) => {
          setIsDiscountDateEnabled(isChecked);
          setSelectedDate("");
        }}
        isDiscountEnabled={isDiscountEnabled}
        isShortest={isShortest}
        onSelectShortest={setIsShortest}
        shortestDateRange={shortestDateRange}
        selectableDateRange={selectableDateRange}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedDeliveryTime={time}
        onSelectDeliveryTime={setTime}
        onSubmit={() =>
          mutate(undefined, {
            onSuccess: () => {
              queryClient
                .invalidateQueries(`charts/${chartId}/delivery_date`)
                .then(() => setIsSuccessDialogOpen(true));
            },
          })
        }
        isLoading={isLoading}
      />
      <AlertDialog
        open={isSuccessDialogOpen}
        title="以下の内容で配送日時を指定しました"
        description={
          <>
            配送希望日：
            {deliveryDateShowData.chartDeliveryTime?.date ?? "最短日"}
            <br></br>
            配送希望時間：
            {deliveryDateShowData.deliveryTimeOptions.find(
              (option) =>
                option.id === deliveryDateShowData.chartDeliveryTime?.time
            )?.name ?? "指定無し"}
          </>
        }
        onClickOk={() => setIsSuccessDialogOpen(false)}
        onClose={() => setIsSuccessDialogOpen(false)}
      ></AlertDialog>
    </>
  );
};
