import React, { useCallback, useEffect, useRef } from "react";

type Props = {};

const snow = (props: Props) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  const makeSnowflake = useCallback(() => {
    const MIN_DURATION = 10;
    const snowflake = document.createElement("div");
    const delay = Math.random() * 10;
    const initialOpacity = Math.random().toString();
    const duration = Math.random() * 20 + MIN_DURATION;

    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * window.screen.width}px`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.opacity = initialOpacity;
    snowflake.style.animation = `fall ${duration}s linear`;

    bodyRef.current?.appendChild(snowflake);

    setTimeout(() => {
      bodyRef.current?.removeChild(snowflake);
      makeSnowflake();
    }, (duration + delay) * 1000);
  }, [bodyRef]);

  useEffect(() => {
    const length = Array.from({ length: 50 }, (_, i) => i);
    length.forEach((el, idx) => {
      setTimeout(makeSnowflake, 500 * idx);
    });
  }, []);

  return <div ref={bodyRef} className="h-screen w-screen bg-gray-700"></div>;
};

export default snow;
