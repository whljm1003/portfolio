import React from "react";
import { motion } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
import { Media, VideoType } from "@/assets/careerData";

type MediaModalProps = {
  media: Media | null;
  onClose: () => void;
};

const MediaModal: React.FC<MediaModalProps> = ({ media, onClose }) => {
  if (!media) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg relative overflow-hidden">
        <button
          className="absolute top-4 right-4 cursor-pointer z-50"
          onClick={onClose}
        >
          <FaWindowClose size={24} />
        </button>
        <video
          controls
          autoPlay
          preload="none"
          muted
          width={media.videoType === VideoType.MOBILE ? "400" : "900"}
          controlsList="nodownload"
        >
          <source src={media.url} type="video/mp4" />
        </video>
      </div>
    </motion.div>
  );
};

export default MediaModal;
