import { motion } from 'framer-motion';
import { Globe, Smartphone, Sparkles, Workflow } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';

const services = [
  {
    icon: Globe,
    title: 'Websites',
    code: 'SVC_01',
    desc: 'Marketing sites, portfolios, and landing pages that turn visitors into clients. I build them in Next.js, push them to the Vercel edge, and they load in under a second.',
    features: ['Next.js / React', 'CMS integration', 'Edge deploy'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    code: 'SVC_02',
    desc: 'iOS and Android apps that feel native. I take you from idea to App Store with the backend, auth, and Stripe payments already wired up. One codebase, two stores.',
    features: ['React Native', 'Expo / EAS', 'iOS + Android'],
  },
  {
    icon: Sparkles,
    title: 'AI Tools',
    code: 'SVC_03',
    desc: 'Custom AI products on top of GPT, Claude, and open models. Chatbots, generators, agents, RAG pipelines. I ship them with rate limits, fallbacks, and prompt logging so they hold up on day two.',
    features: ['LLM integration', 'RAG / Vector DB', 'Custom agents'],
  },
  {
    icon: Workflow,
    title: 'Automation',
    code: 'SVC_04',
    desc: 'I turn four hours of manual work into a four-second workflow. I build them on N8N, Zapier, or custom Node scripts and sync them to your CRM, your inbox, and the AI you already pay for.',
    features: ['N8N / Zapier', 'API plumbing', 'AI-driven flows'],
  },
];

const cardVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  return (
    <section id="services" className="relative section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          eyebrow="Services"
          title={<>What I build<span className="text-matrix">.</span></>}
          sub="Four disciplines, one operator. I write the design, the code, and the AI integration myself, so nothing gets lost in handoffs."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                whileHover={{ y: -6 }}
                className="glass relative flex h-full flex-col gap-6 p-7 group"
              >
                {/* matrix corner accent */}
                <div className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] tracking-[0.2em] text-bone/30 group-hover:text-matrix transition-colors">
                  {s.code}
                </div>

                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-matrix/15 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative inline-flex h-12 w-12 items-center justify-center border border-matrix/30 bg-matrix/5 text-matrix">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="display text-3xl text-bone">{s.title}</h3>

                <p className="font-body text-sm text-bone/60 leading-relaxed">
                  {s.desc}
                </p>

                <ul className="mt-auto space-y-1.5 border-t border-bone/10 pt-5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/55"
                    >
                      <span className="text-matrix">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
