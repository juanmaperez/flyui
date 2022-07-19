
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, ButtonProps } from '.';

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
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = DefaultArgs;

export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Loading.args = {
  ...DefaultArgs,
  isLoading: true
};

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
  ...DefaultArgs,
  disabled: true
};


export const Error = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
  ...DefaultArgs,
  isLoading: true,
  isError: true
};

