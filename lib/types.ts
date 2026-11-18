export type TechCategory =
  | "languages"
  | "frameworks"
  | "data"
  | "devops"
  | "quality"
  | "infrastructure";

export type Technology = {
  id: string;
  name: string;
  category: TechCategory;
  /** Short symbol for the periodic table. Leave it out to keep a technology off the table. */
  symbol?: string;
  /** Where the skill comes from when no project used it, e.g. a certification. */
  source?: string;
};

export type ProjectLinks = {
  github?: string;
  demo?: string;
  live?: string;
};

/** Only the overview is required; the page shows whichever other sections are filled in. */
export type CaseStudy = {
  overview: string;
  challenge?: string;
  solution?: string;
  architecture?: string;
  learned?: string;
  stats?: { value: string; label: string }[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  kind: "academic" | "personal";
  /** 1 means a solo project. */
  teamSize: number;
  /** What you personally built. */
  role: string;
  /** Short description for the card. */
  summary: string;
  /** Extra line shown when the card is hovered. */
  highlight: string;
  /** Technology ids from data/technologies.ts. */
  tech: string[];
  /** Colour the background glow turns when this project's card is hovered. */
  color: string;
  image: string;
  imageAlt: string;
  gallery?: { src: string; alt: string; caption: string }[];
  links: ProjectLinks;
  caseStudy?: CaseStudy;
};

export type Job = {
  role: string;
  org: string;
  period: string;
  context: string;
  summary: string;
  current?: boolean;
};

export type Education = { qualification: string; detail: string };

export type Profile = {
  name: string;
  role: string;
  intro: string;
  about: string[];
  availability: string;
  location: string;
  education: Education[];
  certifications: string[];
  myList: string[];
  contact: { email: string; github: string; linkedin?: string };
  cvPath: string;
};
