export const careers = [
  {
    id: 1,
    projectTitle: "엔티즌",
    projectPeriod: "2022.09 ~ 2023.02",
    projectSubTitle: "구매자와 판매자 간 역경매 중개 플랫폼",
    description:
      "EV 충전기 구매자와 CaaS 사업자를 연결하고, 충전 사업 가이드를 제공하는 역경매 중개 플랫폼",
    problemSolving: [
      {
        id: 1,
        title: "데이터 관리 문제",
        issue:
          "간편 견적 기능의 다단계 데이터 전송 과정에서 상태 관리가 복잡해졌습니다.",
        solution:
          "redux-toolkit을 상태 관리 라이브러리로 사용하고, 페이지 새로 고침 시 데이터 소실 문제를 방지하기 위해 redux-toolkit의 persist 기능으로 로컬 스토리지에 데이터를 저장하였습니다.",
      },
      {
        id: 2,
        title: "페이지 전환 및 데이터 캐싱 문제",
        issue:
          "구매자와 판매자 간 빈번한 상호작용으로 인해 데이터 꼬임과 페이지 전환이 원활하지 않은 문제가 발생했습니다.",
        solution:
          "API 호출 후 화면 전환 이슈를 react 렌더링과 react-query의 refetch 및 revalidate 기능을 활용하여 개선하였습니다.",
      },
      {
        id: 3,
        title: "소셜 로그인 구현 이슈",
        issue:
          "카카오 로그인: 최초 카카오 로그인 SDK를 사용해 구현했으나 웹앱에서 정상 작동하지 않아 팝업 형태로 전환하였습니다. 이후 웹앱 패키징 문제로 팝업 방식이 적합하지 않아, 리다이렉트 방식으로 변경하였습니다.\n 구글 로그인: 웹에서는 react 기반의 구글 로그인을 구현하였으나, 앱에서는 공식 문서에 따라 사용이 제한되어 별도로 구현된 구글 로그인을 사용하였습니다",
        solution:
          "웹에서 구글 로그인 버튼 클릭 시, 앱으로 네이티브 브릿지 호출이 이루어지고, 앱에서 구글 로그인 처리를 한 후 이메일과 로그인 ID를 반환합니다. 이후 웹에서 이를 활용하여 회원 가입 또는 로그인을 진행합니다.",
      },
    ],
    contributions: [
      { id: 1, contents: "HTML/CSS 퍼블리싱 및 UI 개선" },
      { id: 2, contents: "네이버, 구글, 카카오 소셜 로그인 구현" },
      { id: 3, contents: "모두싸인 API 연동을 통한 역경매 계약 자동화" },
      {
        id: 4,
        contents:
          "네이티브 앱과 웹 간 데이터 연동을 위한 브릿지 로직 설계 및 적용",
      },
      { id: 5, contents: "렌더링 성능 최적화 및 데이터/스타일 오류 수정" },
    ],
    result: [
      {
        id: 1,
        content:
          "역경매 시스템 연동으로 계약 체결 시간 단축 및 클라이언트 만족도 향상",
      },
      {
        id: 2,
        content: "렌더링 최적화 및 UI 개선으로 페이지 로딩 속도 30% 향상",
      },
    ],
    skills: [
      { id: 1, name: "TypeScript, HTML/CSS" },
      { id: 2, name: "React, Next.js, Redux Toolkit, React-Query" },
      { id: 3, name: "CSS: styled-component, Material-UI" },
      { id: 4, name: "배포: AWS" },
    ],
    link: {
      github: "",
      deploy: "",
    },
  },
  {
    id: 2,
    projectTitle: "자재바다",
    projectPeriod: "2023.03 ~ 2023.05",
    projectSubTitle: "목재 및 자재 쇼핑몰",
    description:
      "PHP 기반으로 구축된 목재 및 자재 쇼핑몰의 유지보수 작업을 수행하며, 프론트엔드 UI 개선 및 주문·결제 기능 보완.",
    result: [
      {
        id: 1,
        content: "UI 개선 후 사용자 클릭당 전환율 증가",
      },
      {
        id: 2,
        content:
          "장바구니 및 결제 기능 최적화로 주문 프로세스 간소화 및 사용자 편의성 개선",
      },
    ],
    problemSolving: [],

    contributions: [
      { id: 1, contents: "HTML/CSS 수정 및 UI 개선으로 사용자 경험 향상" },
      {
        id: 2,
        contents:
          "JavaScript를 활용한 데이터 처리 및 동적 UI 개선\n (DOM 조작, 사용자 인터랙션 최적화)",
      },
      {
        id: 3,
        contents:
          "장바구니 및 주문·결제 기능 API 연동 및 기존 시스템과의 연계 작업",
      },
    ],
    skills: [{ id: 1, name: "JavaScript, HTML/CSS" }],
    link: {
      github: "",
      deploy: "",
    },
  },
  {
    id: 3,
    projectTitle: "유전자 검사 보고서 생성 플랫폼",
    projectSubTitle: "유전자 검사 보고서 생성 플랫폼",
    projectPeriod: "2023.09 ~ 2023.10",
    description:
      "병원에서 검진을 받은 환자가 유전자 검사 결과를 PDF 보고서로 확인할 수 있는 플랫폼.",
    result: [
      {
        id: 1,
        content: "PDF 변환 기능 도입으로 환자의 검사 결과 확인 프로세스 자동화",
      },
      {
        id: 2,
        content: "모바일 환경에서의 PDF 뷰어 오류 해결로 사용자 접근성 개선",
      },
      {
        id: 3,
        content:
          "관리자 기능 추가 후 병원별 유전자 검사 요청 및 관리 프로세스 최적화",
      },
    ],
    contributions: [
      {
        id: 1,
        contents:
          "react-pdf 라이브러리를 활용해 유전자 검사 내역을 PDF 파일로 변환 및 다운로드 기능 구현",
      },
      {
        id: 2,
        contents:
          "react-pdf/renderer를 추가하여 모바일 환경에서 PDF 뷰어 정상 표시 문제 해결",
      },
      {
        id: 3,
        contents:
          "관리자 페이지 개발 (회원가입, 로그인, 병원 및 회원 관리, 유전자 검사 요청, 약관 관리)",
      },
      { id: 4, contents: "REST API를 활용한 서버 데이터 연동 및 UI 퍼블리싱" },
    ],
    skills: [
      { id: 1, name: "TypeScript, HTML/CSS" },
      { id: 2, name: "React, Next.js, React-Query" },
      { id: 3, name: "CSS: Emotion" },
      { id: 4, name: "배포: AWS" },
    ],
    problemSolving: [],
    link: {
      github: "",
      deploy: "",
    },
  },
  {
    id: 4,
    projectTitle: "일로 (스타일멘토)",
    projectSubTitle: "온라인 맞춤형 스타일 컨설팅 플랫폼",
    projectPeriod: "2023.11 ~ 2023.12",
    description:
      "검증된 패션 퍼스널 쇼퍼(패프)를 직접 선택하여, 온라인에서 맞춤형 스타일 컨설팅을 받을 수 있는 플랫폼.",
    result: [
      { id: 1, content: "예약 시스템 도입 후 사용자 예약 완료율 향상" },
      {
        id: 2,
        content: "인증 및 결제 연동으로 서비스 이용 편의성 개선",
      },
      {
        id: 3,
        content: "관리자 기능 추가 후 패프 및 회원 관리 프로세스 최적화",
      },
    ],
    problemSolving: [],
    contributions: [
      {
        id: 1,
        contents: "서비스 페이지 및 관리자 페이지 개발 (퍼블리싱, API 연동)",
      },
      {
        id: 2,
        contents:
          "예약 및 회원 관리 시스템 구현 (로그인, 예약 관리, 마이페이지)",
      },
      {
        id: 3,
        contents: "관리자 페이지에서 일반 회원, 패프, 리뷰 관리 기능 개발",
      },
      {
        id: 4,
        contents:
          "인증 및 결제 기능 연동 (카카오 소셜 로그인, Toss 결제, PortOne 본인 인증)",
      },
    ],
    skills: [
      { id: 1, name: "TypeScript, HTML/CSS" },
      { id: 2, name: "React, Next.js, Redux Toolkit, React-Query" },
      { id: 3, name: "CSS: Emotion" },
      { id: 4, name: "배포: AWS" },
    ],
    link: {
      github: "",
      deploy: "",
    },
  },
  {
    id: 5,
    projectTitle: "미술로 생각하기",
    projectSubTitle: "미술 교육 플랫폼",
    projectPeriod: "2024.01 ~ 2024.04",
    description:
      "기존 학부모 및 선생님들이 이용하던 교육 플랫폼을 Next.js 기반으로 리뉴얼하였습니다.\n가맹점 및 본사 관리자, 학부모, 선생님을 위한 모바일 환경을 개선. 보다 효율적인 학습 관리 및 운영이 가능하도록 개선함.",
    result: [
      {
        id: 1,
        content:
          "웹앱 패키징을 통해 모바일에서도 학부모 & 선생님 서비스 사용 가능",
      },
      { id: 2, content: "관리자 기능 추가 후 가맹점 운영 효율성 개선" },
      {
        id: 3,
        content:
          "내부적으로 개발 일정을 조율하고, 원활한 진행을 위해 우선순위 조정",
      },
    ],
    problemSolving: [],

    contributions: [
      {
        id: 1,
        contents:
          "선생님 & 학부모용 웹앱 개발 (퍼블리싱, API 연동, 웹앱 패키징)",
      },
      {
        id: 2,
        contents:
          "가맹점 및 본사 관리자 기능 개발 (회원 관리, 권한 설정, 사용자 정보 수정)",
      },
      { id: 3, contents: "쇼핑몰 기능 개발 (가맹점에서 상품 구매 가능)" },
      { id: 4, contents: "클라이언트와 협업하여 요구사항 정리 및 개선" },
      { id: 5, contents: "프로젝트 일정 조율 및 우선순위 관리" },
    ],
    skills: [
      { id: 1, name: "TypeScript, HTML/CSS" },
      { id: 2, name: "React, Next.js, Zustand, React-Query" },
      { id: 3, name: "CSS: Emotion" },
      { id: 4, name: "배포: AWS" },
    ],
    link: {
      github: "",
      deploy: "",
    },
  },
  {
    id: 6,
    projectTitle: "골드러시 (자체 서비스)",
    projectSubTitle: "금 현물 거래 플랫폼",
    projectPeriod: "2024.05 ~ 2024.06",
    description:
      "사용자가 목표를 설정하고 실물 금을 구매하며 자산을 관리할 수 있는 금융 플랫폼.",
    result: [
      {
        id: 1,
        content:
          "소셜 로그인(네이버, 카카오, 구글, 애플) 적용 후 사용자 가입률 20% 증가",
      },
      { id: 2, content: "네이티브 앱과의 브릿지 최적화로 로딩 속도 30% 개선" },
    ],
    problemSolving: [],
    contributions: [
      {
        id: 1,
        contents:
          "금 현물 거래를 위한 마진 계산 로직을 설계하고, 현장 실사 및 도매업체 연결을 통해 거래 프로세스 개선",
      },
      { id: 2, contents: "React 기반 SPA(원페이지) 구조 설계 및 개발" },
      {
        id: 3,
        contents:
          "웹-앱 브릿지 연동을 구현하여 네이티브 앱과 데이터 통신 최적화",
      },
      {
        id: 4,
        contents: "UI/UX 개선을 위해 외부 디자이너와 협업하여 사용자 경험 향상",
      },
    ],
    skills: [
      { id: 1, name: "TypeScript, HTML/CSS" },
      { id: 2, name: "React, Next.js, Redux Toolkit, React-Query" },
      { id: 3, name: "CSS: Zustand, Tailwind CSS" },
      { id: 4, name: "배포: AWS" },
    ],
    link: {
      github: "",
      deploy: "",
    },
  },
  {
    id: 7,
    projectTitle: "Flying Doctors",
    projectSubTitle: "의료 지원 및 보안 서비스를 지원하는 플랫폼.",
    projectPeriod: "2024.09 ~ 2024.10",
    description: "실시간으로 의료 지원 및 보안 서비스를 지원하는 플랫폼.",
    result: [
      { id: 1, content: "관리자 페이지 UI 및 오류 수정으로 사용자 경험 개선" },
      {
        id: 2,
        content: "실시간 채팅 기능 도입으로 관리자 간 소통 효율성 증가",
      },
      { id: 3, content: "불필요한 API 호출 감소로 시스템 부하 최소화" },
    ],
    problemSolving: [],
    contributions: [
      { id: 1, contents: "관리자 페이지 기능 고도화 및 UI 개선" },
      { id: 2, contents: "Socket.IO를 활용한 관리자 간 실시간 채팅 기능 구현" },
      {
        id: 3,
        contents:
          "네이티브 앱 및 관리자 페이지 오류 발생 시 즉각적인 피드백를 반영하여 수정",
      },
      { id: 4, contents: "API 호출 최적화를 통한 성능 개선" },
    ],
    skills: [
      { id: 1, name: "TypeScript, HTML/CSS" },
      { id: 2, name: "React, Next.js, React-Query, Socket.IO" },
      { id: 3, name: "CSS: styled-component" },
      { id: 4, name: "배포: AWS" },
    ],
    link: {
      github: "",
      deploy: "",
    },
  },
  {
    id: 8,
    projectTitle: "이커머스 쇼핑몰",
    projectSubTitle: "다양한 브랜드 제품을 소개하는 온라인 쇼핑 플랫폼",
    projectPeriod: "2024.06 ~ 2024.10",
    description: "다양한 브랜드 제품을 소개하는 온라인 쇼핑 플랫폼",
    result: [
      {
        id: 1,
        content:
          "클라이언트 요구 사항을 반영하여 관리자 페이지 UI 및 기능 개선 방향 설계",
      },
    ],
    problemSolving: [],
    contributions: [
      { id: 1, contents: "클라이언트와 협업하여 요구 사항 분석" },
      { id: 2, contents: "파트너 및 본사 관리자 페이지 퍼블리싱" },
      { id: 3, contents: "프론트 API 연결 및 서버 기본적인 CRUD API 구현" },
      { id: 4, contents: "카카오, 구글 소셜 로그인 기능 구현" },
      {
        id: 5,
        contents: "KG 이니시스 결제 및 나이스페이먼트 본인 인증 시스템 연동",
      },
    ],
    skills: [
      { id: 1, name: "TypeScript, HTML/CSS, Emotion" },
      { id: 2, name: "React, Next.js, Zustand, React-Query" },
      { id: 3, name: "서버: Nest.js, Prisma, PostgreSQL" },
      { id: 4, name: "배포: AWS" },
    ],
    link: {
      github: "",
      deploy: "",
    },
  },
];
