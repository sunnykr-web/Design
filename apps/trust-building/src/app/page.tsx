import { Grain } from '@/components/Grain';
import { Magnetic } from '@/components/Magnetic';
import { Preloader } from '@/components/Preloader';
import { RevealObserver } from '@/components/RevealObserver';
import { Close, Footer } from '@/components/landing/Close';
import { Convocation } from '@/components/landing/Convocation';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Immersion } from '@/components/landing/Immersion';
import { Manifesto } from '@/components/landing/Manifesto';
import { StudyAbroad } from '@/components/landing/StudyAbroad';
import { Voices } from '@/components/landing/Voices';

export default function Home() {
  return (
    <div style={{ width: '100%', overflowX: 'clip', background: 'var(--ink)' }}>
      <Preloader />
      <Grain />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Convocation />
        <StudyAbroad />
        <Immersion />
        <Voices />
        <Close />
      </main>
      <Footer />
      <RevealObserver />
      <Magnetic />
    </div>
  );
}
