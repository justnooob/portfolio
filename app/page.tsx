import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Logos from '@/components/Logos';
import Featured from '@/components/Featured';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Logos />
      <Featured />
      <Projects />
      <Experience />
      <FinalCta />
      <Footer />
    </main>
  );
}
