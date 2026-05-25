import { EXPORT_COUNTRIES } from "@/types";

// Country flag emoji helper
function getFlagEmoji(countryName: string): string {
  const flags: Record<string, string> = {
    USA: "🇺🇸", Canada: "🇨🇦", UK: "🇬🇧", Germany: "🇩🇪", France: "🇫🇷",
    Italy: "🇮🇹", Netherlands: "🇳🇱", Spain: "🇪🇸", Belgium: "🇧🇪",
    Australia: "🇦🇺", "New Zealand": "🇳🇿", UAE: "🇦🇪", "Saudi Arabia": "🇸🇦",
    Qatar: "🇶🇦", Kuwait: "🇰🇼", Oman: "🇴🇲", Bahrain: "🇧🇭",
    Singapore: "🇸🇬", Malaysia: "🇲🇾", Indonesia: "🇮🇩", Thailand: "🇹🇭",
    "South Korea": "🇰🇷", Japan: "🇯🇵", Taiwan: "🇹🇼", "South Africa": "🇿🇦",
    Nigeria: "🇳🇬", Kenya: "🇰🇪", Brazil: "🇧🇷", Mexico: "🇲🇽", Argentina: "🇦🇷",
  };
  return flags[countryName] ?? "🌍";
}

export default function GlobalPresence() {
  return (
    <section id="global" className="py-24 bg-brand-bg overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag justify-center">
            <span className="w-8 h-0.5 bg-gold" />
            Global Presence
            <span className="w-8 h-0.5 bg-gold" />
          </div>
          <h2 className="section-heading mb-4">
            Exporting to{" "}
            <span className="text-gradient-gold">30+ Countries</span> Worldwide
          </h2>
          <p className="section-desc mx-auto text-center">
            From our factory in Ahmedabad, Gujarat — we ship SS pipe fittings and flanges 
            to buyers across 6 continents.
          </p>
        </div>

        {/* Animated Marquee */}
        <div className="relative overflow-hidden mb-8">
          <div className="flex gap-4 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
            {[...EXPORT_COUNTRIES, ...EXPORT_COUNTRIES].map((country, i) => (
              <div
                key={`${country}-${i}`}
                className="flex-shrink-0 flex items-center gap-2.5 bg-white border border-gray-100 rounded-full px-5 py-2.5 shadow-sm"
              >
                <span className="text-xl">{getFlagEmoji(country)}</span>
                <span className="text-navy font-medium text-sm">{country}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG World Map placeholder + Stats */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {/* Map */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 flex items-center justify-center min-h-[280px]">
            <div className="text-center">
              {/* Simple SVG world representation */}
              <svg viewBox="0 0 800 400" className="w-full max-w-2xl opacity-70" fill="none">
                {/* Simplified continent blobs */}
                {/* Americas */}
                <ellipse cx="200" cy="170" rx="90" ry="120" fill="#e8edf5" stroke="#1a3a6b" strokeWidth="1.5" />
                {/* Europe */}
                <ellipse cx="400" cy="140" rx="60" ry="70" fill="#e8edf5" stroke="#1a3a6b" strokeWidth="1.5" />
                {/* Africa */}
                <ellipse cx="415" cy="250" rx="55" ry="80" fill="#e8edf5" stroke="#1a3a6b" strokeWidth="1.5" />
                {/* Asia */}
                <ellipse cx="570" cy="160" rx="110" ry="90" fill="#e8edf5" stroke="#1a3a6b" strokeWidth="1.5" />
                {/* Australia */}
                <ellipse cx="620" cy="280" rx="60" ry="45" fill="#e8edf5" stroke="#1a3a6b" strokeWidth="1.5" />
                {/* India marker */}
                <circle cx="543" cy="195" r="8" fill="#d4922a" className="animate-ping" style={{ animationDuration: "2s" }} />
                <circle cx="543" cy="195" r="5" fill="#d4922a" />
                <text x="555" y="190" fill="#0a1628" fontSize="11" fontWeight="600">Ahmedabad, India</text>
                {/* Export lines from India */}
                {[
                  [200, 160], [400, 135], [390, 230], [430, 245], [625, 150],
                  [600, 275], [220, 200], [410, 125],
                ].map(([x, y], i) => (
                  <line
                    key={i}
                    x1="543" y1="195" x2={x} y2={y}
                    stroke="#d4922a" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4"
                  />
                ))}
                {/* Destination dots */}
                {[
                  [200, 160], [200, 200], [390, 125], [390, 145], [420, 230],
                  [620, 145], [640, 175], [620, 280], [220, 195],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3.5" fill="#1a3a6b" opacity="0.7" />
                ))}
              </svg>
              <p className="text-gray-500 text-sm mt-2">Exporting from Ahmedabad to 30+ countries</p>
            </div>
          </div>

          {/* Stats column */}
          <div className="space-y-4">
            {[
              { region: "Middle East", countries: "UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain", count: "6+" },
              { region: "Europe", countries: "UK, Germany, France, Italy, Netherlands, Spain, Belgium", count: "7+" },
              { region: "Asia Pacific", countries: "Singapore, Malaysia, Australia, Japan, South Korea", count: "8+" },
              { region: "Americas", countries: "USA, Canada, Brazil, Mexico, Argentina", count: "5+" },
              { region: "Africa", countries: "South Africa, Nigeria, Kenya", count: "4+" },
            ].map((region) => (
              <div key={region.region} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gold/30 transition-colors group">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-bold text-navy text-sm group-hover:text-gold transition-colors">
                    {region.region}
                  </h4>
                  <span className="text-gold font-bold text-sm">{region.count} countries</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{region.countries}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
