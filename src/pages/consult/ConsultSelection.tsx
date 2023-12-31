import { Button } from "../../components/baseParts/legacy/Button";
import { Typography } from "../../components/baseParts/legacy/Typography";
import {
  ConsultChoice,
  ConsultChoiceType,
} from "../../models/consult/choice/ConsultChoice";

type TProps = {
  onClickOption: (option: ConsultChoiceType) => void;
};

export const ConsultSelection = ({ onClickOption }: TProps) => {
  return (
    <div className="mx-8">
      <Typography className="my-12 text-3xl">
        相談内容を選択してください。
      </Typography>
      {Object.values(ConsultChoice).map((option, i) =>
        Object.values(ConsultChoice).length - 1 !== i ? (
          <Button
            variant="text"
            border
            className="mb-4 h-20 bg-white px-10"
            onClick={() => onClickOption(option)}
            key={i}
          >
            <Typography className="text-xl">{option}</Typography>
          </Button>
        ) : (
          <Button
            variant="text"
            className="mt-4 px-10"
            onClick={() => onClickOption(option)}
            key={i}
          >
            <Typography className="text-lg text-indigo-900 underline underline-offset-4">
              {option}
            </Typography>
          </Button>
        )
      )}
    </div>
  );
};
