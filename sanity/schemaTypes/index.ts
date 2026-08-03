import type { SchemaTypeDefinition } from "sanity";

import { postType } from "./postType";
import { eventType } from "./eventType";
import { careerType } from "./careerType";
import { careerApplicationType } from "./careerApplicationType";
import { learningInstitutionType } from "./learningInstitutionType";
import { courseType } from "./courseType";
import { industrialAttachmentType } from "./industrialAttachmentType";
import { teamMemberType } from "./teamMemberType";
import { partnerType } from "./partnerType";
import { heroImageType } from "./heroImageType";
import { eventsHeroImageType } from "./eventsHeroImageType";
import { programsHeroImageType } from "./programsHeroImageType";
import { programsPageType } from "./programsPageType";
import { programItemType } from "./programItemType";
import { impactHeroImageType } from "./impactHeroImageType";
import { impactStatType } from "./impactStatType";
import { testimonialType } from "./testimonialType";
import { projectType } from "./projectType";
import { projectsHeroImageType } from "./projectsHeroImageType";
import { contactHeroImageType } from "./contactHeroImageType";
import { pageViewType } from "./pageViewType";
import { chatSessionType } from "./chatSessionType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Blog
    postType,
    // Core content
    eventType,
    careerType,
    careerApplicationType,
    // Education
    learningInstitutionType,
    courseType,
    // Applications
    industrialAttachmentType,
    // Organization
    teamMemberType,
    partnerType,
    // Homepage
    heroImageType,
    // Events Page
    eventsHeroImageType,
    // Programs Page
    programsHeroImageType,
    programsPageType,
    programItemType,
    // Impact Page
    impactHeroImageType,
    impactStatType,
    testimonialType,
    // Projects Page
    projectType,
    projectsHeroImageType,
    // Contact Page
    contactHeroImageType,
    // Analytics
    pageViewType,
    chatSessionType,
  ],
};
