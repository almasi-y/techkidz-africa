import { RocketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const programsPageType = defineType({
  name: "programsPage",
  title: "Programs Page Item",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "title",
      title: "Program Title",
      type: "string",
      validation: (rule) => rule.required().error("Program title is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required().error("Description is required"),
    }),
    defineField({
      name: "href",
      title: "Link (href)",
      type: "string",
      description:
        "The URL path for this program (e.g., /programs/web-development)",
      validation: (rule) => rule.required().error("Link is required"),
    }),
    defineField({
      name: "iconName",
      title: "Icon Name",
      type: "string",
      description:
        "Name of the Lucide icon (Code, Shield, Bot, Film, Gamepad2, Monitor)",
      options: {
        list: [
          { title: "Code", value: "Code" },
          { title: "Shield", value: "Shield" },
          { title: "Bot", value: "Bot" },
          { title: "Film", value: "Film" },
          { title: "Gamepad2", value: "Gamepad2" },
          { title: "Monitor", value: "Monitor" },
        ],
      },
      validation: (rule) => rule.required().error("Icon name is required"),
    }),
    defineField({
      name: "isAnimationTraining",
      title: "Is Animation Training",
      type: "boolean",
      description:
        "Check this if this is the Animation Training program (enables SVG upload)",
      initialValue: false,
    }),
    defineField({
      name: "svgImages",
      title: "SVG Images",
      type: "array",
      of: [{ type: "image" }],
      description:
        "Upload SVG images for Animation Training program. Only visible if 'Is Animation Training' is checked.",
      hidden: ({ document }) => !document?.isAnimationTraining,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which programs appear (lower numbers appear first)",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only active programs will be displayed",
      initialValue: true,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Hero image displayed at the top of the program detail page",
    }),
    defineField({
      name: "content",
      title: "Program Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed information about the program (rich text content)",
    }),
    defineField({
      name: "aiContext",
      title: "AI Context (internal — not shown on site)",
      type: "text",
      description:
        "Freeform notes for the chatbot: dates, caveats, or details not yet finalized for public copy. Never rendered on the website — only queried by the AI chatbot.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      isActive: "isActive",
    },
    prepare({ title, subtitle, isActive }) {
      return {
        title: title || "Untitled Program",
        subtitle: `${subtitle?.substring(0, 50)}... ${isActive ? "(Active)" : "(Inactive)"}`,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
