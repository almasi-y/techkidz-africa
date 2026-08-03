import { defineField, defineType } from "sanity";
import { TrendingUp } from "lucide-react";

export const impactStatType = defineType({
  name: "impactStat",
  title: "Impact Stat",
  type: "document",
  icon: TrendingUp,
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "The stat value (e.g., '10,000+', '500+')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "The stat label (e.g., 'Youth Reached', 'Jobs Created')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "Small paragraph description shown below the stat (e.g., 'Our state of the art collab tool of the century with max benefits.')",
    }),
    defineField({
      name: "iconName",
      title: "Icon Name",
      type: "string",
      options: {
        list: [
          { title: "Projects", value: "Projects" },
          { title: "Learners", value: "Learners" },
          { title: "Mentors", value: "Mentors" },
          { title: "Kenya County", value: "KenyaCounty" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which stats appear (lower numbers appear first)",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only active stats will be displayed",
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
      value: "value",
      label: "label",
      isActive: "isActive",
    },
    prepare({ value, label, isActive }) {
      return {
        title: `${value} - ${label}`,
        subtitle: isActive ? "Active" : "Inactive",
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
