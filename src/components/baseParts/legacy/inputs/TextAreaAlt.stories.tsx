import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextAreaAlt } from "./TextAreaAlt";

export default {
  title: "BaseParts/Legacy/Inputs/TextAreaAlt",
  component: TextAreaAlt,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as ComponentMeta<typeof TextAreaAlt>;

const Template: ComponentStory<typeof TextAreaAlt> = (args) => (
  <TextAreaAlt {...args} />
);

export const Default = Template.bind({});
Default.decorators = [
  (Story) => (
    <div className="w-full bg-slate-200 p-3">
      <Story />
    </div>
  ),
];
