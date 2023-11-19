export const taskSchema = {
  title: "Task 1",
  version: 0,
  type: "object",
  primaryKey: "title",
  properties: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
      primary: true,
      maxLength: 255,
    },

    checklist: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          completed: { type: "boolean" },
        },
      },
      default: [],
    },
  },
  required: ["title"],
};
