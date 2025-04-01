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
      summary: "목재 및 자재 쇼핑몰 고도화 및 유지보수",
      description:
        "기존에 PHP로 구축된 목재 및 자재 전문 쇼핑몰의 고도화 및 유지보수 작업을 수행했습니다. Vanilla JavaScript를 활용하여 DOM을 직접 조작하며 장바구니와 결제 페이지의 UI 개선 및 복잡한 배송비·할인 로직의 정확성을 높였습니다. 특히 로직 모듈화와 꼼꼼한 디버깅을 통해 코드의 가독성과 유지보수성을 높였으며, 이를 통해 개발자로서의 문제 해결 역량을 강화할 수 있었습니다.",
    },
    skills: {
      frontend: ["JavaScript"],
      backend: ["PHP"],
      database: [],
      deployment: [],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "Vanilla JavaScript를 활용한 <highlight>DOM 조작으로</highlight> 장바구니 및 결제 페이지의 UI를 동적으로 개선",
      },
      {
        id: 2,
        content:
          "장바구니 내 배송비 및 할인 로직을 모듈화하여 정확성을 높이고 코드 유지보수성 향상",
      },
      {
        id: 3,
        content:
          "코드 디버깅과 로직 단위별 모듈화를 통해 <highlight>결제 시 데이터 불일치 문제를</highlight> 효과적으로 해결하여 결제 안정성 확보",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "복잡한 배송비 및 할인 로직 처리",
        issue:
          "바닐라 자바스크립트를 사용해 DOM을 직접 조작하면서 복잡한 배송비 및 할인 로직을 처리하는 과정에서 정확성 및 코드 관리에 어려움이 있었습니다.",
        solution:
          "코드를 기능 단위로 모듈화하고 세부 계산 로직을 별도 함수로 분리하여 처리했습니다. 콘솔 로그를 통한 단계별 디버깅을 진행하며, 문제 발생 시 정확한 지점을 빠르게 찾아 해결했습니다. 이 과정에서 코드를 분석하고 효율적으로 디버깅하는 방법을 체계적으로 익힐 수 있었습니다.",
      },
    ],
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
      summary: "병원 검진 결과를 PDF 보고서로 제공하는 유전자 분석 서비스",
      description:
        "병원에서 검진을 받은 환자가 웹 서비스를 통해 유전자 검사 결과를 PDF 보고서 형태로 확인할 수 있도록 하는 서비스입니다. 환자는 검진 후 웹에서 자신의 건강 상태를 열람하고 보고서를 다운로드할 수 있습니다.\n\n주요 프로세스는 다음과 같이 진행됩니다 :\n1. 환자가 병원에서 유전자 검사를 신청하면, 카카오 알림톡을 통해 안내 메시지가 발송됩니다.\n2. 환자는 웹에서 필요한 정보를 입력하고 서명을 완료한 후, 보고서를 신청할 수 있습니다.\n3. 유전자 검사 API를 통해 분석 데이터를 받아 PDF 보고서를 생성하며, 보고서가 준비되면 다시 환자에게 알림이 전송됩니다.",
    },
    skills: {
      frontend: ["TypeScript", "React", "Next.js", "React-Query", "Emotion"],
      deployment: ["AWS"],
      etc: ["react-pdf", "react-pdf/renderer", "react-signature-canvas"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "react-pdf/renderer 활용하여 검진 동의서, 의뢰서, 유전자 검사 결과 보고서를  <highlight>PDF로 생성 및 다운로드</highlight> 기능 구현",
      },
      {
        id: 2,
        content:
          "모바일 환경 대응을 위한 react-pdf viewer 적용으로 <highlight>iOS PDF 뷰어 문제 해결</highlight>",
      },
      {
        id: 3,
        content:
          "AWS S3를 활용한 PDF 저장 및 서명 기능 구현으로 안정적인 문서 관리 제공",
      },
      {
        id: 4,
        content:
          "관리자 페이지 개발 (회원가입, 로그인, 병원·회원 관리, 검사 요청, 약관 관리)",
      },
      {
        id: 5,
        content:
          "REST API 연동 및 UI 퍼블리싱을 통해 데이터 처리 및 사용자 경험 개선",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "문서 서명 및 보고서 생성 방식 변경",
        issue:
          "초기에는 모두싸인 API를 활용해 보고서를 생성하려 했으나, 라이선스 비용 문제로 직접 개발이 필요했습니다.",
        solution:
          "react-pdf/renderer를 활용해 PDF 보고서 생성 및 변환 기능을 직접 구현하고, react-signature-canvas를 적용하여 서명 기능을 추가했습니다.",
      },
      {
        id: 2,
        title: "iOS 웹앱에서 PDF 뷰어 미작동 문제",
        issue:
          "react-pdf/render를 활용하여 PDF 뷰어를 구현하는 과정에서 iOS 웹앱 환경에서 Viewer가 정상적으로 동작하지 않는 문제가 발생하였습니다. 해당 문제는 iOS의 메모리 관리 제한으로 인해 대용량 PDF를 Canvas로 렌더링할 때 정상적으로 표시되지 않는 점과, Safari에서 ReadableStream 등의 기능 미지원, 특정 iOS 버전에서의 호환성 문제 등으로 인해 발생한 것으로 확인되었습니다. GitHub 이슈(#1145, #1824)에서도 동일한 문제가 보고되었으나, 프로젝트 개발 당시까지 완전한 해결책이 마련되지 않은 상태였습니다.",
        solution:
          "추가된 내용과 서명이 들어간 최종 보고서만 저장하는 방식 대신 서명 전의 PDF 파일을 AWS S3에 저장하고, react-pdf viewer를 활용하여 PDF를 로드하는 방식으로 변경했습니다. 이 과정에서 PDF 생성 후 AWS S3에 저장하고, react-pdf를 통해 PDF를 로드한 후, 추가 내용 및 서명을 반영한 새로운 PDF를 생성했습니다. 그 후 기존 서명 전의 PDF 파일을 삭제하고, 최종적으로 생성된 PDF URL을 서버에 저장하여 안정적으로 문제를 해결했습니다.",
      },
    ],
    links: {
      github: "",
      deploy: "",
    },
    media: [],
  },
  {
    id: 10,
    basicInfo: {
      title: "일로 (illo)",
      period: "2023.11 ~ 2023.12",
      summary: "온라인 맞춤형 스타일 컨설팅 플랫폼",
      description:
        "검증된 패션 퍼스널 쇼퍼(패프)를 선택하여 온라인에서 맞춤형 스타일 컨설팅을 받을 수 있는 플랫폼입니다.\n 개인의 패션 고민을 해결하기 위해 기획된 서비스로, 모바일 앱 형태의 웹앱으로 구현되어 뛰어난 사용자 경험을 제공합니다. React Spring Bottom Sheet를 활용하여 iOS와 유사한 인터페이스를 구현하였으며, 이미지 로딩 성능을 최적화하여 빠르고 원활한 사용성을 보장했습니다. 예약 기능 구현을 위해 캘린더 기능과 Toss 결제 연동을 통해 편리한 예약 관리 환경을 제공했습니다.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "React",
        "Next.js",
        "React-Query",
        "Emotion",
        "React Spring Bottom Sheet",
      ],
      backend: [],
      database: [],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "<highlight>React Spring Bottom Sheet</highlight>를 사용하여 iOS 스타일의 메인 페이지 바텀시트 UI를 구현하여 모바일 사용성을 향상",
      },
      {
        id: 2,
        content:
          "이미지가 많은 페이지의 렌더링 속도 저하 문제를 해결하기 위해 <highlight>무한스크롤(Infinite Scroll)</highlight> 및 <highlight>Lazy Loading</highlight>을 적용하여 이미지 로딩을 최적화",
      },
      {
        id: 3,
        content:
          "예약 및 회원 관리 시스템을 구축하여 로그인, 예약 관리, 마이페이지 기능을 구현하고 사용자 편의성 증대",
      },
      {
        id: 4,
        content:
          "관리자 페이지에서 일반 회원, 패프, 리뷰 관리를 위한 기능 개발로 서비스 운영 효율성 향상",
      },
      {
        id: 5,
        content:
          "<highlight>Toss Payments 결제</highlight> 및 <highlight>포트원 본인 인증 연동</highlight>을 통해 예약 기능의 신뢰성 및 안정성을 확보",
      },
      {
        id: 6,
        content:
          "<highlight>카카오 소셜 로그인</highlight> 기능 구현으로 사용자 접근성 및 가입 절차 간소화",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "이미지 렌더링 성능 이슈 해결",
        issue:
          "이미지가 많은 페이지에서 초기 로딩 및 스크롤 시 이미지 렌더링 속도가 저하되는 문제가 있었습니다.",
        solution:
          "무한스크롤(Infinite Scroll)을 도입하여 한 번에 불러오는 데이터 양을 제한하고, Lazy Loading으로 화면에 보이는 이미지만 우선 로딩하도록 구현했습니다. react-window를 활용하여 이미지 가상화(virtualization) 방식을 추가적으로 적용하면 더 효율적인 이미지 관리를 할 수 있습니다.",
      },
    ],
    links: {
      github: "",
      deploy: "",
    },
    media: [],
  },
  {
    id: 5,
    basicInfo: {
      title: "미술로 생각하기",
      period: "2024.01 ~ 2024.04",
      summary: "유아 미술학원 CMS",
      description:
        "약 10년간 운영된 ASP 서비스를 Next.js/Nest.js 기반으로 리뉴얼하여 웹 및 모바일 환경을 개선하고 학습 관리 최적화했습니다.\n유아 학생들이 랜딩 페이지에서 체험 학습이나 학원 상담을 통해 수업을 신청하고, 가맹점 관리자는 학생들을 등록하여 관리합니다. 이후 학생들의 스케줄을 캘린더로 표현하고, 교육 정보, 앨범, 수납 정보를 기록할 수 있습니다. \n또한, 가맹점 운영에 필요한 경영 관리, 커뮤니티, 교재 주문과 같은 CMS 서비스를 제공합니다.",
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
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "재기획 및 디자인 조정을 통해 부족한 <highlight>기획 보완</highlight> 및 개발자 주도로 UI 개발",
      },
      {
        id: 2,
        content:
          "<highlight>요구사항 정리</highlight> 및 일정 조율, 우선순위 관리로 프로젝트 진행 최적화",
      },
      {
        id: 3,
        content:
          "가맹점 및 본사 관리자 기능 개발 (<highlight>캘린더 기능</highlight>, <highlight>결제 시스템(NICE페이먼츠)</highlight> 적용)",
      },
      {
        id: 4,
        content:
          "가맹점 및 본사 관리자 <highlight>쇼핑몰 기능 구현</highlight>을 통해 가맹점에서 상품 구매 가능하도록 개선",
      },
      {
        id: 5,
        content:
          " 선생님 & 학부모용 웹앱 개발 (퍼블리싱, API 연동, 웹앱 패키징) 및 <highlight>네이티브 앱과의 브릿지 작업</highlight>",
      },
      {
        id: 6,
        content:
          " <highlight>3000만 건 가량의 데이터 이관 작업 지원</highlight> 및 발생한 오류를 수정하여, 올바르게 변환된 데이터를 유지",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "재기획 및 디자인 작업 시간 부족",
        issue:
          "기존 ASP 서비스의 구조가 변경되면서 전반적인 기획이 다시 필요했습니다. 하지만 이미 디자인이 완료된 상태였고, 변경이 불가했기 때문에 개발자 주도로 기획을 보완해야 했습니다. 이 과정에서 기존 디자인을 그대로 유지해야 했기 때문에, 기획 보완과 개발을 동시에 진행하는 상황에서 시간이 제약을 받았습니다.",
        solution:
          "디자인 변경이 불가능한 상황에서 개발자 주도로 기획을 빠르게 보완했습니다. 기존 시스템의 구조를 기반으로 필요한 기획을 진행하고, 유사한 페이지를 컴포넌트 단위로 모듈화하여 개발 효율성을 높였습니다. 또한, 우선순위를 정해 핵심 기능부터 우선 개발하여 제한된 시간 내에 프로젝트를 완료할 수 있었습니다.",
      },
      {
        id: 2,
        title: "DB 마이그레이션",
        issue:
          "10년치의 DB 마이그레이션 작업 중 MySQL에서 PostgreSQL로 데이터 이관하는 과정에서 시간이 오래 걸렸고, 데이터가 깨지거나 잘못 변환된 부분이 발생했습니다. 엑셀로 데이터를 추출하고 변환하여 삽입하는 작업이 필요했으며, 데이터가 많아 삭제와 삽입에 시간이 많이 소요되었습니다.",
        solution:
          "마이그레이션 팀과 함께 진행한 작업 중, 저는 엑셀 추출 및 데이터 변환 부분에서 지원을 맡았습니다. 이후, 깨지거나 잘못 반환된 데이터를 찾아 수정하며, 데이터 무결성을 유지하도록 도왔습니다. 이를 통해 3000만 건의 데이터를 효율적으로 이관할 수 있었고, 마이그레이션 이후 발생한 데이터 오류를 해결하였습니다.",
      },
    ],
    links: {
      github: "",
      deploy: "",
    },
    media: [],
  },
  {
    id: 6,
    basicInfo: {
      title: "골드러시",
      period: "2024.05 ~ 2024.06",
      summary: "실물 금 판매 및 목표 설정을 통한 재테크 플랫폼",
      description:
        "사용자가 목표를 설정하고 실물 금을 직접 구매·관리할 수 있도록 돕는 금융 플랫폼입니다.\n 모바일 사용자 경험을 극대화하기 위해 원페이지 방식으로 구현하였으며, 경제 관련 도서 및 유튜브 영상 제공, 목표 달성 독려 알림을 통해 체계적인 자산 관리를 지원합니다. 실제 금 현물 거래 과정에서는 부가세와 마진을 반영한 가격 책정 로직을 구축하고, 직접 시장 조사와 배송 과정을 운영하여 신뢰성과 사용자 만족도를 높였습니다.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "React",
        "Next.js",
        "React-Query",
        "Zustand",
        "Tailwind CSS",
      ],
      backend: [],
      database: [],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "금 현물 거래 시 <highlight>부가세와 소매 마진을 고려한 가격 정책을 수립하고</highlight>, <highlight>종로 금 시장 현장 조사를 통해 실거래 환경을 분석하여 거래 프로세스를 개선</highlight>",
      },
      {
        id: 2,
        content:
          "금 도매·소매업체와의 <highlight>현장 협업</highlight>을 통해 <highlight>거래 프로세스를 최적화</highlight>하고, 실제 <highlight>20~30돈 이상의 판매</highlight>를 성공적으로 수행하여 플랫폼의 <highlight>수익 모델을 입증</highlight>",
      },
      {
        id: 3,
        content:
          "<highlight>우체국 안심택배</highlight>를 통한 <highlight>배송 프로세스를 직접 구축 및 관리</highlight>하여 배송 신뢰도와 사용자 경험을 높임",
      },
      {
        id: 4,
        content:
          "<highlight>Tailwind CSS</highlight>와 <highlight>외부 디자이너 협업</highlight>을 통해 <highlight>원페이지 형태의 모바일 친화적 UI/UX 디자인 및 반응형 웹 구축</highlight>",
      },
      {
        id: 5,
        content:
          "<highlight>무통장 입금(팝빌)</highlight> 및 <highlight>본인 인증(드림시큐리티)</highlight> 시스템과 <highlight>다양한 소셜 로그인(구글, 카카오, 네이버, 애플)을 연동</highlight>하여 사용자 접근성과 편의성을 향상",
      },
      {
        id: 6,
        content:
          "<highlight>웹-앱 브릿지 연동</highlight> 및 <highlight>Google Analytics 통합</highlight>을 통해 <highlight>네이티브 앱 환경에서의 데이터 통신을 최적화</highlight>하고, 사용자 유입 경로 분석 기반의 서비스 운영 지원",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "원페이지 앱의 렌더링 성능 최적화",
        issue:
          "모든 컴포넌트가 단일 페이지에서 로드되는 원페이지 구조로 인해 유튜브 영상과 이미지가 반복적으로 렌더링되어 속도 저하가 발생했습니다.",
        solution:
          "Intersection Observer API를 활용하여 사용자가 화면에 보지 않는 부분의 유튜브 영상 재생을 일시정지하고, 이미지에 대해서는 Lazy Loading과 Next.js의 Image 컴포넌트를 사용해 성능을 최적화했습니다. 이를 통해 불필요한 리소스 로딩과 렌더링을 최소화하여 앱 성능과 사용자 경험을 개선했습니다.",
      },
    ],
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
      summary: "24시간 실시간 해외 의료 지원 및 보안 플랫폼",
      description:
        "해외에서 응급 상황 발생 시 긴급 채팅과 알림을 통해 병원 안내 및 헬기 지원 등 신속한 의료 대응을 제공하는 플랫폼입니다.\n 사용자는 모바일 앱으로 전문가와 실시간 소통할 수 있으며, 관리자는 웹페이지를 통해 운영을 관리합니다. 크라이시스24 API를 통해 전 세계의 위험 상황 알림을 제공하고, 개인 질환자를 위한 복약 기록 및 시간대별 복약 알림 기능을 지원합니다.",
    },
    skills: {
      frontend: [
        "TypeScript",
        "React",
        "Next.js",
        "React-Query",
        "Socket.IO",
        "styled-component",
      ],
      backend: [],
      database: [],
      deployment: ["AWS"],
    },
    keyContributions: [
      {
        id: 1,
        content:
          "관리자 웹페이지 고도화 작업을 통해 전반적인 오류 처리 및 UI/UX 개선",
      },
      {
        id: 2,
        content:
          "<highlight>Socket.IO를</highlight> 활용하여 관리자 간 실시간 채팅 기능 구현으로 신속한 내부 커뮤니케이션 지원",
      },
      {
        id: 3,
        content:
          "사용자 피드백 및 시스템 오류를 빠르게 대응하고 처리하여 시스템 안정성 향상",
      },
      {
        id: 4,
        content:
          "개발팀과 해당 업체 간 <highlight>소통을 직접 담당</highlight>하여 효율적인 이슈 해결과 업무 진행 지원",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "관리자 웹페이지 내 지속적인 오류 대응",
        issue:
          "기존 시스템의 잦은 오류와 사용자 피드백에 대한 빠른 대응이 요구되었습니다.",
        solution:
          "발생하는 문제를 신속히 진단하고 팀원들과 협업하여 코드 개선 및 문제 원인을 명확히 파악하여 빠르게 처리했습니다. 또한 직접적인 소통 창구 역할을 맡아 고객사의 이해를 돕고 빠르게 문제를 해결하여 신뢰성을 높였습니다.",
      },
    ],
    links: {
      github: "",
      deploy: "",
    },
    media: [],
  },
  {
    id: 8,
    basicInfo: {
      title: "온라인 편집샵 플랫폼",
      period: "2024.06 ~ 2024.10",
      summary: "다양한 브랜드 제품을 소개하는 온라인 쇼핑 플랫폼",
      description:
        "파트너스(판매자)가 입점 및 승인 후 상품을 등록해 판매하는 온라인 쇼핑 플랫폼으로, 타임특가·기획전 등 다양한 프로모션을 운영합니다. 브랜드별 쿠폰, 적립금, 등급 할인 등 다채로운 할인 정책을 제공하며, 굿스플로 API와 연동하여 교환 및 반품 프로세스를 자동화했습니다.",
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
          "클라이언트와 기획 단계에서부터 <highlight>정책 관련 소통을 담당</<highlight>하고 불명확한 프로세스를 협의하여 명확한 개발 기준 마련",
      },
      {
        id: 2,
        content:
          "장바구니, 결제, 반품/교환을 포함한 주요 서비스 페이지 및 관리자 사이트 구현",
      },
      {
        id: 3,
        content:
          "카카오, 구글 소셜 로그인과 <highlight>KG 이니시스 결제 시스템</highlight>을 성공적으로 연동하여 사용자 편의성 향상",
      },
      {
        id: 4,
        content:
          "Nest.js와 Prisma를 활용하여 <highlight>테이블 추가 및 서버 CRUD 작업</highlight>을 효율화하여 전체 개발 기간 단축",
      },
      {
        id: 5,
        content:
          "React-Query 및 Zustand를 활용한 데이터 상태 관리 최적화로 API 호출 빈도를 최소화하고 <highlight>렌더링 성능을 개선</highlight>",
      },
    ],
    problemSolving: [
      {
        id: 1,
        title: "서버 개발 역량 강화",
        issue:
          "서버 개발 경험이 부족하여 Nest.js 및 Prisma를 활용한 API 개발 과정에서 어려움이 발생했습니다.",
        solution:
          "이전 Node.js 및 Prisma 학습 경험을 기반으로 기존 프로젝트의 API 설계를 분석했습니다. 또한 AI 도구를 활용하여 CRUD 작업을 효율적으로 구현하고 API 응답 속도 및 코드 가독성을 높이는 등 서버 개발 역량을 강화했습니다.",
      },
      {
        id: 2,
        title: "반품/교환 프로세스 개선",
        issue:
          "기획 단계에서 반품/교환 정책이 명확하지 않고 UI/UX 디자인이 부재하여 개발 진행이 어려웠습니다.",
        solution:
          "클라이언트와 협의하여 CS 시스템과 굿스플로 API를 연계한 중간 처리 프로세스를 구축했습니다. 자동화된 회수 처리 이후 파트너스 담당자가 고객과 직접 상담하여 교환 승인 또는 거절이 가능하도록 운영 효율성을 개선했습니다.",
      },
    ],
    links: {
      github: "",
      deploy: "",
    },
    media: [],
  },
];
