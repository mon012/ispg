/** Questions admissions actually gets asked, answered from the same figures the
 *  pages themselves publish. Every entry here is rendered visibly on its page —
 *  FAQ structured data may only describe copy a visitor can read. */

export type FaqItem = { q: string; a: string };

export const feesFaq: FaqItem[] = [
  {
    q: 'How much are school fees at ISPG?',
    a: 'For the 2026–2027 academic year annual tuition is THB 295,500 for Nursery and Reception, THB 392,700 for Years 1 to 3 and THB 437,700 for Years 4 to 6. Fees are billed across three terms and are payable in Thai Baht.',
  },
  {
    q: 'What do the tuition fees include?',
    a: 'Tuition includes meals, books, equipment and student group accidental insurance up to THB 20,000. It excludes school uniform, school trips, extra-curricular activities and school photographs.',
  },
  {
    q: 'What one-off fees are payable before my child starts?',
    a: 'A non-refundable THB 3,000 application fee when you apply, then a THB 75,000 registration fee and a THB 75,000 security deposit once a place is confirmed. Registration fees are capped at THB 150,000 per family.',
  },
  {
    q: 'Is there a sibling discount?',
    a: 'Yes. A second child receives a 5% discount on tuition, and a third and any subsequent children receive 10%.',
  },
  {
    q: 'Does ISPG run a school bus, and what does it cost?',
    a: 'Yes, across three zones — Ban Tai Municipality, Koh Phangan Municipality and Phet Phangan Municipality. Term fees range from THB 10,000 to THB 24,000 depending on zone and term.',
  },
  {
    q: 'Is learning support charged separately?',
    a: 'Extra support inside the classroom is free of charge. Small specialist groups are THB 8,000 per month and individual one-to-one specialist support is THB 40,000 per month.',
  },
];

export const admissionFaq: FaqItem[] = [
  {
    q: 'How do I apply for a place at ISPG?',
    a: 'There are six steps: enquiry and a personal visit, the online application form, the THB 3,000 application fee, a trial day for your child, written confirmation of the place, and arranging uniform, bus route and start date with the School Secretary.',
  },
  {
    q: 'What ages does ISPG accept?',
    a: 'From age 2 to age 11 — Nursery (2–3) and Casa (3–5) in Kindergarten, then Key Stage 1 and Key Stage 2 across Years 1 to 6 in Primary.',
  },
  {
    q: 'Does my child have to sit an entrance exam?',
    a: 'There is no written entrance exam. The application fee covers a student assessment, and your child then spends a trial day with their prospective class so both sides can see whether ISPG is the right fit.',
  },
  {
    q: 'Can we visit the school before we apply?',
    a: 'Yes, and we recommend it. A personal tour takes about an hour and covers the classrooms, the pool and the grounds, with time to ask the team anything you need to.',
  },
  {
    q: 'Can my child join part-way through the school year?',
    a: 'Yes. Children join us mid-year as well as at the start of one, and stage placement is based on readiness rather than birthday alone. Send us your child’s age and current school year and we will tell you exactly where they would start.',
  },
  {
    q: 'How much is the application fee?',
    a: 'THB 3,000. It is non-refundable and non-transferable, covers the student assessment and the application procedure, and does not on its own guarantee a place.',
  },
];
