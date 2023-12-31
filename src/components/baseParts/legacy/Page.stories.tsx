import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Page } from "./Page";

export default {
  title: "BaseParts/Legacy/Page",
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Default = Template.bind({});
