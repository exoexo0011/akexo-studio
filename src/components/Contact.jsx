import { motion } from 'framer-motion';
import { Mail, Github, Instagram, AtSign, ArrowUpRight, Calendar } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';

const channels = [
  {
    label: 'Email',
    value: 'lordforpeace0011@gmail.com',
    href: 'mailto:lordforpeace0011@gmail.com',
    icon: Mail,
    handle: '/email',
  },
  {
    label: 'Instagram',
    value: '@akexo_ai',
    href: 'https://www.instagram.com/akexo_ai',
    icon: Instagram,
    handle: '/instagram',
  },
  {
    label: 'GitHub',
    value: 'exoexo0011',
    href: 'https://github.com/exoexo0011',
    icon: Github,
    handle: '/github',
  },
  {
    label: 'Threads',
    value: '@akexo_ai',
    href: 'https://www.threads.com/@akexo_ai',
    icon: AtSign,
    handle: '/threads',
  },
];

const variants = {
  hidden: { y: 24, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  return (
    <section id="contact" className="relative section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="05"
          eyebrow="Contact"
          title={
            <>
              Let's <span className="text-matrix">build</span> something.
            </>
          }
          sub="Pick the channel you live in. I reply within 24h on weekdays. Most calls turn into kickoff the same week."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* big call card */}
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-matrix relative overflow-hidden p-8 md:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-matrix/20 blur-3xl" />

            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-matrix" />
              Direct line
            </span>

            <h3 className="display text-5xl md:text-6xl text-bone mt-5 mb-5">
              Book a <span className="text-matrix">30-min</span> intro call.
            </h3>

            <p className="font-body text-bone/70 max-w-md mb-8">
              We'll map your project, lock scope, and you'll leave with a
              quote + delivery date. No pitch deck. No fluff.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:lordforpeace0011@gmail.com?subject=AKEXO%20—%20intro%20call&body=Hey%20Akexo%2C%0A%0AI'd%20like%20to%20book%20a%2030-min%20call%20about%20a%20project."
                className="btn-primary"
              >
                <Calendar size={16} />
                Book a call
              </a>
              <a
                href="mailto:lordforpeace0011@gmail.com"
                className="btn-ghost"
              >
                <Mail size={16} />
                Email me direct
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-matrix/20 pt-6 font-mono text-[11px] uppercase tracking-[0.2em]">
              <div className="flex flex-col gap-1">
                <span className="text-bone/40">Reply within</span>
                <span className="text-matrix">{'<'} 24h</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-bone/40">Timezone</span>
                <span className="text-bone">GMT, async-friendly</span>
              </div>
            </div>
          </motion.div>

          {/* channel list */}
          <div className="grid gap-4">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  custom={i}
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ x: 6 }}
                  className="glass group flex items-center gap-5 p-5 hover:border-matrix/40 transition-colors"
                >
                  <div className="relative inline-flex h-12 w-12 items-center justify-center border border-matrix/30 bg-matrix/5 text-matrix shrink-0">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
                      <span>{c.label}</span>
                      <span className="text-matrix">{c.handle}</span>
                    </div>
                    <div className="font-body text-bone text-base group-hover:text-matrix transition-colors truncate">
                      {c.value}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-bone/30 group-hover:text-matrix transition-colors shrink-0"
                  />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
