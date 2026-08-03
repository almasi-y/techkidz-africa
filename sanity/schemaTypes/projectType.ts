import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required().error("Project title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required().error("Slug is required"),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().error("Description is required"),
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true },
      description: "Image displayed on the project card in the listing page",
      validation: (rule) => rule.required().error("Card image is required"),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Hero image displayed at the top of the project detail page",
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      description:
        "Add multiple sections with badges, titles, descriptions, and images for the TracingBeam layout",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          fields: [
            defineField({
              name: "badge",
              title: "Badge",
              type: "string",
              description:
                "Small badge/tag text (e.g., 'Phase 1', 'Development')",
            }),
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "content",
              title: "Section Content",
              type: "array",
              of: [{ type: "block" }],
            }),
            defineField({
              name: "image",
              title: "Section Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "title",
              badge: "badge",
              media: "image",
            },
            prepare({ title, badge, media }) {
              return {
                title: title || "Untitled Section",
                subtitle: badge || "",
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which projects appear (lower numbers appear first)",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only active projects will be displayed",
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
      media: "cardImage",
      isActive: "isActive",
    },
    prepare({ title, subtitle, media, isActive }) {
      return {
        title: title || "Untitled Project",
        subtitle: `${subtitle?.substring(0, 50)}... ${isActive ? "(Active)" : "(Inactive)"}`,
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
  ],
});
