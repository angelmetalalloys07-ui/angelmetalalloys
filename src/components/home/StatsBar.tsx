import { COMPANY_STATS } from "@/types";

export default function StatsBar() {
  return (
    <section className="bg-navy py-0 -mt-1 relative z-10">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {COMPANY_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-8 flex flex-col items-center justify-center text-center border-white/10 ${
                i < COMPANY_STATS.length - 1 ? "border-r" : ""
              } ${i >= 2 ? "border-t lg:border-t-0" : ""}`}
            >
              <div className="counter-value mb-2">{stat.value}</div>
              <div className="text-silver/70 text-sm font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
