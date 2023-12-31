import { TDressingAdvice } from "../../../api/dressings/TDressingAdvice";
import PreviewDefault from "../../../images/preview_default.png";
import { ExpandableImage } from "../../baseParts/legacy/images/ExpandableImage";
import { Typography } from "../../baseParts/legacy/Typography";

type TProps = {
  readonly advices: TDressingAdvice[];
};
export const DressingAdvice = ({ advices }: TProps) => {
  return (
    <div>
      <Typography size="xl">コーデの着こなし方</Typography>
      <div className="my-5 border-[1px] border-gray" />
      <div className="mt-5">
        {advices.map((advice, index) => (
          <div className="my-3 flex items-center" key={index}>
            <ExpandableImage
              defaultImageSrc={`${
                advice.imageFileName
                  ? process.env.REACT_APP_HOST_URL + advice.imageFileName
                  : PreviewDefault
              }`}
              ExpandedImageSrc={`${
                advice.imageFileName
                  ? process.env.REACT_APP_HOST_URL + advice.imageFileName
                  : PreviewDefault
              }`}
              className="w-[15vw]"
            />
            <Typography className="w-[80vw] px-4">
              {advice.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
