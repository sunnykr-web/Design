import type { StaticImageData } from 'next/image';
import a0 from '@/assets/avatars/a0.png';
import a1 from '@/assets/avatars/a1.png';
import a2 from '@/assets/avatars/a2.png';
import a3 from '@/assets/avatars/a3.png';
import a4 from '@/assets/avatars/a4.png';
import a5 from '@/assets/avatars/a5.png';
import a6 from '@/assets/avatars/a6.png';
import a7 from '@/assets/avatars/a7.png';
import a8 from '@/assets/avatars/a8.png';
import davidChen from '@/assets/showcase/avatars/david-chen.jpg';
import nikitaMenon from '@/assets/showcase/avatars/nikita-menon.jpg';
import gunavardhanDandi from '@/assets/showcase/avatars/gunavardhan-dandi.jpg';
import apexSolutions from '@/assets/showcase/avatars/apex-solutions.svg';
import aishaOkafor from '@/assets/showcase/avatars/aisha-okafor.jpg';
import teamOffsite from '@/assets/showcase/media/team-offsite.jpg';
import graduation from '@/assets/showcase/media/graduation-ceremony.jpg';
import dataAnalytics from '@/assets/showcase/media/data-analytics.jpg';
import hackathon from '@/assets/showcase/media/hackathon.jpg';
import saV0 from '@/assets/sa-v0.png';
import saV1 from '@/assets/sa-v1.png';
import saV2 from '@/assets/sa-v2.png';
import saV3 from '@/assets/sa-v3.png';
import saV4 from '@/assets/sa-v4.png';
import saV5 from '@/assets/sa-v5.png';
import saV6 from '@/assets/sa-v6.png';
import im1 from '@/assets/im-1.png';
import im2 from '@/assets/im-2.png';
import im3 from '@/assets/im-3.png';
import im4 from '@/assets/im-4.png';
import im5 from '@/assets/im-5.png';
import im3First from '@/assets/im3-first.png';
import im3Cities from '@/assets/im3-cities.png';
import im3Voices from '@/assets/im3-voices.png';
import { CONVOCATIONS, type Convocation } from './convocations';

export const POST_COUNT = 6404;
export const POST_COUNT_LABEL = '6,404';

export const NAV = [
  { id: 'p5-conv', label: 'Convocation' },
  { id: 'p5-abroad', label: 'Study abroad' },
  { id: 'p5-imm', label: 'Immersion' },
  { id: 'p5-words', label: 'Voices' },
];

/* ---------- Hero: floating LinkedIn post cards ---------- */
// ⚠ Sample content (David Chen, Apex Solutions, …). Replace with real learner posts.
export type HeroPost = {
  name: string; role: string; date: string; ini: string; avBg: string; av: StaticImageData;
  t1: string; t2: string; badge?: boolean; photo?: StaticImageData; photoAlt?: string; likes: string; stats: string;
};
export const HERO_POSTS: HeroPost[] = [
  { name: 'David Chen', role: 'Senior Project Manager @ TechCorp', date: '28 Jul 2025', ini: 'DC', avBg: '#2563eb', av: davidChen, t1: 'Just completed my PMP certification! 6 months of hard work paid off. Grateful for the mentorship and support from @Sarah Jenkins and @TechCorp.', t2: 'Ready to tackle new project management challenges! #PMP #ProjectManagement', badge: true, likes: '218', stats: '34 comments · 12 shares' },
  { name: 'Nikita Menon', role: 'Engineering Lead · Building Data Platforms', date: '4 Aug 2025', ini: 'NM', avBg: '#7c3aed', av: nikitaMenon, t1: 'What a week at our annual engineering offsite! Three days of architecture deep-dives, hack sessions, and honest retrospectives.', t2: 'Proud of this team and everything we shipped this year. 🚀', photo: teamOffsite, photoAlt: 'Team offsite 2025', likes: '187', stats: '26 comments · 9 shares' },
  { name: 'Gunavardhan Dandi', role: 'Mendix Advanced Certified Developer', date: '12 Aug 2025', ini: 'GD', avBg: '#0e7490', av: gunavardhanDandi, t1: 'Thrilled to officially graduate with my Executive Post Graduate Diploma in Software Development from IIIT Bangalore.', t2: 'Balancing a full-time role with a rigorous architecture curriculum was hard, and worth every weekend it cost me.', photo: graduation, photoAlt: 'Graduation ceremony', likes: '342', stats: '41 comments · 18 shares' },
  { name: 'Apex Solutions Inc.', role: '12,481 followers', date: '18 Aug 2025', ini: 'AS', avBg: '#0f766e', av: apexSolutions, t1: 'Unlocking the potential of your data is closer than you think.', t2: "Join us for a free webinar on 'Advanced Data Analytics in Supply Chain Management'. Learn from industry experts and see real-world case studies. Register now! [Link]", photo: dataAnalytics, photoAlt: 'Advanced Data Analytics', likes: '143', stats: '19 comments · 31 shares' },
  { name: 'Aisha Okafor', role: 'Full-Stack Developer · AI Enthusiast', date: '25 Aug 2025', ini: 'AO', avBg: '#be185d', av: aishaOkafor, t1: 'We won! 🏆 Our team took first place at the Global AI Hackathon with an accessibility-first voice assistant.', t2: '48 hours, zero sleep, and one very proud team. Huge thanks to the organizers and my incredible teammates.', photo: hackathon, photoAlt: 'Global AI Hackathon', likes: '296', stats: '52 comments · 24 shares' },
];

