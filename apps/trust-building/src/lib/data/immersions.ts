export type Immersion = {
  slug: string;
  city: string;
  place: string;
  title: string;
  alt: string;
  desc: string;
  facts: { k: string; v: string }[];
  brew: { d: string; t: string }[];
  about: string[];
  agenda: { d: string; t: string }[];
  /** The Luma event page. */
  url: string;
};

// Mirrors each Luma event page. Luma doesn't expose event dates, so none are shown yet.
// The cover is rebuilt in code (components/detail/ImmersionCover) from the design, so no Luma image is loaded.

const brew = [
  { d: '01', t: 'Discover how coffee travels from estates to your cup' },
  { d: '02', t: 'Watch the founder brew live, right at the counter' },
  { d: '03', t: 'Taste the same coffee brewed in different ways' },
  { d: '04', t: 'Meet interesting people and have a few good conversations' },
];
const facts = [{ k: 'Duration', v: '2 hours' }, { k: 'Where', v: 'A café counter' }, { k: 'Spots', v: '20 only' }];
const about = [
  'Ever wondered what happens between a coffee plant on an estate and the cup in your hand?',
  'Spend two hours at a café counter and get the full story, led by the founder of a specialty coffee spot who built the place from scratch.',
  'Come grab a cuppa, stay for the conversations, and leave knowing your coffee a little better.',
];
const agenda = (city: string) => [
  { d: 'Registration', t: 'Approval required. Your registration is subject to host approval.' },
  { d: 'Location', t: city + ', India. The exact address is shared once you register.' },
  { d: 'Hosted by', t: 'Vedanshi and Saral Purohit' },
  { d: 'Presented by', t: 'upGrad' },
];

export const IMMERSIONS: Immersion[] = (
  [
    ['chennai', 'Chennai', '2l8ql0s9', true],
    ['chandigarh', 'Chandigarh', '9pj9ynh8', true],
    ['ahmedabad', 'Ahmedabad', 'utusqyd1', false],
  ] as const
).map(([slug, city, id, surprise]) => ({
  slug,
  city,
  place: city + ', India · Food & Drink',
  title: 'From the Ground Up | ' + city,
  alt: 'From the Ground Up ' + city + ' event cover',
  desc: 'Coffee, but make it an experience. Two hours at a café counter with the founder of a specialty coffee spot. 20 spots only.',
  facts,
  brew,
  about: surprise ? [...about.slice(0, 2), 'The café and its name are a little surprise. You’ll find out once you’re in.', about[2]] : about,
  agenda: agenda(city),
  url: 'https://luma.com/' + id,
}));

export const immersionHref = (slug: string) => `/immersion/${slug}`;
