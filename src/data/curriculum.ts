/** Curriculum content. Copy is drawn from the school's own material — the
 *  Key Areas below previously existed only as text inside PNG diagrams. */

export type KeyArea = { name: string; detail?: string };

export type Stage = {
  slug: string;
  name: string;
  ages: string;
  ageRange: [number, number];
  intro: string;
  body: string;
  keyAreasLead: string;
  keyAreas: KeyArea[];
  image: string;
};

export const kindergarten: Stage[] = [
  {
    slug: 'nursery',
    name: 'Nursery',
    ages: 'Ages 2–3',
    ageRange: [2, 3],
    intro:
      'Children begin their Montessori journey in a warm, prepared environment.',
    body:
      'In Nursery, children aged 2 to 3 build curiosity and confidence through hands-on, child-led activities. Daily routines encourage independence and self-assurance, in a prepared environment designed just for them.',
    keyAreasLead:
      'Sensory play and exploration come first. From there, children build early communication, take their first steps into literacy and numeracy, and start discovering the world outdoors.',
    keyAreas: [
      { name: 'Communication & Language' },
      { name: 'Personal, Social & Emotional Development' },
      { name: 'Early Literacy & Numeracy Exploration' },
      { name: 'Imaginative Play & Creative Arts' },
      { name: 'Environmental Discovery & Nature Learning' },
    ],
    image: '/media/site/circle-time.webp',
  },
  {
    slug: 'casa',
    name: 'Casa',
    ages: 'Ages 3–5',
    ageRange: [3, 5],
    intro:
      'Children deepen their learning across five key areas, each progressing at their own pace.',
    body:
      'Casa builds on our Montessori foundation within the Cambridge Curriculum. We balance structured learning with playful exploration to prepare children for Primary. Literacy, numeracy and communication grow through engaging, meaningful activities — alongside emotional wellbeing and curiosity.',
    keyAreasLead:
      'Structured play sits alongside early academics, building toward Key Stage 1. Literacy and numeracy grow next to independence and social skills, so children arrive at Primary ready for the classroom and for each other.',
    keyAreas: [
      { name: 'Literacy', detail: 'Early reading and writing' },
      { name: 'Numeracy', detail: 'Early maths concepts' },
      { name: 'Understanding the World' },
      { name: 'Social-Emotional Development' },
      { name: 'Nature & Outdoor Discovery' },
    ],
    image: '/media/site/one-to-one.webp',
  },
];

export const primary: Stage[] = [
  {
    slug: 'key-stage-1',
    name: 'Key Stage 1',
    ages: 'Ages 5–8',
    ageRange: [5, 8],
    intro: 'Building independence, curiosity and core skills.',
    body:
      'In Key Stage 1, children move into more structured learning without losing the fun. Lessons are interactive and inquiry-based, connecting knowledge across subjects. Children build strong foundations and take real ownership of their learning.',
    keyAreasLead:
      'Eight subjects, one hands-on approach — English and Mathematics sit alongside Science, Humanities, Creativity, Vitality, Wellbeing and Innovation, each taught through activities children can touch and test, not just read about.',
    keyAreas: [
      { name: 'English', detail: 'Reading, Writing, Phonics, Speaking & Listening' },
      { name: 'Mathematics', detail: 'Problem-solving, Number sense, Reasoning' },
      { name: 'Science', detail: 'Investigation, Observation and Experimentation' },
      { name: 'Humanities', detail: 'History, Geography, Global Understanding' },
      { name: 'Creativity', detail: 'Expressive Arts, Music, Drama' },
      { name: 'Vitality', detail: 'Physical Education & Sport' },
      { name: 'Wellbeing', detail: 'Mindfulness & Emotional Regulation' },
      { name: 'Innovation', detail: 'Computing & Digital Literacy' },
    ],
    image: '/media/site/pupils-line.webp',
  },
  {
    slug: 'key-stage-2',
    name: 'Key Stage 2',
    ages: 'Ages 8–11',
    ageRange: [8, 11],
    intro: 'Deepening knowledge, critical thinking and global awareness.',
    body:
      'In Key Stage 2, children build on the skills they have already gained. Learning grows more rigorous, and children think critically, work independently and apply knowledge to real-world problems. Independence, leadership and responsibility grow both inside and outside the classroom.',
    keyAreasLead:
      'The same eight subjects continue, but the work gets harder — project-based learning that asks children to apply what they know, lead in the classroom and think beyond Koh Phangan, ahead of secondary school.',
    keyAreas: [
      { name: 'English', detail: 'Advanced Reading, Writing, Speaking & Listening' },
      { name: 'Mathematics', detail: 'Problem-solving, Mental Maths, Data Handling' },
      { name: 'Science', detail: 'Scientific Method, Inquiry-Based Investigations' },
      { name: 'Humanities', detail: 'History, Geography, Global Understanding' },
      { name: 'Creativity', detail: 'Expressive Arts, Music, Drama' },
      { name: 'Vitality', detail: 'Physical Education & Sport' },
      { name: 'Wellbeing', detail: 'Emotional Intelligence, Stress Management, Positive Habits' },
      { name: 'Innovation', detail: 'Computing & Digital Literacy' },
    ],
    image: '/media/site/active.webp',
  },
];

/** The four Montessori principles that shape the Early Years rooms. */
export const montessoriPrinciples = [
  {
    title: 'Child-Led Learning',
    body: 'Children pick their own activities based on what they enjoy and want to learn.',
  },
  {
    title: 'The Prepared Environment',
    body: 'Classrooms are organised with purpose-built materials so children can learn and practise by themselves.',
  },
  {
    title: 'Vertical Grouping',
    body: 'Different ages learn together, letting younger children learn from older ones who lead.',
  },
  {
    title: 'Respect for the Individual',
    body: 'Every child learns at their own speed, with support for their specific needs.',
  },
];

/** The one connected journey, Nursery to Key Stage 2. */
export const pathway = [
  { stage: 'Nursery', ages: 'Ages 2–3', href: '/academics/kindergarten/#nursery', image: '/media/site/portrait.webp' },
  { stage: 'Casa', ages: 'Ages 3–5', href: '/academics/kindergarten/#casa', image: '/media/site/pupils.webp' },
  { stage: 'Key Stage 1', ages: 'Ages 5–8', href: '/academics/primary/#key-stage-1', image: '/media/site/pupils-2.webp' },
  { stage: 'Key Stage 2', ages: 'Ages 8–11', href: '/academics/primary/#key-stage-2', image: '/media/site/pupils-3.webp' },
];
