/** Single source of truth for school details, navigation and third-party embeds. */

import { cam } from './accreditation';

export const site = {
  name: 'International School of Phangan',
  shortName: 'ISPG',
  legalName: 'International School Of Pha Ngan',
  tagline: `${cam('A Cambridge education', 'An international education')} that develops the whole child`,
  description:
    `ISPG is ${cam('a Cambridge Curriculum international school', 'an international curriculum school')} on Koh Phangan for children aged 2 to 11 — Montessori foundations, English-medium teaching and a whole-child approach guided by our FLAIR philosophy.`,
  url: 'https://ispg.ac.th',
} as const;

export const contact = {
  address: {
    street: '53/14 Moo 1',
    locality: 'Ban Tai, Koh Phangan',
    region: 'Surat Thani',
    postcode: '84280',
    country: 'Thailand',
    get full() {
      return `${this.street}, ${this.locality}, ${this.region} ${this.postcode}, ${this.country}`;
    },
  },
  email: 'admissions@ispg.ac.th',
  /** Display form, local Thai convention. */
  phoneDisplay: '+66 84-281-8555',
  /** E.164 — the trunk zero is dropped after the country code. */
  phoneHref: 'tel:+66842818555',
  /** wa.me takes digits only, no plus, no trunk zero. */
  whatsapp: 'https://wa.me/66842818555',
  whatsappDisplay: '+66 84-281-8555',
  line: 'https://lin.ee/HbGn7Z0',
  /** Exact embed URL preserved from the previous site — the `pb` parameter is
   *  a signed blob and cannot be hand-edited. */
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7865.524025702295!2d100.019593!3d9.701342!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b00b92c2c6c882d%3A0x292a2e1973a95269!2sInternational%20School%20Of%20Pha%20Ngan!5e0!3m2!1sen!2sth!4v1770785365143!5m2!1sen!2sth',
  mapLink: 'https://maps.google.com/?q=International+School+Of+Pha+Ngan,+Koh+Phangan',
} as const;

export const social = [
  { name: 'Facebook', href: 'https://facebook.com/ispgschool', icon: 'facebook' },
  { name: 'Instagram', href: 'https://instagram.com/ispg_school', icon: 'instagram' },
  { name: 'YouTube', href: 'https://youtube.com/@ispgschool', icon: 'youtube' },
  { name: 'WhatsApp', href: contact.whatsapp, icon: 'whatsapp' },
  { name: 'LINE', href: contact.line, icon: 'line' },
] as const;

/** Third-party embeds carried over from the WordPress site. */
export const embeds = {
  /** Gumlet-hosted school film, preserved from the migration. */
  schoolFilm: '69a1148caf2815c95613a1df',
  openHouseFilm: '69882fdb924a60df4b2fbf06',
  blueDolphinsFilm: '699fdf13ba6c1c14db2c3cc9',
  /** Deftform form ids. */
  applicationForm: '1cb36d6d-c2d9-4b80-b3e3-23d74b4cf44a',
  openHouseForm: 'e2a931b0-7aca-4c4a-acdc-88b93acbf836',
  blueDolphinsTrialForm: 'fe7e00f1-0931-4c67-8777-e592f1646c24',
  /** The school calendar is the single source of truth for term dates & events. */
  googleCalendarSrc: 'en.th%23holiday%40group.v.calendar.google.com',
  schoolProfile:
    'https://www.canva.com/design/DAHBBlLQR8s/TrI2cBE9EyrxW1qGBjHf2w/view',
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About Us', href: '/about/', note: 'Who we are and where we are' },
      { label: 'Our FLAIR Approach', href: '/flair/', note: 'The five commitments' },
      { label: 'Our Teachers', href: '/our-teachers/', note: 'Meet the people' },
      { label: 'School Life', href: '/school-life/', note: 'Campus, food, facilities' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics/',
    children: [
      { label: 'Academics Overview', href: '/academics/', note: 'The whole pathway, 2 to 11' },
      { label: 'Kindergarten', href: '/academics/kindergarten/', note: 'Nursery & Casa, ages 2–5' },
      { label: 'Primary', href: '/academics/primary/', note: 'Key Stage 1 & 2, ages 5–11' },
    ],
  },
  {
    label: 'Admission',
    href: '/admission/',
    children: [
      { label: 'How to Apply', href: '/admission/', note: 'Six steps to joining' },
      { label: 'School Fees', href: '/fees/', note: 'Tuition, bus and support' },
      // Hidden until the school approves the calendar publicly — restore this line to show it again.
      // { label: 'School Calendar', href: '/calendar/', note: 'Term dates and events' },
    ],
  },
];

export const footerNav = [
  {
    heading: 'Explore',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'Our FLAIR Approach', href: '/flair/' },
      { label: 'School Life', href: '/school-life/' },
      { label: 'Our Teachers', href: '/our-teachers/' },
      { label: 'News & Events', href: '/blog/' },
    ],
  },
  {
    heading: 'Learning',
    links: [
      { label: 'Academics', href: '/academics/' },
      { label: 'Kindergarten', href: '/academics/kindergarten/' },
      { label: 'Primary', href: '/academics/primary/' },
      { label: 'Blue Dolphins', href: '/blue-dolphins/' },
    ],
  },
  {
    heading: 'Admissions',
    links: [
      { label: 'How to Apply', href: '/admission/' },
      { label: 'School Fees', href: '/fees/' },
      // Hidden until the school approves the calendar publicly — restore this line to show it again.
      // { label: 'School Calendar', href: '/calendar/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms & Conditions', href: '/terms/' },
];

/** Staff-only Google Sites workspace. It is not part of the parent-facing
 *  navigation, so it sits with the utility links at the very bottom of the
 *  footer — findable by the people who need it, out of the way of everyone
 *  else. Opens in its own tab because it is a separate application. */
export const staffPortal = {
  label: 'Teachers Portal',
  href: 'https://sites.google.com/ispg.ac.th/teachers/home',
};
