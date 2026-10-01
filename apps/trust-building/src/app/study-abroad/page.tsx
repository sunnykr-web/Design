import type { Metadata } from 'next';
import { AbroadFeed } from '@/components/pages/AbroadFeed';
import { ListingPage } from '@/components/pages/ListingParts';

export const metadata: Metadata = { title: 'Study abroad stories · upGrad' };

export default function StudyAbroadStories() {
  return (
    <ListingPage
      back="/#p5-abroad"
      tight
      eyebrow="Study abroad · All stories"
      lines={[{ text: 'Study abroad' }, { text: 'When the classroom got a passport.', italic: true }]}
      lede="Some learners took their programme further than their desk. These are the videos they recorded and the posts they wrote from the other side."
    >
      <AbroadFeed />
    </ListingPage>
  );
}
