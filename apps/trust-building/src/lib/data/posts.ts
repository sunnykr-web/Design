import type { StaticImageData } from 'next/image';
import a0 from '@/assets/avatars/a0.png';
import a2 from '@/assets/avatars/a2.png';
import a3 from '@/assets/avatars/a3.png';
import a4 from '@/assets/avatars/a4.png';
import a5 from '@/assets/avatars/a5.png';
import a6 from '@/assets/avatars/a6.png';
import a7 from '@/assets/avatars/a7.png';
import a8 from '@/assets/avatars/a8.png';
import a1 from '@/assets/avatars/a1.png';
import convL1 from '@/assets/conv-l1.png';
import convL2 from '@/assets/conv-l2.png';
import convL3 from '@/assets/conv-l3.png';
import convL4 from '@/assets/conv-l4.png';
import convL5 from '@/assets/conv-l5.png';
import convP2 from '@/assets/conv-p2.png';
import cafe from '@/assets/cafe.png';
import im1 from '@/assets/im-1.png';
import im2 from '@/assets/im-2.png';
import im3 from '@/assets/im-3.png';
import im4 from '@/assets/im-4.png';
import im5 from '@/assets/im-5.png';
import im3First from '@/assets/im3-first.png';
import im3Voices from '@/assets/im3-voices.png';
import saPlane from '@/assets/sa-plane.png';
import saV0 from '@/assets/sa-v0.png';
import saV1 from '@/assets/sa-v1.png';
import saV3 from '@/assets/sa-v3.png';
import saV5 from '@/assets/sa-v5.png';
import saV6 from '@/assets/sa-v6.png';
import { ABROAD_VIDEOS, VOICES } from './landing';

/** A LinkedIn post as shown on the detail and "all posts" pages. ⚠ Sample content: replace with real, consented posts. */
export type LiPost = {
  name: string; role: string; av: StaticImageData | null; date: string; likes: string; comments: string; text: string; photo: StaticImageData | null;
};

const post = (name: string, role: string, av: StaticImageData | null, date: string, likes: string, comments: string, text: string, photo: StaticImageData | null): LiPost =>
  ({ name, role, av, date, likes, comments, text, photo });

/* ---------- Convocation Detail: "The day in photos" ---------- */
export const CONV_PHOTOS: { src: StaticImageData; alt: string; rows: number; cols: number; pos: string }[] = [
  { src: convL1, alt: 'Graduate at IIT Bombay convocation', rows: 2, cols: 2, pos: 'center' },
  { src: convP2, alt: 'Graduate holding a degree folder', rows: 2, cols: 1, pos: 'center 30%' },
  { src: convL3, alt: 'Graduate at the annual convocation', rows: 1, cols: 1, pos: 'center' },
  { src: convL5, alt: 'Three graduates at IIIT Bangalore', rows: 1, cols: 1, pos: 'center' },
  { src: convL4, alt: 'Annual convocation group photograph', rows: 1, cols: 1, pos: 'center' },
  { src: convL2, alt: 'Graduate at IIT Bombay convocation', rows: 1, cols: 1, pos: 'center' },
];

/* ---------- Convocation Detail: "From LinkedIn" ---------- */
export const CONV_POSTS: LiPost[] = [
  post('Nisha Nair', 'Growth Manager, Zomato', a8, '15 Mar 2026', '2,603', '171 comments', 'My parents flew in for this. They watched me study on a laptop for two years. Today they watched me walk across the stage at IIT Bombay.', convL2),
  post('Lakshmi Reddy', 'Data Engineer, PhonePe', a4, '14 Mar 2026', '2,184', '146 comments', 'Walked the stage today. Two years of weekend classes, assignments submitted at midnight after putting the kids to bed, and one very patient family.', convL3),
  post('Aditya Iyer', 'Supply Chain Manager, Reliance Retail', a0, '14 Mar 2026', '1,092', '58 comments', 'Received my degree at the convocation ceremony today. Quietly proud.', null),
  post('Harish Bhat', 'Data Engineer, PhonePe', a5, '21 Mar 2026', '1,947', '112 comments', 'Met my study group in person for the first time at IIIT Bangalore. Eighteen months of late-night calls, and they are exactly who I thought they would be.', convL5),
  post('Divya Krishnan', 'UX Designer, Zoho', a3, '16 Mar 2026', '1,318', '74 comments', 'Degree in hand. Framing this one.', convP2),
  post('Rohan Menon', 'Marketing Lead, Nykaa', a6, '16 Mar 2026', '1,362', '88 comments', 'Class of 2026, in one frame. A year of breakout rooms and late-night group calls, and today we finally stood next to each other.', convL4),
];

