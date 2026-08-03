import { RocketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const programItemType = defineType({
  name: "programItem",
  title: "Program Item/Module",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "program",
      title: "Program",
      type: "reference",
      to: [{ type: "programsPage" }],
      description: "The program this item belongs to",
      validation: (rule) => rule.required().error("Program is required"),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of the program item/module",
      validation: (rule) => rule.required().error("Title is required"),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      description: "Brief description shown on the card (keep it short)",
      validation: (rule) => rule.required().error("Description is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Image displayed on the card",
      validation: (rule) => rule.required().error("Image is required"),
    }),
    defineField({
      name: "content",
      title: "Detailed Content",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Detailed content shown when the card is expanded (rich text)",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      description:
        "Text for the call-to-action button (e.g., 'Learn More', 'Register', 'Visit')",
      initialValue: "Learn More",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "url",
      description: "URL for the call-to-action button",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which items appear (lower numbers appear first)",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only active items will be displayed",
      initialValue: true,
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
      programTitle: "program.title",
      isActive: "isActive",
      media: "image",
    },
    prepare({ title, subtitle, programTitle, isActive, media }) {
      return {
        title: title || "Untitled Item",
        subtitle: `${programTitle || "No Program"} - ${subtitle?.substring(0, 50)}... ${isActive ? "(Active)" : "(Inactive)"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Program, then Order",
      name: "programOrder",
      by: [
        { field: "program.title", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
