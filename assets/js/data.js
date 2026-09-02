/* WALL OF VOICES — prototype data
   Content transcribed verbatim from Figma node 74:2293 (file 13hMVjIUc9X1sKOfVHmSc1).
   Sample data throughout; nothing here is a cleared learner record. */

/* The post bodies are a shared pool — the same texts recur across the archive,
   the Act I band and the homepage marquee exactly as they do in the design. */
const WOV_BODIES = {
  convocation_quiet:
    'Received my degree at the convocation ceremony today. Quietly proud.',
  buddy_group:
    "Grateful post. My buddy group from the programme still meets on a call every Sunday, eight months after graduating. That wasn't in the brochure.",
  working_professional:
    "If you're a working professional thinking about a master's but scared of quitting your job — this format works. I kept my salary, my role, and still finished. Happy to answer questions in the comments.",
  immersion_week:
    'Just back from the campus immersion week. Meeting 60 people from my cohort in person after a year of seeing them in little squares on a screen — I did not expect it to matter this much. It did.',
  promotion:
    'Six months ago I finished the programme. Today I got promoted to lead the team I used to report to. Connecting those dots publicly because someone told me their story like this one when I needed it.',
  walked_the_stage:
    "Walked the stage today. \u{1F393} Two years of weekend classes, assignments submitted at midnight after putting the kids to bed, and one very patient family. The convocation at the campus made every bit of it feel real. To everyone still in the middle of it: it ends, and it's worth it.",
  thank_you_mentor:
    "A thank-you I've been putting off. When I enrolled I was sceptical — I'd tried online courses before and finished none of them. The difference this time was the mentor calls. Having someone check in every fortnight, who actually read my submissions, changed everything. Thank you to my mentor and the whole student success team. I finished. First time ever.",
  honest_review:
    'Honest review after finishing: the projects are the point. Skip the videos if you must, never skip the projects. Recommended.',
  worth_it:
    "People keep DMing me asking if the programme is worth it, so, answering publicly: Yes, if you do the work. No, if you want a certificate to happen to you. The content is strong, the mentorship is real, and the job support is better than I expected. But it's 12–15 hours a week, genuinely. Plan for that.",
  first_model:
    "Milestone: my first machine learning model went to production today at work. Two years ago I couldn't write a line of Python. Leaving this here for the version of me who almost didn't enrol.",
  convocation_parents:
    "Convocation day. My parents never went to college. Today they watched me collect a master's degree. That photo of my father holding my certificate is worth more than the degree itself.",
  immersion_done:
    'Campus immersion done. Highlight: presenting our capstone to actual faculty and getting grilled for 40 minutes. Lowlight: it ending.',
  three_days:
    "Spent three days on campus this week for the immersion module. The case discussions ran past midnight and nobody wanted to leave. Whatever they're putting in the coffee there, I want some."
};

/* ---------------------------------------------------------------- archive
   Reading order across the four columns of the design's masonry, so the
   shortest-column placement in app.js reproduces the Figma layout. */