/* ---------- Manifesto ---------- */
const MANIFESTO_PLAIN_1 = `${POST_COUNT_LABEL} learners wrote about their programme on LinkedIn.`;
const MANIFESTO_ACCENT = 'Nobody asked them to. Nobody paid them.';
const MANIFESTO_PLAIN_2 = 'We collected the posts, left every word as it was, and linked each one back to the original.';
export const MANIFESTO_WORDS: { w: string; accent: boolean }[] = [
  ...MANIFESTO_PLAIN_1.split(' ').map(w => ({ w, accent: false })),
  ...MANIFESTO_ACCENT.split(' ').map(w => ({ w, accent: true })),
  ...MANIFESTO_PLAIN_2.split(' ').map(w => ({ w, accent: false })),
];

/* ---------- LinkedIn-style post cards (convocation and immersion rails) ---------- */
export type PostCardData = {
  name: string; role: string; av: StaticImageData | null; date: string; likes: string; comments: string; text: string;
};
export const initials = (name: string) => name.split(' ').map(x => x[0]).join('');

/* ---------- Convocation strip ---------- */
export type ConvStripItem =
  | { kind: 'img'; conv: Convocation; place: string; year: string; ar: string }
  | { kind: 'post'; conv: Convocation; post: PostCardData }
  | { kind: 'quote' };
const bySlug = (s: string) => CONVOCATIONS.find(c => c.slug === s)!;
export const CONV_STRIP: ConvStripItem[] = [
  { kind: 'post', conv: bySlug('iit-bombay-2026'), post: { name: 'Nisha Nair', role: 'Growth Manager, Zomato', av: a8, date: '15 Mar 2026', likes: '2,603', comments: '171 comments', text: 'My parents flew in for this. They watched me study on a laptop for two years. Today they watched me walk across the stage at IIT Bombay.' } },
  { kind: 'img', conv: bySlug('iit-bombay-stage'), place: 'IIT Bombay', year: '2026', ar: '670/436' },
  { kind: 'post', conv: bySlug('annual-convocation'), post: { name: 'Lakshmi Reddy', role: 'Data Engineer, PhonePe', av: a4, date: '14 Mar 2026', likes: '2,184', comments: '146 comments', text: 'Walked the stage today. Two years of weekend classes, assignments submitted at midnight after putting the kids to bed, and one very patient family.' } },
  { kind: 'quote' },
  { kind: 'post', conv: bySlug('iiit-bangalore'), post: { name: 'Harish Bhat', role: 'Data Engineer, PhonePe', av: a5, date: '21 Mar 2026', likes: '1,947', comments: '112 comments', text: 'Met my study group in person for the first time at IIIT Bangalore. Eighteen months of late-night calls, and they are exactly who I thought they would be.' } },
  { kind: 'img', conv: bySlug('degree-in-hand'), place: 'Degree in hand', year: '2026', ar: '596/658' },
  { kind: 'post', conv: bySlug('whole-cohort'), post: { name: 'Rohan Menon', role: 'Marketing Lead, Nykaa', av: a6, date: '16 Mar 2026', likes: '1,362', comments: '88 comments', text: 'Class of 2026, in one frame. A year of breakout rooms and late-night group calls, and today we finally stood next to each other.' } },
];