/* ---------- Immersion Detail: "From LinkedIn" (mentions the city) ---------- */
export const immersionPosts = (city: string): LiPost[] => [
  post('Shreya Patel', 'Analytics Manager, Paytm', a8, '2w', '1,412', '72 comments', `Coffee, a counter, and twenty people who all signed up for the same reason. From the Ground Up in ${city} was the best Saturday I have had this year.`, cafe),
  post('Ankur Nagar', 'Product Manager, Swiggy', a2, '3w', '986', '48 comments', `It was a superb event! Learned more about where my morning coffee comes from in two hours than in ten years of drinking it. Thank you upGrad for bringing this to ${city}.`, im3Voices),
  post('Meera Pillai', 'Founder, Studio Kaapi', a7, '1mo', '2,031', '118 comments', 'Watching the founder brew live, right at the counter, and then tasting the same beans three different ways. Already asking when the next one is.', im3First),
];

/* ---------- LinkedIn Posts page ----------
   The design loads these from linkedin-posts.js, which wasn't in the handoff. Until it arrives, the page
   collects the posts already used elsewhere in the design. */
export type PostTag = 'Convocation' | 'Immersion' | 'Career' | 'Learning';
export const POST_FILTERS = ['All', 'Convocation', 'Immersion', 'Career', 'Learning'] as const;

/** Tag a post by its text, as the design does. */
export const tagFor = (t: string): PostTag =>
  /convocation|walk across the stage|walked the stage|degree|cohort, in one frame/i.test(t) ? 'Convocation'
  : /campus|immersion|in person|meetup|mixer|from the ground up/i.test(t) ? 'Immersion'
  : /promot|salary|role|lead the team/i.test(t) ? 'Career'
  : 'Learning';

const RAW: [string, string, StaticImageData | null, string, StaticImageData | null][] = [
  ...VOICES.map(v => [v.name, v.role, v.av, v.text, null] as [string, string, StaticImageData | null, string, null]),
  ['Nisha Nair', 'Growth Manager, Zomato', a8, 'My parents flew in for this. They watched me study on a laptop for two years. Today they watched me walk across the stage at IIT Bombay.', convL2],
  ['Harish Bhat', 'Data Engineer, PhonePe', a5, 'Met my study group in person for the first time at IIIT Bangalore. Eighteen months of late-night calls, and they are exactly who I thought they would be.', convL5],
  ['Divya Krishnan', 'UX Designer, Zoho', a3, 'Degree in hand. Framing this one.', convP2],
  ['Rohan Menon', 'Marketing Lead, Nykaa', a6, 'Class of 2026, in one frame. A year of breakout rooms and late-night group calls, and today we finally stood next to each other.', convL4],
  ['Priya Raman', 'Product Analyst, Freshworks', a3, 'Finally got to ask the questions I had been saving up all term. Two hours with faculty on campus was worth more than a month of forum threads.', im2],
  ['Karan Malhotra', 'Consultant, Deloitte', a1, 'The mentor who marked every one of my assignments, answering my questions face to face. Strange and brilliant in equal measure.', im3],
  ['Meera Pillai', 'Founder, Studio Kaapi', a7, 'Did not expect the founders to show up and spend an hour listening to what our cohort is building. They took notes.', im4],
  ['Vikram Desai', 'Engineering Manager, Razorpay', a2, 'One week, one campus, and a group photo that finally has everyone in it. See you all at convocation.', im5],
  ['Ananya Nair', 'HR Business Partner, Wipro', null, 'Met the team behind the programme today. You can tell they built it for people like us, juggling a job and a family.', im1],
  ['Shreya Patel', 'Analytics Manager, Paytm', a8, 'Coffee, a counter, and twenty people who all signed up for the same reason. From the Ground Up was the best Saturday I have had this year.', cafe],
];
const DATES = ['2d', '5d', '1w', '1w', '2w', '3w'];
const LIKES = ['1,284', '962', '2,031', '1,756', '874', '1,412'];
const COMMENTS = ['64 comments', '41 comments', '118 comments', '93 comments', '37 comments', '72 comments'];
export const ALL_POSTS: (LiPost & { tag: PostTag })[] = RAW.map(([name, role, av, text, photo], k) => ({
  ...post(name, role, av, DATES[k % 6], LIKES[k % 6], COMMENTS[k % 6], text, photo), tag: tagFor(text),
}));