const WOV_ARCHIVE = [
  { id: 'a01', name: 'Ritika Menon',   role: 'Data Engineer',              company: 'PhonePe',          date: 'Aug 2026', body: 'working_professional', reactions: 2210, comments: 17, media: false, category: 'recommendation', clamp: false },
  { id: 'a02', name: 'Ananya Sharma',  role: 'Senior Software Engineer',   company: 'Infosys',          date: 'Aug 2026', body: 'immersion_week',       reactions: 568,  comments: 11, media: false, category: 'on-campus',      clamp: false },
  { id: 'a03', name: 'Aditya Iyer',    role: 'Supply Chain Manager',       company: 'Reliance Retail',  date: 'Aug 2026', body: 'convocation_quiet',    reactions: 1925, comments: 23, media: false, category: 'convocation',    clamp: false },
  { id: 'a04', name: 'Ananya Nair',    role: 'HR Business Partner',        company: 'Wipro',            date: 'Aug 2026', body: 'buddy_group',          reactions: 1682, comments: 7,  media: true,  category: 'thank-you',      clamp: false },
  { id: 'a05', name: 'Sneha Gupta',    role: 'Operations Manager',         company: 'Delhivery',        date: 'Aug 2026', body: 'working_professional', reactions: 2250, comments: 14, media: true,  category: 'recommendation', clamp: false },
  { id: 'a06', name: 'Sanjay Nair',    role: 'Business Analyst',           company: 'Deloitte',         date: 'Aug 2026', body: 'convocation_quiet',    reactions: 638,  comments: 50, media: false, category: 'convocation',    clamp: false },
  { id: 'a07', name: 'Nikhil Iyer',    role: 'Product Manager',            company: 'Swiggy',           date: 'Aug 2026', body: 'promotion',            reactions: 2264, comments: 21, media: false, category: 'milestone',      clamp: false },
  { id: 'a08', name: 'Neha Joshi',     role: 'HR Business Partner',        company: 'Wipro',            date: 'Aug 2026', body: 'immersion_week',       reactions: 585,  comments: 67, media: false, category: 'on-campus',      clamp: false },
  { id: 'a09', name: 'Lakshmi Reddy',  role: 'Data Engineer',              company: 'PhonePe',          date: 'Aug 2026', body: 'walked_the_stage',     reactions: 1591, comments: 66, media: true,  category: 'convocation',    clamp: false },
  { id: 'a10', name: 'Harish Bhat',    role: 'Data Engineer',              company: 'PhonePe',          date: 'Aug 2026', body: 'thank_you_mentor',     reactions: 1528, comments: 78, media: false, category: 'thank-you',      clamp: true  },
  { id: 'a11', name: 'Rohan Menon',    role: 'Marketing Lead',             company: 'Nykaa',            date: 'Aug 2026', body: 'immersion_week',       reactions: 329,  comments: 7,  media: true,  category: 'on-campus',      clamp: false },
  { id: 'a12', name: 'Lakshmi Iyer',   role: 'Sales Head',                 company: 'Asian Paints',     date: 'Aug 2026', body: 'buddy_group',          reactions: 1471, comments: 73, media: false, category: 'thank-you',      clamp: false },
  { id: 'a13', name: 'Arjun Saxena',   role: 'Operations Manager',         company: 'Delhivery',        date: 'Aug 2026', body: 'honest_review',        reactions: 1851, comments: 80, media: true,  category: 'recommendation', clamp: false },
  { id: 'a14', name: 'Nisha Nair',     role: 'Growth Manager',             company: 'Zomato',           date: 'Aug 2026', body: 'worth_it',             reactions: 2430, comments: 15, media: false, category: 'recommendation', clamp: true  },
  { id: 'a15', name: 'Aditya Sharma',  role: 'Scrum Master',               company: 'Tech Mahindra',    date: 'Aug 2026', body: 'thank_you_mentor',     reactions: 1310, comments: 57, media: false, category: 'thank-you',      clamp: true  }
];

/* ------------------------------------------------------- Act I ghost band */
const WOV_ACT_ONE = [
  { name: 'Gaurav Joshi',  role: 'QA Lead',                   company: 'Cognizant',         date: 'Jun 2026', body: 'convocation_parents', reactions: 646,  comments: 45, media: true,  clamp: false },
  { name: 'Aditya Reddy',  role: 'Supply Chain Manager',      company: 'Reliance Retail',   date: 'Jul 2026', body: 'immersion_done',      reactions: 2219, comments: 54, media: false, clamp: false },
  { name: 'Deepak Menon',  role: 'Data Engineer',             company: 'PhonePe',           date: 'Jun 2026', body: 'thank_you_mentor',    reactions: 1006, comments: 90, media: false, clamp: true  },
  { name: 'Divya Patel',   role: 'Cloud Architect',           company: 'TCS',               date: 'Apr 2026', body: 'worth_it',            reactions: 1816, comments: 42, media: false, clamp: true  },
  { name: 'Nisha Bhat',    role: 'HR Business Partner',       company: 'Wipro',             date: 'Jan 2026', body: 'buddy_group',         reactions: 2163, comments: 65, media: false, clamp: false },
  { name: 'Divya Joshi',   role: 'Senior Software Engineer',  company: 'Infosys',           date: 'Jun 2026', body: 'walked_the_stage',    reactions: 862,  comments: 36, media: false, clamp: false },
  { name: 'Rahul Reddy',   role: 'Cloud Architect',           company: 'TCS',               date: 'Apr 2026', body: 'three_days',          reactions: 428,  comments: 38, media: false, clamp: false },
  { name: 'Rohan Nair',    role: 'Senior Software Engineer',  company: 'Infosys',           date: 'Mar 2026', body: 'worth_it',            reactions: 668,  comments: 71, media: true,  clamp: true  },
  { name: 'Sneha Chopra',  role: 'Supply Chain Manager',      company: 'Reliance Retail',   date: 'Aug 2026', body: 'first_model',         reactions: 2048, comments: 75, media: false, clamp: false }
];

