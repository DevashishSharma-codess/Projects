import {
  Network,
  Cpu,
  Activity,
  Shield,
  Sparkles,
  BarChart3,
  Database,
  Globe,
} from "lucide-react";

export const PRODUCTS = [
  {
    id: "atlas",
    name: "Atlas System",
    product: "Network Infrastructure",
    category: "Cloud Infrastructure",
    tag: "Live",
    version: "4.5",
    metric: "300+ edge locations",
    description:
      "High-frequency global edge routing pipeline built for sub-millisecond latency and zero packet loss.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
    icon: Network,
  },
  {
    id: "radar",
    name: "Radar Engine",
    product: "Real-Time Pipeline",
    category: "Data Engine",
    tag: "Live",
    version: "2.4",
    metric: "40B+ events/day",
    description:
      "Real-time telemetry and streaming ingestion engine processing billions of data events with zero latency.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85",
    icon: Cpu,
  },
  {
    id: "flux",
    name: "Flux Monitor",
    product: "Signal Detection",
    category: "Monitoring",
    tag: "Live",
    version: "1.8",
    metric: "99.999% uptime",
    description:
      "Continuously scans global infrastructure to surface signal in noise and flag drift before production.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85",
    icon: Activity,
  },
  {
    id: "sentinel",
    name: "Sentinel Shield",
    product: "Autonomous Security",
    category: "AI Security",
    tag: "Beta",
    version: "3.1",
    metric: "Zero zero-day breaches",
    description:
      "Autonomous threat detection agent enforcing real-time zero-trust policies across all microservices.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85",
    icon: Shield,
  },
  {
    id: "muse",
    name: "Muse Copilot",
    product: "Design Engine",
    category: "AI Copilot",
    tag: "Beta",
    version: "1.2",
    metric: "26 languages",
    description:
      "A brand-aware AI design & writing partner trained on your design tokens. Drafts, edits, and localizes in seconds.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
    icon: Sparkles,
  },
  {
    id: "pulse",
    name: "Pulse Analytics",
    product: "Behavior Intelligence",
    category: "Analytics",
    tag: "Live",
    version: "5.0",
    metric: "50M+ DAUs tracked",
    description:
      "Deep user behavior tracking and conversion telemetry engine with automatic funnel attribution.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=1920&q=85",
    icon: BarChart3,
  },
  {
    id: "strata",
    name: "Strata DB",
    product: "Distributed Storage",
    category: "Database",
    tag: "Beta",
    version: "2.0",
    metric: "100K IOPS per node",
    description:
      "Multi-region distributed ACID key-value store with automatic failover and instantaneous replication.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85",
    icon: Database,
  },
  {
    id: "orbit",
    name: "Orbit Mesh",
    product: "Deploy Orchestration",
    category: "Cloud Control",
    tag: "Live",
    version: "3.0",
    metric: "<50ms cold start",
    description:
      "Serverless container orchestrator deploying builds to global edge clusters in under three seconds.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1920&q=85",
    icon: Globe,
  },
];
