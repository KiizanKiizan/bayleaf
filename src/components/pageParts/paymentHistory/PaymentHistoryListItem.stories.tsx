import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PaymentHistoryListItem } from "./PaymentHistoryListItem";
export default {
  title: "PageParts/paymentHistory/PaymentHistoryListItem",
  component: PaymentHistoryListItem,
  decorators: [
    (Story) => (
      <div className="m-1 bg-clay p-2">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof PaymentHistoryListItem>;
const Template: ComponentStory<typeof PaymentHistoryListItem> = (args) => (
  <PaymentHistoryListItem {...args} />
);
export const DefaultValues = Template.bind({});
DefaultValues.args = {
  memberPayment: {
    paymentId: "34567876",
    priceTaxIn: 10000,
    point: 30,
    id: 5,
    paymentDate: "2022年5月24日",
    paymentTypeName: "月額利用料金",
    isAvailableReceipt: true,
  },
};
