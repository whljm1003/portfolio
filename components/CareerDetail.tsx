"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
// import { getPage } from "react-notion-x";
import { NotionAPI } from "notion-client";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";

import { NotionRenderer } from "react-notion-x";
type Props = {
  handleCloseModal: () => void;
};

const notion = new NotionAPI();
const recordMap = await notion.getPage(
  "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"
);

export default function CareerDetail({ handleCloseModal }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <AnimatePresence>
      {
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <motion.div
            className="relative w-[90vw] h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-lg">
                  노션 페이지를 불러오고 있습니다...
                </p>
              </div>
            )}
            <NotionRenderer
              recordMap={recordMap}
              fullPage={true}
              darkMode={false}
            />
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
