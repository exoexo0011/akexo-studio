import { motion } from 'framer-motion';

export default function SectionHeader({ index, eyebrow, title, sub }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-14 md:mb-20">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4"
      >
        <span className="eyebrow flex items-center gap-3">
          <span className="text-bone/40">{index}</span>
          <span className="h-px w-8 bg-matrix/60" />
          {eyebrow}
        </span>
        <h2 className="display text-5xl sm:text-6xl md:text-7xl text-bone max-w-3xl">
          {title}
        </h2>
      </motion.div>
      {sub && (
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md text-bone/55 font-body text-base leading-relaxed"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
