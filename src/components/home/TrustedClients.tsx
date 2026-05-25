import React from "react";

export default function TrustedClients() {
  const clients = [
    "Alembic Pharma",
    "Piramal Healthcare",
    "Ford India",
    "Cadila Healthcare",
    "Jubilant Organosys",
    "ONGC Hazira",
    "Hero MotoCorp",
    "Suzuki Gujarat",
    "Glenmark Dahej",
    "L&T ECC Division",
  ];

  // Duplicate for smooth infinite marquee
  const repeatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-white overflow-hidden border-b border-gray-100">
      <div className="section-container mb-8 text-center">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
          Trusted by Industry Leaders
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center group-hover:pause">
          {repeatedClients.map((client, idx) => (
            <div
              key={idx}
              className="mx-8 px-8 py-4 bg-gray-50 border border-gray-100 rounded-xl font-display font-bold text-gray-400 text-lg sm:text-xl hover:text-navy hover:bg-white hover:shadow-lg transition-all cursor-default"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
