import { useEffect, useState } from "react";
import { ExpandableImage } from "../../../components/baseParts/images/ExpandableImage";
import { TextAreaAlt } from "../../../components/baseParts/inputs/TextAreaAlt";
import { Page } from "../../../components/baseParts/Page";
import { CompleteButton } from "../../../components/baseParts/CompleteButton";
import { Typography } from "../../../components/baseParts/Typography";
import { TConsultingItem } from "../../../models/consult/TConsultingItem";

type TProps = {
  selectedItem: TConsultingItem;
  onSubmit: (freeText: string) => void;
  onCancel: () => void;
};
export const DesignDetailForm = ({
  selectedItem,
  onSubmit,
  onCancel,
}: TProps) => {
  const [freeText, setFreeText] = useState<string>("");

  useEffect(() => {
    setFreeText("");
  }, [selectedItem]);

  return (
    <Page>
      <div className="flex flex-col justify-between h-full">
        <div className="px-5 py-5">
          <div className="w-[120px] ml-auto mr-auto">
            <ExpandableImage
              defaultImageSrc={selectedItem.imagePaths.largeThumb}
              ExpandedImageSrc={selectedItem.imagePaths.large}
            />
            <Typography
              className="mt-1 text-center"
              size="xs"
              color="primary"
              weight="medium"
            >
              {`${selectedItem.cateSmallName}／${selectedItem.color}`}
            </Typography>
          </div>
          <Typography className="mt-5">気になる点を教えてください</Typography>
          <div className="mt-5">
            <TextAreaAlt
              className="h-[150px]"
              value={freeText}
              onChange={(event) => setFreeText(event.target.value)}
              placeholder="柄が派手すぎる"
            />
          </div>
        </div>
        <CompleteButton
          onClickComplete={() => onSubmit(freeText)}
          onClickBack={onCancel}
          disabled={freeText === ""}
        >
          次へ
        </CompleteButton>
      </div>
    </Page>
  );
};