import type { StaticImageData } from 'next/image';
import convL1 from '@/assets/conv-l1.png';
import convL2 from '@/assets/conv-l2.png';
import convL3 from '@/assets/conv-l3.png';
import convL4 from '@/assets/conv-l4.png';
import convL5 from '@/assets/conv-l5.png';
import convP2 from '@/assets/conv-p2.png';
import cvCard from '@/assets/cv-card-sharp.png';

export type Convocation = {
  slug: string;
  img: StaticImageData;
  alt: string;
  place: string;
  title: string;
  /** A LinkedIn post screenshot rather than a photo: shown contained on a backdrop. */
  post?: boolean;
  desc: string;
  facts: [string, string][];
  about: string[];
};

// ⚠ desc, facts and about are placeholder copy from the handoff and need real content.
export const CONVOCATIONS: Convocation[] = [
  { slug: 'iit-bombay-stage', img: convL1, alt: 'Graduate at IIT Bombay convocation', place: 'IIT Bombay · 2026', title: 'Walking the stage at IIT Bombay',
    desc: 'Online learners who completed their programme travel to the IIT Bombay campus to receive their degree in person.',
    facts: [['Campus', 'IIT Bombay'], ['City', 'Mumbai'], ['Year', '2026']],
    about: ['Most of the programme happens on a laptop, late in the evening, after work. Convocation is the day it moves onto a real campus.', 'Graduates are called up by name, receive their degree from the institute, and meet the faculty who taught them.'] },
  { slug: 'annual-convocation', img: convL3, alt: 'Graduate at the annual convocation', place: 'Annual convocation · 2026', title: 'The annual convocation',
    desc: 'Once a year, the cohort that studied on screen gathers in one hall with their families.',
    facts: [['Held', 'Once a year'], ['Where', 'On campus'], ['Year', '2026']],
    about: ['Names are read out, degrees are handed over, and families see the result first-hand.', 'For many learners it is the first time they meet their classmates in person.'] },
  { slug: 'degree-in-hand', img: convP2, alt: 'Graduate holding a degree folder', place: 'Degree in hand · 2026', title: 'Degree in hand',
    desc: 'The folder is physical proof of months of evenings and weekends spent studying alongside work.',
    facts: [['Awarded by', 'Partner university'], ['Received', 'In person'], ['Year', '2026']],
    about: ['The degree is issued by the partner university, the same one on-campus students receive.', 'It is handed over on stage at the ceremony.'] },
  { slug: 'iiit-bangalore', img: convL5, alt: 'Three graduates at IIIT Bangalore', place: 'IIIT Bangalore · 2026', title: 'Together at IIIT Bangalore',
    desc: 'Classmates who had only met in breakout rooms finally stand side by side on campus.',
    facts: [['Campus', 'IIIT Bangalore'], ['City', 'Bengaluru'], ['Year', '2026']],
    about: ['Study groups that formed online meet for the first time at convocation.', 'The day ends with photos on the campus grounds.'] },
  { slug: 'gunavardhan-dandi', img: cvCard, alt: 'LinkedIn post by Gunavardhan Dandi on graduating from IIIT Bangalore', place: 'Gunavardhan Dandi, on LinkedIn', title: 'In his own words', post: true,
    desc: 'Gunavardhan Dandi shared his graduation from IIIT Bangalore on LinkedIn. The post is shown as published.',
    facts: [['Source', 'LinkedIn'], ['Campus', 'IIIT Bangalore'], ['Edited', 'No']],
    about: ['Every learner post on this page links back to the original on the author’s profile.', 'We didn’t edit a word.'] },
  { slug: 'whole-cohort', img: convL4, alt: 'Annual convocation group photograph', place: 'The whole cohort · 2026', title: 'The whole cohort',
    desc: 'The group photograph: every graduate from the year in a single frame.',
    facts: [['Ceremony', 'Annual convocation'], ['Where', 'On campus'], ['Year', '2026']],
    about: ['The group photo is taken after the degrees are handed over.', 'It is the one frame with the entire cohort in it.'] },
  { slug: 'iit-bombay-2026', img: convL2, alt: 'Graduate at IIT Bombay convocation', place: 'IIT Bombay · 2026', title: 'IIT Bombay, class of 2026',
    desc: 'A graduate on the IIT Bombay campus after the ceremony.',
    facts: [['Campus', 'IIT Bombay'], ['City', 'Mumbai'], ['Year', '2026']],
    about: ['After the ceremony, graduates and families spend the afternoon on campus.', 'For many, it is the first time they have walked its grounds.'] },
];

export const convocationHref = (slug: string) => `/convocation/${slug}`;

/** How a convocation image sits in its frame: posts are contained on a warm backdrop. */
export const convLook = (c: Convocation) => ({
  bg: c.post ? 'var(--post-bg)' : 'var(--warm-grey)',
  fit: c.post ? ('contain' as const) : ('cover' as const),
  pad: c.post ? '6%' : '0',
  pos: c.slug === 'degree-in-hand' ? 'center 30%' : 'center',
});
