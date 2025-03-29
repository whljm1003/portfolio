import Img from "@/assets/image/picaNote/PicaNote-Detail.png";

export enum VideoType {
  MOBILE = "mobile",
  WEB = "web",
}
export interface Media {
  id: number;
  type: "image" | "video";
  videoType?: VideoType;
  url: string;
  title: string;
  description?: string;
}
export interface Careers {
  id: number;
  basicInfo: {
    title: string;
    period: string;
    summary: string;
    description: string;
  };
  skills: {
    frontend?: string[];
    backend?: string[];
    deployment?: string[];
    database?: string[];
    etc?: string[];
  };
  keyContributions: {
    id: number;
    content: string;
  }[];
  problemSolving: {
    id: number;
    title: string;
    issue: string;
    solution: string;
    result?: string;
  }[];

  links: {
    github?: string;
    deploy?: string;
    figma?: string;
    notion?: string;
  };

  media: Media[];
}

export const careers: Careers[] = [
  {
    id: 1,
    basicInfo: {
      title: "엔티즌",
      period: "2022.09 ~ 2023.02",
      summary: "구매자와 판매자 간 역경매 중개 플랫폼",
      description: `EV 충전기 구매자와 CaaS 사업자를 연결하고, 충전 사업 가이드를 제공하는 역경매 중개 플랫폼입니다.\n\n구매자가 간편 견적을 요청하면 판매자들이 가견적을 제출하고, 구매자는 원하는 견적을 선택할 수 있습니다. 견적 선택 후에는 현장 실사를 거쳐 모두싸인 전자 계약 시스템을 통해 최종 계약이 체결되며, 프로젝트는 계약 → 준비 → 설치 → 검수 → 완료 단계로 체계적으로 진행됩니다.\n\n플랫폼 내에서는 A/S 문의와 판매자와의 댓글 방식 채팅이 가능하며, 관리자 페이지를 통해 전체 사용자와 프로젝트를 효율적으로 관리할 수 있습니다. 구매자는 소셜 로그인(카카오, 구글, 애플, 네이버)과 일반 로그인을, 판매자는 일반 로그인을 통해 서비스를 이용할 수 있습니다.`,
    },
    skills: {
      frontend: [
        "React",
        "Next.js",
        "TypeScript",
        "Styled-Components",
        "Material-UI",
        "Redux Toolkit",
        "React-Query",
      ],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "서비스 페이지 UI 구현 및 반응형 작업을 통해 다양한 디바이스에서 일관된 사용자 경험 제공",
      },
      {
        id: 2,
        content:
          "역경매 시스템의 메인 플로우 개발 (구매자 간편 견적 → 판매자 가견적 제출 → 최종 견적 확인 및 계약)",
      },
      {
        id: 3,
        content:
          "네이티브 앱과 웹 간 데이터 연동을 위한 <highlight>브릿지 로직 설계 및 적용</highlight> (카메라/파일 기능, 로그인 유지, 소셜 로그인)",
      },
      {
        id: 4,
        content:
          "<highlight>모두싸인 API 연동</highlight>을 통한 전자 계약 자동화로 계약 체결 시간 단축 및 업무 효율성 증대",
      },
      {
        id: 5,
        content:
          "<highlight>렌더링 최적화</highlight> 및 UI 개선을 통해 페이지 로딩 속도 <highlight>30% 향상</highlight>",
      },
      {
        id: 6,
        content:
          "<highlight>Redux Toolkit</highlight> 및 <highlight>persist</highlight> 적용을 통해 새로고침 및 뒤로 가기 시 데이터 유지 문제 해결",
      },
      {
        id: 7,
        content:
          "<highlight>React-Query</highlight>를 활용한 데이터 페칭 <highlight>최적화</highlight>로 페이지 전환 성능 개선",
      },
      {
        id: 8,
        content: "Intersection Observer API를 활용한 무한 스크롤 기능 구현",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "소셜 로그인 구현 문제 (카카오/구글)",
        issue:
          "네이티브 앱 내 웹뷰 환경에서 소셜 로그인 구현 시 여러 문제가 발생했습니다. 카카오 로그인의 경우 초기 SDK 적용 후 웹앱 패키징 문제로 인해 팝업 방식이 정상적으로 동작하지 않았으며, 구글 로그인은 웹과 앱 환경에서 구현 방식이 달라야 하는 기술적 제약이 있었습니다.",
        solution:
          "소셜 로그인 플랫폼별로 최적화된 구현 방식을 적용했습니다. 카카오 로그인은 최종적으로 리다이렉트 방식을 채택하여 웹과 앱 모두에서 안정적으로 동작하도록 개선했습니다. 구글 로그인의 경우, 웹에서는 react-google-login 라이브러리를 사용하고, 앱에서는 네이티브 로그인을 구현했습니다. 이때 네이티브 브릿지를 통해 로그인 정보(이메일, ID)를 웹으로 전달하는 방식으로 통합하여, 사용자 경험을 해치지 않으면서도 기술적 제약을 해결했습니다.",
      },
      {
        id: 2,
        title: "복잡한 데이터 플로우 관리 문제",
        issue:
          "역경매 시스템의 특성상 여러 단계의 프로세스에서 구매자와 판매자 간 실시간 상호작용이 빈번하게 발생했습니다. 이로 인해 데이터 정합성 유지가 어려웠고, 페이지 전환 시 데이터 동기화 문제가 발생했으며, 특히 실시간 업데이트가 필요한 상황에서 데이터 꼬임 현상이 자주 발생했습니다.",
        solution:
          "React-Query를 도입하여 서버 상태 관리를 체계화했습니다. 특히 캐싱 메커니즘과 실시간 데이터 갱신(revalidate) 기능을 활용하여 데이터 정합성을 확보했고, 여러 시나리오 테스트를 통해 엣지 케이스들을 보완했습니다. 또한 API 응답 처리와 화면 전환 타이밍을 최적화하여 사용자 경험을 개선했으며, 복잡한 상태 흐름을 단순화하여 유지보수가 용이한 구조로 재설계했습니다.",
      },
      {
        id: 3,
        title: "상태 유지 및 데이터 영속성 문제",
        issue:
          "다단계로 이루어진 견적 프로세스에서 페이지 새로고침이나 안드로이드 뒤로가기 시 데이터가 초기화되는 문제가 발생했습니다. 특히 사용자가 입력한 중요한 정보들이 유실되어 사용자 경험을 저해했고, 웹과 앱 간의 데이터 동기화 문제도 함께 발생했습니다.",
        solution:
          "Redux Toolkit과 persist 기능을 도입하여 로컬 스토리지 기반의 상태 관리 시스템을 구축했습니다. 이를 통해 페이지 새로고침이나 뒤로가기 상황에서도 사용자의 데이터가 안전하게 유지되도록 했습니다. 또한 네이티브 앱과 웹 간의 데이터 동기화를 위해 브릿지 통신 시점을 최적화하고, API 호출 시점을 조정하여 두 플랫폼 간 일관된 사용자 경험을 제공할 수 있도록 개선했습니다.",
      },
    ],
    links: {
      github: "",
      deploy: "",
      figma: "",
    },
    media: [],
  },
  {
    id: 2,
    basicInfo: {
      title: "자재바다",
      period: "2023.03 ~ 2023.05",
      summary: "목재 및 자재 쇼핑몰",
      description:
        "PHP 기반으로 구축된 목재 및 자재 쇼핑몰의 유지보수 작업을 수행하며, 프론트엔드 UI 개선 및 주문·결제 기능 보완.",
    },
    skills: {
      frontend: ["JavaScript", "HTML/CSS"],
    },
    keyContributions: [
      {
        id: 1,
        content: "HTML/CSS 수정 및 UI 개선으로 사용자 경험 향상",
      },
      {
        id: 2,
        content:
          "JavaScript를 활용한 데이터 처리 및 동적 UI 개선 (DOM 조작, 사용자 인터랙션 최적화)",
      },
      {
        id: 3,
        content:
          "장바구니 및 주문·결제 기능 API 연동 및 기존 시스템과의 연계 작업",
      },
    ],
    problemSolving: [],
    links: {
      github: "",
      deploy: "",
    },
    media: [],
  },
  {
    id: 3,
    basicInfo: {
      title: "유전자 검사 보고서 생성 플랫폼",
      period: "2023.09 ~ 2023.10",
      summary: "병원 검진 결과를 기반으로 한 맞춤형 유전자 분석 리포트 시스템",
      description:
        "병원에서 검진을 받은 환자가 유전자 검사 결과를 PDF 보고서로 확인할 수 있는 플랫폼.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "HTML/CSS",
        "React",
        "Next.js",
        "React-Query",
        "Emotion",
      ],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "react-pdf 라이브러리를 활용해 유전자 검사 내역을 PDF 파일로 변환 및 다운로드 기능 구현",
      },
      {
        id: 2,
        content:
          "react-pdf/renderer를 추가하여 모바일 환경에서 PDF 뷰어 정상 표시 문제 해결",
      },
      {
        id: 3,
        content:
          "관리자 페이지 개발 (회원가입, 로그인, 병원 및 회원 관리, 유전자 검사 요청, 약관 관리)",
      },
      {
        id: 4,
        content: "REST API를 활용한 서버 데이터 연동 및 UI 퍼블리싱",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "iOS 웹앱에서 PDF Viewer 미작동 문제",
        issue:
          "react-pdf를 활용하여 PDF 뷰어를 구현하는 과정에서 iOS 웹앱 환경에서 Viewer가 정상적으로 동작하지 않는 문제가 발생하였습니다.\n 해당 문제는 iOS의 메모리 관리 제한으로 인해 대용량 PDF를 Canvas로 렌더링할 때 정상적으로 표시되지 않는 점과, Safari에서 ReadableStream 등의 기능 미지원, 특정 iOS 버전에서의 호환성 문제 등으로 인해 발생한 것으로 확인되었습니다.\n GitHub 이슈(#1145, #1824)에서도 동일한 문제가 보고되었으나, 프로젝트 개발 당시까지 완전한 해결책이 마련되지 않은 상태였습니다.",
        solution:
          "기존 방식 대신 PDF 파일을 AWS S3에 저장한 후, react-pdf/renderer Viewer를 활용하여 표시하는 방식으로 변경하였습니다.\n 최종적인 플로우는 PDF 생성 → AWS S3 저장 → react-pdf/renderer Viewer로 로드 → 추가 내용 및 서명 후 새로운 PDF 생성 → 기존 PDF 삭제 및 최종 PDF URL을 서버에 저장하는 방식으로 구성했습니다.",
      },
    ],
    links: {
      github: "",
      deploy: "",
    },
    media: [],
  },
  {
    id: 4,
    basicInfo: {
      title: "일로 (스타일멘토)",
      period: "2023.11 ~ 2023.12",
      summary: "온라인 맞춤형 스타일 컨설팅 플랫폼",
      description:
        "검증된 패션 퍼스널 쇼퍼(패프)를 직접 선택하여, 온라인에서 맞춤형 스타일 컨설팅을 받을 수 있는 플랫폼.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "HTML/CSS",
        "React",
        "Next.js",
        "Redux Toolkit",
        "React-Query",
        "Emotion",
      ],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content: "서비스 페이지 및 관리자 페이지 개발 (퍼블리싱, API 연동)",
      },
      {
        id: 2,
        content:
          "예약 및 회원 관리 시스템 구현 (로그인, 예약 관리, 마이페이지)",
      },
      {
        id: 3,
        content: "관리자 페이지에서 일반 회원, 패프, 리뷰 관리 기능 개발",
      },
      {
        id: 4,
        content:
          "인증 및 결제 기능 연동 (카카오 소셜 로그인, Toss 결제, PortOne 본인 인증)",
      },
    ],
    problemSolving: [],
    links: {
      github: "",
      deploy: "",
    },
    media: [
      {
        id: 1,
        type: "image",
        url: "/assets/image/picaNote/PicaNote-Detail.png",
        title: "이미지1",
        description: "이미지 설명2",
      },
    ],
  },
  {
    id: 5,
    basicInfo: {
      title: "미술로 생각하기",
      period: "2024.01 ~ 2024.04",
      summary: "미술 교육 플랫폼",
      description:
        "기존 학부모 및 선생님들이 이용하던 교육 플랫폼을 Next.js 기반으로 리뉴얼하였습니다.\n가맹점 및 본사 관리자, 학부모, 선생님을 위한 모바일 환경을 개선. 보다 효율적인 학습 관리 및 운영이 가능하도록 개선함.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "HTML/CSS",
        "React",
        "Next.js",
        "Zustand",
        "React-Query",
        "Emotion",
      ],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "선생님 & 학부모용 웹앱 개발 (퍼블리싱, API 연동, 웹앱 패키징)",
      },
      {
        id: 2,
        content:
          "가맹점 및 본사 관리자 기능 개발 (회원 관리, 권한 설정, 사용자 정보 수정)",
      },
      {
        id: 3,
        content: "쇼핑몰 기능 개발 (가맹점에서 상품 구매 가능)",
      },
      {
        id: 4,
        content: "클라이언트와 협업하여 요구사항 정리 및 개선",
      },
      {
        id: 5,
        content: "프로젝트 일정 조율 및 우선순위 관리",
      },
    ],
    problemSolving: [],
    links: {
      github: "",
      deploy: "",
    },
    media: [
      {
        id: 1,
        type: "video",
        url: "/videos/bigto-landing.mov",
        title: "랜딩페이지 영상",
        videoType: VideoType.WEB,
      },
    ],
  },
  {
    id: 6,
    basicInfo: {
      title: "골드러시 (자체 서비스)",
      period: "2024.05 ~ 2024.06",
      summary: "금 현물 거래 플랫폼",
      description:
        "사용자가 목표를 설정하고 실물 금을 구매하며 자산을 관리할 수 있는 금융 플랫폼.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "HTML/CSS",
        "React",
        "Next.js",
        "Redux Toolkit",
        "React-Query",
        "Zustand",
        "Tailwind CSS",
      ],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "금 현물 거래를 위한 마진 계산 로직을 설계하고, 현장 실사 및 도매업체 연결을 통해 거래 프로세스 개선",
      },
      {
        id: 2,
        content: "React 기반 SPA(원페이지) 구조 설계 및 개발",
      },
      {
        id: 3,
        content:
          "웹-앱 브릿지 연동을 구현하여 네이티브 앱과 데이터 통신 최적화",
      },
      {
        id: 4,
        content: "UI/UX 개선을 위해 외부 디자이너와 협업하여 사용자 경험 향상",
      },
    ],
    problemSolving: [],
    links: {
      github: "",
      deploy: "",
    },
    media: [
      {
        id: 1,
        type: "video",
        url: "/videos/goldRush-landing.mov",
        title: "랜딩페이지 영상",
        videoType: VideoType.WEB,
      },
      {
        id: 2,
        type: "video",
        url: "/videos/goldRush-survice.mp4",
        title: "서비스 영상",
        videoType: VideoType.MOBILE,
      },
    ],
  },
  {
    id: 7,
    basicInfo: {
      title: "Flying Doctors",
      period: "2024.09 ~ 2024.10",
      summary: "의료 지원 및 보안 서비스를 지원하는 플랫폼",
      description: "실시간으로 의료 지원 및 보안 서비스를 지원하는 플랫폼.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "HTML/CSS",
        "React",
        "Next.js",
        "React-Query",
        "Socket.IO",
        "styled-component",
      ],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content: "관리자 페이지 기능 고도화 및 UI 개선",
      },
      {
        id: 2,
        content: "Socket.IO를 활용한 관리자 간 실시간 채팅 기능 구현",
      },
      {
        id: 3,
        content:
          "네이티브 앱 및 관리자 페이지 오류 발생 시 즉각적인 피드백를 반영하여 수정",
      },
      {
        id: 4,
        content: "API 호출 최적화를 통한 성능 개선",
      },
    ],
    problemSolving: [],
    links: {
      github: "",
      deploy: "",
    },
    media: [
      {
        id: 1,
        type: "video",
        url: "/videos/flyingDoctors-service.mp4",
        title: "서비스 영상",
        videoType: VideoType.MOBILE,
      },
    ],
  },
  {
    id: 8,
    basicInfo: {
      title: "온라인 편집샵 플랫폼",
      period: "2024.06 ~ 2024.10",
      summary: "다양한 브랜드 제품을 소개하는 온라인 쇼핑 플랫폼",
      description:
        "파트너스(판매자)가 입점 신청을 통해 승인받은 후 상품을 등록하면 쇼핑몰에 노출되어 판매되는 형태의 온라인 쇼핑 플랫폼입니다. 타임특가와 기획전 등 다양한 프로모션 이벤트를 운영하며, 본사 관리자가 이벤트를 오픈하면 판매자는 참여 신청을 통해 특정 시간대에 상품을 노출할 수 있습니다. 결제 시스템은 브랜드별 상품 쿠폰, 적립금, 등급 할인 등 다양한 할인 정책을 제공하며, 굿스플로 API 연동을 통해 자동화된 교환 및 반품 처리를 지원합니다.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "React",
        "Next.js",
        "Zustand",
        "React-Query",
        "Emotion",
      ],
      backend: ["Nest.js", "Prisma"],
      database: ["PostgreSQL"],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "클라이언트와 기획 단계에서 <highlight>정책 관련 소통</highlight> 담당, 불명확한 <highlight>프로세스를 협의</highlight>하여 해결",
      },
      {
        id: 2,
        content:
          "<highlight>장바구니</highlight>, <highlight>결제</highlight>, <highlight>반품/교환</highlight> 등 전반적인 서비스 페이지 및 <highlight>관리자 사이트</highlight>를 구현",
      },
      {
        id: 3,
        content:
          "카카오, 구글 <highlight>소셜 로그인</highlight> 및 KG 이니시스 <highlight>결제 시스템</highlight>을 성공적으로 연동하여 사용자 편의성을 향상",
      },
      {
        id: 4,
        content:
          "Nest.js와 Prisma를 활용하여 기본적인 테이블 추가 및 서버 CRUD 구현을 통해 <highlight>전체 개발 작업 시간을 30% 단축</highlight>",
      },
      {
        id: 5,
        content:
          "React-Query 및 Zustand를 활용한 데이터 상태 관리 최적화로 서비스 성능을 개선",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "서버 개발 역량 강화",
        issue:
          "기존에 서버 개발 경험이 부족하여 Nest.js 및 Prisma를 활용한 API 개발 과정에서 어려움이 발생했습니다.",
        solution:
          "이전 Node.js 및 Prisma 학습 경험을 바탕으로 이미 작성된 프로젝트의 서버 구조를 분석하였습니다. 또한 AI 도구를 적극 활용하여 API 개발을 진행하고 코드 품질을 개선하였으며, 이 과정에서 서버 개발 역량을 크게 향상시킬 수 있었습니다.",
      },
      {
        id: 2,
        title: "반품/교환 프로세스 개선",
        issue:
          "기획 단계에서 반품/교환 관련 정책이 미흡했고, UI/UX 디자인이 부재하여 개발 진행에 어려움이 있었습니다.",
        solution:
          "클라이언트와의 협의를 통해 CS 시스템을 활용한 중간 처리 방식을 도입했습니다. 교환 신청이 들어오면 굿스플로를 통해 자동으로 회수가 진행되고, 파트너스 담당자가 확인 후 고객과 전화 상담을 통해 교환 상품을 발송하거나 교환을 거절하는 프로세스를 구축하여 효율적인 운영이 가능하도록 개선하였습니다.",
      },
    ],
    links: {
      github: "",
      deploy: "",
    },
    media: [],
  },
];
