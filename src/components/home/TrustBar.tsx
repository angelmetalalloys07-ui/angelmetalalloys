import { Factory, ShieldCheck, Clock, MapPin, Users } from "lucide-react";

export default function TrustBar() {
  const items = [
    {
      icon: Factory,
      title: "In-House Manufacturing",
      subtitle: "State-of-the-art facility",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: ShieldCheck,
      title: "Quality Tested",
      subtitle: "100% Traceability & PMI",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Clock,
      title: "24hr Response",
      subtitle: "Fastest quote turnaround",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: MapPin,
      title: "Ahmedabad, Gujarat",
      subtitle: "Industrial hub of India",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      icon: Users,
      title: "Trusted Clients",
      subtitle: "500+ happy customers",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="bg-white py-8 border-b border-gray-100 shadow-sm relative z-20">
      <div className="section-container">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 min-w-[220px] flex-shrink-0 group cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.bg} ${item.color}`}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <div className="font-display font-bold text-navy text-sm mb-0.5">
                    {item.title}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
