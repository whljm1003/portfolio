import { stevelabsData, wantedData } from "./career";

export type ProjectCategory = "app" | "web" | "operations" | "archive";

export type ProjectDiagram = "web" | "updates" | "release" | "observability";

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface ImpactMetric {
  id: string;
  label: string;
  before: number | null;
  after: number | null;
  unit: string;
  change: number | null;
  changeUnit: string;
  changeLabel: string;
  status: "pending" | "verified";
  measurement: {
    criterion: string;
    period: string | null;
    source: string | null;
  };
  contribution: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  category: ProjectCategory;
  eyebrow: string;
  summary: string;
  period: string;
  role: string;
  stack: string[];
  problem: string;
  approach: string[];
  contributions: string[];
  outcome: string;
  impactMetrics?: ImpactMetric[];
  transformation?: {
    before: { title: string; description: string };
    after: { title: string; description: string };
    approach: string;
  };
  images: ProjectImage[];
  diagram?: ProjectDiagram;
  links: { label: string; href: string }[];
}

export const profile = {
  name: "이정민",
  nameEn: "DEAN",
  role: "프론트엔드 개발자",
  email: "whljm1003@gmail.com",
  github: "https://github.com/whljm1003",
  blog: "https://velog.io/@whljm1003",
  intro: "사용자 경험을 구현하고, 복잡한 흐름을 이해해 제품을 개선합니다.",
  principles: [
    "사용자가 멈춘 지점에서 원인을 찾습니다.",
    "웹과 네이티브, 상태와 네트워크의 경계를 함께 살핍니다.",
    "배포 이후에도 실패를 확인하고 다음 수정으로 연결합니다.",
  ],
};

// 수치와 측정 근거를 확인한 뒤 verified로 변경한다.
export const portfolioImpactMetrics: ImpactMetric[] = [
  {
    id: "flow-completion",
    label: "사용 흐름 완료율",
    before: null,
    after: null,
    unit: "%",
    change: null,
    changeUnit: "%p",
    changeLabel: "완료율 변화",
    status: "pending",
    measurement: {
      criterion: "동일한 사용자 흐름·플랫폼의 시작 대비 완료 비율을 개선 전후 비교",
      period: null,
      source: null,
    },
    contribution: "상태·인증·플랫폼의 경계를 살펴 사용자가 멈추는 흐름을 개선했습니다.",
  },
  {
    id: "recurring-errors",
    label: "반복 오류 발생률",
    before: null,
    after: null,
    unit: "%",
    change: null,
    changeUnit: "%",
    changeLabel: "오류 감소율",
    status: "pending",
    measurement: {
      criterion: "같은 오류 유형의 세션 대비 발생률을 개선 전후 동일 기간 비교",
      period: null,
      source: null,
    },
    contribution: "오류의 원인을 추적하고 관측과 회귀 검증을 다음 수정에 연결했습니다.",
  },
  {
    id: "delivery-time",
    label: "배포 소요 시간",
    before: null,
    after: null,
    unit: "분",
    change: null,
    changeUnit: "%",
    changeLabel: "배포 시간 단축률",
    status: "pending",
    measurement: {
      criterion: "동일 환경에서 빌드 시작부터 업로드 완료까지 걸린 시간의 중앙값 비교",
      period: null,
      source: null,
    },
    contribution: "버전·실행 환경·서명을 정리해 반복 가능한 릴리즈 절차를 만들었습니다.",
  },
];

const officenerImage: ProjectImage = {
  src: "/image/portfolio-redesign/officener-app.png",
  alt: "예시 건물 소식과 건물정보·공지사항·자료실·시설예약 메뉴를 보여주는 오피스너 앱 소개 화면",
  caption:
    "오피스너 공개 소개 이미지. 아래에서 설명하는 개별 개선 작업의 구현 화면과는 구분해 표시합니다.",
  width: 648,
  height: 792,
};

