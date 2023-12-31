import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ITEM_TEST_IMAGE_URL } from "../../../images/TestImageUrl";
import { CoordinateItemImages } from "./CoordinateItemImages";

export default {
  title: "BaseParts/Legacy/CoordinateItemImages",
  component: CoordinateItemImages,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as ComponentMeta<typeof CoordinateItemImages>;

const Template: ComponentStory<typeof CoordinateItemImages> = (args) => (
  <CoordinateItemImages {...args} />
);

export const Default = Template.bind({});
const items = [...Array(4)].map(() => {
  return {
    caption: "シャツ",
    imagePaths: {
      defaultPath: ITEM_TEST_IMAGE_URL.largeThumb,
      expandedPath: ITEM_TEST_IMAGE_URL.large,
    },
  };
});

Default.args = {
  items,
};

Default.decorators = [
  (Story) => (
    <div className="w-full bg-slate-200 p-3">
      <Story />
    </div>
  ),
];
