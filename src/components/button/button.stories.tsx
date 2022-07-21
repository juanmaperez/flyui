
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, ButtonProps, ButtonStatus } from '.';

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

const DefaultArgs: Partial<ButtonProps> = {
  children: "Launch Rocket",
  url: "some url"
}

Default.args = DefaultArgs;

export const Loading = Template.bind({});

Loading.args = {
  ...DefaultArgs,
  defaultStatus: ButtonStatus.LOADING
};

export const Disabled = Template.bind({});

Disabled.args = {
  ...DefaultArgs,
  disabled: true
};


export const Error = Template.bind({});

Error.args = {
  ...DefaultArgs,
  defaultStatus: ButtonStatus.ERROR
};