export const featuredProjects: PortfolioProject[] = [
  {
    slug: "officener-app",
    title: "오피스너 앱",
    category: "app",
    eyebrow: "이용자 앱 · 문제 해결",
    summary:
      "로그아웃, 파일 다운로드, 화면 진입과 캐시까지. 이용자가 실제로 마주치는 앱의 문제를 해결했습니다.",
    period: "2025.06 - 2026.09 · Git 작업 기록 기준",
    role: "React Native 앱 개발 · 기능 개선 및 오류 수정",
    stack: [
      "React Native",
      "TypeScript",
      "React Query",
      "Zustand",
      "React Navigation",
    ],
    problem:
      "소셜 SDK의 응답이 끝나지 않아 로그아웃이 멈추거나, 오래된 첨부파일 이름 때문에 Android 다운로드 중 앱이 종료되는 문제가 있었습니다. 건물 전환과 푸시 진입 때 이전 상태가 남는 문제도 함께 살펴야 했습니다.",
    approach: [
      "로그아웃 흐름에서 화면 전환을 막는 외부 SDK 호출을 분리하고, 병렬 처리와 개별 타임아웃을 적용했습니다.",
      "다운로드 오류를 파일명의 퍼센트 인코딩·문자 깨짐과 네이티브 저장 경로 처리까지 추적했습니다.",
      "데이터의 최신성이 필요한 화면과 일반 화면을 구분하고, 건물 전환·푸시·딥링크 진입 시 캐시 갱신 조건을 정리했습니다.",
    ],
    contributions: [
      "소셜 세션 정리에 타임아웃을 적용해 SDK 대기가 로그아웃 완료를 막는 문제 수정",
      "첨부파일 이름 복원·검증과 회귀 테스트를 추가해 Android 다운로드 중 종료 문제 수정",
      "React Query staleTime과 건물 전환·푸시 진입 캐시 무효화 정책 정리",
      "화면 지연 로딩과 도메인별 라우트·파라미터 타입 분리",
      "공지사항·자료실·홈 메뉴·공용 컴포넌트 테스트와 접근성 식별자 보완",
    ],
    outcome:
      "앱에서 발생한 오류를 네트워크·파일명·캐시·라우트 단위로 나누어 수정하고, 다시 확인할 수 있는 테스트를 보완했습니다.",
    impactMetrics: [
      {
        id: "logout-duration",
        label: "로그아웃 대기 시간",
        before: null,
        after: null,
        unit: "초",
        change: null,
        changeUnit: "%",
        changeLabel: "대기 시간 단축률",
        status: "pending",
        measurement: {
          criterion: "동일 SDK 지연 조건에서 로그아웃 요청부터 화면 전환까지 걸린 시간 비교",
          period: null,
          source: null,
        },
        contribution: "소셜 SDK 호출을 병렬로 처리하고 각각 타임아웃을 적용했습니다.",
      },
    ],
    transformation: {
      before: {
        title: "소셜 SDK 대기로 멈춘 로그아웃",
        description:
          "소셜 세션 정리 호출이 끝나지 않으면 로그인 상태 변경과 화면 전환도 함께 멈췄습니다.",
      },
      after: {
        title: "대기 상한이 있는 로그아웃",
        description:
          "SDK 응답이 지연돼도 대기 상한 뒤에 로그인 상태 변경과 화면 전환이 이어지도록 수정했습니다.",
      },
      approach:
        "소셜 세션 정리를 병렬로 실행하고 SDK 호출마다 개별 타임아웃을 적용했습니다.",
    },
    images: [officenerImage],
    links: [],
  },
  {
    slug: "officener-web",
    title: "오피스너 웹",
    category: "web",
    eyebrow: "웹 · 앱과 이어지는 흐름",
    summary:
      "방문자 예약부터 앱 연결까지. 데스크톱·모바일·웹뷰에서 서비스 흐름이 이어지도록 개발했습니다.",
    period: "2025.06 - 2026.09 · Git 작업 기록 기준",
    role: "이용자 웹 개발 · 반응형 화면 및 플랫폼 전환",
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Vite",
      "React Router",
      "React Query",
    ],
    problem:
      "방문자 예약은 데스크톱과 모바일 웹뷰를 모두 지원해야 했습니다. 알림 링크에서 앱·스토어로 이동했다 돌아왔을 때 로딩만 남는 문제와, 만료된 세션이 로그인 리다이렉트를 반복하는 문제도 있었습니다.",
    approach: [
      "예약 입력·방문자 추가·초대장을 단계별 화면으로 구성하고, 데스크톱과 웹뷰의 입력·뒤로가기 동작을 조정했습니다.",
      "앱 실행을 시도한 뒤 안내 상태로 전환하고 앱 열기·설치하기를 직접 선택할 수 있도록 연결했습니다.",
      "인증 상태·라우팅·렌더링의 경계를 확인하면서 Next.js·React 업그레이드와 이후 Vite·React Router 전환을 진행했습니다.",
    ],
    contributions: [
      "방문자 예약의 단계별 UI와 API 연동, 데스크톱·모바일 웹뷰 반응형 구현",
      "앱 연결 실패·스토어 복귀 후 안내 화면과 재시도 버튼 처리",
      "만료된 인증 쿠키 정리 경로를 추가해 로그인 리다이렉트 반복 문제 수정",
      "Next.js·React 업그레이드에 따른 렌더링·타입·공통 UI 호환성 보완",
      "이용자 웹의 Vite·React Router 전환과 서버 API 연결 구조 정리",
    ],
    outcome:
      "웹의 예약 흐름과 앱 연결 상태를 함께 다루고, 플랫폼 변경 과정에서 인증·라우팅·화면 렌더링이 이어지도록 구조를 정리했습니다.",
    impactMetrics: [
      {
        id: "app-link-completion",
        label: "앱 연결 완료율",
        before: null,
        after: null,
        unit: "%",
        change: null,
        changeUnit: "%p",
        changeLabel: "완료율 변화",
        status: "pending",
        measurement: {
          criterion: "앱 연결 시도 대비 앱 진입 완료 비율을 동일 플랫폼·설치 조건에서 비교",
          period: null,
          source: null,
        },
        contribution: "자동 실행 이후 안내 상태와 앱 열기·설치하기 선택을 연결했습니다.",
      },
    ],
    transformation: {
      before: {
        title: "앱에서 돌아와도 남는 로딩",
        description:
          "앱이나 스토어에서 웹으로 돌아오면 자동 실행 대기 화면만 남아 다음 행동을 선택하기 어려웠습니다.",
      },
      after: {
        title: "앱 열기·설치를 직접 선택",
        description:
          "자동 실행 시도가 끝나면 안내 화면으로 바뀌고, 앱 열기나 설치하기를 다시 선택할 수 있도록 수정했습니다.",
      },
      approach:
        "자동 실행 시도 여부를 화면 상태로 관리하고 직접 실행·스토어 이동 버튼을 연결했습니다.",
    },
    images: [],
    diagram: "web",
    links: [],
  },
  {
    slug: "app-updates",
    title: "앱 업데이트 관리",
    category: "operations",
    eyebrow: "앱 · 버전과 OTA",
    summary:
      "React Native 업그레이드와 OTA 업데이트의 대상·적용 시점을 함께 관리했습니다.",
    period: "2025.12 - 2026.09 · Git 작업 기록 기준",
    role: "앱 버전 업그레이드 · OTA 적용 정책 및 검증",
    stack: [
      "React Native",
      "RevoPush",
      "CodePush",
      "Swift",
      "Kotlin",
      "Node.js",
    ],
    problem:
      "React Native 버전 변경은 JavaScript 의존성뿐 아니라 iOS·Android 빌드 체인과 네이티브 라이브러리 호환성에도 영향을 줍니다. 스토어 바이너리와 OTA 대상 버전이 어긋나면 업데이트가 전달되지 않거나 잘못된 번들이 적용될 수 있었습니다.",
    approach: [
      "JavaScript 도구·네이티브 빌드·바텀시트·키보드 등 변경이 영향을 주는 경계를 함께 점검했습니다.",
      "OTA의 대상 바이너리 버전을 빌드 설정에서 읽도록 하고, 플랫폼 간 버전 일치와 릴리즈 타깃을 검증하는 스크립트를 추가했습니다.",
      "일반 업데이트와 필수 업데이트의 적용 시점을 구분하고, 업데이트 대기가 스플래시를 무기한 붙잡지 않도록 상한을 두었습니다.",
    ],
    contributions: [
      "이용자 앱 React Native 0.78 계열에서 0.85.3으로 업그레이드 및 iOS·Android 빌드 체인 대응",
      "관리자 앱 React Native 업그레이드와 환경별 CodePush 배포 설정 정리",
      "OTA 대상 버전 자동 추출·플랫폼 버전 확인·배포 후 타깃 검증 스크립트 작성",
      "앱 시작·재개 시 업데이트 적용 정책과 스플래시 대기 상한 정리",
      "롤백된 번들의 반복 재설치를 유발할 수 있는 설정 제거",
    ],
    outcome:
      "바이너리 업그레이드와 OTA 전달 대상을 연결해 관리하고, 업데이트 적용·검증 절차를 코드와 문서로 남겼습니다.",
    impactMetrics: [
      {
        id: "ota-update-success",
        label: "OTA 업데이트 성공률",
        before: null,
        after: null,
        unit: "%",
        change: null,
        changeUnit: "%p",
        changeLabel: "성공률 변화",
        status: "pending",
        measurement: {
          criterion: "동일 대상 바이너리에서 업데이트 시도 대비 정상 적용·부팅 완료 비율 비교",
          period: null,
          source: null,
        },
        contribution: "대상 버전을 자동 추출하고 플랫폼 간 일치 여부와 배포 타깃을 검증했습니다.",
      },
    ],
    transformation: {
      before: {
        title: "바이너리와 어긋날 수 있는 OTA 대상",
        description:
          "OTA 대상 버전이 스토어 바이너리와 다르거나 넓은 범위로 지정되면 업데이트가 누락되거나 이전 번들이 적용될 수 있었습니다.",
      },
      after: {
        title: "빌드 버전 기준으로 대상 검증",
        description:
          "네이티브 빌드 설정에서 정확한 버전을 읽고, 플랫폼 간 일치 여부와 해당 버전에 전달될 OTA 릴리즈를 확인하도록 구성했습니다.",
      },
      approach:
        "릴리즈 스크립트에 버전 자동 추출을 적용하고 배포 후 대상 검사 스크립트를 추가했습니다.",
    },
    images: [],
    diagram: "updates",
    links: [],
  },
  {
    slug: "app-release",
    title: "앱 빌드와 배포",
    category: "operations",
    eyebrow: "운영 · fastlane",
    summary:
      "fastlane의 실행 환경·서명·빌드 설정을 정리하고, TestFlight까지 이어지는 배포 절차를 보완했습니다.",
    period: "2026.09 · Git 작업 기록 기준",
    role: "fastlane iOS 빌드·배포 수정 및 운영 문서화",
    stack: ["fastlane", "Ruby", "CocoaPods", "Xcode", "TestFlight"],
    problem:
      "fastlane 레인이 준비되어 있어도 실행 환경과 잠금 파일이 맞지 않아 실제 빌드·업로드가 진행되지 않았습니다. 아카이브의 서명 설정과 환경 파일 처리도 배포를 막는 원인이었습니다.",
    approach: [
      "fastlane을 Gemfile에 포함하고 빌드·배포 스크립트가 같은 Ruby 의존성을 사용하도록 실행 경로를 통일했습니다.",
      "앱 타깃의 아카이브 서명만 조정하고, 성공·실패 이후 기존 프로젝트 설정으로 돌아오도록 복원 처리를 두었습니다.",
      "환경 파일의 개행·형식을 검증하고, 실제 실행 절차와 확인 지점을 운영 문서에 정리했습니다.",
    ],
    contributions: [
      "fastlane 실행을 bundle exec 기준으로 통일하고 Ruby·CocoaPods 잠금 파일 불일치 수정",
      "iOS 앱 타깃에 match 프로파일을 적용하는 아카이브 서명 처리 수정",
      "서명 설정 변경 전 백업과 빌드 후 원복 처리 추가",
      "환경 파일 형식 검증과 빌드·배포 운영 문서 작성",
      "개발 환경 iOS 빌드·TestFlight 업로드 경로 검증",
    ],
    outcome:
      "작성되어 있던 배포 레인을 실제 실행 가능한 경로로 정리했고, 다음 릴리즈에서 참고할 빌드·서명·업로드 절차를 문서화했습니다.",
    impactMetrics: [
      {
        id: "release-duration",
        label: "빌드·배포 소요 시간",
        before: null,
        after: null,
        unit: "분",
        change: null,
        changeUnit: "%",
        changeLabel: "배포 시간 단축률",
        status: "pending",
        measurement: {
          criterion: "동일한 iOS 환경에서 빌드 시작부터 TestFlight 업로드 완료까지의 중앙값 비교",
          period: null,
          source: null,
        },
        contribution: "실행 환경을 통일하고 아카이브 서명의 백업·복원 절차를 보완했습니다.",
      },
    ],
    transformation: {
      before: {
        title: "환경·서명 불일치로 막힌 빌드",
        description:
          "배포 레인이 있어도 Ruby 의존성과 잠금 파일이 어긋났고, 앱 아카이브에 필요한 서명이 적용되지 않아 실행이 막혔습니다.",
      },
      after: {
        title: "실행 환경 통일과 서명 설정 복원",
        description:
          "빌드에 필요한 환경과 서명을 맞추고, 변경한 프로젝트 설정은 성공·실패와 관계없이 되돌리도록 구성했습니다.",
      },
      approach:
        "Gemfile·잠금 파일과 bundle exec 실행을 맞추고 앱 타깃의 서명 변경을 백업·복원 처리로 감쌌습니다.",
    },
    images: [],
    diagram: "release",
    links: [],
  },
  {
    slug: "app-observability",
    title: "앱 오류 관측",
    category: "operations",
    eyebrow: "운영 · Sentry",
    summary:
      "소스맵 업로드를 복구하고, OTA 롤백과 부팅 미완료를 다음 실행에서 확인하도록 관측을 보완했습니다.",
    period: "2026.08 · Git 작업 기록 기준",
    role: "Sentry 소스맵 정비 · OTA 실패 관측 및 오탐 수정",
    stack: ["Sentry", "React Native", "RevoPush", "AsyncStorage", "TypeScript"],
    problem:
      "소스맵 업로드의 프로젝트 설정이 잘못되어 오류 원본 위치 확인에 필요한 자료가 전달되지 않았습니다. OTA 번들로 앱이 정상 시작하지 못한 경우에는 실패한 실행 안에서 오류를 보고하기 어려웠습니다.",
    approach: [
      "iOS·Android 소스맵 업로드 대상 설정을 교정하고, 실행 중인 바이너리 버전·OTA 라벨·패키지 정보를 별도 컨텍스트로 기록했습니다.",
      "부팅 시작 표식을 저장하고 첫 라우트가 준비되면 지우며, 다음 실행에 표식이 남아 있을 때 이전 부팅의 미완료 신호를 보고하도록 했습니다.",
      "정상 부팅 완료와 비동기 표식 저장이 엇갈리는 경우를 다시 추적해 오탐을 수정했습니다.",
    ],
    contributions: [
      "iOS·Android Sentry 소스맵 업로드 프로젝트 오설정 수정",
      "OTA 롤백·동기화 실패·장시간 대기·대상 버전 불일치 이벤트 분리",
      "실행 중인 OTA 번들의 라벨·해시·바이너리 버전을 Sentry 컨텍스트에 연결",
      "부팅 표식 저장·소비·완료 처리를 추가하고 정상 부팅 오탐을 유발한 비동기 경합 수정",
      "관측 코드 실패가 앱 부팅·업데이트를 막지 않도록 예외 경계 분리",
    ],
    outcome:
      "OTA 실패를 복구된 다음 실행에서 조사할 수 있는 단서를 남겼습니다. 부팅 미완료 신호는 실패 원인을 단정하지 않고 버전·번들 정보와 함께 확인하도록 구성했습니다.",
    impactMetrics: [
      {
        id: "source-location-coverage",
        label: "오류 원본 위치 확인 비율",
        before: null,
        after: null,
        unit: "%",
        change: null,
        changeUnit: "%p",
        changeLabel: "확인 가능 비율 변화",
        status: "pending",
        measurement: {
          criterion: "동일 릴리즈 오류 중 원본 코드 위치까지 해석 가능한 이벤트의 비율 비교",
          period: null,
          source: null,
        },
        contribution: "플랫폼별 Sentry 소스맵 업로드 대상을 교정하고 버전·번들 정보를 연결했습니다.",
      },
    ],
    transformation: {
      before: {
        title: "원본 코드로 연결되지 않는 오류",
        description:
          "소스맵 업로드의 Sentry 프로젝트 설정이 잘못돼 오류 위치를 원본 코드와 연결할 자료가 전달되지 않았습니다.",
      },
      after: {
        title: "소스맵 업로드 대상 교정",
        description:
          "iOS·Android의 업로드 프로젝트 설정을 올바른 대상으로 맞춰 소스맵 업로드 실패 원인을 수정했습니다.",
      },
      approach:
        "두 플랫폼의 Sentry 설정에서 실제 프로젝트와 다른 값을 찾아 교정했습니다.",
    },
    images: [],
    diagram: "observability",
    links: [],
  },
];

