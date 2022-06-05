import React, { useState, Dispatch, SetStateAction } from "react";

type onCopyFn = (text: string) => Promise<boolean>;

const useCopyClipBoard = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  onCopyFn
] => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy: onCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);

      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);

      return false;
    }
  };

  return [isCopy, setIsCopy, onCopy];
};

export default useCopyClipBoard;