/* --------------------------------------------- hero: five blurred posts + one */
const WOV_HERO_FAN = [
  { name: 'Divya Patel',   role: 'Cloud Architect',          company: 'TCS',              date: 'Apr 2026', body: 'worth_it',         reactions: 1816, comments: 42, media: true,  clamp: true  },
  { name: 'Nisha Bhat',    role: 'HR Business Partner',      company: 'Wipro',            date: 'Jan 2026', body: 'buddy_group',      reactions: 2163, comments: 65, media: true,  clamp: false },
  { name: 'Gaurav Joshi',  role: 'QA Lead',                  company: 'Cognizant',        date: 'Jun 2026', body: 'convocation_parents', reactions: 646, comments: 45, media: true, clamp: false },
  { name: 'Rahul Reddy',   role: 'Cloud Architect',          company: 'TCS',              date: 'Apr 2026', body: 'three_days',       reactions: 428,  comments: 38, media: true,  clamp: false },
  { name: 'Sneha Chopra',  role: 'Supply Chain Manager',     company: 'Reliance Retail',  date: 'Aug 2026', body: 'first_model',      reactions: 2048, comments: 75, media: true,  clamp: false }
];

const WOV_HERO_CARD = {
  name: 'Gunavardhan Dandi',
  headline: 'Mendix Advanced Certified Developer · TCS',
  date: '12 Aug 2025',
  paragraphs: [
    'Thrilled to officially graduate with my Executive Post Graduate Diploma in Software Development from IIIT Bangalore.',
    'Balancing a full-time role with a rigorous architecture curriculum was hard, and worth every weekend it cost me.'
  ],
  reactions: '342',
  comments: '41 comments'
};

/* ------------------------------------------------------- homepage band */
const WOV_BAND = [
  { name: 'Aditya Iyer',    role: 'Supply Chain Manager, Reliance Retail', body: 'convocation_quiet' },
  { name: 'Ananya Nair',    role: 'HR Business Partner, Wipro',            body: 'buddy_group' },
  { name: 'Sneha Gupta',    role: 'Operations Manager, Delhivery',         body: 'working_professional' },
  { name: 'Sanjay Nair',    role: 'Business Analyst, Deloitte',            body: 'convocation_quiet' },
  { name: 'Ritika Menon',   role: 'Data Engineer, PhonePe',                body: 'working_professional' },
  { name: 'Ananya Sharma',  role: 'Senior Software Engineer, Infosys',     body: 'immersion_week' },
  { name: 'Nikhil Iyer',    role: 'Product Manager, Swiggy',               body: 'promotion' },
  { name: 'Neha Joshi',     role: 'HR Business Partner, Wipro',            body: 'immersion_week' },
  { name: 'Lakshmi Reddy',  role: 'Data Engineer, PhonePe',                body: 'walked_the_stage' },
  { name: 'Harish Bhat',    role: 'Data Engineer, PhonePe',                body: 'thank_you_mentor' },
  { name: 'Rohan Menon',    role: 'Marketing Lead, Nykaa',                 body: 'immersion_week' },
  { name: 'Lakshmi Iyer',   role: 'Sales Head, Asian Paints',              body: 'buddy_group' },
  { name: 'Isha Khan',      role: 'Business Analyst, Deloitte',            body: 'thank_you_mentor' },
  { name: 'Arjun Saxena',   role: 'Operations Manager, Delhivery',         body: 'honest_review' }
];
