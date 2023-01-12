import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ITEM_TEST_IMAGE_URL } from "../../../images/TestImageUrl";
import { ItemCard } from "../../resourceParts/item/ItemCard";
import { SelectWrapper } from "./SelectWrapper";
export default {
  title: "baseParts/wrapper/SelectWrapper",
  component: SelectWrapper,
  argTypes: {
    onClick: { action: "clicked" },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center bg-clay gap-3 py-10">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof SelectWrapper>;

const Template: ComponentStory<typeof SelectWrapper> = (args) => (
  <SelectWrapper {...args} />
);
const itemCard = {
  imagePaths: {
    defaultPath: ITEM_TEST_IMAGE_URL.largeThumb,
    expandedPath: ITEM_TEST_IMAGE_URL.large,
  },
  categoryName: "シャツ",
  colorName: "オレンジ",
};

export const Default = Template.bind({});
Default.args = {
  visible: false,
  children: (
    <ItemCard
      key={1}
      imagePaths={{
        defaultPath: itemCard.imagePaths.defaultPath,
        expandedPath: itemCard.imagePaths.expandedPath,
      }}
      categoryName={itemCard.categoryName}
      colorName={itemCard.colorName}
      id={1}
      price={12000}
      originPrice={15000}
      discountRate={20}
      selectedItems={[]}
      selectItem={() => {}}
    />
  ),
};

Default.decorators = [
  (Story) => (
    <>
      <Story />
      <Story />
      <Story />
    </>
  ),
];
