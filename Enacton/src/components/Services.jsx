import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, ShieldCheck } from "lucide-react";

const SERVICES = [
  {
    icon: Sparkles,
    title: "AI & Automation",
    desc: "Architecting autonomous agents and intelligent workflows that reduce friction and scale operations.",
    tags: ["LLM Integration", "Autonomous Agents", "Custom Models"],
  },
  {
    icon: Layers,
    title: "Product Engineering",
    desc: "Full-stack web & mobile apps engineered for sub-second performance, high reliability, and beauty.",
    tags: ["React & Next.js", "React Native", "High Scale API"],
  },
  {
    icon: Cpu,
    title: "Cloud & DevOps",
    desc: "Resilient infrastructure, CI/CD pipelines, and automated cloud deployments built for high concurrency.",
    tags: ["AWS / GCP", "Kubernetes", "Zero Downtime"],
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Systems",
    desc: "Modernizing legacy architectures into modular, secure, and observable cloud-native solutions.",
    tags: ["Architecture", "Security Audit", "Microservices"],
  },
];

export const Services = () => {
  return (
    <section className="relative z-10 py-28 md:py-40 bg-[#faf8f5] border-t border-black/5" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C2612B] mb-4 block">
            / Core Capabilities
          </p>
          <h2 className="text-4xl md:text-6xl font-medium font-outfit text-ink tracking-tight leading-[0.95]">
            Crafting software with engineering precision
          </h2>
          <p className="mt-6 text-base md:text-lg text-ink/60 font-light max-w-xl">
            We partner with ambitious startups and forward-thinking enterprises to design and build state-of-the-art digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                data-testid={`service-card-${idx}`}
                className="group relative p-8 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C2612B]/10 flex items-center justify-center text-[#C2612B] mb-6 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-ink mb-3 font-outfit tracking-tight">{item.title}</h3>
                  <p className="text-ink/70 text-sm leading-relaxed font-light mb-6">{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-black/5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono uppercase tracking-wider text-ink/50 bg-black/5 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
