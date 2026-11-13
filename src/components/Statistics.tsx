import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioConfig } from '../data/portfolioData';

interface CounterProps {
  end: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = performance.now();

    const update = () => {
      const now = performance.now();
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, end]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const Statistics: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#1F1F1F]">
          {portfolioConfig.statistics.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`flex flex-col justify-between pt-8 md:pt-0 ${
                idx > 0 ? 'md:pl-12' : ''
              }`}
            >
              <div>
                <div className="font-editorial text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#89AACC] to-[#4E85BF] mb-3 leading-none">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="font-editorial text-2xl text-[#F5F5F5] mb-2">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs font-mono text-[#878787] uppercase tracking-wider">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
