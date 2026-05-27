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
              Send me the <span className="text-matrix">brief</span>.
            </>
          }
          sub="Pick the channel you live in. I reply inside 24 hours on weekdays. Most intro calls turn into a kickoff that same week."
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
              Book the <span className="text-matrix">30-minute</span> intro call.
            </h3>

            <p className="font-body text-bone/70 max-w-md mb-8">
              We map your project, lock the scope, and price it on the call.
              You leave with a quote, a start date, and the kickoff on my
              calendar. No deck. No follow-up sales emails.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:lordforpeace0011@gmail.com?subject=AKEXO%20intro%20call&body=Hey%20Akexo%2C%0A%0AI%20want%20to%20book%20the%2030-minute%20intro%20call.%20Here%20is%20what%20I%20am%20building%3A"
                className="btn-primary"
              >
                <Calendar size={16} />
                Book the call
              </a>
              <a
                href="mailto:lordforpeace0011@gmail.com"
                className="btn-ghost"
              >
                <Mail size={16} />
                Email me
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-matrix/20 pt-6 font-mono text-[11px] uppercase tracking-[0.2em]">
              <div className="flex flex-col gap-1">
                <span className="text-bone/40">Reply window</span>
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
