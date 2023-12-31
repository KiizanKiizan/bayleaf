import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Divider } from "./Divider";

export default {
  title: "BaseParts/Legacy/Divider",
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);

export const Default = Template.bind({});
