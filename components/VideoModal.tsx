import React from "react";
import { motion } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
import { VideoState } from "./careerDetailModal";
import { VideoType } from "@/assets/careerData";

type VideoModalProps = {
  video: VideoState | null;
  onClose: () => void;
};

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

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
          width={video.videoType === VideoType.MOBILE ? "400" : "900"}
          controlsList="nodownload"
        >
          <source src={video.url} type="video/mp4" />
        </video>
      </div>
    </motion.div>
  );
};

export default VideoModal;