/* ---------- Voices (testimonials) ---------- */
export type Voice = { name: string; role: string; ini: string; av: StaticImageData | null; text: string };
export type VoiceCard = Voice & { date: string; likes: string; comments: string };
const voice = (name: string, role: string, av: StaticImageData | null, text: string): Voice => ({
  name, role, av, text, ini: name.split(' ').map(s => s[0]).join(''),
});
export const VOICES: Voice[] = [
  voice('Harish Bhat', 'Data Engineer, PhonePe', a5, "A thank-you I've been putting off. When I enrolled I was sceptical. I'd tried online courses before and finished none of them. The difference this time was the mentor calls."),
  voice('Arjun Saxena', 'Operations Manager, Delhivery', null, 'Honest review after finishing: the projects are the point. Skip the videos if you must, never skip the projects.'),
  voice('Aditya Iyer', 'Supply Chain Manager, Reliance Retail', a0, 'Received my degree at the convocation ceremony today. Quietly proud.'),
  voice('Ananya Nair', 'HR Business Partner, Wipro', null, "My buddy group from the programme still meets on a call every Sunday, eight months after graduating. That wasn't in the brochure."),
  voice('Sneha Gupta', 'Operations Manager, Delhivery', a1, "If you're a working professional scared of quitting your job for a master's: this format works. I kept my salary, my role, and still finished."),
  voice('Nikhil Iyer', 'Product Manager, Swiggy', a2, 'Six months ago I finished the programme. Today I got promoted to lead the team I used to report to.'),
  voice('Neha Joshi', 'HR Business Partner, Wipro', a3, 'Just back from campus immersion week. Meeting 60 people from my cohort after a year of little squares on a screen. I did not expect it to matter this much. It did.'),
  voice('Lakshmi Reddy', 'Data Engineer, PhonePe', a4, 'Walked the stage today. Two years of weekend classes, assignments submitted at midnight after putting the kids to bed, and one very patient family.'),
  voice('Rohan Menon', 'Marketing Lead, Nykaa', a6, 'Meeting my cohort in person after a year on screen changed how I think about the whole programme.'),
  voice('Lakshmi Iyer', 'Sales Head, Asian Paints', a7, 'Eight months after graduating, the study group is still the first chat I open in the morning.'),
  voice('Nisha Nair', 'Growth Manager, Zomato', a8, 'People keep asking if the programme is worth it, so, publicly: yes, if you do the work. No, if you want a certificate to happen to you.'),
  voice('Aditya Sharma', 'Scrum Master, Tech Mahindra', a2, 'Having someone check in every fortnight, who actually read my submissions, changed everything.'),
];

const META_DATES = ['2d', '5d', '1w', '1w', '2w', '3w'];
const META_LIKES = ['1,284', '962', '2,031', '1,756', '874', '1,412'];
const META_COMMENTS = ['64 comments', '41 comments', '118 comments', '93 comments', '37 comments', '72 comments'];
const withMeta = (w: Voice, k: number): VoiceCard => ({ ...w, date: META_DATES[k % 6], likes: META_LIKES[k % 6], comments: META_COMMENTS[k % 6] });
export const VOICE_ROW_A: VoiceCard[] = VOICES.slice(0, 6).map(withMeta);
export const VOICE_ROW_B: VoiceCard[] = VOICES.slice(6).map((w, k) => withMeta(w, k + 3));

/* ---------- Study abroad ---------- */
export type AbroadPost = Voice & { date: string; likes: string; comments: string; body: string; photo: StaticImageData; photoAlt: string };
export const ABROAD_POSTS: AbroadPost[] = [
  { ...VOICES[0], date: '12 Aug 2026', likes: '1,528', comments: '78 comments', photo: saV0, photoAlt: 'Learner speaking by a window', body: "A thank-you I've been putting off. When I enrolled I was sceptical. I'd tried online courses before and finished none of them. The difference this time was the mentor calls. Having someone check in every fortnight, who actually read my submissions, changed everything. I finished. First time ever." },
  { ...VOICES[6], date: '3 Aug 2026', likes: '964', comments: '41 comments', photo: saV3, photoAlt: 'Learner seated in a studio', body: VOICES[6].text },
  { ...VOICES[4], date: '28 Jul 2026', likes: '1,102', comments: '56 comments', photo: saV5, photoAlt: 'Learner in a blue blazer', body: VOICES[4].text },
  { ...VOICES[10], date: '19 Jul 2026', likes: '2,310', comments: '134 comments', photo: saV1, photoAlt: 'Learner sharing their story', body: VOICES[10].text },
  { ...VOICES[7], date: '8 Jul 2026', likes: '1,847', comments: '92 comments', photo: saV6, photoAlt: 'Learner sharing advice', body: VOICES[7].text },
];

