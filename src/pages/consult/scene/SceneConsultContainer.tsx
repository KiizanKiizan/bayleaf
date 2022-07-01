import { Loader } from "semantic-ui-react";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";
import { TConsultingItem } from "../../../models/consult/TConsultingItem";
import { AfterConsultContainer } from "../AfterConsultContainer";
import { createSceneConsultFlexMessage } from "../createFlexMessage/createSceneConsultFlexMessage";
import { useConsultLineMessageSender } from "../useConsultLineMessageSender";
import { SceneDetailForm } from "./SceneDetailForm";

type TProps = {
  readonly items: TConsultingItem[];
  readonly onCancel: () => void;
};

export const SceneConsultContainer = ({ items, onCancel }: TProps) => {
  const { send, isSending, isError, isSuccess } = useConsultLineMessageSender();

  const getItemImageUrls = (): string[] => {
    return items.map((item) => item.imagePaths.thumb);
  };

  const handleSubmit = (freeText: string) => {
    send(
      createSceneConsultFlexMessage({
        itemImageUrls: getItemImageUrls(),
        freeText,
      }),
      false
    );
  };

  if (isSuccess) return <AfterConsultContainer />;
  if (isError) return <ErrorMessage message="予期せぬエラーが発生しました" />;
  if (isSending) return <Loader active />;
  return <SceneDetailForm onSubmit={handleSubmit} onCancel={onCancel} />;
};