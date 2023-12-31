import { TTimeOptions } from "../../../api/deliveryDates/TChartDeliveryDateResponse";
import { Button } from "../../baseParts/legacy/Button";
import { DatetimePicker } from "../../baseParts/legacy/inputs/DatetimePicker";
import { DropdownMenuAlt } from "../../baseParts/legacy/inputs/DropdownMenuAlt";
import { Toggle } from "../../baseParts/legacy/inputs/Toggle";
import { Page } from "../../baseParts/legacy/Page";
import { PageHeader } from "../../baseParts/legacy/PageHeader";
import { Paper } from "../../baseParts/legacy/Paper";
import { SelectButton } from "../../baseParts/legacy/SelectButton";
import { Typography } from "../../baseParts/legacy/Typography";
import { SelectedDeliveryDate } from "./SelectedDeliveryDate";

type TProps = {
  chartDeliveryTime: {
    date: string | null;
    time: number;
  } | null;
  deliveryTimeOptions: TTimeOptions[];
  isDiscountSelectable: boolean;
  onDiscountChange: (isChecked: boolean) => void;
  isDiscountEnabled: boolean;
  isShortest: boolean;
  onSelectShortest: (isSelect: boolean) => void;
  shortestDateRange: {
    min: string;
    max: string;
  };
  selectableDateRange: {
    min: string;
    max: string;
  };
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedDeliveryTime: number;
  onSelectDeliveryTime: (deliveryTime: number) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export const DeliveryPage = ({
  chartDeliveryTime,
  deliveryTimeOptions,
  isDiscountSelectable,
  onDiscountChange,
  isDiscountEnabled,
  isShortest,
  onSelectShortest,
  shortestDateRange,
  selectableDateRange,
  selectedDate,
  onSelectDate,
  selectedDeliveryTime,
  onSelectDeliveryTime,
  onSubmit,
  isLoading,
}: TProps) => {
  return (
    <Page className="px-5">
      <PageHeader title="配送日程を選んでください"></PageHeader>
      <div>
        {chartDeliveryTime !== null && (
          <Paper className="mt-10">
            <Typography size="xl" className="mb-2">
              指定中の配送日時
            </Typography>
            <SelectedDeliveryDate
              selectedDeliveryDate={chartDeliveryTime}
              timeOptions={deliveryTimeOptions}
            />
          </Paper>
        )}
        <div className="mb-4 mt-10">
          {isDiscountSelectable ? (
            <div className="flex gap-3">
              <Toggle checked={isDiscountEnabled} onChange={onDiscountChange} />
              <Typography>持ち続ける割引を適用する</Typography>
            </div>
          ) : (
            isDiscountEnabled && (
              <Typography>持ち続ける割引は適用されます</Typography>
            )
          )}
        </div>

        <div className="mb-4 flex gap-3">
          <SelectButton
            selected={isShortest}
            onClick={() => onSelectShortest(true)}
          >
            最短で発送する
            <Typography>(営業日6日以内)</Typography>
          </SelectButton>
          <SelectButton
            selected={!isShortest}
            onClick={() => onSelectShortest(false)}
          >
            <Typography>日程を選択する</Typography>
          </SelectButton>
        </div>

        {isShortest ? (
          <>
            <Typography color="strong-gray">配送予定期間</Typography>
            <Typography color="strong-gray">
              {new Date(shortestDateRange.min).toLocaleDateString("ja-JP")}〜
              {new Date(shortestDateRange.max).toLocaleDateString("ja-JP")}
            </Typography>
          </>
        ) : (
          <>
            <Typography color="strong-gray">配送希望日</Typography>
            <DatetimePicker
              selectableDateFrom={selectableDateRange.min}
              selectableDateTo={selectableDateRange.max}
              currentDate={selectedDate}
              onChangeDate={onSelectDate}
            />
          </>
        )}
        <div className="my-5">
          <Typography color="strong-gray">配送希望時間</Typography>
          <DropdownMenuAlt
            value={selectedDeliveryTime.toString()}
            onChange={(event) =>
              onSelectDeliveryTime(parseInt(event.target.value))
            }
          >
            {deliveryTimeOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </DropdownMenuAlt>
        </div>
      </div>
      <Button
        onClick={onSubmit}
        isLoading={isLoading}
        disabled={isShortest === false && selectedDate === ""}
        className="mt-10"
      >
        確定する
      </Button>
    </Page>
  );
};
