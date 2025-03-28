import { StaticImageData } from "next/image";
import codestatesLogo from "@/public/image/icons/codestates_icon.png";

export const learning = [
  { id: 1, content: "HTML, CSS, JavaScript를 활용한 웹 개발 기초 학습" },
  { id: 2, content: "React를 사용한 프론트엔드 개발 및 UI 구현" },
  { id: 3, content: "Node.js와 데이터베이스를 활용한 백엔드 개발 경험" },
  { id: 4, content: "Git을 활용한 버전 관리 및 협업 역량 강화" },
  { id: 5, content: "팀 프로젝트를 통해 실무 중심의 개발 경험 습득" },
  { id: 6, content: "디버깅 및 문제 해결 능력 향상" },
  { id: 7, content: "자기주도적 학습을 통한 개발 역량 강화" },
];

const codestates = {
  id: 2,
  image: codestatesLogo,
  title: "코드스테이츠 프론트엔드 코스",
  date: "2020.06 ~ 2021.06",
  description: "코드스테이츠 프론트엔드 코스",
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "express",
    "mysql",
    "aws",
    "git",
  ],
  learning: learning,
};

export interface EducationData {
  id: number;
  image: StaticImageData;
  title: string;
  date: string;
  description: string;
  skills: string[];
  learning: {
    id: number;
    content: string;
  }[];
}

export const educationData: EducationData[] = [codestates];