export const ABROAD_VIDEOS: { src: StaticImageData; alt: string; desc: string }[] = [
  { src: saV0, alt: 'Learner speaking by a window', desc: 'Why they chose to study abroad, and what finally made the move feel possible.' },
  { src: saV1, alt: 'Learner on being ghosted by a freelancer', desc: 'The setback that nearly stopped them, and how they got back on track.' },
  { src: saV2, alt: 'Learner sharing a suggestion', desc: 'The one piece of advice they would give anyone applying next year.' },
  { src: saV3, alt: 'Learner seated in a studio', desc: 'What their first semester overseas was really like.' },
  { src: saV4, alt: 'Learner on handling visas and paperwork', desc: 'How they handled visas, deadlines and the paperwork in between.' },
  { src: saV5, alt: 'Learner in a blue blazer', desc: 'From admit letter to first day on campus, in their own words.' },
  { src: saV6, alt: 'Learner sharing advice', desc: 'What they wish they had known before they left home.' },
];

/* ---------- Immersion ---------- */
export type ImmersionStep = { label: string; tag: string; line: string; src: StaticImageData; alt: string; city: string };
// Step → city: 01 Chennai, 02 Chandigarh, 03 Ahmedabad.
export const IMMERSION_STEPS: ImmersionStep[] = [
  { label: 'From the Ground Up', tag: 'Immersion · From the Ground Up', line: 'A week on campus turns classmates into a cohort you can shake hands with.', src: im3First, alt: "Saral Purohit's LinkedIn post, From the Ground Up", city: 'chennai' },
  { label: 'Mumbai & Hyderabad', tag: 'Mumbai · Hyderabad', line: 'Two cities, one format: a room full of people who had only met on screen.', src: im3Cities, alt: 'Immersion meetups in Mumbai and Hyderabad', city: 'chandigarh' },
  { label: 'In their words', tag: 'Ankur Nagar, on LinkedIn', line: '“It was a superb event!”', src: im3Voices, alt: "Ankur Nagar's LinkedIn post and WhatsApp messages from attendees of From the Ground Up, Mumbai", city: 'ahmedabad' },
];

export const IMMERSION_CARDS: { src: StaticImageData; alt: string; place: string; city: string; post: PostCardData }[] = [
  { src: im2, alt: 'Speaker addressing learners at an immersion session', place: 'IIT Bombay', city: 'chennai', post: { name: 'Priya Raman', role: 'Product Analyst, Freshworks', av: a3, date: '9 Feb 2026', likes: '1,284', comments: '64 comments', text: 'Finally got to ask the questions I had been saving up all term. Two hours with faculty on campus was worth more than a month of forum threads.' } },
  { src: im3, alt: 'Mentor speaking with a microphone', place: 'IIT Bombay', city: 'chandigarh', post: { name: 'Karan Malhotra', role: 'Consultant, Deloitte', av: a1, date: '11 Feb 2026', likes: '962', comments: '41 comments', text: 'The mentor who marked every one of my assignments, answering my questions face to face. Strange and brilliant in equal measure.' } },
  { src: im4, alt: 'upGrad founders together', place: 'IIT Bombay', city: 'ahmedabad', post: { name: 'Meera Pillai', role: 'Founder, Studio Kaapi', av: a7, date: '12 Feb 2026', likes: '2,031', comments: '118 comments', text: 'Did not expect the founders to show up and spend an hour listening to what our cohort is building. They took notes.' } },
  { src: im5, alt: 'Immersion group photo', place: 'IIIT Bangalore', city: 'chennai', post: { name: 'Vikram Desai', role: 'Engineering Manager, Razorpay', av: a2, date: '14 Feb 2026', likes: '1,756', comments: '93 comments', text: 'One week, one campus, and a group photo that finally has everyone in it. See you all at convocation.' } },
  { src: im1, alt: 'upGrad team at the office', place: 'IIT Bombay', city: 'chandigarh', post: { name: 'Ananya Nair', role: 'HR Business Partner, Wipro', av: null, date: '16 Feb 2026', likes: '874', comments: '37 comments', text: 'Met the team behind the programme today. You can tell they built it for people like us, juggling a job and a family.' } },
];
