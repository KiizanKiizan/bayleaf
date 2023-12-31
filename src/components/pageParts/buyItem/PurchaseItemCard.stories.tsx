import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PurchaseItemCard } from "./PurchaseItemCard";

export default {
  title: "resourceParts/item/PurchaseItemCard",
  component: PurchaseItemCard,
  decorators: [
    (Story) => (
      <div className="m-1 bg-clay p-2">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof PurchaseItemCard>;

const Template: ComponentStory<typeof PurchaseItemCard> = (args) => (
  <PurchaseItemCard {...args} />
);

export const DefaultValues = Template.bind({});
DefaultValues.args = {
  imagePaths: {
    defaultPath:
      "https://storage.googleapis.com/bayleaf-stg-uwear.appspot.com/item%20image/large_thumb_IMG_3977.jpeg",
    expandedPath:
      "https://storage.googleapis.com/bayleaf-stg-uwear.appspot.com/item%20image/large_IMG_3977.jpeg",
  },
  brand: "leeap original",
  category: "ジャケット",
  color: "ブラック",
  discountRate: 20,
  point: 864,
  discountedPrice: 12000,
  price: 15000,
  rank: "A",
};

export const WithoutPoint = Template.bind({});
WithoutPoint.args = {
  imagePaths: {
    defaultPath:
      "https://storage.googleapis.com/bayleaf-stg-uwear.appspot.com/item%20image/large_thumb_IMG_3977.jpeg",
    expandedPath:
      "https://storage.googleapis.com/bayleaf-stg-uwear.appspot.com/item%20image/large_IMG_3977.jpeg",
  },
  brand: "leeap original",
  category: "ジャケット",
  color: "ブラック",
  discountRate: 20,
  discountedPrice: 12000,
  price: 15000,
  rank: "A",
};