/* ---------- Study Abroad Stories ---------- */
export const ABROAD_STORY_POSTS: LiPost[] = [
  post('Harish Bhat', 'Data Engineer, PhonePe', a5, '12 Aug 2026', '1,528', '78 comments', "A thank-you I've been putting off. When I enrolled I was sceptical. I'd tried online courses before and finished none of them. The difference this time was the mentor calls. Having someone check in every fortnight, who actually read my submissions, changed everything. I finished. First time ever.", saV0),
  post('Neha Joshi', 'HR Business Partner, Wipro', a3, '3 Aug 2026', '964', '41 comments', 'Just back from campus immersion week. Meeting 60 people from my cohort after a year of little squares on a screen. I did not expect it to matter this much. It did.', saV3),
  post('Sneha Gupta', 'Operations Manager, Delhivery', a1, '28 Jul 2026', '1,102', '56 comments', "If you're a working professional scared of quitting your job for a master's: this format works. I kept my salary, my role, and still finished.", null),
  post('Nisha Nair', 'Growth Manager, Zomato', a8, '19 Jul 2026', '2,310', '134 comments', 'People keep asking if the programme is worth it, so, publicly: yes, if you do the work. No, if you want a certificate to happen to you.', saV5),
  post('Lakshmi Reddy', 'Data Engineer, PhonePe', a4, '8 Jul 2026', '1,847', '92 comments', 'Walked the stage today. Two years of weekend classes, assignments submitted at midnight after putting the kids to bed, and one very patient family.', saV6),
  post('Aman Kapoor', 'MS Data Science, Germany', a6, '2 Jul 2026', '1,231', '67 comments', 'First week in Berlin. The year I spent studying online before flying out meant I walked into class already knowing half the material.', saPlane),
  post('Riya Sethi', 'MBA candidate, Dublin', null, '24 Jun 2026', '876', '39 comments', 'Visa approved. Twelve months of evenings, one very long document checklist, and a counsellor who answered every one of my 2am emails.', null),
  post('Kunal Shah', 'MS Computer Science, USA', a0, '15 Jun 2026', '1,644', '88 comments', 'Started the programme from Pune. Finishing it in Arizona. Same laptop, very different view.', saV1),
];

export type AbroadStory = { kind: 'post'; post: LiPost } | { kind: 'video'; video: (typeof ABROAD_VIDEOS)[number] };
/** Posts and videos interleaved, post first, as in the design. */
export const ABROAD_STORIES_MIXED: AbroadStory[] = Array.from({ length: Math.max(ABROAD_STORY_POSTS.length, ABROAD_VIDEOS.length) }).flatMap((_, i) => [
  ...(ABROAD_STORY_POSTS[i] ? [{ kind: 'post' as const, post: ABROAD_STORY_POSTS[i] }] : []),
  ...(ABROAD_VIDEOS[i] ? [{ kind: 'video' as const, video: ABROAD_VIDEOS[i] }] : []),
]);
