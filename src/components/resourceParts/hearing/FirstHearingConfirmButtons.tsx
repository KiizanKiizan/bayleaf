import { useState } from "react";
import { ConfirmDialog } from "../../baseParts/dialogs/ConfirmDialog";
import { Button } from "../../baseParts/legacy/Button";

type TProps = {
  readonly onClickComplete: () => void;
  readonly onClickBack: () => void;
  readonly onClickReset: () => void;
  readonly isPostLoading: boolean;
  readonly completeButtonText?: string;
};
export const FirstHearingConfirmButtons = ({
  onClickComplete,
  onClickBack,
  onClickReset,
  isPostLoading,
  completeButtonText,
}: TProps) => {
  const [isOpenResetConfirm, setIsOpenResetConfirm] = useState(false);
  const [isOpenCreateConfirm, setIsOpenCreateConfirm] = useState(false);
  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsOpenCreateConfirm(true)}
        disabled={isPostLoading}
        border={true}
      >
        {completeButtonText || "ヒアリングを完了する"}
      </Button>
      <Button
        onClick={onClickBack}
        disabled={isPostLoading}
        variant="default"
        disableElevation
        border
      >
        ひとつ前に戻る
      </Button>
      <Button
        variant="text"
        onClick={() => setIsOpenResetConfirm(true)}
        disabled={isPostLoading}
      >
        最初からやり直す
      </Button>
      <ConfirmDialog
        open={isOpenResetConfirm}
        onClose={() => setIsOpenResetConfirm(false)}
        title="最初からやり直しますか？"
        onClickOk={() => {
          setIsOpenResetConfirm(false);
          onClickReset();
        }}
        onClickCancel={() => setIsOpenResetConfirm(false)}
      />
      <ConfirmDialog
        open={isOpenCreateConfirm}
        onClose={() => setIsOpenCreateConfirm(false)}
        title="次のコーディネートはこのヒアリングをもとに作成します。よろしいですか？"
        onClickOk={() => {
          setIsOpenCreateConfirm(false);
          onClickComplete();
        }}
        onClickCancel={() => setIsOpenCreateConfirm(false)}
      />
    </>
  );
};
