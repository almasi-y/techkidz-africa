import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const JOB_TYPES = [
  { title: "Full-time", value: "full-time" },
  { title: "Part-time", value: "part-time" },
  { title: "Contract", value: "contract" },
  { title: "Internship", value: "internship" },
  { title: "Volunteer", value: "volunteer" },
  { title: "Attachment", value: "attachment" },
];

export const careerType = defineType({
  name: "career",
  title: "Career",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required().error("Job title is required"),
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
      title: "Job Description",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }) => document?.type === "attachment",
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ document }) => document?.type === "attachment",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ document }) => document?.type === "attachment",
    }),
    defineField({
      name: "openTo",
      title: "Open To",
      description:
        "Who this attachment is open to (shown for Attachment type only)",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ document }) => document?.type !== "attachment",
    }),
    defineField({
      name: "growthOpportunities",
      title: "Growth Opportunities",
      description:
        "Growth opportunities for this attachment (shown for Attachment type only)",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ document }) => document?.type !== "attachment",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Mombasa, Kenya",
    }),
    defineField({
      name: "type",
      title: "Job Type",
      type: "string",
      options: {
        list: JOB_TYPES,
        layout: "radio",
      },
    }),
    defineField({
      name: "deadline",
      title: "Application Deadline",
      type: "date",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
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
      type: "type",
    },
    prepare({ title, type }) {
      return {
        title,
        subtitle: type || "",
      };
    },
  },
});
