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
  intro:
    "React·Next.js로 커머스·의료·금융 분야의 웹 서비스를 개발했습니다. 현재는 오피스너의 이용자·관리자 웹과 React Native 앱을 개발하며, 기능 출시 이후의 오류 수정과 유지보수를 이어가고 있습니다.",
  documents: [
    {
      label: "이력서",
      href: "https://app.notion.com/p/whljm1003/3ed9bb465506813ea246d8dc2c8836d7",
    },
    {
      label: "경력기술서",
      href: "https://app.notion.com/p/whljm1003/3ed9bb465506812993fcf49eed118b99",
    },
    {
      label: "Notion 포트폴리오",
      href: "https://app.notion.com/p/whljm1003/3ed9bb46550681d398e0d0f945fc8a34",
    },
  ],
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
      criterion:
        "동일한 사용자 흐름·플랫폼의 시작 대비 완료 비율을 개선 전후 비교",
      period: null,
      source: null,
    },
    contribution:
      "상태·인증·플랫폼의 경계를 살펴 사용자가 멈추는 흐름을 개선했습니다.",
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
    contribution:
      "사용자 오류를 수정하고 회귀 테스트·오류 분석 정보 보강에 참여했습니다.",
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
      criterion:
        "동일 환경에서 빌드 시작부터 업로드 완료까지 걸린 시간의 중앙값 비교",
      period: null,
      source: null,
    },
    contribution:
      "실행 환경·서명 설정과 빌드 절차를 정리하는 작업에 참여했습니다.",
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
      "WebView 뒤로가기와 키보드·스크롤을 보완하고, 로그아웃·다운로드·캐시 오류를 수정했습니다.",
    period: "2025.06 - 2026.09 · Git 작업 기록 기준",
    role: "React Native 앱 개발 · 기능 개선 및 오류 수정",
    stack: [
      "React Native",
      "TypeScript",
      "React Query",
      "Zustand",
      "React Navigation",
      "WebView",
      "keyboard-controller",
    ],
    problem:
      "웹 기반 예약 화면에서 Android 뒤로가기를 웹이 처리할지, 네이티브 화면을 닫을지 구분해야 했습니다. 키보드 라이브러리 변경 이후에는 입력창 노출·스크롤 여백과 WebView 입력 모드도 함께 조정해야 했습니다. 이와 함께 소셜 SDK 대기로 멈추는 로그아웃, 첨부파일 이름 인코딩에 따른 Android 다운로드 종료, 건물 전환 후 남는 이전 데이터를 수정했습니다.",
    approach: [
      "앱의 뒤로가기 요청에 대한 웹 처리 응답을 확인하고, 응답이 없을 때의 네이티브 이동과 화면 종료 시 타이머 정리를 보완했습니다.",
      "14곳의 스크롤 영역을 keyboard-controller로 이관하고, Android WebView 진입 시 적용한 입력 모드를 화면 종료 시 복원하도록 조정했습니다.",
      "로그아웃 흐름에서 화면 전환을 막는 외부 SDK 호출을 분리하고, 병렬 처리와 개별 타임아웃을 적용했습니다.",
      "다운로드 오류를 파일명의 퍼센트 인코딩·문자 깨짐과 네이티브 저장 경로 처리까지 추적했습니다.",
      "데이터의 최신성이 필요한 화면과 일반 화면을 구분하고, 건물 전환·푸시·딥링크 진입 시 캐시 갱신 조건을 정리했습니다.",
    ],
    contributions: [
      "WebView 뒤로가기 요청·응답 연결, 응답 대기 타이머 및 화면 종료 처리 보완",
      "14곳의 키보드·스크롤 처리 이관과 Android WebView 입력 모드 복원",
      "소셜 세션 정리에 타임아웃을 적용해 SDK 대기가 로그아웃 완료를 막는 문제 수정",
      "첨부파일 이름 복원·검증과 회귀 테스트를 추가해 Android 다운로드 중 종료 문제 수정",
      "React Query staleTime과 건물 전환·푸시 진입 캐시 무효화 정책 정리",
      "화면 지연 로딩과 도메인별 라우트·파라미터 타입 분리",
      "컴포넌트·훅 회귀 테스트와 E2E 화면 식별자·접근성 보완 작업 참여",
    ],
    outcome:
      "웹의 뒤로가기 처리 여부에 따라 앱 이동을 나누고, 화면 종료 후 타이머와 입력 설정이 남지 않도록 정리했습니다. 로그아웃은 SDK별 대기 상한 이후 이어지도록 수정했으며, 파일명·캐시 오류 수정과 회귀 테스트 보강에도 참여했습니다.",
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
          criterion:
            "동일 SDK 지연 조건에서 로그아웃 요청부터 화면 전환까지 걸린 시간 비교",
          period: null,
          source: null,
        },
        contribution:
          "소셜 SDK 호출을 병렬로 처리하고 각각 타임아웃을 적용했습니다.",
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
    links: [
      {
        label: "WebView·키보드 상세 기록",
        href: "https://app.notion.com/p/whljm1003/3ed9bb465506817f810ff529aaff3d92",
      },
    ],
  },
  {
    slug: "officener-web",
    title: "오피스너 웹",
    category: "web",
    eyebrow: "웹 · 앱과 이어지는 흐름",
    summary:
      "방문자 예약의 다단계 입력·검증과 API 연동을 구현하고, 예약 완료 이후의 웹·앱 이동을 연결했습니다.",
    period: "2025.06 - 2026.09 · Git 작업 기록 기준",
    role: "이용자·관리자 웹 개발 · 다단계 폼 및 WebView 대응",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Vite",
      "React Router",
      "React Query",
    ],
    problem:
      "방문자 예약은 약관 동의, 방문 정보 입력, 초대장 확인·발송으로 이어지는 다단계 기능입니다. 단계 간 입력값을 공유하면서 필수값·형식·중복 방문자를 확인해야 했습니다. 같은 폼이 데스크톱과 앱 WebView에서 동작하고, 예약 완료 후에는 브라우저 라우팅과 앱 화면 스택 정리를 각각 연결해야 했습니다.",
    approach: [
      "Zustand로 단계 간 방문 정보·방문자 목록을 공유하고, 입력 항목별 오류는 해당 화면에서 관리했습니다. 다음 단계로 이동하기 전에 누락 항목을 확인했습니다.",
      "React Hook Form·Zod로 이름·소속·휴대폰 번호를 검증하고, 번호의 숫자 이외 문자를 제거하며 이미 등록된 번호에는 중복 안내를 표시했습니다.",
      "방문자 추가 폼을 재사용하면서 모바일에서는 Drawer, 데스크톱에서는 Popover로 표시했습니다. 진행 표시와 하단 버튼도 화면 크기에 맞춰 조정했습니다.",
      "공통 이동 훅에서 브라우저 라우팅과 WebView 메시지를 분기하고, 예약 완료 시 앱의 신청 단계 스택 정리와 상세 진입을 요청했습니다.",
    ],
    contributions: [
      "방문자 예약의 신청·목록·상세·추가·취소 화면 및 API 연동",
      "단계 간 입력 상태 공유, 필수값·길이·번호 형식·중복 검증",
      "모바일·데스크톱 폼 로직 재사용과 예약 완료 후 웹·앱 이동 연결",
      "광고 신청·결제 내역·부분 환불 및 관리자 초기 설정 화면 개발·개선",
      "앱 연결 실패·스토어 복귀 후 안내 화면과 재시도 버튼 처리",
      "만료된 인증 쿠키 정리 경로를 추가해 로그인 리다이렉트 반복 문제 수정",
      "Next.js·React 업그레이드에 따른 렌더링·타입·공통 UI 호환성 보완",
      "이용자 웹의 Vite·React Router 전환과 서버 API 연결 구조 정리",
    ],
    outcome:
      "단계 사이에서 입력값을 유지하고 누락·형식 오류·중복 번호를 안내하는 신청 흐름을 구성했습니다. 모바일과 데스크톱에서 폼 로직을 공유하며 표시 방식을 달리하고, 예약 완료 이후의 브라우저·앱 이동을 연결했습니다.",
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
          criterion:
            "앱 연결 시도 대비 앱 진입 완료 비율을 동일 플랫폼·설치 조건에서 비교",
          period: null,
          source: null,
        },
        contribution:
          "자동 실행 이후 안내 상태와 앱 열기·설치하기 선택을 연결했습니다.",
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
    links: [
      {
        label: "방문자 예약 상세 기록",
        href: "https://app.notion.com/p/whljm1003/3ed9bb465506814ea075fc78eadd0b68",
      },
    ],
  },
  {
    slug: "app-updates",
    title: "앱 업데이트 관리",
    category: "operations",
    eyebrow: "앱 · 버전과 OTA",
    summary:
      "약 3년간 갱신되지 않은 RN 0.70.6 앱의 0.78 계열·0.85.3 전환에 기여하고, 네이티브 빌드와 화면 호환성을 조정했습니다.",
    period: "2025.12 - 2026.09 · Git 작업 기록 기준",
    role: "React Native 업그레이드 · 네이티브 호환성 대응 / OTA 개선 참여",
    stack: [
      "React Native",
      "CocoaPods",
      "Gradle",
      "Reanimated",
      "RevoPush",
      "CodePush",
      "Swift",
      "Kotlin",
      "Node.js",
    ],
    problem:
      "RN 0.70.6 앱은 약 3년간 업그레이드되지 않아 프레임워크와 네이티브 의존성의 버전 차이가 누적되어 있었습니다. 버전 갱신 시 iOS·Android 빌드 설정과 Firebase·Reanimated·바텀시트 등 연동 라이브러리, 기존 화면 동작을 함께 맞춰야 했습니다. OTA도 변경된 바이너리 버전에 맞는 대상으로 전달하도록 점검해야 했습니다.",
    approach: [
      "RN 0.70.6에서 0.78 계열을 거쳐 0.85.3으로 전환하며 JavaScript 패키지와 네이티브 프로젝트 설정을 함께 조정했습니다.",
      "iOS CocoaPods·Firebase 모듈 설정·AppDelegate와 Android Gradle·Kotlin·SDK·모듈 연결 구성을 새 버전에 맞췄습니다.",
      "Reanimated·캐러셀·바텀시트 API 변경에 대응하고, 바텀시트 ref 준비와 닫힘·재열림 타이밍을 보완했습니다.",
      "OTA 대상 버전 추출·플랫폼 일치 점검과 일반·필수 업데이트 적용 시점, 스플래시 대기 상한 정비에도 참여했습니다.",
    ],
    contributions: [
      "이용자 앱 RN 0.70.6 → 0.78 계열 → 0.85.3 전환과 iOS·Android 빌드 설정 조정",
      "Reanimated·바텀시트·캐러셀 호환성 및 화면 표시 타이밍 보완",
      "관리자 앱 RN 업그레이드와 환경별 CodePush 설정 정비 참여",
      "OTA 대상 버전·플랫폼 일치 점검과 앱 시작·재개 시 적용 정책 정비 참여",
    ],
    outcome:
      "의존성과 iOS·Android 구성을 RN 0.85.3 기준으로 갱신하고, 변경된 라이브러리 API에 맞춰 기존 화면 처리를 수정했습니다. OTA 개선 작업에서는 업데이트 대상과 적용 시점을 확인하는 수단을 보강하는 데 참여했습니다.",
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
          criterion:
            "동일 대상 바이너리에서 업데이트 시도 대비 정상 적용·부팅 완료 비율 비교",
          period: null,
          source: null,
        },
        contribution:
          "OTA 대상 버전 추출·플랫폼 일치 점검과 배포 대상 검증 개선에 참여했습니다.",
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
    links: [
      {
        label: "React Native 업그레이드 상세 기록",
        href: "https://app.notion.com/p/whljm1003/3ed9bb46550681558393c60c9e60539b",
      },
    ],
  },
  {
    slug: "app-release",
    title: "앱 빌드와 배포",
    category: "operations",
    eyebrow: "운영 개선 참여 · fastlane",
    summary:
      "fastlane의 실행 의존성·서명 설정과 환경 입력 검증, 빌드 절차 문서를 보완하는 작업에 참여했습니다.",
    period: "2026.09 · Git 작업 기록 기준",
    role: "fastlane 빌드 실행·서명 설정 및 절차 정비 참여",
    stack: ["fastlane", "Ruby", "CocoaPods", "Xcode", "TestFlight"],
    problem:
      "fastlane 레인이 준비되어 있어도 실행 환경과 잠금 파일이 맞지 않아 실제 빌드·업로드가 진행되지 않았습니다. 아카이브의 서명 설정과 환경 파일 처리도 배포를 막는 원인이었습니다.",
    approach: [
      "개선 작업에서 Gemfile·잠금 파일과 bundle exec 실행을 맞춰, 빌드·배포 스크립트가 같은 Ruby 의존성을 사용하도록 정리했습니다.",
      "앱 타깃의 아카이브 서명을 조정하고 성공·실패 이후 원래 프로젝트 설정으로 돌아오도록 복원 절차를 보완했습니다.",
      "환경 파일의 개행·형식을 검증하고 실행 순서와 확인 지점을 문서로 남기는 작업에 참여했습니다.",
    ],
    contributions: [
      "Ruby·CocoaPods 의존성 및 fastlane 실행 방식 정비 참여",
      "iOS 아카이브 서명과 설정 백업·복원 처리 보완 참여",
      "환경 입력 검증과 빌드·배포 절차 문서 정비 참여",
    ],
    outcome:
      "기존 배포 레인의 실행 의존성과 서명·입력값을 점검하는 수단을 보강했습니다. 빌드·서명·업로드 순서를 문서로 정리하는 작업에 참여했습니다.",
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
          criterion:
            "동일한 iOS 환경에서 빌드 시작부터 TestFlight 업로드 완료까지의 중앙값 비교",
          period: null,
          source: null,
        },
        contribution:
          "fastlane 실행 환경과 아카이브 서명의 백업·복원 절차 정비에 참여했습니다.",
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
    links: [
      {
        label: "테스트·빌드·오류 분석 참여 기록",
        href: "https://app.notion.com/p/whljm1003/3ed9bb46550681b7863efadea001c647",
      },
    ],
  },
  {
    slug: "app-observability",
    title: "앱 오류 관측",
    category: "operations",
    eyebrow: "운영 개선 참여 · Sentry",
    summary:
      "Sentry 소스맵 업로드 설정과 실행 번들·OTA 상태, 롤백·부팅 미완료 분석 정보를 보완하는 작업에 참여했습니다.",
    period: "2026.08 · Git 작업 기록 기준",
    role: "Sentry 소스맵·실행 번들 및 OTA 오류 분석 정보 정비 참여",
    stack: ["Sentry", "React Native", "RevoPush", "AsyncStorage", "TypeScript"],
    problem:
      "소스맵 업로드의 프로젝트 설정이 잘못되어 오류 원본 위치 확인에 필요한 자료가 전달되지 않았습니다. OTA 번들로 앱이 정상 시작하지 못한 경우에는 실패한 실행 안에서 오류를 보고하기 어려웠습니다.",
    approach: [
      "소스맵 업로드 대상을 교정하고 바이너리 버전·OTA 라벨·패키지 정보를 오류 컨텍스트에 연결하는 작업에 참여했습니다.",
      "부팅 시작 표식을 저장하고 첫 라우트 준비 후 지우며, 다음 실행에서 남은 표식을 조사하는 관측 절차를 보완했습니다.",
      "정상 부팅 완료와 비동기 표식 저장의 순서가 엇갈려 생기는 오탐을 보완하는 작업에도 참여했습니다.",
    ],
    contributions: [
      "iOS·Android Sentry 소스맵 업로드 설정 정비 참여",
      "실행 번들·OTA 버전과 롤백·동기화 상태 분석 정보 보강 참여",
      "부팅 미완료 표식과 정상 부팅 오탐 처리 보완 참여",
    ],
    outcome:
      "오류 발생 당시의 버전·번들·OTA 상태를 함께 조사할 수 있는 정보를 보강하는 데 참여했습니다. 부팅 미완료 표식은 이전 실행을 조사하는 단서이며, 표식만으로 OTA 실패를 확정하지 않습니다.",
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
          criterion:
            "동일 릴리즈 오류 중 원본 코드 위치까지 해석 가능한 이벤트의 비율 비교",
          period: null,
          source: null,
        },
        contribution:
          "Sentry 소스맵 업로드 설정과 버전·번들 분석 정보 보강에 참여했습니다.",
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
    links: [
      {
        label: "테스트·빌드·오류 분석 참여 기록",
        href: "https://app.notion.com/p/whljm1003/3ed9bb46550681b7863efadea001c647",
      },
    ],
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
    role: project.role,
    stack: project.skills,
    problem: project.description,
    approach: project.works,
    contributions: project.works,
    outcome: project.outcome,
    images: [],
    links: [{ label: "프로젝트 상세 자료", href: project.links.notion }],
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
    period: "2025.06 - 현재",
    role: "(주)두꺼비세상 · 오피스너 사업부 / 프론트엔드 개발",
    summary:
      "상업용 부동산의 이용자·건물 관리자를 위한 종합 관리 솔루션을 개발합니다. SI 웹 개발 경험을 바탕으로 React Native 앱 개발까지 담당하며, 기능 개발 이후의 오류 수정과 유지보수를 이어가고 있습니다.",
    highlights: [
      "방문자 예약의 다단계 폼·검증·API 연동과 광고 신청·결제·부분 환불 화면 개발",
      "약 3년간 갱신되지 않은 RN 0.70.6 앱의 0.78 계열·0.85.3 전환 및 네이티브 호환성 대응",
      "WebView 뒤로가기 요청·응답과 14곳의 키보드·스크롤 처리 보완",
      "컴포넌트·훅·E2E 테스트, fastlane 실행·서명, Sentry 오류 분석 정보 정비 참여",
    ],
    projectSlugs: featuredProjects.map(({ slug }) => slug),
  },
  {
    company: "(주)스티브랩스",
    period: "2022.09 - 2024.10",
    role: "개발팀 · 프론트엔드 개발자",
    summary:
      "고객사 요구사항에 맞춘 SI 프로젝트에서 사용자·관리자 웹과 외부 API 연동을 개발했습니다. 커머스·의료·금융·교육 CMS·역경매 등 8개 프로젝트에 참여했습니다.",
    highlights: [
      "React·Next.js 사용자·관리자 화면과 공통 테이블·필터·폼 검증 구현",
      "소셜 로그인·본인 인증·전자 계약·결제 API 연동",
      "NestJS·Prisma 관리자 API 개발 병행, 상품 등록 트랜잭션·옵션 논리 삭제 적용",
      "고객사 요구사항·개발 일정·이슈 조율",
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
    title: "코드스테이츠 SW 파트타임 부트캠프 4기",
    period: "수료",
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
