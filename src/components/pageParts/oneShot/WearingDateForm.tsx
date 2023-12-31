import { Button } from "../../baseParts/Button";
import { DatetimePicker } from "../../baseParts/legacy/inputs/DatetimePicker";
import { Page } from "../../baseParts/legacy/Page";
import { Typography } from "../../baseParts/legacy/Typography";
import { ScheduleDiagram } from "./ScheduleDiagram";

type TProps = {
  readonly selectedDate: string;
  readonly earliestDate: string;
  readonly onSelect: (deliveryDate: string) => void;
  readonly onSubmit: () => void;
};

export const WearingDateForm = ({
  selectedDate,
  earliestDate,
  onSelect,
  onSubmit,
}: TProps) => {
  const lastDate = new Date(earliestDate);
  lastDate.setDate(lastDate.getDate() + 30);

  return (
    <Page className="flex h-full min-h-screen flex-col items-center justify-between p-3 text-themeGray">
      <div>
        <Typography size="2xl" className="my-8 text-center">
          利用日を選択してください
        </Typography>
        <ScheduleDiagram
          wearDate={selectedDate !== "" ? selectedDate : undefined}
          className="mb-8"
        />
        <DatetimePicker
          selectableDateFrom={earliestDate}
          selectableDateTo={lastDate.toISOString().split("T")[0]}
          currentDate={selectedDate}
          onChangeDate={onSelect}
        />
      </div>
      <Button
        size="large"
        className="mt-4"
        disabled={selectedDate === ""}
        onClick={onSubmit}
      >
        利用日を確定する
      </Button>
    </Page>
  );
};
