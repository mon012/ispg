/** The six-step admissions journey.
 *  Previously this existed only inside a single PNG infographic — it is now
 *  real text, so it can be read by screen readers, search and translation. */

export const steps = [
  {
    n: 1,
    title: 'Enquiry & Visit',
    body:
      'Get in touch and book a personal tour. You will meet our team, see the classrooms, the pool and the grounds, and ask everything you need to.',
    action: { label: 'Book a visit', href: '/contact/' },
  },
  {
    n: 2,
    title: 'Application',
    body:
      'Complete the online application form. It takes a few minutes and lets us understand your child’s age, background and any support they may need.',
    action: { label: 'Application form', href: '/form/' },
  },
  {
    n: 3,
    title: 'Application Fee',
    body:
      'Pay the THB 3,000 application fee. It covers the student assessment and the application procedure, and is non-refundable and non-transferable.',
    action: { label: 'See all fees', href: '/fees/' },
  },
  {
    n: 4,
    title: 'Trial Day',
    body:
      'Your child spends a day with their prospective class. We watch how they settle, and they get to find out whether ISPG feels like the right fit.',
  },
  {
    n: 5,
    title: 'Confirmation',
    body:
      'We confirm the place in writing. The registration fee and security deposit are payable at this point, before your child starts.',
    action: { label: 'Fee schedule', href: '/fees/' },
  },
  {
    n: 6,
    title: 'Join Us',
    body:
      'Uniform, bus route and start date are arranged with the School Secretary. Your child joins their class — and their family joins ours.',
    action: { label: 'Term dates', href: '/calendar/' },
  },
];

export const nextSteps = [
  {
    title: 'Application Form',
    body: 'Apply online in a few minutes.',
    href: '/form/',
  },
  {
    title: 'School Fees',
    body: 'Tuition, bus, learning support and payment terms.',
    href: '/fees/',
  },
  {
    title: 'School Profile',
    body: 'Key admission timelines and policy documents.',
    href: 'https://www.canva.com/design/DAHBBlLQR8s/TrI2cBE9EyrxW1qGBjHf2w/view',
    external: true,
  },
  {
    title: 'School Calendar',
    body: 'Term dates and everything happening on campus.',
    href: '/calendar/',
  },
];
