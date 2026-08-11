import React from "react";
import { Mail, Waves, PackageOpen } from "lucide-react";
import { LogoMark } from "../common/LogoMark";

/**
 * MetricsComparison (MessagesSection)
 *
 * Structure matches the reference exactly:
 *  - the ENTIRE section has a full-bleed dotted background
 *  - a centered "box" sits on top of the dots: same base color as the
 *    page, but with NO dots inside it and NO border — it's a dot-free
 *    cutout, not a card. All content (badge, headline, copy, chart,
 *    testimonial) lives inside that box.
 *  - sizing is intentionally compact so the whole section fits a normal
 *    viewport at 100% zoom, matching the reference's proportions.
 */
export const MetricsComparison = ({
  badgeText = "99.4% ACCURACY & <50MS SLA VS. INDUSTRY AVERAGE",
  headline = "The engineering performance is why builders stay.",
  paragraphs = [
    <>
      Other agencies build slow generic templates. EnactOn automates deterministic{" "}
      <em style={{ fontStyle: "italic" }}>architecture</em>. 200+ micro-optimizations per project — zero-friction cashback tracking, edge affiliate systems, sub-second cloud pipelines — turned into software that scales effortlessly under load.
    </>,
    `EnactOn ships code so fast & resilient — founders say "How the hell did you scale this so smoothly?"`,
  ],
  chartData = [
    { label: "COLD EMAIL", value: 2, icon: Mail, name: "Cold Email" },
    { label: "HEYREACH", value: 8, icon: Waves, name: "heyreach" },
    { label: "CLAY", value: 15, icon: PackageOpen, name: "clay" },
    {
      label: "ENACTON",
      value: 30,
      icon: LogoMark,
      name: "EnactOn",
      highlight: true,
    },
  ],
  scaleMax = 30,
  gridStep = 5,
  quote = "I've been building enterprise platforms for 12 years and I've never worked with an engineering team like EnactOn before — we had legacy monoliths and EnactOn built us an automated cashback & cloud architecture that scaled our throughput 10x effortlessly.",
  name = "Jason Hardman",
  title = "Founding Enterprise AE @ Tacnode",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  logoText = "tacnode",
  backgroundImage = "/pastel_gradient_bg.png",
}) => {
  return (
    <div id="performance-metrics" style={styles.page}>
      {/* the dot-free "box" cut into the dotted page background */}
      <div style={styles.box}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          {badgeText}
        </div>

        <h1 style={styles.headline}>{headline}</h1>

        <div style={styles.copy}>
          {paragraphs.map((p, i) => (
            <p key={i} style={styles.paragraph}>
              {p}
            </p>
          ))}
        </div>

        <div style={styles.row}>
          <div style={styles.chartCol}>
            <ReplyRatesChart
              title="EXECUTION LATENCY & SYSTEM RELIABILITY"
              data={chartData}
              scaleMax={scaleMax}
              gridStep={gridStep}
              backgroundImage={backgroundImage}
            />
          </div>
          <div style={styles.cardCol}>
            <TestimonialCard
              quote={quote}
              name={name}
              title={title}
              avatarUrl={avatarUrl}
              logoText={logoText}
              backgroundImage={backgroundImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   Chart
   ========================================================================= */

const PLOT_HEIGHT = 300; // px, represents 0..scaleMax — compact, matches reference proportions
const LOGO_RESERVE = 52; // px, headroom above the scale for the tallest logo

function ReplyRatesChart({
  title = "REPLY RATES",
  data,
  scaleMax,
  gridStep,
  backgroundImage,
}) {
  const gridValues = [];
  for (let v = 0; v <= scaleMax; v += gridStep) gridValues.push(v);

  return (
    <div style={chartStyles.wrapper}>
      <div style={chartStyles.title}>{title}</div>

      <div style={chartStyles.plotOuter}>
        <div style={chartStyles.yAxisLabel}>Y-axis</div>

        <div
          style={{
            ...chartStyles.plotArea,
            height: `${PLOT_HEIGHT + LOGO_RESERVE}px`,
          }}
        >
          {/* gridlines + y labels — each placed at its EXACT fraction of
              the scale (v / scaleMax), not divided into equal flex rows,
              so the 0% line sits exactly on the baseline every time */}
          <div
            style={{
              ...chartStyles.gridStack,
              top: `${LOGO_RESERVE}px`,
              height: `${PLOT_HEIGHT}px`,
            }}
          >
            {gridValues.map((v) => (
              <div
                key={v}
                style={{
                  ...chartStyles.gridRow,
                  top: `${(1 - v / scaleMax) * 100}%`,
                }}
              >
                <span style={chartStyles.gridLabel}>{v}%</span>
                <div style={chartStyles.gridLine} />
              </div>
            ))}
          </div>

          {/* axis lines */}
          <div
            style={{
              ...chartStyles.yAxisLine,
              top: `${LOGO_RESERVE}px`,
              bottom: "-20px",
            }}
          />
          <div style={chartStyles.xAxisLine} />
          <div
            style={{ ...chartStyles.yAxisArrow, top: `${LOGO_RESERVE - 8}px` }}
          />
          <div style={chartStyles.xAxisArrow} />

          {/* bars — each column bottom-aligns its own logo+bar pair via
              justifyContent:flex-end, so the bar's bottom edge always sits
              exactly on the column's bottom edge (the baseline), and the
              logo sits directly above the bar with a fixed gap, in normal
              document flow (no absolute-position math to get wrong) */}
          <div
            style={{
              ...chartStyles.barsRow,
              top: `${LOGO_RESERVE}px`,
              height: `${PLOT_HEIGHT}px`,
            }}
          >
            {data.map((d) => {
              const Icon = d.icon;
              const barHeightPx = (d.value / scaleMax) * PLOT_HEIGHT;
              return (
                <div key={d.label} style={chartStyles.barColumn}>
                  <div style={chartStyles.barColumnInner}>
                    <div style={chartStyles.logoRow}>
                      <Icon
                        size={d.highlight ? 17 : 15}
                        strokeWidth={2.1}
                        color="#111827"
                      />
                      <span
                        style={{
                          ...chartStyles.logoText,
                          fontSize: d.highlight ? "14.5px" : "13.5px",
                        }}
                      >
                        {d.name}
                      </span>
                    </div>

                    <div
                      style={{
                        ...chartStyles.bar,
                        height: `${barHeightPx}px`,
                        ...(d.highlight
                          ? chartStyles.barHighlight
                          : chartStyles.barPlain),
                      }}
                    >
                      {d.highlight && (
                        <>
                          <div
                            style={{
                              ...chartStyles.bg,
                              backgroundImage: `url(${backgroundImage})`,
                            }}
                          />
                          <div style={chartStyles.bgOverlay} />
                          <div style={chartStyles.hatchTop} />
                        </>
                      )}
                      {!d.highlight && <div style={chartStyles.hatchPlain} />}

                      {/* inline inset-shadow effect, applied to every bar */}
                      <div
                        style={{
                          ...chartStyles.innerShadow,
                          ...(d.highlight
                            ? chartStyles.innerShadowHighlight
                            : chartStyles.innerShadowPlain),
                        }}
                      />

                      <div
                        style={{
                          ...chartStyles.valueChip,
                          ...(d.highlight
                            ? chartStyles.valueChipHighlight
                            : {}),
                        }}
                      >
                        {d.value}%
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      ...chartStyles.xLabel,
                      ...(d.highlight ? chartStyles.xLabelHighlight : {}),
                    }}
                  >
                    {d.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={chartStyles.xAxisLabel}>x-axis</div>
      </div>
    </div>
  );
}

/* =========================================================================
   Testimonial card
   ========================================================================= */

function TestimonialCard({
  quote,
  name,
  title,
  avatarUrl,
  logoText,
  backgroundImage,
}) {
  return (
    <div style={cardStyles.mat}>
      <div style={cardStyles.card}>
        <div
          style={{
            ...cardStyles.bg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={cardStyles.bgOverlay} />
        <div style={cardStyles.innerShadow} />

        <div style={cardStyles.content}>
          <QuoteMark />
          <p style={cardStyles.quote}>{quote}</p>
          <div style={cardStyles.spacer} />
          <div style={cardStyles.footer}>
            <div style={cardStyles.person}>
              <img src={avatarUrl} alt={name} style={cardStyles.avatar} />
              <div>
                <div style={cardStyles.name}>{name}</div>
                <div style={cardStyles.title}>{title}</div>
              </div>
            </div>
            <div style={cardStyles.logo}>
              <LeafMark />
              <span style={cardStyles.logoText}>{logoText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuoteMark() {
  return (
    <svg
      width="40"
      height="31"
      viewBox="0 0 512 512"
      fill="#1a1a1a"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#374151"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 8-8s8 4 8 8-3 7-8 7" />
      <path d="M4 13c6 0 10-4 10-9" />
    </svg>
  );
}

/* =========================================================================
   Styles — page shell
   ========================================================================= */

const PAGE_BG = "#ffffff"; // pure white background tone
const DOT_COLOR = "#e0e2e5"; // subtle light dot matrix on white background

const styles = {
  page: {
    position: "relative",
    width: "100%",
    minHeight: "100%",
    backgroundColor: PAGE_BG,
    backgroundImage: `radial-gradient(${DOT_COLOR} 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "40px",
    boxSizing: "border-box",
  },
  // the dot-free cutout box — SAME background color as the page (no dots,
  // no border, no shadow), just inset with a wide margin so the dots show
  // all the way around it, exactly like the reference.
  box: {
    position: "relative",
    maxWidth: "1140px",
    margin: "0 auto",
    backgroundColor: PAGE_BG,
    padding: "40px 56px 56px",
    boxSizing: "border-box",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#dbe7f8",
    color: "#1c4f9c",
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    fontSize: "11.5px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    padding: "7px 12px",
    borderRadius: "3px",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    background: "#3b6fd6",
    display: "inline-block",
    flexShrink: 0,
  },
  headline: {
    fontSize: "34px",
    lineHeight: 1.15,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "#0a0b0d",
    margin: "16px 0 0",
  },
  copy: {
    marginTop: "14px",
    maxWidth: "780px",
  },
  paragraph: {
    fontSize: "14.5px",
    lineHeight: 1.55,
    color: "#4b5563",
    margin: "0 0 10px",
  },
  row: {
    marginTop: "28px",
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "24px",
    alignItems: "start",
  },
  chartCol: {
    minWidth: 0,
  },
  cardCol: {
    minWidth: 0,
  },
};

/* =========================================================================
   Styles — chart
   ========================================================================= */

const HATCH =
  "repeating-linear-gradient(45deg, rgba(17,24,39,0.28) 0px, rgba(17,24,39,0.28) 1.5px, transparent 1.5px, transparent 9px)";
const HATCH_ON_COLOR =
  "repeating-linear-gradient(45deg, rgba(17,24,39,0.16) 0px, rgba(17,24,39,0.16) 1.5px, transparent 1.5px, transparent 9px)";

const chartStyles = {
  wrapper: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    fontSize: "11.5px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#111827",
    marginBottom: "20px",
  },
  plotOuter: {
    position: "relative",
    paddingLeft: "40px",
    paddingRight: "8px",
  },
  yAxisLabel: {
    position: "absolute",
    left: "8px",
    top: "-22px",
    fontSize: "11px",
    color: "#6b7280",
  },
  xAxisLabel: {
    position: "absolute",
    right: "-6px",
    bottom: "-2px",
    fontSize: "11px",
    color: "#6b7280",
  },
  plotArea: {
    position: "relative",
  },
  gridStack: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  gridRow: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  gridLabel: {
    position: "absolute",
    left: "-36px",
    top: "-7px",
    fontSize: "11.5px",
    color: "#6b7280",
    width: "30px",
    textAlign: "right",
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    borderTop: "1px dashed #b7b9be",
  },
  yAxisLine: {
    position: "absolute",
    left: 0,
    width: "1px",
    background: "#9ca3af",
  },
  xAxisLine: {
    position: "absolute",
    left: "-8px",
    right: "-8px",
    bottom: 0,
    height: "1px",
    background: "#9ca3af",
  },
  yAxisArrow: {
    position: "absolute",
    left: "-4px",
    width: 0,
    height: 0,
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderBottom: "7px solid #9ca3af",
  },
  xAxisArrow: {
    position: "absolute",
    right: "-16px",
    bottom: "-4px",
    width: 0,
    height: 0,
    borderTop: "4px solid transparent",
    borderBottom: "4px solid transparent",
    borderLeft: "7px solid #9ca3af",
  },
  barsRow: {
    position: "absolute",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    gap: "28px",
  },
  barColumn: {
    flex: 1,
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  barColumnInner: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    marginBottom: "10px",
  },
  logoText: {
    color: "#111827",
    fontWeight: 700,
    letterSpacing: "-0.01em",
  },
  bar: {
    position: "relative",
    width: "64px",
    flexShrink: 0,
    borderRadius: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },
  barPlain: {
    background: "#e5e6e9",
    border: "1px solid #b9bbc0",
  },
  barHighlight: {
    border: "1px solid rgba(180,170,190,0.55)",
    boxShadow: "0 10px 22px rgba(15, 23, 42, 0.16)",
  },
  hatchPlain: {
    position: "absolute",
    inset: 0,
    backgroundImage: HATCH,
  },
  bg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.35)",
  },
  hatchTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "33%",
    backgroundImage: HATCH_ON_COLOR,
  },
  innerShadow: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  innerShadowPlain: {
    boxShadow:
      "inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 2px 8px rgba(15,23,42,0.10), inset 0 -2px 8px rgba(15,23,42,0.08)",
  },
  innerShadowHighlight: {
    boxShadow:
      "inset 0 0 0 1px rgba(255,255,255,0.55), inset 0 2px 12px rgba(15,23,42,0.10), inset 0 -2px 12px rgba(15,23,42,0.06)",
  },
  valueChip: {
    position: "absolute",
    top: "8px",
    left: "8px",
    background: "rgba(255,255,255,0.75)",
    color: "#374151",
    fontSize: "11px",
    fontWeight: 600,
    padding: "3px 7px",
    borderRadius: 0,
  },
  valueChipHighlight: {
    background: "rgba(255,255,255,0.55)",
    color: "#1f2937",
  },
  xLabel: {
    position: "absolute",
    top: "calc(100% + 14px)",
    left: "50%",
    transform: "translateX(-50%)",
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    fontSize: "10.5px",
    letterSpacing: "0.05em",
    color: "#9ca3af",
    whiteSpace: "nowrap",
  },
  xLabelHighlight: {
    color: "#111827",
    fontWeight: 700,
  },
};

/* =========================================================================
   Styles — testimonial card
   ========================================================================= */

const cardStyles = {
  mat: {
    width: "100%",
    minHeight: "425px",
    background: "#d4d5d9",
    borderRadius: 0,
    padding: "7px",
    boxSizing: "border-box",
  },
  card: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.12)",
  },
  bg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255, 255, 255, 0.55)",
  },
  innerShadow: {
    position: "absolute",
    inset: 0,
    boxShadow:
      "inset 0 0 0 1px rgba(255, 255, 255, 0.6), inset 0 2px 10px rgba(15, 23, 42, 0.10), inset 0 -2px 10px rgba(15, 23, 42, 0.06)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "28px 26px 22px",
    boxSizing: "border-box",
  },
  quote: {
    margin: "16px 0 0",
    fontSize: "14.5px",
    lineHeight: 1.45,
    fontWeight: 400,
    color: "#3f4552",
  },
  spacer: { flex: 1 },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
  person: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    minWidth: 0,
  },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
    border: "2px solid rgba(255,255,255,0.8)",
  },
  name: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    whiteSpace: "nowrap",
  },
  title: {
    fontSize: "10.5px",
    color: "#64748b",
    marginTop: "1px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    flexShrink: 0,
  },
  logoText: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
  },
};

export default MetricsComparison;