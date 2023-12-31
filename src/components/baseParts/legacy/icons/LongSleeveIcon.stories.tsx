import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LongSleeveIcon } from "./LongSleeveIcon";

export default {
  title: "BaseParts/Legacy/Icons/LongSleeveIcon",
  component: LongSleeveIcon,
} as ComponentMeta<typeof LongSleeveIcon>;

const Template: ComponentStory<typeof LongSleeveIcon> = () => (
  <LongSleeveIcon />
);

export const Default = Template.bind({});

export const Colored = Template.bind({});
Colored.decorators = [
  (Story) => (
    <div className="w-fit bg-themeGray text-white">
      <Story />
    </div>
  ),
];
