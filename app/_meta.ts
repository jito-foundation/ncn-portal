import type { MetaRecord } from "nextra";

const meta: MetaRecord = {
  chat: {
    title: "Introduction",
    display: "hidden",
    theme: {
      navbar: false,
    },
  },
  docs: {
    title: "Documentation",
    type: "page",
  },
  blog: {
    title: "Blog",
    type: "page",
  },
  login: {
    title: "AI Assistant",
    theme: {
      navbar: false,
    },
    type: "page",
  },
};

export default meta;
