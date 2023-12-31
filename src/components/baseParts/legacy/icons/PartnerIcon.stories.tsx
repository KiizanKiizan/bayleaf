import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PartnerIcon } from "./PartnerIcon";

export default {
  title: "BaseParts/Legacy/Icons/PartnerIcon",
  component: PartnerIcon,
} as ComponentMeta<typeof PartnerIcon>;

const Template: ComponentStory<typeof PartnerIcon> = () => <PartnerIcon />;

export const Default = Template.bind({});

export const Colored = Template.bind({});
Colored.decorators = [
  (Story) => (
    <div className="w-fit bg-themeGray text-white">
      <Story />
    </div>
  ),
];
