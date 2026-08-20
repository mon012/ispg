/** School fees, academic year 2026–2027.
 *  All figures cross-checked against the school's published fee schedule.
 *  Billed and payable in Thai Baht (THB). */

export const academicYear = '2026–2027';

export const oneOffFees = [
  {
    name: 'Application Fee',
    amount: 3000,
    body:
      'A non-transferable and non-refundable payment covering the student assessment and application procedure, payable when the application form is submitted. Payment does not guarantee a place.',
  },
  {
    name: 'Security Deposit',
    amount: 75000,
    body: 'Payable by all new and returning students prior to admission.',
  },
  {
    name: 'Registration Fee',
    amount: 75000,
    body:
      'Payable on confirmation of a place and before entry to the school. THB 150,000 is the maximum amount payable per family.',
  },
];

export const tuition = {
  columns: ['Term 1', 'Term 2', 'Term 3', 'Annual'],
  rows: [
    { group: 'Nursery', values: [98500, 98500, 98500, 295500] },
    { group: 'Reception', values: [98500, 98500, 98500, 295500] },
    { group: 'Year 1–3', values: [130900, 130900, 130900, 392700] },
    { group: 'Year 4–6', values: [145900, 145900, 145900, 437700] },
  ],
};

export const busFees = {
  columns: ['Term 1', 'Term 2', 'Term 3'],
  rows: [
    { group: 'Zone 1', values: [16000, 14000, 10000] },
    { group: 'Zone 2', values: [20000, 17500, 12500] },
    { group: 'Zone 3', values: [24000, 21000, 15000] },
  ],
  zones:
    'Zone 1: Ban Tai Municipality · Zone 2: Koh Phangan Municipality · Zone 3: Phet Phangan Municipality',
};

export const learningSupport = [
  { level: 'Level 1', body: 'Extra support in class.', cost: 'Free of charge' },
  { level: 'Level 2', body: 'Extra support in small specialist groups.', cost: 'THB 8,000 per month' },
  { level: 'Level 3', body: 'Individual one-to-one specialist support.', cost: 'THB 40,000 per month' },
];

export const siblingDiscounts = [
  { group: '2nd child', discount: '5% discount' },
  { group: '3rd child and subsequent children', discount: '10% discount' },
];

export const bankDetails = {
  bank: 'Kasikorn Bank',
  accountName: 'International School Of Pha Ngan',
  accountNumber: '213-8-49437-6',
  accountType: 'Savings Account',
  chequePayee: 'บจก. พะงันเลิร์นนิง (Phangan Learning Co., Ltd.)',
};

export const policyNotes: { title: string; points: string[] }[] = [
  {
    title: 'Tuition Fees',
    points: [
      'Fees and figures are billed and payable in Thai Baht (THB).',
      'All school fees are reviewed annually and are subject to change without prior notice.',
      'Tuition fees include student group accidental insurance (up to a cap of THB 20,000), books and equipment.',
      'Tuition fees include meals.',
      'Tuition fees exclude school uniform, school trips, extra-curricular activities and school photographs.',
    ],
  },
  {
    title: 'Sibling Discounts',
    points: [
      'Discounts apply to larger families within the same academic year: 5% for a 2nd child, 10% for a 3rd and subsequent children.',
      'The tuition fee discount is applied to the siblings only, and is billed termly.',
    ],
  },
  {
    title: 'School Bus Service',
    points: [
      'One-way trips are calculated at 75% of the round-trip fee. A 25% discount applies to 2nd and subsequent children.',
      'The zonal system is based on distance from the school. The School Secretary will advise which zone applies.',
      'Cancellation must be made half a term in advance, in writing to the school. Refunds are calculated on a half-term basis only.',
      'In view of uncertainty over fuel costs, transport charges may be adjusted term by term.',
    ],
  },
  {
    title: 'Learning Support',
    points: [
      'If it is deemed necessary to support a student with additional or special educational needs, the child will be given trial days.',
      'If the school considers that a child requires SEN support, this will be discussed with parents. Inclusion in the SEN programme is not optional.',
    ],
  },
  {
    title: 'Overdue Payment',
    points: [
      'Late payment charges of THB 150 per day are applied to payments made after the invoice due date.',
    ],
  },
  {
    title: 'Refund Policy',
    points: [
      'To withdraw officially, a Withdrawal Form must be completed and submitted to the Admissions Office by hand or email. The submission date is the Notification Date.',
      'The registration fee is a non-refundable deposit of THB 75,000, payable if notified one term in advance.',
      'Advance tuition fee payment is non-refundable after the start of the term, except in an unforeseen event mandated by the Thai government.',
      'Early withdrawal (termly payment only) receives a full refund of termly tuition and meals, provided the school is given notice twelve full weeks before Term 1 for a new student, eight full weeks before Term 1 for a current student, and four full weeks before Term 2 and Term 3. Weeks are counted by the school calendar, not attendance days.',
      'Force majeure: in the event of a closure or adverse circumstances the school could not reasonably predict or control, no fees will be refunded or credited.',
      'Fees are not refunded, credited or waived for absence due to sickness, injury, appointments, vacation or family reasons, except where the Head considers there to be exceptional cause or legal obligation.',
    ],
  },
  {
    title: 'Re-enrolled Students',
    points: [
      'Students returning after withdrawal must complete the re-application process, re-enrol as new students, and are responsible for all initial fees including the application fee and registration fee.',
    ],
  },
];

export const paymentMethods = [
  'All fees and charges are billed and payable in Thai Baht. The school does not accept cash payments.',
  'By cheque: crossed and made payable to “บจก. พะงันเลิร์นนิง (Phangan Learning Co., Ltd.)” with “Or Bearer” crossed out, submitted at the admissions office.',
  'By instalment: an annual payment option using the Kbank or SCB instalment programme — details from the school cashier. Available only for credit cards issued in Thailand.',
  'By bank transfer: directly to the school account below. Please email a copy of the payment slip with your child’s name and class to admissions@ispg.ac.th.',
];
