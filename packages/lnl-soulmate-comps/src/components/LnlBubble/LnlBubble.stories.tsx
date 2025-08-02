import LnlBubble from ".";

export default {
  title: "MyComponents/LnlBubble",
  component: LnlBubble,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      description: "bubble content",
      control: {
        type: "text",
      },
    },
    showSpeed: {
      description: "bubble speed",
      control: {
        type: "number",
      },
    },
  },
};

export const PageOne = {
  args: {
    text: "It is a testsssss It is a test It is a test It is a test It is a test",
  },
};
