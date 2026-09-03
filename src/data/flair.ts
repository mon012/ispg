/** The FLAIR philosophy — the organising idea behind everything at ISPG. */

import { cam } from './accreditation';

export type Pillar = {
  letter: string;
  name: string;
  short: string;
  body: string;
  accent: string;
  image: string;
};

export const pillars: Pillar[] = [
  {
    letter: 'F',
    name: 'Future Leadership',
    short: 'Confidence and character to lead with integrity.',
    body:
      'We build the confidence to speak up and the character to do what’s right. Children take real responsibility — for their work, for each other and for the spaces they share.',
    accent: 'var(--flair-future)',
    image: '/media/site/celebrate.webp',
  },
  {
    letter: 'L',
    name: 'Lifelong Learning',
    short: 'A genuine, enduring love of discovery.',
    body:
      'Our Montessori foundation lets children follow their own questions, at their own pace, well past what a fixed timetable would allow. They choose what to explore, and that choice is what makes it stick.',
    accent: 'var(--flair-lifelong)',
    image: '/media/site/one-to-one.webp',
  },
  {
    letter: 'A',
    name: 'Active Living',
    short: 'Healthy bodies, healthy minds, every day.',
    body:
      'Movement is part of every day, not a slot on the timetable. Swimming in our 25-metre pool, sport, climbing and outdoor play build strength and confidence. Active bodies help children focus and learn.',
    accent: 'var(--flair-active)',
    image: '/media/site/swim-joy.webp',
  },
  {
    letter: 'I',
    name: 'International Mindset',
    short: 'Global awareness and open curiosity.',
    body:
      `Our families come from across the world, and ${cam('the Cambridge Curriculum', 'our international curriculum')} brings them together. Children learn to see more than one point of view. They grow genuinely curious about perspectives that are not their own.`,
    accent: 'var(--flair-international)',
    image: '/media/site/pupils-group.webp',
  },
  {
    letter: 'R',
    name: 'Rooted in Nature',
    short: 'Learning connected to our island home.',
    body:
      'Koh Phangan is our classroom without walls. Children learn about ecosystems by standing in them, and grow up treating the island as their responsibility.',
    accent: 'var(--flair-nature)',
    image: '/media/site/campus-aerial-2.webp',
  },
];
