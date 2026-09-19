/**
 * Staff directory — the ISPG founding team, sourced from
 * https://teachers.ispg.ac.th/ (the school's own staff microsite).
 *
 * Photos live in `src/assets/media/teachers/`: `*-portrait.webp` for the grid
 * thumbnail, `*-hero.webp` (or the single portrait, where only one was
 * supplied) for the modal.
 *
 * An entry with a `bio` opens a modal; one without renders as a plain card
 * with just the photo, name and role — that's how newly joined staff appear
 * until their profile is written. Add entries here in the same shape and the
 * page needs no other change.
 */

import { cam } from './accreditation';

export type Teacher = {
  id: string;
  name: string;
  role: string;
  department: Department;
  photo: string;
  /** Profile fields are optional: staff whose full profile hasn't been
      written yet render as a plain, unclickable card in the grid. */
  photoHero?: string;
  bio?: string;
  quote?: string;
  quoteLabel?: string;
  facts?: { label: string; value: string }[];
};

export type Department = 'Leadership' | 'Primary' | 'Specialist';

export const departments: Department[] = ['Leadership', 'Primary', 'Specialist'];

export const principalQuote = {
  text: 'When we nurture a child’s natural curiosity in a safe, nature-infused environment, they develop the confidence, resilience and independence to achieve more than they ever imagined.',
  attribution: 'Mr. Cedric',
  organisation: 'Principal, International School of Phangan',
};