const stevelabsSlugs = [
  "select-shop",
  "flying-doctors",
  "gold-rush",
  "art-cms",
  "illo",
  "genetic-report",
  "jajae-bada",
  "entizen",
];

const stevelabsArchives: PortfolioProject[] = stevelabsData.map(
  (project, index) => ({
    slug: stevelabsSlugs[index],
    title: project.title.replace(/^<\/>\s*/, ""),
    category: "archive",
    eyebrow: "스티브랩스 · 경력 아카이브",
    summary: project.summary,
    period: project.period,
    role: "프론트엔드 개발 · 담당 기능 구현",
    stack: project.skills,
    problem: project.description,
    approach: project.works,
    contributions: project.works,
    outcome:
      "기존 경력 자료에 기록된 담당 기능을 구현했습니다. 자세한 프로젝트 내용은 관련 문서에서 확인할 수 있습니다.",
    images: [],
    links: [{ label: "기존 프로젝트 문서", href: project.links.notion }],
  }),
);

const wantedSlugs = [
  "wanted-reviews",
  "wanted-care",
  "wanted-clothes",
  "wanted-game-records",
  "wanted-diagnostic-chart",
  "wanted-disease-search",
  "wanted-forest",
  "wanted-dual-selector",
];

const wantedArchives: PortfolioProject[] = wantedData.map((project, index) => ({
  slug: wantedSlugs[index],
  title: project.title.replace(/^<\/>\s*/, ""),
  category: "archive",
  eyebrow: "원티드 · 프리온보딩 과제",
  summary: `${project.title.replace(/^<\/>\s*/, "")} · ${project.remark}`,
  period: "2022.02 - 2022.04 · 코스 기간 기준",
  role: project.remark,
  stack: project.skills,
  problem: `프리온보딩 코스에서 ${project.title.replace(/^<\/>\s*/, "")}를 구현하는 과제를 진행했습니다.`,
  approach: project.methods,
  contributions: project.methods,
  outcome: "기존 과제 자료에 기록된 화면과 상호작용을 구현했습니다.",
  images: [],
  links: [
    { label: "GitHub", href: project.link.github },
    { label: "기존 배포 주소", href: project.link.deploy },
  ],
}));

