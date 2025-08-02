import LnlAgent from ".";
import { AgentStatus } from "../..";


export default {
  title: "MyComponents/LnlAgent",
  component: LnlAgent,
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
    status:{
        description:"agent status",
        control:{
            type:AgentStatus
        }
    }
  },
};

export const PageOne = {
  args: {
    text: " agent agent It is a testsssss It is a test It is a test It is a test It is a test",
    showSpeed:150,
    status:AgentStatus.THINK
  },
};
