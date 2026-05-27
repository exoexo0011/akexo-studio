import { motion } from 'framer-motion';
import { Globe, Smartphone, Sparkles, Workflow, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';

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
  },
  {
    icon: Globe,
    title: 'Websites',
    code: 'SVC_01',
    desc: 'Marketing sites, portfolios, and landing pages that turn visitors into clients. I build them in Next.js, push them to the Vercel edge, and they load in under a second.',
    features: ['Next.js / React', 'CMS integration', 'Edge deploy'],
    span: '',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    code: 'SVC_02',
    desc: 'iOS and Android apps that feel native. I take you from idea to App Store with the backend, auth, and Stripe payments already wired up. One codebase, two stores.',
    features: ['React Native', 'Expo / EAS', 'iOS + Android'],
    span: '',
  },
  {
    icon: Workflow,
    title: 'Automation',
    code: 'SVC_04',
    desc: 'I turn four hours of manual work into a four-second workflow. Built on N8N, Zapier, or custom Node scripts and synced to your CRM, your inbox, and the AI you already pay for.',
    features: ['N8N / Zapier', 'API plumbing', 'AI-driven flows'],
    span: 'md:col-span-2',
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
                className={`glass relative flex flex-col gap-6 ${
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

                {s.featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-6 bottom-6 opacity-30 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight size={28} className="text-matrix" />
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
