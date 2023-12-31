import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DropdownMenuAlt } from "./DropdownMenuAlt";

export default {
  title: "BaseParts/Legacy/inputs/DropdownMenuAlt",
  component: DropdownMenuAlt,
} as ComponentMeta<typeof DropdownMenuAlt>;

const Template: ComponentStory<typeof DropdownMenuAlt> = (args) => (
  <DropdownMenuAlt {...args}></DropdownMenuAlt>
);

export const Default = Template.bind({});
const options: string[] = [
  "アウター",
  "トップス",
  "ボトムス",
  "シューズ",
  "バック",
  "帽子",
];
const children = options.map((option) => (
  <option value={option}>{option}</option>
));
Default.args = {
  placeholder: "アイテムのカテゴリを選択",
  children: children,
};
Default.decorators = [
  (Story) => (
    <div className="w-full bg-slate-200 p-3">
      <Story />
    </div>
  ),
];
