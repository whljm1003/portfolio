import { v4 as uuidv4 } from "uuid";

// 원티드 프로젝트 타입
export type WantedProject = {
  id: string;
  title: string;
  remark: string;
  methods: string[];
  skills: string[];
  link: {
    github: string;
    deploy: string;
  };
};

export const wantedData: WantedProject[] = [
  {
    id: uuidv4(),
    title: "</> 리뷰 조회, 등록 모바일 반응형 웹페이지",
    remark: "개인 프로젝트",
    methods: [
      "무한스크롤: Intersection Observer",
      "정렬, 리뷰 목록I(그리드 리스트)",
      "댓글, 좋아요, 링크 기능",
      "이미지 업로드/미리보기",
    ],
    skills: [
      "react, redux-toolkit",
      "React-router, react-slick, react-loading",
      "CSS: styled-component",
      "배포: netlify",
    ],
    link: {
      github: "https://github.com/whljm1003/wanted-codestates-project-09",
      deploy: "https://wanted-codestates-project-09.netlify.app/",
    },
  },
  {
    id: uuidv4(),
    title: "</> 간병인 신청하기 모바일 웹페이지",
    remark: "팀 프로젝트 7명",
    methods: [
      "돌봄 신청하기 페이지 구현",
      "주소 검색 모달창 구현",
      "API를 활용해 주소 검색창 데이터 받아오기",
    ],
    skills: [
      "react, react-router",
      "redux",
      "CSS: styled-component",
      "배포: vercel",
    ],
    link: {
      github:
        "https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-06",
      deploy: "https://wanted-codestates-project-05-06.vercel.app/",
    },
  },
  {
    id: uuidv4(),
    title: "</> 쇼핑몰 의류 검색, 조회 웹페이지",
    remark: "팀 프로젝트 6명",
    methods: ["뷰어 페이지 UI 작업", "검색결과 로딩처리"],
    skills: [
      "react, react-router",
      "localStorage",
      "CSS: styled-component",
      "배포: vercel",
    ],
    link: {
      github:
        "https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-05",
      deploy: "https://wanted-codestates-project-05-05-01.vercel.app/",
    },
  },
  {
    id: uuidv4(),
    title: "</> 게임 전적 웹페이지",
    remark: "팀 프로젝트 6명",
    methods: [
      "랭크 페이지 UI 작업",
      "랭크 페이지 - 가이드 모달창 만들기",
      "랭크 페이지 - 개인전/팀전 탭기능, MORE 버튼 구현",
    ],
    skills: [
      "react, react-router",
      "axios, firebase",
      "CSS: styled-component",
      "배포: vercel",
    ],
    link: {
      github:
        "https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-02",
      deploy: "https://wanted-codestates-project-05-02.vercel.app/",
    },
  },
  {
    id: uuidv4(),
    title: "</> 진단 검사 결과 페이지",
    remark: "팀 프로젝트 6명",
    methods: ["하단 bar chart 의 레이아웃 구현"],
    skills: ["vue, vue-chart.js", "CSS: styled-component", "배포: vercel"],
    link: {
      github:
        "https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-11",
      deploy: "https://wanted-codestates-project-team-05-11.vercel.app/",
    },
  },
  {
    id: uuidv4(),
    title: "</> 병명 검색 추천 페이지",
    remark: "팀 프로젝트 2명",
    methods: ["search UI 및 반응형 구현", "키보드 DropDown 기능 구현"],
    skills: [
      "react",
      "redux-tookit, redux-RTK",
      "CSS: styled-component",
      "배포: vercel",
    ],
    link: {
      github:
        "https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-10-2",
      deploy: "https://wanted-codestates-project-05-10-2.vercel.app/",
    },
  },
  {
    id: uuidv4(),
    title: "</> 휴양림 조회/저장 웹페이지",
    remark: "팀 프로젝트 6명",
    methods: ["휴앙림 저장 폼(모달창)을 구현", "모달 저장,수정,삭제 기능"],
    skills: [
      "react, react-router",
      "redux-tookit",
      "CSS: styled-component",
      "배포: netlify",
    ],
    link: {
      github:
        "https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-08",
      deploy: "https://wanted-codestates-project-05-08.netlify.app/",
    },
  },
  {
    id: uuidv4(),
    title: "</> todoList 듀얼 셀렉터",
    remark: "팀 프로젝트 6명",
    methods: ["Drag and drop 기능 구현"],
    skills: ["react, recoil", "CSS: styled-component", "배포: github"],
    link: {
      github:
        "https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-3",
      deploy:
        "https://wanted-codestates-project-team-05.github.io/wanted-codestates-project-05-3/",
    },
  },
];

