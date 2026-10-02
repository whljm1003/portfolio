import type { ImpactMetric } from "@/assets/portfolio";
import Reveal from "./Reveal";

function metricValue(value: number | null, verified: boolean) {
  return verified && value !== null ? value.toLocaleString("ko-KR") : "—";
}

export default function ImpactMetrics({
  metrics,
  headingLevel = "h2",
}: {
  metrics: ImpactMetric[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <section className="case-impact" aria-label="정량 성과 지표">
      <div className="case-impact-heading">
        <p className="section-kicker">IMPACT</p>
        <Heading>수치로 보는 개선</Heading>
      </div>
      <div className="case-impact-grid">
        {metrics.map((metric, index) => {
          const verified = metric.status === "verified";
          const change = metricValue(metric.change, verified);

          return (
            <Reveal
              key={metric.id}
              className="impact-metric"
              delay={index * 0.08}
            >
              <div className="impact-metric-topline">
                <p className="impact-metric-label">{metric.label}</p>
                <span
                  className="impact-metric-status"
                  data-metric-status={metric.status}
                >
                  {verified ? "수치 확인 완료" : "수치 확인 예정"}
                </span>
              </div>
              <p
                className="impact-metric-number"
                aria-label={
                  change === "—"
                    ? `${metric.changeLabel}: 수치 확인 예정`
                    : `${metric.changeLabel}: ${change}${metric.changeUnit}`
                }
              >
                <span data-metric-value>{change}</span>
                <span className="impact-metric-unit">{metric.changeUnit}</span>
              </p>
              <p className="impact-metric-change">{metric.changeLabel}</p>
              <dl className="impact-metric-comparison">
                <div>
                  <dt>개선 전</dt>
                  <dd>
                    <span>{metricValue(metric.before, verified)}</span>
                    <span>{metric.unit}</span>
                  </dd>
                </div>
                <div>
                  <dt>개선 후</dt>
                  <dd>
                    <span>{metricValue(metric.after, verified)}</span>
                    <span>{metric.unit}</span>
                  </dd>
                </div>
              </dl>
              <p className="impact-metric-contribution">
                {metric.contribution}
              </p>
              <details className="impact-measurement">
                <summary>측정 기준</summary>
                <p>{metric.measurement.criterion}</p>
                {metric.measurement.period ? (
                  <p>측정 기간: {metric.measurement.period}</p>
                ) : null}
                {metric.measurement.source ? (
                  <p>근거: {metric.measurement.source}</p>
                ) : null}
              </details>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
