import type { Metadata } from 'next';
import { ListingPage } from '@/components/pages/ListingParts';
import { PostsFeed } from '@/components/pages/PostsFeed';
import { POST_COUNT_LABEL } from '@/lib/data/landing';

export const metadata: Metadata = { title: 'All posts · upGrad' };

export default function LinkedInPosts() {
  return (
    <ListingPage
      back="/#p5-words"
      tight
      eyebrow="In their own words · All posts"
      lines={[{ text: `${POST_COUNT_LABEL} learners wrote about us.` }, { text: 'We didn’t edit a word.', italic: true }]}
    >
      <PostsFeed />
    </ListingPage>
  );
}