// 스티브랩스 프로젝트 타입
export type StevelabsProject = {
  id: string;
  title: string;
  period: string;
  summary: string;
  description: string;
  skills: string[];
  works: string[];
  links: {
    notion: string;
  };
};

export const stevelabsData: StevelabsProject[] = [
  {
    id: uuidv4(),
    title: "</> 온라인 편집샵 플랫폼",
    period: "2024.06 ~ 2024.10",
    summary: "다양한 브랜드 제품을 소개하는 온라인 쇼핑 플랫폼",
    description:
      "파트너스(판매자)가 입점 및 승인 후 상품을 등록해 판매하는 온라인 쇼핑 플랫폼으로, 타임특가·기획전 등 다양한 프로모션을 운영합니다. 브랜드별 쿠폰, 적립금, 등급 할인 등 다채로운 할인 정책을 제공하며, 굿스플로 API와 연동하여 교환 및 반품 프로세스를 자동화했습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Zustand",
      "React-Query",
      "Emotion",
    ],
    works: [
      "Emotion + Ant Design 기반으로 전반적인 관리자 페이지 UI 구현",
      "React Hook Form, Zustand, Zod 상태 관리 적용",
      "React Query를 활용한 데이터 통신 구조 최적화",
      "NestJS + Prisma ORM 활용해 필요한 API 구현",
      "장바구니 → 결제 완료까지 전체 반응형 페이지 구현",
      "이니시스 결제 API 연동 (카드·휴대폰·무통장)",
    ],
    links: {
      notion:
        "https://www.notion.so/whljm1003/1e79bb46550680118135ed5e6db74890?pvs=4",
    },
  },
  {
    id: uuidv4(),
    title: "</> Flying Doctors",
    period: "2024.09 ~ 2024.10",
    summary: "24시간 실시간 해외 의료 지원 및 보안 플랫폼",
    description:
      "해외에서 응급 상황 발생 시 긴급 채팅과 알림을 통해 병원 안내 및 헬기 지원 등 신속한 의료 대응을 제공하는 플랫폼입니다.\n 사용자는 모바일 앱으로 전문가와 실시간 소통할 수 있으며, 관리자는 웹페이지를 통해 운영을 관리합니다. 크라이시스24 API를 통해 전 세계의 위험 상황 알림을 제공하고, 개인 질환자를 위한 복약 기록 및 시간대별 복약 알림 기능을 지원합니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "React-Query",
      "Socket.IO",
      "styled-component",
    ],
    works: [
      "관리자 웹페이지 전반적인 고도화 작업 담당",
      "Socket.IO를 활용하여 관리자 간 실시간 채팅 기능 구현",
    ],
    links: {
      notion:
        "https://www.notion.so/whljm1003/Flying-Doctors-24-1e79bb46550680ddb916fef8d38aac05?pvs=4",
    },
  },
  {
    id: uuidv4(),
    title: "</> 골드러시",
    period: "2024.05 ~ 2024.06",
    summary: "실물 금 판매 및 목표 설정을 통한 재테크 플랫폼",
    description:
      "사용자가 목표를 설정하고 실물 금을 직접 구매·관리할 수 있도록 돕는 금융 플랫폼입니다.\n 모바일 사용자 경험을 극대화하기 위해 원페이지 방식으로 구현하였으며, 경제 관련 도서 및 유튜브 영상 제공, 목표 달성 독려 알림을 통해 체계적인 자산 관리를 지원합니다. 실제 금 현물 거래 과정에서는 부가세와 마진을 반영한 가격 책정 로직을 구축하고, 직접 시장 조사와 배송 과정을 운영하여 신뢰성과 사용자 만족도를 높였습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "React-Query",
      "Zustand",
      "Tailwind CSS",
    ],
    works: [
      "금 시세 수집, 가격 제약 조건, 관리자 기능 정의",
      "Tailwind CSS 기반 모바일 친화적 UI 구성",
      "네이티브 앱(WebView) 브릿지 작업 (소셜 로그인,로그인 유지, 암호 인증, 카메라 접근, 파일 다운로드)",
      "무통장 입금(팝빌) API 연동",
      "드림시큐리티 본인 인증 API 연동",
    ],
    links: {
      notion:
        "https://www.notion.so/whljm1003/1e79bb46550680b08983e4e43ede15b4?pvs=4",
    },
  },
  {
    id: uuidv4(),
    title: "</> 미술로 생각하기",
    period: "2024.01 ~ 2024.04",
    summary: "유아 미술학원 CMS",
    description:
      "약 10년간 운영된 ASP 서비스를 Next.js/Nest.js 기반으로 리뉴얼하여 웹 및 모바일 환경을 개선하고 학습 관리 최적화했습니다.\n유아 학생들이 랜딩 페이지에서 체험 학습이나 학원 상담을 통해 수업을 신청하고, 가맹점 관리자는 학생들을 등록하여 관리합니다. 이후 학생들의 스케줄을 캘린더로 표현하고, 교육 정보, 앨범, 수납 정보를 기록할 수 있습니다. \n또한, 가맹점 운영에 필요한 경영 관리, 커뮤니티, 교재 주문과 같은 CMS 서비스를 제공합니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Zustand",
      "React-Query",
      "Emotion",
    ],
    works: [
      "JWT 토큰 로그인 및 Interceptor를 활용한 자동 재인증, 본사/가맹점 권한 제어",
      "나이스페이먼츠 API연동 (카드 및 가상계좌)",
      "회원 수업·결제·활동 내역 조회 및 수정 기능 / 신규 회원 등록 기능 개발",
      "Chart.js 기반 심리검사 결과 Radar 시각화 리포트 페이지 구현",
      "쇼핑몰 장바구니 → 결제 → 환불 프로세스 및 본사 상품 등록",
    ],
    links: {
      notion:
        "https://www.notion.so/whljm1003/CMS-1e79bb4655068000b37bd0f7aa77e180?pvs=4",
    },
  },
  {
    id: uuidv4(),
    title: "</> 일로 (illo)",
    period: "2023.11 ~ 2023.12",
    summary: "온라인 맞춤형 스타일 컨설팅 플랫폼",
    description:
      "검증된 패션 퍼스널 쇼퍼(패프)를 선택하여 온라인에서 맞춤형 스타일 컨설팅을 받을 수 있는 플랫폼입니다.\n 개인의 패션 고민을 해결하기 위해 기획된 서비스로, 모바일 앱 형태의 웹앱으로 구현되어 뛰어난 사용자 경험을 제공합니다. React Spring Bottom Sheet를 활용하여 iOS와 유사한 인터페이스를 구현하였으며, 이미지 로딩 성능을 최적화하여 빠르고 원활한 사용성을 보장했습니다. 예약 기능 구현을 위해 캘린더 기능과 Toss 결제 연동을 통해 편리한 예약 관리 환경을 제공했습니다.",
    skills: ["TypeScript", "React", "Next.js", "React-Query", "Emotion"],
    works: [
      "Figma 디자인 기준 UI 토큰 정리",
      "React Query(useInfiniteQuery) + Intersection Observer로 무한 스크롤 구현",
      "카카오 소셜 로그인, PortOne 본인 인증 구현 및 커스텀 훅 분리",
      "캘린더 기반 예약 페이지 구현",
      "Toss Payments API 연동",
    ],
    links: {
      notion:
        "https://www.notion.so/whljm1003/illo-1e79bb465506804b81cdf752e09f4b5c?pvs=4",
    },
  },
  {
    id: uuidv4(),
    title: "</> 유전자 검사 보고서 생성 플랫폼",
    period: "2023.09 ~ 2023.10",
    summary: "병원 검진 결과를 PDF 보고서로 제공하는 유전자 분석 서비스",
    description:
      "병원에서 검진을 받은 환자가 웹 서비스를 통해 유전자 검사 결과를 PDF 보고서 형태로 확인할 수 있도록 하는 서비스입니다. 환자는 검진 후 웹에서 자신의 건강 상태를 열람하고 보고서를 다운로드할 수 있습니다.\n\n주요 프로세스는 다음과 같이 진행됩니다 :\n1. 환자가 병원에서 유전자 검사를 신청하면, 카카오 알림톡을 통해 안내 메시지가 발송됩니다.\n2. 환자는 웹에서 필요한 정보를 입력하고 서명을 완료한 후, 보고서를 신청할 수 있습니다.\n3. 유전자 검사 API를 통해 분석 데이터를 받아 PDF 보고서를 생성하며, 보고서가 준비되면 다시 환자에게 알림이 전송됩니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "React-Query",
      "Emotion",
      "AWS",
      "react-pdf",
      "react-pdf/renderer",
      "react-signature-canvas",
    ],
    works: [
      "react-pdf/renderer 활용하여 결과 보고서를 PDF로 생성 및 다운로드 기능 구현",
      "관리자 페이지 개발 (회원가입, 로그인, 병원·회원 관리, 검사 요청, 약관 관리)",
    ],
    links: {
      notion:
        "https://www.notion.so/whljm1003/1e79bb465506801fa8e5c0340e401349?pvs=4",
    },
  },
  {
    id: uuidv4(),
    title: "</> 자재바다",
    period: "2023.03 ~ 2023.05",
    summary: "목재 및 자재 쇼핑몰 고도화 및 유지보수",
    description:
      "기존에 PHP로 구축된 목재 및 자재 전문 쇼핑몰의 고도화 및 유지보수 작업을 수행했습니다. Vanilla JavaScript를 활용하여 DOM을 직접 조작하며 장바구니와 결제 페이지의 UI 개선 및 복잡한 배송비·할인 로직의 정확성을 높였습니다. 특히 로직 모듈화와 꼼꼼한 디버깅을 통해 코드의 가독성과 유지보수성을 높였으며, 이를 통해 개발자로서의 문제 해결 역량을 강화할 수 있었습니다.",
    skills: ["JavaScript", "PHP"],
    works: [
      "Vanilla JavaScript를 활용한 DOM 조작으로 장바구니 및 결제 페이지의 UI 구현",
      "장바구니 내 배송비 및 할인 로직을 모듈화하여 정확성을 높이고 코드 유지보수성 향상",
    ],
    links: {
      notion:
        "https://www.notion.so/whljm1003/1e79bb46550680bd9286e8619c523270?pvs=4",
    },
  },

  {
    id: uuidv4(),
    title: "</> 엔티즌",
    period: "2022.09 ~ 2023.02",
    summary: "구매자와 판매자 간 역경매 중개 플랫폼",
    description: `EV 충전기 구매자와 CaaS 사업자를 연결하고, 충전 사업 가이드를 제공하는 역경매 중개 플랫폼입니다.\n\n구매자가 간편 견적을 요청하면 판매자들이 가견적을 제출하고, 구매자는 원하는 견적을 선택할 수 있습니다. 견적 선택 후에는 현장 실사를 거쳐 모두싸인 전자 계약 시스템을 통해 최종 계약이 체결되며, 프로젝트는 계약 → 준비 → 설치 → 검수 → 완료 단계로 체계적으로 진행됩니다.\n\n플랫폼 내에서는 A/S 문의와 판매자와의 댓글 방식 채팅이 가능하며, 관리자 페이지를 통해 전체 사용자와 프로젝트를 효율적으로 관리할 수 있습니다. 구매자는 소셜 로그인(카카오, 구글, 애플, 네이버)과 일반 로그인을, 판매자는 일반 로그인을 통해 서비스를 이용할 수 있습니다.`,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Styled-Components",
      "Material-UI",
      "Redux Toolkit",
      "React-Query",
    ],
    works: [
      "네이티브 앱과 웹 간 데이터 연동을 위한 브릿지 로직 설계 및 적용 (카메라/파일 기능, 로그인 유지)",
      "네이버, 구글, 카카오 소셜 로그인 및 NICE 본인 인증 기능 구현",
      "모두싸인 API 연동을 통한 전자 계약 자동화 및 계약 체결 기능 구축",
      "Redux Toolkit를 활용해 데이터 상태 관리 최적화 및 사용자 경험 개선",
      "React-Query를 활용한 데이터 페칭 최적화로 페이지 전환 및 렌더링 성능 향상",
      "Intersection Observer API를 활용한 무한 스크롤 기능 구현",
    ],
    links: {
      notion:
        "https://www.notion.so/whljm1003/1e79bb465506801a9b32c8ab1e3f5ec6?pvs=4",
    },
  },
];
