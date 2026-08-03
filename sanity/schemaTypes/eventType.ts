import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (rule) => rule.required().error("Event title is required"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required().error("Slug is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "datetime",
      validation: (rule) => rule.required().error("Event date is required"),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "Optional, for multi-day events",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isVirtual",
      title: "Is Virtual Event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "registrationLink",
      title: "Registration Link",
      type: "url",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
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
      date: "date",
      media: "image",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date set",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Event Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