export const teachers: Teacher[] = [
  {
    id: 'cedric',
    name: 'Mr. Cedric',
    role: 'Principal',
    department: 'Leadership',
    photo: '/media/teachers/cedric-portrait.webp',
    photoHero: '/media/teachers/cedric-hero.webp',
    bio: `Over 25 years of international educational experience in senior leadership, vice principalship and early childhood management across Thailand, China and Europe. Cedric is dedicated to bridging child-centred independence (Montessori) with structured academic rigour ${cam('(the Cambridge International Curriculum)', '(an international curriculum)')} to empower the whole child, and is building a nature-rooted, progressive school community here on Koh Phangan.`,
    quote: 'When we nurture a child’s natural curiosity in a safe, nature-infused environment, they develop the confidence, resilience and independence to achieve more than they ever imagined.',
    quoteLabel: 'My philosophy is simple',
    facts: [
      { label: 'Favourite book', value: 'The Secret of Childhood by Maria Montessori' },
      { label: 'Favourite hobbies', value: 'Gym workouts, tennis, swimming, tropical trails and reading' },
      { label: 'Fun fact', value: 'Certified tennis coach and infant swimming instructor' },
      { label: 'Also enjoys', value: 'AI video production, painting and time with his dog, Roxy' },
    ],
  },
  {
    id: 'ian-foster',
    name: 'Ian Foster',
    role: 'Head Teacher',
    department: 'Leadership',
    photo: '/media/teachers/ian-foster.webp',
    photoHero: '/media/teachers/ian-foster.webp',
    bio: `Born and raised in Birmingham, England, Ian brings over 19 years of teaching and leadership experience across the UK, Asia and the Middle East. Having worked with ${cam('both the English National Curriculum and Cambridge International programmes', 'both the English National Curriculum and international programmes')}, he is passionate about creating schools where children feel safe, challenged and inspired to achieve their very best.`,
    quote: 'Happy staff create happy pupils, and happy pupils create happy parents.',
    quoteLabel: 'Ian’s philosophy',
    facts: [
      { label: 'Favourite book', value: 'The Hitchhiker’s Guide to the Galaxy' },
      { label: 'Favourite hobby', value: 'Photography — capturing beautiful views and memorable moments' },
      { label: 'Football fan', value: 'Follows every match and shares the excitement of football' },
      { label: 'Also enjoys', value: 'Movies and gaming, with a competitive spirit' },
    ],
  },
  {
    id: 'chanya',
    name: 'Ms. Chanya',
    role: 'Head of Admissions',
    department: 'Leadership',
    photo: '/media/teachers/chanya-portrait.webp',
  },
  {
    id: 'gwennaelle',
    name: 'Gwennaelle Marchand',
    role: 'Kindergarten Teacher',
    department: 'Primary',
    photo: '/media/teachers/gwennaelle-portrait.webp',
  },
  {
    id: 'seema',
    name: 'Seema Amjad',
    role: 'Kindergarten Teacher',
    department: 'Primary',
    photo: '/media/teachers/seema-portrait.webp',
  },
  {
    id: 'christine-prinsloo',
    name: 'Christine Prinsloo',
    role: 'Homeroom Teacher, Year 1',
    department: 'Primary',
    photo: '/media/teachers/christine-portrait.webp',
    photoHero: '/media/teachers/christine-portrait.webp',
    bio: 'Originally from South Africa, Christine brings almost seven years of experience teaching in the Foundation Phase. She is passionate about differentiated teaching and believes every child learns in a unique way — getting to know each learner individually so she can adapt her teaching to meet their needs. Her classrooms are safe and supportive, filled with hands-on experiences that build curiosity, confidence and a lifelong love of learning.',
    quote: 'I look forward to meeting all of our pupils and families and creating a classroom where every child feels valued, encouraged and excited to learn.',
    quoteLabel: 'A message to our community',
    facts: [
      { label: 'Favourite books', value: 'The Four Agreements and Greenlights' },
      { label: 'Favourite hobbies', value: 'Travelling, cooking, beach days, reading, tennis and hiking' },
      { label: 'Fun fact', value: 'Attended boarding school from the age of six' },
    ],
  },
  {
    id: 'laura',
    name: 'Laura Evans',
    role: 'Homeroom Teacher, Year 2',
    department: 'Primary',
    photo: '/media/teachers/laura-portrait.webp',
  },
  {
    id: 'chloe',
    name: 'Chloe Todd',
    role: 'Homeroom Teacher, Year 3',
    department: 'Primary',
    photo: '/media/teachers/chloe-portrait.webp',
  },
  {
    id: 'nonku-mdlalose',
    name: 'Nonku Thandi Mdlalose',
    role: 'Homeroom Teacher, Year 4',
    department: 'Primary',
    photo: '/media/teachers/nonku-portrait.webp',
    photoHero: '/media/teachers/nonku-portrait.webp',
    bio: 'Originally from South Africa, Nonku brings eight years of teaching experience across South Africa, Vietnam and Thailand. She holds a bachelor’s degree from the University of Pretoria, a 120-hour TEFL qualification, and training in Early Childhood Education and Montessori. Nonku is passionate about building positive, inclusive classrooms where children feel confident and supported, and values helping pupils grow in independence while discovering their individual strengths.',
    quote: 'I am excited to meet you all and have a successful year.',
    quoteLabel: 'A message to our community',
    facts: [
      { label: 'Favourite book', value: 'You Can Be Your Best Starting Today by John Mason' },
      { label: 'Favourite hobbies', value: 'Travelling, cooking, reading, movies, nature and exploring new places' },
      { label: 'Fun fact', value: 'Speaks four languages, and hopes Thai will become number five' },
    ],
  },
  {
    id: 'jack',
    name: 'Jack Mc Namara',
    role: 'Homeroom Teacher, Year 5',
    department: 'Primary',
    photo: '/media/teachers/jack-portrait.webp',
  },
  {
    id: 'nicholas',
    name: 'Nicholas Hutchinson',
    role: 'Homeroom Teacher, Year 6',
    department: 'Primary',
    photo: '/media/teachers/nicholas-portrait.webp',
  },
  {
    id: 'nargiz-rzayeva',
    name: 'Nargiz Rzayeva',
    role: 'ESL Support',
    department: 'Specialist',
    photo: '/media/teachers/nargiz-portrait.webp',
    photoHero: '/media/teachers/nargiz-portrait.webp',
    bio: `Originally from Azerbaijan, Nargiz brings extensive experience in leadership and school development, having worked with ${cam('Cambridge International, the British National Curriculum and the International Baccalaureate', 'the British National Curriculum and the International Baccalaureate')}. She completed official Read Write Inc. phonics training in England and is currently completing her Master of Education with Liverpool John Moores University — combining strong problem-solving skills with a collaborative approach to inspire curiosity in every learner.`,
    quote: 'When children feel happy, supported, and encouraged, they develop the confidence to achieve more than they ever imagined.',
    quoteLabel: 'My philosophy is simple',
    facts: [
      { label: 'Favourite book', value: 'The Kite Runner' },
      { label: 'Favourite hobby', value: 'Travelling and hiking' },
      { label: 'Fun fact', value: 'Loves horse riding' },
      { label: 'Also enjoys', value: 'Singing, watching movies and reading widely' },
    ],
  },
  {
    id: 'abegail',
    name: 'Abegail Pagador',
    role: 'IT Teacher',
    department: 'Specialist',
    photo: '/media/teachers/abegail-portrait.webp',
  },
  {
    id: 'jan-chris',
    name: 'Jan Chris Burgos',
    role: 'Music Teacher',
    department: 'Specialist',
    photo: '/media/teachers/jan-chris-portrait.webp',
  },
  {
    id: 'kittipong',
    name: 'Kittipong Ho',
    role: 'PE Teacher',
    department: 'Specialist',
    photo: '/media/teachers/kittipong-portrait.webp',
  },
  {
    id: 'suphattaraphong',
    name: 'Suphattaraphong Nekamatcha',
    role: 'Swimming Head Coach',
    department: 'Specialist',
    photo: '/media/teachers/suphattaraphong-portrait.webp',
  },
  {
    id: 'knatcha',
    name: 'Knatcha Jitwattanasilp',
    role: 'Art Teacher',
    department: 'Specialist',
    photo: '/media/teachers/knatcha-portrait.webp',
  },
  {
    id: 'piyaporn',
    name: 'Piyaporn Khunthongkaew',
    role: 'Thai Teacher',
    department: 'Specialist',
    photo: '/media/teachers/piyaporn-portrait.webp',
  },
  {
    id: 'ratchakorn',
    name: 'Ratchakorn Meekaew',
    role: 'Thai Teacher',
    department: 'Specialist',
    photo: '/media/teachers/ratchakorn-portrait.webp',
  },
];
