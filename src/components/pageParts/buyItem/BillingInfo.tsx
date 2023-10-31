import { Typography } from "../../baseParts/legacy/Typography";

type TProps = {
  price: number;
  totalSellingPrice: number;
  allSelectedDiscountPrice?: number;
  totalDiscountedPrice: number;
  grantedPoint: number;
  possesedPoint: number;
  selectedPoint: number;
  onChange: (selectedPoint: number) => void;
};

export const BillingInfo = ({
  price,
  totalSellingPrice,
  allSelectedDiscountPrice,
  totalDiscountedPrice,
  grantedPoint,
  possesedPoint,
  selectedPoint,
  onChange,
}: TProps) => {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex items-center border-b-[1px] border-dashed py-8 text-right">
        <div className="w-1/2">
          <Typography size="sm" color="gray">
            参考価格
          </Typography>
          <Typography size="sm" color="gray">
            UWear割引
          </Typography>
          {allSelectedDiscountPrice && (
            <div data-testid="BillingInfoAllSelectedDiscountPriceLabel">
              <Typography size="sm" color="gray">
                全購入10%OFF
              </Typography>
            </div>
          )}
          <Typography color="strong-gray" weight="bold">
            アイテム合計
          </Typography>
        </div>
        <div className="w-1/2 pr-6">
          <Typography size="sm" className="line-through" color="gray">
            ¥{price.toLocaleString()}
          </Typography>
          <Typography size="sm" color="red">
            -¥{(price - totalSellingPrice).toLocaleString()}
          </Typography>
          {allSelectedDiscountPrice && (
            <div data-testid="BillingInfoAllSelectedDiscountPrice">
              <Typography size="sm" color="red">
                -¥{allSelectedDiscountPrice.toLocaleString()}
              </Typography>
            </div>
          )}
          <Typography color="strong-gray" weight="bold">
            ¥{totalDiscountedPrice.toLocaleString()}
          </Typography>
        </div>
      </div>

      <div className="flex border-b-[1px] border-dashed py-8">
        <Typography className="w-1/2 text-right" color="strong-gray">
          ポイントを利用する
        </Typography>
        <div className="w-1/2 pr-6">
          <Typography className="text-right" color="strong-gray">
            <input
              className="mr-0.5 w-1/2 rounded border text-right"
              value={selectedPoint.toString()}
              type="number"
              onChange={(e) => onChange(Number(e.target.value))}
            />
            pt
          </Typography>
          <Typography className="text-right leading-5" size="xs" color="strong-gray">
            ({possesedPoint.toLocaleString()}pt利用可能)
          </Typography>
        </div>
      </div>

      <div className="flex border-b-[1px] border-dashed py-8 text-right ">
        <Typography className=" w-1/2" color="strong-gray">
          ご請求額
        </Typography>
        <Typography className="w-1/2 pr-6" color="strong-gray">
          ¥{(totalDiscountedPrice - selectedPoint).toLocaleString()}
        </Typography>
      </div>

      <div className="flex border-b-[1px] border-dashed py-8 text-right">
        <Typography className="w-1/2" color="strong-gray">
          付与ポイント
        </Typography>
        <Typography className="w-1/2 pr-6" color="strong-gray">
          {grantedPoint.toLocaleString()}pt
        </Typography>
      </div>
    </div>
  );
};
