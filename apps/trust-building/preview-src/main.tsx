import '../src/app/globals.css';
import { useEffect, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from '../src/app/page';
import ConvocationDetail from '../src/app/convocation/[slug]/page';
import ImmersionDetail from '../src/app/immersion/[slug]/page';
import ConvocationStories from '../src/app/convocation/page';
import ImmersionEvents from '../src/app/immersion/page';
import LinkedInPosts from '../src/app/posts/page';
import StudyAbroadStories from '../src/app/study-abroad/page';
import { parse, type Listing, type Route } from './router';

const LIST_PAGES: Record<Listing, () => ReactNode> = {
  convocation: ConvocationStories,
  immersion: ImmersionEvents,
  posts: LinkedInPosts,
  'study-abroad': StudyAbroadStories,
};

document.documentElement.classList.add('js');

function Detail({ route }: { route: Extract<Route, { page: 'convocation' | 'immersion' }> }) {
  const [el, setEl] = useState<ReactNode>(null);
  useEffect(() => {
    const Page = route.page === 'convocation' ? ConvocationDetail : ImmersionDetail;
    let live = true;
    Page({ params: Promise.resolve({ slug: route.slug }) })
      .then(node => { if (live) setEl(node); })
      .catch(() => { location.hash = ''; });
    return () => { live = false; };
  }, [route.page, route.slug]);
  return <>{el}</>;
}

function App() {
  const [route, setRoute] = useState<Route>(() => parse(location.hash));
  useEffect(() => {
    const sync = (anchor?: string) => {
      const r = parse(location.hash);
      setRoute(r);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const target = anchor ? document.getElementById(anchor) : null;
        window.scrollTo(0, target ? target.getBoundingClientRect().top + window.scrollY : 0);
      }));
    };
    const onNav = (e: Event) => sync((e as CustomEvent<string>).detail);
    // Back/forward between pages. Plain "#" placeholder links also fire this; ignore them on the landing page.
    const onPop = () => {
      const r = parse(location.hash);
      if (r.page === 'home' && document.getElementById('p5-hero')) return;
      sync(r.page === 'home' ? location.hash.slice(1) : '');
    };
    window.addEventListener('preview:navigate', onNav);
    window.addEventListener('popstate', onPop);
    return () => { window.removeEventListener('preview:navigate', onNav); window.removeEventListener('popstate', onPop); };
  }, []);
  if (route.page === 'home') return <Home key="home" />;
  if (route.page === 'list') { const Page = LIST_PAGES[route.list]; return <Page key={route.list} />; }
  return <Detail key={`${route.page}-${route.slug}`} route={route} />;
}

createRoot(document.getElementById('app')!).render(<App />);
