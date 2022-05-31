import OMOMO_HOME from "./image/omomo/OMOMO-Home.png";
import OMOMO_LOGIN from "./image/omomo/OMOMO-login.png";
import OMOMO_MYPAGE from "./image/omomo/OMOMO-mypage.png";
import OMOMO_PROFILE from "./image/omomo/OMOMO-profile.png";
import OMOMO_ROULETTE from "./image/omomo/OMOMO-roulette.png";
import PicaNote_HOME from "./image/picaNote/PicaNote-Home.png";
import PicaNote_DETAIL from "./image/picaNote/PicaNote-Detail.png";
import PicaNote_TEMPLETE from "./image/picaNote/PicaNote-Templete.png";
import PicaNote_WRITE from "./image/picaNote/PicaNote-Write.png";
import PicaNote_PICTURE from "./image/picaNote/PicaNote-Picture.png";
import Portfolio_MAIN from "./image/portfolio/portfolio-Main.png";
import Portfolio_SKILLS from "./image/portfolio/portfolio-Skills.png";
import Portfolio_CAREER from "./image/portfolio/portfolio-Career.png";
import Portfolio_PROJECT from "./image/portfolio/portfolio-Project.png";

export const projects = [
  {
    id: 1,
    title: "Pic, a note",
    subTitle: "일기장을 만들어 공유하는 웹서비스",
    turm: "2021.05 - 2021.07",
    member: 4,
    imgs: [
      {
        id: 1,
        url: PicaNote_HOME,
        name: "home",
      },
      {
        id: 2,
        url: PicaNote_DETAIL,
        name: "detail",
      },
      {
        id: 3,
        url: PicaNote_TEMPLETE,
        name: "templete",
      },
      {
        id: 4,
        url: PicaNote_WRITE,
        name: "write",
      },
      {
        id: 5,
        url: PicaNote_PICTURE,
        name: "picture",
      },
    ],
    description:
      "어린 시절의 일기장을 회상하여 뉴트로 일기장을 만들었습니다. 일기장에는 글 일기와 그림 일기를 활용해 원하는 일기장을 작성할 수 있습니다. 공개/비공개를 통해 다른 유저들에게 나의 일기를 공유 할 수있으며 좋아요 기능을 이용해 하트를 많이 받은 일기는 TOP 일기로 선정될 수 있습니다. 뿐만 아니라 한 권의 일기를 친구들과 같이 사용할 수 있는 그룹 일기장 기능이 있어 가족 친구 또는 지인들과 일기장을 통해 서로의 비밀을 공유할 수 있습니다.",
    methods: [
      { id: 1, contents: "(공통) Figma를 통한 UI 구성" },
      { id: 2, contents: "(공통) Miro를 이용한 Flow chart 작성" },
      {
        id: 3,
        contents: "(공통) HTML/CSS 활용한 전반적인 Color Chart 선택",
      },
      { id: 4, contents: "(공통) AWS 기반 https 배포" },
      {
        id: 5,
        contents: "(개인) 마이페이지,템플릿,그림그리기 페이지 HTML/CSS",
      },
      { id: 6, contents: "(개인) 마이페이지 회원정보 수정 기능" },
      {
        id: 7,
        contents:
          "(개인) Multer s3를 활용한 그림 일기의 그림 및 프로필 사진 업로드",
      },
      { id: 8, contents: "(개인) 토큰 로그인, 댓글 CRUD , 좋아요 기능" },
      { id: 9, contents: "(개인) canvas 그림 그리기 구현" },
    ],
    skills: [
      { id: 1, name: "JavaScirpt, HTML/CSS" },
      { id: 2, name: "React, Recoil, React-query" },
      { id: 3, name: "CSS: styled-component" },
      { id: 4, name: "배포: AWS" },
    ],
    link: {
      github: "https://github.com/whljm1003/pan_client",
      deploy: "https://picanote.site/",
    },
  },
  {
    id: 2,
    title: "OMOMO",
    subTitle: "룰렛을 활용한 투두리스트",
    turm: "2021.09 - 2021.11",
    member: 2,
    imgs: [
      {
        id: 1,
        url: OMOMO_HOME,
        name: "home",
      },
      {
        id: 2,
        url: OMOMO_LOGIN,
        name: "login",
      },
      {
        id: 3,
        url: OMOMO_MYPAGE,
        name: "mypage",
      },
      {
        id: 4,
        url: OMOMO_PROFILE,
        name: "profile",
      },
      {
        id: 5,
        url: OMOMO_ROULETTE,
        name: "roulette",
      },
    ],
    description:
      "오모오모는 '오늘은 모하지?(What Should I Do Today?)'의 앞글자에서 따온 이름으로무언가 해야되는데 어떤 걸 할지 선택이 어려운 이들을 위해 개발한 서비스입니다. 하고 싶은 일들을 적고 단순히 룰렛을 돌리는 것만으로도 오늘 할 일을 쉽게 정할 수 있습니다. 오늘 할 일은 물론이고 음식, 여행지, 게임 등 다양한 분야에서 선택의 기로에 놓였을 때 활용 가능합니다.",
    methods: [
      { id: 1, contents: "(공통) Wire frame, Firebase 스키마 작성" },
      {
        id: 2,
        contents: "(공통) Logo 및 이모티콘 제작 및 전반적인 Color Chart 선택",
      },
      { id: 3, contents: "(공통) Netlify 배포" },
      { id: 4, contents: "(개인) 마이페이지 및 룰렛 모달 레이아웃" },
      {
        id: 5,
        contents: "(개인) 마이페이지 GET - profile, to-do list, roulette",
      },
      {
        id: 6,
        contents: "(개인) 프로필 모달 - GET/PUT",
      },
    ],
    skills: [
      { id: 1, name: "JavaScirpt, HTML/CSS" },
      { id: 2, name: "React" },
      { id: 3, name: "Firebase" },
      { id: 4, name: "CSS: styled-component" },
      { id: 5, name: "배포: Netlify" },
    ],
    link: {
      github: "https://github.com/JJ-OMOMO/OMOMO",
      deploy: "https://omomo.netlify.app/",
    },
  },
  {
    id: 3,
    title: "포트 폴리오",
    subTitle: "",
    turm: "2022.05 - 2022.05",
    member: 1,
    imgs: [
      {
        id: 1,
        url: Portfolio_MAIN,
        name: "main",
      },
      {
        id: 2,
        url: Portfolio_SKILLS,
        name: "skills",
      },
      {
        id: 3,
        url: Portfolio_CAREER,
        name: "career",
      },
      {
        id: 4,
        url: Portfolio_PROJECT,
        name: "project",
      },
    ],
    description:
      "프트폴리오 용도로 제작한 웹사이트입니다. 사이트 용도에 맞게 저에 대한 이력이 나타나 있으며 tailwind와 next.js에 대해 학습할 수 있었습니다.",
    methods: [
      { id: 1, contents: "tailwind를 사용한 전체 레이아웃 및 반응형 구현" },
      { id: 3, contents: "swiper를 활용한 슬라이드 기능 구현" },
      { id: 4, contents: "vercel를 활용한 배포" },
    ],
    skills: [
      { id: 1, name: "TypeScript, NextJs" },
      { id: 2, name: "React, Swiper" },
      { id: 4, name: "CSS: Tailwind" },
      { id: 5, name: "배포: Vercel" },
    ],
    link: {
      github: "https://github.com/whljm1003/portfolio",
      deploy: "https://portfolio-whljm1003.vercel.app",
    },
  },
];
