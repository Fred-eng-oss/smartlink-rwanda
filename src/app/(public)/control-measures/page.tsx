import React from "react";
import {
  Clock,
  MapPin,
  Compass,
  Handshake,
  Package,
  ShieldAlert,
  Crosshair,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Control Measures",
  description: "Operational control measures for effective force coordination and movement control.",
};

const controlMeasures = [
  {
    sn: 1,
    measure: "Key Timings",
    icon: Clock,
    details: [
      "For the smooth running of the operation the following are key timings to be observed throughout op:",
      { label: "a.", text: "Time start planning was on 191800B Jun 26." },
      { label: "b.", text: "The ops are to start on 241800B Jun 26." },
      { label: "c.", text: "The ops are to end on 291100B Jun 26." },
      { label: "d.", text: "Debriefing 291800B Jun 26." },
    ],
  },
  {
    sn: 2,
    measure: "Key Locs",
    icon: MapPin,
    details: [
      "During the op the following locations should be emphasized on:",
      { label: "a.", text: "RPU HQ remain in current location" },
      { label: "b.", text: "All DPUs to remain in current locations" },
    ],
  },
  {
    sn: 3,
    measure: "Boundaries",
    icon: Compass,
    details: [
      "For effective force coordination and movement control the following are boundaries for the purpose of op:",
      { label: "a.", text: "Area of Operation. Eastings 27 - 68, Northings 29-84 which lies with boundaries of Eastern Province." },
      { label: "b.", text: "Demarcations. Northern Province. GICUMBI and GATSIBO, Western Province. City Of KIGALI, Southern Province BURUNDI, Eastern Province. TANZANIA." },
    ],
  },
  {
    sn: 4,
    measure: "Liaison",
    icon: Handshake,
    details: [
      "Operation to be successful the following are mandatory: mutual respect, discipline, teamwork, unit cohesion and will and sharing information through joint cooperation",
    ],
  },
  {
    sn: 5,
    measure: "Sustainment Measures",
    icon: Package,
    details: [
      { label: "a.", text: "Log Locs. To remain at RPU HQs" },
      { label: "b.", text: "Medical plans. Pers to carry first aid kit, all casualties to be attended to by medical pers at DPUs and Police Stations." },
      { label: "c.", text: "Serious cases. To be referred at respective District Hospitals while critical cases to be evacuated to level 5 Hospitals at CHUK." },
    ],
  },
  {
    sn: 6,
    measure: "Restricted Areas",
    icon: ShieldAlert,
    details: [
      "Some areas in our area of operation are densely populated and contain vulnerable people and places such as hospitals, health centers, schools, markets, churches and taxi parking yards. There is a need to prevent any harm from there during operations.",
    ],
  },
  {
    sn: 7,
    measure: "Directing Use of Force (DUF)",
    icon: Crosshair,
    details: [
      "During the operation, the use of force shall be guided by the principles of PLAN (Proportionality, Legality, Accountability, and Necessity):",
      { label: "a.", text: "Proportionality. Officers shall apply only the level of force that is reasonable and proportionate to the subject's actions, behavior, and the threat presented." },
      { label: "b.", text: "Legality. Officers shall ensure that any force used is lawful and justified under the circumstances." },
      { label: "c.", text: "Accountability. All force incidents shall be reported, documented, and subject to review in accordance with established procedures." },
      { label: "d.", text: "Necessity. Force shall only be used when necessary to achieve a legitimate law-enforcement or operational objective." },
    ],
  },
];

export default function ControlMeasuresPage() {
  return (
    <div className="space-y-0 pb-20">
      {/* HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#071A35] via-[#0D2847] to-[#0F62FE] py-20 sm:py-28 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,98,254,0.25),transparent)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A86B]/10 rounded-full blur-3xl -ml-20 -mb-20" />
        <div className="absolute top-20 right-[20%] w-16 h-16 border border-white/10 rounded-2xl rotate-45" />
        <div className="absolute bottom-32 left-[12%] w-10 h-10 border border-white/10 rounded-xl rotate-12" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block text-xs font-bold bg-white/10 text-white rounded-full px-4 py-2 uppercase tracking-widest border border-white/20 mb-6">
            Operations
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-tight">
            Control Measures
          </h1>
          <p className="text-white/60 text-sm sm:text-base mt-5 max-w-2xl mx-auto leading-relaxed">
            Operational control measures for effective force coordination, movement control, and mission success.
          </p>
        </div>
      </section>

      {/* CONTROL MEASURES TABLE */}
      <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-bold bg-blue-50 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
              Operational Directives
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
              Control Measures Overview
            </h2>
            <p className="text-sm text-[#64748B] dark:text-slate-400">
              Detailed directives governing all aspects of the operation from planning through execution.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-[#071A35] to-[#0D2847]">
                  <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider w-16">S/N</th>
                  <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider w-56">Measures</th>
                  <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-700/50">
                {controlMeasures.map((item) => (
                    <tr
                      key={item.sn}
                      className="bg-[#F8FAFC] dark:bg-[#071A35] hover:bg-[#0F62FE]/5 dark:hover:bg-[#0D2847]/50 transition-colors"
                    >
                    <td className="px-6 py-5 text-sm font-bold text-[#0F62FE] align-top">
                      {item.sn}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#0F62FE]/10 rounded-xl text-[#0F62FE] shrink-0">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                          {item.measure}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#64748B] dark:text-slate-400 leading-relaxed align-top">
                      {item.details.map((detail, idx) => {
                        if (typeof detail === "string") {
                          return (
                            <p key={idx} className="mb-2">
                              {detail}
                            </p>
                          );
                        }
                        return (
                          <p key={idx} className="mb-1.5 ml-4">
                            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                              {detail.label}
                            </span>{" "}
                            {detail.text}
                          </p>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {controlMeasures.map((item) => (
              <div
                key={item.sn}
                className="bg-[#F8FAFC] dark:bg-[#071A35] rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#071A35] to-[#0D2847] px-6 py-4 flex items-center gap-3">
                  <span className="text-sm font-bold text-[#0F62FE] bg-white/10 px-2.5 py-1 rounded-lg">
                    {item.sn}
                  </span>
                  <div className="p-2 bg-white/10 rounded-xl text-[#0F62FE]">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.measure}</h3>
                </div>
                <div className="px-6 py-5 text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                  {item.details.map((detail, idx) => {
                    if (typeof detail === "string") {
                      return (
                        <p key={idx} className="mb-2">
                          {detail}
                        </p>
                      );
                    }
                    return (
                      <p key={idx} className="mb-1.5 ml-4">
                        <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                          {detail.label}
                        </span>{" "}
                        {detail.text}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#071A35] py-20 sm:py-28 select-none">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
              Need More Information?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Contact SmartLink Rwanda for additional operational support and coordination details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="bg-[#0F62FE] hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="bg-transparent border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/10 transition-all text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
