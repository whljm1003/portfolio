export const variants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.5,
    },
  },
};
export const initialScreen = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

export const sliceLeft = {
  start: { opacity: 0, x: -100 },
  end: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};
export const sliceRight = {
  start: { opacity: 0, x: 100 },
  end: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};
export const sliceUp = {
  start: { opacity: 0, y: 100 },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};
