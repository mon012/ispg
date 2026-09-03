/**
 * Staff directory — the ISPG founding team, sourced from
 * https://teachers.ispg.ac.th/ (the school's own staff microsite).
 *
 * Photos are downloaded locally to `public/media/teachers/`: `*-portrait.webp`
 * for the grid thumbnail, `*-hero.webp` (or the single portrait, where the
 * source site only supplied one) for the modal. More staff will join before
 * opening — add entries here in the same shape and the page needs no other
 * change.
 */

import { cam } from './accreditation';

export type Teacher = {
  id: string;
  name: string;
  role: string;
  department: Department;
  photo: string;
  photoHero: string;
  bio: string;
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
    role: 'Founding Primary Headteacher',
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
    id: 'christine-prinsloo',
    name: 'Christine Prinsloo',
    role: 'Primary Teacher',
    department: 'Primary',
    photo: '/media/teachers/christine-portrait.webp',
    photoHero: '/media/teachers/christine-hero.webp',
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
    id: 'nonku-mdlalose',
    name: 'Nonku Thandi Mdlalose',
    role: 'Primary Teacher',
    department: 'Primary',
    photo: '/media/teachers/nonku-portrait.webp',
    photoHero: '/media/teachers/nonku-hero.webp',
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
    id: 'monica-leonardo',
    name: 'J.D. Monica Leonardo',
    role: 'Physical Education Teacher',
    department: 'Specialist',
    photo: '/media/teachers/monica-portrait.webp',
    photoHero: '/media/teachers/monica-hero.webp',
    bio: 'Originally from the Philippines, Monica is a licensed physical education teacher who has been teaching in Thailand for four years. She is passionate about helping children stay active, build confidence and experience the joy of being part of a team — and believes children learn best when they feel supported and are having fun.',
    quote: 'I hope to create a fun, positive and encouraging environment where every child enjoys being active and feels confident to try their best.',
    quoteLabel: 'A message to our community',
    facts: [
      { label: 'Favourite book', value: 'You Can Be Your Best Starting Today by John Mason' },
      { label: 'Favourite hobbies', value: 'Running, dancing, reading, yoga and exploring new places' },
      { label: 'Fun fact', value: 'Loves collecting memories more than souvenirs' },
    ],
  },
  {
    id: 'nargiz-rzayeva',
    name: 'Nargiz Rzayeva',
    role: 'Primary ESL Coordinator',
    department: 'Specialist',
    photo: '/media/teachers/nargiz-portrait.webp',
    photoHero: '/media/teachers/nargiz-hero.webp',
    bio: `Originally from Azerbaijan, Nargiz brings extensive experience in leadership and school development, having worked with ${cam('the Cambridge International, British National Curriculum and International Baccalaureate programmes', 'the British National Curriculum and International Baccalaureate programmes')}. She completed official Read Write Inc. phonics training in England and is currently completing her Master of Education with Liverpool John Moores University — combining strong problem-solving skills with a collaborative approach to inspire curiosity in every learner.`,
    quote: 'When children feel happy, supported, and encouraged, they develop the confidence to achieve more than they ever imagined.',
    quoteLabel: 'My philosophy is simple',
    facts: [
      { label: 'Favourite book', value: 'The Kite Runner' },
      { label: 'Favourite hobby', value: 'Travelling and hiking' },
      { label: 'Fun fact', value: 'Loves horse riding' },
      { label: 'Also enjoys', value: 'Singing, watching movies and reading widely' },
    ],
  },
];