export const archiveProjects: PortfolioProject[] = [
  ...stevelabsArchives,
  ...wantedArchives,
];

export const projects: PortfolioProject[] = [
  ...featuredProjects,
  ...archiveProjects,
];

export const careers = [
  {
    company: "오피스너",
    period: "작업 기록 2025.06 - 2026.09",
    role: "웹·앱 개발 및 운영 개선",
    summary:
      "이용자 웹·앱과 관리자 서비스 개발. 표시한 기간은 dean@officener.kr 작성 Git 작업 기록 기준이며 재직 기간을 뜻하지 않습니다.",
    highlights: [
      "이용자 앱의 기능·상태·네이티브 경계 오류 수정",
      "React Native 업그레이드와 OTA 업데이트 관리",
      "fastlane 빌드·배포 경로 정리와 Sentry 관측 보완",
    ],
    projectSlugs: featuredProjects.map(({ slug }) => slug),
  },
  {
    company: "(주)스티브랩스",
    period: "2022.09 - 2024.11",
    role: "개발팀 · 프론트엔드 개발자",
    summary: "커머스·의료·금융·역경매 등 웹 프로젝트 개발에 참여했습니다.",
    highlights: [
      "Next.js 기반 사용자·관리자 화면 개발",
      "소셜 로그인·본인 인증·전자 계약·결제 API 연동",
      "NestJS·Prisma 기반 관리자 API 구현 및 사내 일정 관리",
    ],
    projectSlugs: stevelabsSlugs,
  },
];

export const education = [
  {
    title: "프리온보딩 프론트엔드 코스",
    period: "2022.02 - 2022.04",
    summary:
      "원티드 코스에서 다양한 웹 과제를 개인·팀 프로젝트로 진행했습니다.",
    skills: ["React", "Redux Toolkit", "Recoil", "Vue", "협업"],
    projectSlugs: wantedSlugs,
  },
  {
    title: "코드스테이츠 프론트엔드 코스",
    period: "2020.06 - 2021.06",
    summary:
      "웹 개발 기초부터 React, Node.js·데이터베이스, Git 협업과 팀 프로젝트를 학습했습니다.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MySQL",
      "AWS",
      "Git",
    ],
    projectSlugs: [],
  },
];
