import Image from "next/image";
import {
  FiArrowRight,
  FiCheck,
  FiLayers,
  FiActivity,
  FiGitBranch,
  FiSmartphone,
  FiMonitor,
  FiPackage,
} from "react-icons/fi";

export type Diagram = "web" | "updates" | "release" | "observability";

export default function ProjectArtwork({
  diagram,
  compact = false,
}: {
  diagram?: Diagram;
  compact?: boolean;
}) {
  if (!diagram) {
    return (
      <div className={`project-art app-art ${compact ? "compact-art" : ""}`}>
        <span className="art-word" aria-hidden="true">
          OFFICENER
        </span>
        <Image
          src="/image/portfolio-redesign/officener-app.png"
          alt="오피스너 공개 소개 이미지의 건물 소식과 시설 예약 화면"
          width={648}
          height={792}
          sizes="(max-width: 767px) 70vw, 350px"
          className="app-screen"
        />
      </div>
    );
  }
  if (diagram === "web") {
    return (
      <div
        className="project-art web-art"
        aria-label="오피스너의 데스크톱 웹·모바일 웹뷰에서 방문 예약과 앱 연결로 이어지는 흐름 도식"
        role="img"
      >
        <span className="art-word" aria-hidden="true">
          CONNECTED.
        </span>
        <div className="web-diagram" aria-hidden="true">
          <div className="diagram-node">
            <FiMonitor />
            <span>데스크톱 웹</span>
          </div>
          <div className="diagram-node">
            <FiSmartphone />
            <span>모바일 웹뷰</span>
          </div>
          <div className="diagram-join" />
          <div className="diagram-core">
            <FiPackage />
            <strong>방문 예약 · 앱 연결</strong>
            <span>이어지는 사용자 흐름</span>
          </div>
        </div>
      </div>
    );
  }
  if (diagram === "updates") {
    return (
      <div
        className={`project-art update-art ${compact ? "compact-art" : ""}`}
        role="img"
        aria-label="기존 앱에서 React Native 업데이트와 호환성 검증으로 이어지는 흐름 도식"
      >
        <div className="update-diagram" aria-hidden="true">
          <FiLayers />
          <div>
            <span>REACT NATIVE</span>
            <strong>버전 업데이트</strong>
          </div>
          <FiArrowRight />
          <FiCheck />
        </div>
      </div>
    );
  }
  if (diagram === "release") {
    return (
      <div
        className={`project-art release-art ${compact ? "compact-art" : ""}`}
        role="img"
        aria-label="Fastlane을 통한 빌드·검증·배포 자동화 흐름 도식"
      >
        <div className="release-diagram" aria-hidden="true">
          <span className="release-symbol">
            <FiGitBranch />
          </span>
          <strong>Fastlane</strong>
          <div className="release-steps">
            <span>빌드</span>
            <FiArrowRight />
            <span>검증</span>
            <FiArrowRight />
            <span>배포</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`project-art observability-art ${compact ? "compact-art" : ""}`}
      role="img"
      aria-label="앱 이벤트를 Sentry로 수집하고 오류를 진단하는 관측 흐름 도식"
    >
      <div className="observability-diagram" aria-hidden="true">
        <div className="observe-source">
          <FiSmartphone />
          <span>앱 이벤트</span>
        </div>
        <div className="observe-lines">
          <span />
          <span />
          <span />
        </div>
        <div className="observe-target">
          <FiActivity />
          <strong>Sentry</strong>
          <span>오류 진단 · 릴리즈 추적</span>
        </div>
      </div>
    </div>
  );
}
