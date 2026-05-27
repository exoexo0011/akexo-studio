import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Sparkles, Workflow, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import ServiceModal from './ServiceModal.jsx';

const MAILTO = 'mailto:lordforpeace0011@gmail.com';

const services = [
  {
    icon: Sparkles,
    title: 'AI Tools',
    code: 'SVC_03',
    desc: 'Custom AI products on top of GPT, Claude, and open models. Chatbots, generators, agents, RAG pipelines. I ship them with rate limits, fallbacks, and prompt logging so they hold up on day two.',
    features: ['LLM integration', 'RAG / Vector DB', 'Custom agents', 'Eval + observability'],
    span: 'md:col-span-2 md:row-span-2',
    featured: true,
    detail: 'The flagship.',
    modal: {
      title: 'I Build AI Tools',
      description: [
        'AI tools are the new software layer — bespoke products built on top of GPT, Claude, and open models that turn a prompt into a working business asset.',
        'I build chatbots that actually answer, content generators tuned to your voice, automation pipelines that move data across your stack, and AI agents that take action without supervision.',
      ],
      howItWorks: [
        'You send a brief',
        'I design and build it',
        'You get a working AI tool in days',
      ],
      example:
        'Like the AI Content Creator I built — drop a topic, get a full week of viral content in 60 seconds.',
      cta: {
        label: 'Hire Me to Build Your AI Tool',
        href: MAILTO,
      },
    },
  },
  {
    icon: Globe,
    title: 'Websites',
    code: 'SVC_01',
    desc: 'Marketing sites, portfolios, and landing pages that turn visitors into clients. I build them in Next.js, push them to the Vercel edge, and they load in under a second.',
    features: ['Next.js / React', 'CMS integration', 'Edge deploy'],
    span: '',
    modal: {
      title: 'I Build Websites',
      description: [
        'Landing pages, portfolios, agency sites, SaaS marketing sites — built to convert, not to win design awards (though they often do both).',
        'Every site ships fast, scores green on Lighthouse, and is wired to whatever CMS or analytics stack you already trust.',
      ],
      howItWorks: [
        'You share your idea',
        'I design and build',
        'Live in days, not months',
      ],
      cta: {
        label: 'Get Your Website Built',
        href: MAILTO,
      },
    },
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    code: 'SVC_02',
    desc: 'iOS and Android apps that feel native. I take you from idea to App Store with the backend, auth, and Stripe payments already wired up. One codebase, two stores.',
    features: ['React Native', 'Expo / EAS', 'iOS + Android'],
    span: '',
    modal: {
      title: 'I Build Mobile Apps',
      description: [
        'PWA apps you install from a browser, React Native apps that ship to the App Store and Play Store, and installable mobile experiences that feel native on every device.',
        'One codebase, two stores, your users will never know it isn\u2019t built natively.',
      ],
      howItWorks: [
        'You send a brief',
        'I build it end to end',
        'I ship it straight to your phone',
      ],
      cta: {
        label: 'Get Your App Built',
        href: MAILTO,
      },
    },
  },
  {
    icon: Workflow,
    title: 'Automation',
    code: 'SVC_04',
    desc: 'I turn four hours of manual work into a four-second workflow. Built on N8N, Zapier, or custom Node scripts and synced to your CRM, your inbox, and the AI you already pay for.',
    features: ['N8N / Zapier', 'API plumbing', 'AI-driven flows'],
    span: 'md:col-span-2',
    modal: {
      title: 'I Build Automations',
      description: [
        'Inbox agents that triage and reply, content repurposers that turn one video into ten posts, lead scrapers that fill your pipeline overnight, calendar cleaners that protect your deep work.',
        'Built on N8N, Zapier, or custom Node scripts \u2014 wired into the tools you already pay for.',
      ],
      howItWorks: [
        'Describe what you want automated',
        'I build the agent',
        'It runs while you sleep',
      ],
      cta: {
        label: 'Automate Your Business',
        href: MAILTO,
      },
    },
  },
];

const cardVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  // activeService === null → no modal open. Otherwise it holds the full
  // service object (icon component included) so the modal can render
  // without re-looking-up the entry.
  const [activeService, setActiveService] = useState(null);

  return (
    <section id="services" className="relative section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          eyebrow="Services"
          title={
            <>
              What I <span className="display-italic text-matrix">build</span>.
            </>
          }
          sub="Four disciplines, one operator. I write the design, the code, and the AI integration myself, so nothing gets lost in handoffs."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[1fr] gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4 }}
                // Cards are now interactive — clicking (or hitting Enter /
                // Space when focused) opens the detail modal. role + tabIndex
                // promote the article to a button-equivalent for screen
                // readers and keyboard users without losing the semantic
                // <article> wrapper styling.
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Open details for ${s.title}`}
                onClick={() => setActiveService(s)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveService(s);
                  }
                }}
                className={`glass relative flex flex-col gap-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/60 ${
                  s.featured ? 'p-8 md:p-10' : 'p-7'
                } group ${s.span}`}
              >
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div
                      className={`relative inline-flex items-center justify-center rounded-2xl border border-violet/30 bg-violet/[0.08] text-matrix ${
                        s.featured ? 'h-16 w-16' : 'h-12 w-12'
                      }`}
                    >
                      <Icon size={s.featured ? 28 : 22} strokeWidth={1.5} />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-bone/40 group-hover:text-matrix transition-colors">
                    {s.code}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h3
                    className={`display text-bone ${
                      s.featured ? 'text-5xl md:text-7xl' : 'text-4xl'
                    }`}
                  >
                    {s.title}
                  </h3>
                  {s.detail && (
                    <span className="display-italic text-matrix text-2xl md:text-3xl">
                      {s.detail}
                    </span>
                  )}
                </div>

                <p
                  className={`font-body text-bone/65 leading-relaxed ${
                    s.featured ? 'text-base md:text-lg max-w-xl' : 'text-sm'
                  }`}
                >
                  {s.desc}
                </p>

                <ul
                  className={`mt-auto flex ${
                    s.featured ? 'flex-wrap gap-x-6 gap-y-2 pt-6' : 'flex-col gap-2 pt-5'
                  } border-t border-white/[0.08]`}
                >
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/65"
                    >
                      <span className="text-matrix">+</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Arrow indicator — visible on every card on hover so the
                    new "click to expand" affordance is obvious. The
                    featured card already had one anchored bottom-right;
                    keep that, and add a smaller top-right one to the
                    standard cards. */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute transition-opacity ${
                    s.featured
                      ? 'right-6 bottom-6 opacity-30 group-hover:opacity-100'
                      : 'right-5 top-5 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <ArrowUpRight
                    size={s.featured ? 28 : 18}
                    className="text-matrix"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Single modal instance, fed by the active service. createPortal
          inside ServiceModal handles mounting to document.body. */}
      <ServiceModal
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </section>
  );
}
