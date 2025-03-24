import React from "react";

type WorkCard = {
  id: number;
  emoji: string;
  title: string;
  images: string[];
  description: string[];
};

const workData: WorkCard[] = [
  {
    id: 1,
    emoji: "1️⃣",
    title: "프로젝트 시작과 끝을 책임졌습니다.",
    images: ["slack-capture.jpg"], // 실제 이미지 경로로 수정 필요
    description: [
      "프로젝트 시작 시 슬랙 채널을 개설하고 팀원들과 소통했습니다.",
      "프로젝트 완료 후 마무리 메시지 및 정리 작업을 진행했습니다.",
    ],
  },
  {
    id: 2,
    emoji: "2️⃣",
    title: "프로젝트 일정은 노션으로 관리합니다.",
    images: ["notion-capture.jpg"],
    description: [
      "주요 일정 및 업무 진행 상황을 Notion에서 체계적으로 정리했습니다.",
      "매주 일정 체크 및 팀원과 업데이트 공유를 진행했습니다.",
    ],
  },
  {
    id: 3,
    emoji: "3️⃣",
    title: "이슈 발생 시 슬랙 소통으로 해결했습니다.",
    images: ["slack-issue.jpg"],
    description: [
      "프로젝트 진행 중 발생한 이슈를 Slack을 통해 즉시 공유 및 논의했습니다.",
      "팀원 및 외부 업체와 빠르게 해결 방안을 도출하여 일정 차질을 방지했습니다.",
    ],
  },
  {
    id: 4,
    emoji: "4️⃣",
    title: "작업한 프로젝트 캡처 & 영상 모음",
    images: ["project-captures.jpg"],
    description: [
      "완료된 프로젝트의 주요 기능을 캡처 및 영상으로 정리했습니다.",
      "관리자 페이지 또는 비공개 프로젝트는 제외했습니다.",
    ],
  },
];

export default function WorkDetail() {
  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center text-white mb-16">
          저는 이렇게 일했어요.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workData.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl">{card.emoji}</span>
                <h2 className="text-xl font-semibold text-gray-800">
                  {card.title}
                </h2>
              </div>

              <div className="mb-6">
                {card.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                  >
                    이미지 준비중
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {card.description.map((text, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
