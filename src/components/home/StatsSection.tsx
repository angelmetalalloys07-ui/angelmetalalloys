"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { label: "Year Est.", value: "2007" },
    { label: "MT/Month", value: "15+" },
    { label: "Countries", value: "30+" },
    { label: "Industries", value: "14+" },
    { label: "Variants", value: "500+" },
    { label: "Response", value: "24hr" },
  ];

  return (
    <section className="bg-navy border-b border-white/10 relative z-20">
      <div className="section-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#0f1929] border border-white/10 rounded-2xl p-6 text-center shadow-xl hover:bg-white/5 transition-colors"
            >
              <div className="text-3xl font-display font-bold text-gold mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-silver/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
