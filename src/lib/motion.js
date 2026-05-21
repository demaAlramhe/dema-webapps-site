/** Shared scroll-reveal motion tokens (Framer Motion). */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

export const VIEWPORT = {
  once: true,
  margin: '-80px',
  amount: 0.12,
}

export const VIEWPORT_LOOSE = {
  once: true,
  margin: '-48px',
  amount: 0.18,
}

export const itemTransition = {
  duration: 0.55,
  ease: EASE_OUT_EXPO,
}

export const headingTransition = {
  duration: 0.65,
  ease: EASE_OUT_EXPO,
}

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: itemTransition,
    },
  },
  fadeUpSubtle: {
    hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: itemTransition,
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: EASE_OUT_EXPO },
    },
  },
  heading: {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: headingTransition,
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: EASE_OUT_EXPO },
    },
  },
}

/** @param {number} stagger @param {number} delayChildren */
export function staggerContainer(stagger = 0.09, delayChildren = 0.08) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  }
}

/** @param {number} offset — logical start direction (negative = from inline-start) */
export function slideReveal(offset = 28) {
  return {
    hidden: { opacity: 0, x: offset, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: itemTransition,
    },
  }
}
