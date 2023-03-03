import { Button } from "../../baseParts/Button";
import { Typography } from "../../baseParts/legacy/Typography";

type TProps = {
  memberPayment: TMemberPayment;
  onClickReceiptButton: (memberPaymentId: number) => void;
};

export const PaymentHistoryListItem = ({
  memberPayment,
  onClickReceiptButton,
}: TProps) => {
  return (
    <div className="bg-white flex justify-self-start items-center h-12 mb-1">
      <div className="basis-1/4">
        <Typography color="strong-gray" size="xs">
          {memberPayment.paymentDate}
        </Typography>
      </div>
      <div className="basis-1/4">
        <Typography color="strong-gray" size="xs">
          {memberPayment.paymentTypeName}
        </Typography>
      </div>
      <div className="basis-1/4">
        <Typography color="strong-gray" size="xs">
          {memberPayment.priceTaxIn.toLocaleString()}円
        </Typography>
      </div>
      <div className="basis-1/4">
        {memberPayment.isAvailableReceipt ? (
          <Button
            onClick={() => onClickReceiptButton(memberPayment.id)}
            variant="line"
            size="small"
          >
            <Typography color="strong-gray" className="text-[1px]">
              領収書を発行
            </Typography>
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
