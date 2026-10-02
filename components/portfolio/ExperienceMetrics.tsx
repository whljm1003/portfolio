import type { ExperienceMetric } from "@/assets/portfolio";
import Reveal from "./Reveal";

export default function ExperienceMetrics({
  metrics,
}: {
  metrics: ExperienceMetric[];
}) {
  return (
    <section className="case-impact" aria-label="개발 경험과 변경 범위">
      <div className="case-impact-heading">
        <p className="section-kicker">EXPERIENCE</p>
        <h2>개발 경험과 변경 범위</h2>
      </div>
      <div className="case-impact-grid">
        {metrics.map((metric, index) => (
          <Reveal
            key={metric.id}
            className="impact-metric"
            delay={index * 0.08}
          >
            <div className="impact-metric-topline">
              <h3 className="impact-metric-label">{metric.label}</h3>
            </div>
            <p className="impact-metric-number">
              <span data-experience-value>{metric.value}</span>
              <span className="impact-metric-unit">{metric.unit}</span>
            </p>
            <p className="impact-metric-change">{metric.scope}</p>
            <dl className="impact-metric-comparison experience-facts">
              {metric.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="impact-metric-contribution">{metric.contribution}</p>
            <details className="impact-measurement">
              <summary>개발 범위 확인</summary>
              <p>{metric.evidence}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
