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
    id: "career-project-1",
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
    id: "career-project-2",
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
    id: "career-project-3",
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
    id: "career-project-4",
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
    id: "career-project-5",
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
    id: "career-project-6",
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
    id: "career-project-7",
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
    id: "career-project-8",
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
  role: string;
  summary: string;
  description: string;
  skills: string[];
  works: string[];
  outcome: string;
  links: {
    notion: string;
  };
};

export const stevelabsData: StevelabsProject[] = [
  {
    id: "career-project-9",
    title: "</> 온라인 편집샵 플랫폼",
    period: "2024.06 - 2024.10",
    role: "파트너스·본사 관리자 프론트엔드 및 관리자 API",
    summary: "쇼핑몰 관리자 화면과 상품·옵션·할인·결제 흐름 개발",
    description:
      "여러 브랜드의 상품을 판매하는 쇼핑몰에서 파트너스·본사 관리자의 상품 관리와 구매·결제 흐름을 개발했습니다. 옵션 조합과 쿠폰·마일리지·등급 할인을 반영하고, 프론트엔드와 관리자 API 개발을 병행했습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Ant Design",
      "NestJS",
      "Prisma",
    ],
    works: [
      "관리자 테이블·필터를 공통 컴포넌트로 구성하고 입력 검증·페이지 간 상태 처리",
      "상품 옵션 조합·쿠폰·마일리지·등급 할인과 KG이니시스 결제 연동",
      "NestJS·Prisma 관리자 API 개발 병행",
      "상품 등록 트랜잭션으로 부분 등록에 대응하고, 옵션 논리 삭제로 기존 주문의 옵션 조회 보완",
    ],
    outcome:
      "관리자 조회·입력과 구매·결제 흐름을 연결했습니다. 상품 등록과 옵션 삭제 시 기존 데이터 조회에 영향을 주는 조건을 API에서도 처리했습니다.",
    links: {
      notion:
        "https://app.notion.com/p/whljm1003/ac79bb46550683d9a834010ec791cd81",
    },
  },
  {
    id: "career-project-10",
    title: "</> Flying Doctors",
    period: "2024년",
    role: "관리자 웹 고도화·운영 이슈 대응",
    summary: "해외 의료 지원 서비스의 관리자 채팅·위치·보안 정보 화면 개발",
    description:
      "해외 의료 지원 서비스에서 관리자 웹 고도화와 고객사가 보고한 운영 오류에 대응했습니다. 의료 지원에 필요한 실시간 채팅, 환자 위치와 보안 정보를 관리자 화면에 연결했습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "TanStack Query",
      "Socket.IO",
      "Google Maps",
    ],
    works: [
      "Socket.IO 기반 관리자 실시간 채팅 구현",
      "Google Maps 환자 위치 및 Crisis24·공공데이터 기반 보안 정보·필터 화면 구현",
      "관리자 UI 개선과 고객사가 보고한 운영 오류 대응",
    ],
    outcome:
      "관리자가 채팅·위치·보안 정보를 확인하는 화면을 구현하고 운영 중 발견된 UI 오류에 대응했습니다.",
    links: {
      notion:
        "https://app.notion.com/p/whljm1003/9f29bb465506831597af815a138f845b",
    },
  },
  {
    id: "career-project-11",
    title: "</> 골드러시",
    period: "2024.05 - 2024.06",
    role: "기획 참여·프론트엔드 개발",
    summary: "실물 금 판매 서비스의 가격 정책·WebView·외부 API 연동",
    description:
      "실물 금을 구매·관리하는 서비스에서 관리자 시세 입력·가격 제약 정책과 관련 화면을 개발했습니다. 앱 WebView에서 로그인·인증·카메라·파일 기능을 사용하도록 웹·네이티브 연동을 처리했습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "WebView",
    ],
    works: [
      "관리자 시세 입력과 가격 제약 정책·관련 화면 개발",
      "WebView 로그인 유지·인증·카메라·파일 기능 연동",
      "팝빌 무통장 입금 API와 드림시큐리티 본인 인증·소셜 로그인 연동",
    ],
    outcome:
      "금 구매 화면에 가격 정책과 인증·입금 흐름을 연결하고, 앱 WebView에서 사용하는 네이티브 기능을 연동했습니다.",
    links: {
      notion:
        "https://app.notion.com/p/whljm1003/cb59bb46550683419b76012fcd280f7f",
    },
  },
  {
    id: "career-project-12",
    title: "</> 미술로 생각하기",
    period: "2023.11 - 2024.03",
    role: "관리자 프론트엔드·운영 대응",
    summary: "유아 미술학원 본사·가맹점의 회원·수업·결제 관리 화면 개발",
    description:
      "유아 미술학원의 본사·가맹점을 위한 CMS에서 회원·수업·결제 관리 화면을 개발했습니다. 로그인과 권한별 접근 제어, 교구 주문·결제, 검사 결과 리포트를 관리자 업무에 연결했습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Emotion",
      "Ant Design",
      "Chart.js",
    ],
    works: [
      "로그인·재인증과 본사·가맹점 권한별 접근 제어 구현",
      "회원 등록과 수업·결제·활동 내역 조회·수정 화면 개발",
      "나이스페이먼츠 교구 주문·결제 연동",
      "Chart.js Radar 기반 검사 결과 리포트 구현",
    ],
    outcome:
      "권한에 따라 관리 기능에 접근하고, 회원·수업·결제·리포트 업무를 웹에서 처리하는 화면을 구현했습니다.",
    links: {
      notion:
        "https://app.notion.com/p/whljm1003/d659bb46550683ae91ab8191e10c36ef",
    },
  },
  {
    id: "career-project-13",
    title: "</> 일로 (illo)",
    period: "2023.10 - 2023.11",
    role: "사용자 웹앱 프론트엔드",
    summary: "스타일 컨설팅 서비스의 공통 UI·무한 스크롤·예약·결제 개발",
    description:
      "사용자가 퍼스널 쇼퍼를 선택해 스타일 컨설팅을 예약하는 웹앱입니다. Figma 디자인 토큰과 공통 UI를 구성하고, 이미지 목록·무한 스크롤·캘린더 예약과 결제 흐름을 개발했습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "TanStack Query",
      "Emotion",
      "React Spring Bottom Sheet",
    ],
    works: [
      "Figma 디자인 토큰과 공통 UI·레이아웃·모달·훅 구성",
      "이미지 Lazy Loading과 useInfiniteQuery·Intersection Observer 기반 무한 스크롤 구현",
      "캘린더 기반 예약 및 Toss Payments 결제 연동",
      "카카오 로그인·포트원 본인 인증 연동",
    ],
    outcome:
      "이미지 목록을 점진적으로 불러오는 화면과 예약·인증·결제 흐름을 구현했습니다. 공통 UI와 훅을 구성해 여러 화면에서 재사용했습니다.",
    links: {
      notion:
        "https://app.notion.com/p/whljm1003/1479bb46550683e39181814869bb0f11",
    },
  },
  {
    id: "career-project-14",
    title: "</> 유전자 검사 보고서 생성 플랫폼",
    period: "2023.09 시작",
    role: "사용자·관리자 프론트엔드",
    summary: "유전자 검사 보고서·동의서 PDF와 웹 서명·관리 화면 개발",
    description:
      "병원 검진 결과를 PDF 보고서로 제공하는 서비스에서 보고서·동의서 생성과 웹 서명 입력을 연결했습니다. 병원·회원·검사 요청·약관을 관리하고 생성 문서를 저장·조회하는 화면을 개발했습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "TanStack Query",
      "Emotion",
      "react-pdf/renderer",
      "react-signature-canvas",
    ],
    works: [
      "react-pdf/renderer 기반 보고서·동의서 PDF 생성 및 다운로드 구현",
      "signature-canvas 웹 서명 입력과 문서 생성 흐름 연결",
      "병원·회원·검사 요청·약관 관리 및 생성 문서 저장·조회 화면 개발",
    ],
    outcome:
      "사용자의 서명 입력과 PDF 문서 생성·다운로드를 연결하고, 검사 요청과 생성 문서를 관리하는 화면을 구현했습니다.",
    links: {
      notion:
        "https://app.notion.com/p/whljm1003/9839bb465506837696f081dce726ccd4",
    },
  },
  {
    id: "career-project-15",
    title: "</> 자재바다",
    period: "2023.03 - 2023.05",
    role: "기존 프론트엔드 유지보수·고도화",
    summary: "PHP 쇼핑몰의 장바구니·결제 화면 및 계산 로직 개선",
    description:
      "기존 PHP 기반 목재·자재 쇼핑몰에서 Vanilla JavaScript로 장바구니·결제 화면을 개선했습니다. 옵션·배송비·할인 조건을 확인하고 계산 로직을 유틸 함수로 정리했습니다.",
    skills: ["JavaScript", "PHP"],
    works: [
      "Vanilla JavaScript DOM 조작으로 장바구니·결제 UI 개선",
      "옵션·배송비·할인 조건과 계산 로직을 유틸 함수로 정리",
    ],
    outcome:
      "장바구니·결제 화면의 입력·계산 처리를 개선하고, 조건별 로직을 함수로 분리했습니다.",
    links: {
      notion:
        "https://app.notion.com/p/whljm1003/43b9bb4655068231b54c81533d76c948",
    },
  },
  {
    id: "career-project-16",
    title: "</> 엔티즌",
    period: "2022.09 - 2023.02",
    role: "서비스 프론트엔드",
    summary: "충전 사업 역경매의 반응형 화면·견적·실사·전자 계약 연동",
    description:
      "EV 충전기 구매자와 충전 사업자를 연결하는 역경매 서비스입니다. 견적 요청·선택, 실사 예약과 전자 계약 화면을 개발하고, 인증·WebView 브릿지와 화면 상태 보존을 처리했습니다.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Redux Toolkit",
      "TanStack Query",
      "Styled-Components",
      "Material-UI",
      "WebView",
    ],
    works: [
      "반응형 사용자 화면과 Redux Toolkit persist 기반 상태 보존 구현",
      "소셜 로그인·NICE 본인 인증·WebView 카메라·파일·로그인 유지 연동",
      "견적·실사 예약 흐름과 모두싸인 전자 계약 API 연동",
      "Intersection Observer 기반 무한 스크롤 구현",
    ],
    outcome:
      "견적 요청부터 실사 예약·전자 계약까지 이어지는 웹 화면과 외부 API를 연결했습니다.",
    links: {
      notion:
        "https://app.notion.com/p/whljm1003/7999bb46550683e9b2df81bb7d62cafb",
    },
  },
];
