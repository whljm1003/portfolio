import React from "react";

interface IToast {
  msg: string;
}

export default function Toast({ msg = "🫥 복사 실패.." }: IToast) {
  return (
    <div className="border-[1] fixed left-1/2 top-1/2 z-[99] h-12 w-28 min-w-[200px] -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-[rgba(0,0,0,0.7)] p-3 text-center text-white">
      {msg}
    </div>
  );
}
