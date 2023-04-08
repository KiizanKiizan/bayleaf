import { TSerialCodesIndexResponse } from "../../../api/serialCodes/TSerialCodesIndexResponse";
import FIRST_CLOTH from "../../../images/icons/cloths/1.svg";
import THIRD_CLOTH from "../../../images/icons/cloths/3.svg";
import FORTH_CLOTH from "../../../images/icons/cloths/4.svg";
import DiagonalLineIcon from "../../../images/icons/diagonal-line.svg";
import { OneShot, withTax } from "../../../models/shared/OneShot";
import { Button } from "../../baseParts/Button";
import { Page } from "../../baseParts/legacy/Page";
import { Typography } from "../../baseParts/legacy/Typography";
import { ScheduleDiagram } from "./ScheduleDiagram";

type TProps = {
  readonly serialCodesIndexData: TSerialCodesIndexResponse[];
  readonly onClickStart: () => void;
};

const campaignIndex = [
  {
    firstTimeOneShotSerialCampaignId: 224,
    campaignWord: "初回キャンペーン!!",
  },
];

export const WelcomePage = ({ serialCodesIndexData, onClickStart }: TProps) => {
  let discontPrice = 0;
  const isTargetCampaign = (campaignId: number) => {
    const targetCampaign = serialCodesIndexData.find(
      (campaign) => campaign.serialCampaignId === campaignId
    );
    if (targetCampaign) {
      discontPrice = targetCampaign.discountPrice;
      return true;
    } else {
      return false;
    }
  };

  return (
    <Page className="flex flex-col h-full min-h-screen justify-between items-center text-themeGray pt-8 px-3 pb-3">
      <Typography size="2xl" className="text-center mb-8">
        単発レンタルを開始する
      </Typography>
      <div className="w-full border-solid border border-themeGray rounded-md bg-clay">
        <div className="bg-themeGray text-clay text-center text-[4vw] py-1">
          料金
        </div>
        {isTargetCampaign(campaignIndex[0].firstTimeOneShotSerialCampaignId) ? (
          <>
            <p className="text-center text-[5vw] mt-5 mb-2">
              <span className="text-[10vw] font-lora line-through">{`¥${OneShot.price.withoutTax}`}</span>
              <br />
              <span className="text-[4vw] line-through">{`(税込 ¥${withTax(
                OneShot.price.withoutTax
              )})`}</span>
            </p>
            <div className="indent-[50%]">
              <span className="font-bold">
                ↓
                <span className="text-red text-xs ml-2">
                  {campaignIndex[0].campaignWord}
                </span>
              </span>
            </div>
            <p className="text-center text-[5vw] mb-5">
              <span className="text-[10vw] font-lora">{`¥${
                OneShot.price.withoutTax - discontPrice
              }`}</span>
              <br />
              <span className="text-[4vw]">{`(税込 ¥${withTax(
                OneShot.price.withoutTax - discontPrice
              )})`}</span>
            </p>
          </>
        ) : (
          <>
            <p className="text-center text-[5vw] my-5">
              <span className="text-[10vw] font-lora">{`¥${OneShot.price.withoutTax}`}</span>
              <br />
              <span className="text-[4vw]">{`(税込 ¥${OneShot.price.withTax})`}</span>
            </p>
          </>
        )}

        <div className="bg-themeGray text-clay text-center text-[4vw] py-1">
          服の枚数
        </div>
        <div className="flex justify-center">
          <div className="w-1/3 flex py-8">
            <img
              src={FORTH_CLOTH}
              alt="cloth-icon"
              className="w-1/3 -mr-4 z-10"
            />
            <img src={FIRST_CLOTH} alt="cloth-icon" className="w-1/3 -mr-2" />
            <img src={THIRD_CLOTH} alt="cloth-icon" className="w-1/3 z-10" />
          </div>
          <p className="text-center text-[5vw] flex justify-center items-center py-5">
            <span>
              <span className="text-[10vw] font-lora">1</span> コーデ
            </span>
            <img
              src={DiagonalLineIcon}
              alt="diagonal-line"
              width="18vw"
              className="mx-1"
            />
            <span>
              <span className="text-[10vw] font-lora">3</span> アイテム
            </span>
          </p>
        </div>
        <div className="bg-themeGray text-clay text-center text-[4vw] py-1">
          レンタル期間
        </div>
        <div className="w-full p-4">
          <ScheduleDiagram />
        </div>
        <div className="bg-themeGray text-clay text-center text-[4vw] py-1">
          ポイント
        </div>
        <p className="text-center text-[5vw] my-5">
          <span className="text-[10vw] font-lora">300</span>ポイント付与
          <br />
          <span className="text-[3vw]">
            *ポイントはアイテム購入にご利用できます
          </span>
        </p>
      </div>
      <Button size="large" className="mt-4" onClick={onClickStart}>
        利用を開始
      </Button>
    </Page>
  );
};
