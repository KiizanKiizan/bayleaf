import liff from "@line/liff/dist/lib";
import { TMemberSizeOptionsIndexResponse } from "../../api/memberSizeOptions/useMemberSizeOptionsIndex";
import { useMemberSizesCreate } from "../../api/memberSizes/useMemberSizesCreate";
import { AlertDialog } from "../../components/baseParts/dialogs/AlertDialog";
import { CheckIcon } from "../../components/baseParts/icons/CheckIcon";
import { ErrorPage } from "../../components/baseParts/pages/ErrorPage";
import { HearingAboutSizeConfirm } from "../../components/resourceParts/hearing/HearingAboutSizeConfirm";
import { HearingAboutSizeStart } from "../../components/resourceParts/hearing/HearingAboutSizeStart";
import { HearingSelectForm } from "../../components/resourceParts/hearing/HearingSelectForm";
import { MemberImageUploader } from "../../components/resourceParts/hearing/MemberImageUploader";
import { useImageUploadHandler } from "../../hooks/handler/image/useImageUploadHandler";
import { useFormHandler } from "./handler/useFormHandler";

type TProps = {
  memberId: number;
  memberSizeOptions: TMemberSizeOptionsIndexResponse;
};

export const SizeFormsContainer = ({ memberId, memberSizeOptions }: TProps) => {
  const { mutate, isLoading, error, isSuccess } = useMemberSizesCreate({
    memberId,
  });

  const {
    step,
    tops,
    bottoms,
    shoulder,
    waist,
    hip,
    bust,
    getFormProps,
    handleStep,
    handleCancelImageUpload,
  } = useFormHandler({ memberSizeOptions });

  const { imageFileName, imageData, preUploadImage, handleChangeFile } =
    useImageUploadHandler();

  if (error) return <ErrorPage message={error.message} />;

  switch (step) {
    case "start":
      return <HearingAboutSizeStart onClick={() => handleStep("tops")} />;
    case "tops":
    case "bottoms":
    case "shoulder":
    case "waist":
    case "hip":
    case "bust":
      return <HearingSelectForm {...getFormProps()} />;
    case "imageInput":
      return (
        <MemberImageUploader
          onClickNext={() => handleStep("confirm")}
          onSubmit={() => handleStep("confirm")}
          onCancel={handleCancelImageUpload}
          imageFileName={imageFileName}
          imageData={imageData}
          preUploadImage={preUploadImage}
          handleChangeFile={handleChangeFile}
        />
      );

    case "confirm":
      return (
        <>
          <HearingAboutSizeConfirm
            topsChoice={
              memberSizeOptions.tops.find((t) => t.id === tops)?.name!
            }
            bottomsChoice={
              memberSizeOptions.bottoms.find((t) => t.id === bottoms)?.name!
            }
            waistChoice={
              memberSizeOptions.waists.find((t) => t.id === waist)?.name!
            }
            shoulderChoice={
              memberSizeOptions.shoulders.find((t) => t.id === shoulder)?.name!
            }
            hipChoice={memberSizeOptions.hips.find((t) => t.id === hip)?.name!}
            bustChoice={
              memberSizeOptions.busts.find((t) => t.id === bust)?.name!
            }
            imageSrc={preUploadImage!}
            isLoading={isLoading}
            onSubmit={() => {
              if (!(tops && bottoms && shoulder && waist && hip && bust)) {
                throw new Error("サイズが選択されていません");
              }
              mutate({
                tops,
                bottoms,
                shoulder,
                waist,
                hip,
                bust,
                image:
                  imageData && imageFileName
                    ? { imageData, imageFileName }
                    : undefined,
              });
            }}
            onClickBack={() => handleStep("imageInput")}
          />
          <AlertDialog
            open={isSuccess}
            title={"サイズを登録しました！"}
            description={<CheckIcon />}
            onClick={() => liff.closeWindow()}
            onClose={() => liff.closeWindow()}
            okBtnText="閉じる"
          />
        </>
      );
    default:
      throw new Error("stepが不正です");
  }
};
