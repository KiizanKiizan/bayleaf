import FIRST_CLOTH from "../../../images/icons/cloths/1.svg";
import THIRD_CLOTH from "../../../images/icons/cloths/3.svg";
import FORTH_CLOTH from "../../../images/icons/cloths/4.svg";
import DiagonalLineIcon from "../../../images/icons/diagonal-line.svg";
import { Button } from "../../baseParts/Button";
import { Page } from "../../baseParts/legacy/Page";
import { Typography } from "../../baseParts/legacy/Typography";
import { ScheduleDiagram } from "./ScheduleDiagram";

type TProps = {
  readonly onClickStart: () => void;
};

export const WelcomePage = ({ onClickStart }: TProps) => {
  return (
    <Page className="flex flex-col h-full min-h-screen justify-between items-center text-themeGray pt-8 px-3 pb-3">
      <Typography size="2xl" className="text-center mb-8">
        単発レンタルを開始する
      </Typography>
      <div className="w-full border-solid border border-themeGray rounded-md bg-clay">
        <div className="bg-themeGray text-clay text-center text-[4vw] py-1">
          料金
        </div>
        <p className="text-center text-[5vw] my-5">
          <span className="text-[10vw] font-lora">¥4980</span>
          <br />
          <span className="text-[4vw]">(税込 ¥5478)</span>
        </p>
        <div className="bg-themeGray text-clay text-center text-[4vw] py-1">
          レンタル期間
        </div>
        <div className="w-full p-4">
          <ScheduleDiagram />
        </div>
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
          ポイント
        </div>
        <p className="text-center text-[5vw] my-5">
          <span className="text-[10vw] font-lora">300</span>ポイント付与
          <br />
          <span className="text-[4vw]">
            *ポイントはアイテム購入にご利用できます
          </span>
        </p>
        <div className="bg-themeGray text-clay text-center text-[4vw] py-1">
          決済タイミング
        </div>
        <p className="text-center text-[5vw] my-5">コーデを出荷時に決済</p>
      </div>
      <Button size="large" className="mt-4" onClick={onClickStart}>
        利用を開始
      </Button>
    </Page>
  );
};