import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Pricing from './components/Pricing.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Marquee from './components/Marquee.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-bone scanlines">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <HowItWorks />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
