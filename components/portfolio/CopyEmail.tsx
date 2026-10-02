"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    if (state === "pending") return;
    if (timer.current) clearTimeout(timer.current);
    setState("pending");
    try {
      await navigator.clipboard.writeText(email);
      setState("success");
      timer.current = setTimeout(() => setState("idle"), 3500);
    } catch {
      setState("error");
    }
  }

  return (
    <div className="copy-email">
      <button
        className="copy-button"
        type="button"
        aria-label={
          state === "success"
            ? "복사 완료"
            : state === "pending"
              ? "복사 중"
              : "이메일 주소 복사"
        }
        disabled={state === "pending"}
        onClick={copy}
      >
        {state === "success" ? (
          <FiCheck aria-hidden="true" />
        ) : (
          <FiCopy aria-hidden="true" />
        )}
        <span>
          {state === "success"
            ? "복사 완료"
            : state === "pending"
              ? "복사 중"
              : "주소 복사"}
        </span>
      </button>
      <p
        role="status"
        className={`copy-status ${state === "error" ? "copy-error" : ""}`}
      >
        {state === "success"
          ? "이메일 주소를 복사했습니다."
          : state === "error"
            ? "복사하지 못했습니다. 이메일 주소를 선택해 직접 복사해 주세요."
            : ""}
      </p>
    </div>
  );
}
