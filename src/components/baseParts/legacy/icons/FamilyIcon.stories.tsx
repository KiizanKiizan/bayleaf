import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FamilyIcon } from "./FamilyIcon";

export default {
  title: "BaseParts/Legacy/Icons/FamilyIcon",
  component: FamilyIcon,
} as ComponentMeta<typeof FamilyIcon>;

const Template: ComponentStory<typeof FamilyIcon> = () => <FamilyIcon />;

export const Default = Template.bind({});

export const Colored = Template.bind({});
Colored.decorators = [
  (Story) => (
    <div className="w-fit bg-themeGray text-white">
      <Story />
    </div>
  ),
];
