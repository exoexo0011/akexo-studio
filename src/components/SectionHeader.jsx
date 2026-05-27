import { motion } from 'framer-motion';

/**
 * Editorial section header — big serif numeral on the left, eyebrow + title +
 * sub on the right. Layout reads like a magazine chapter opener.
 */
export default function SectionHeader({ index, eyebrow, title, sub }) {
  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12 mb-14 md:mb-20 items-end">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="display-italic text-matrix text-7xl md:text-8xl leading-none block">
          {index}
        </span>
      </motion.div>

      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-3"
        >
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-matrix/60" />
            {eyebrow}
          </span>
          <h2 className="display text-bone text-5xl sm:text-6xl md:text-7xl max-w-3xl">
            {title}
          </h2>
        </motion.div>
        {sub && (
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-sm text-bone/65 font-body text-base leading-relaxed"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </div>
  );
}
