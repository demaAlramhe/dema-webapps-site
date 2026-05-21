import { EASE_OUT_EXPO } from './motion'

const ease = EASE_OUT_EXPO

/** @param {number} y */
export function hoverLift(y = -6) {
  return {
    y,
    transition: { duration: 0.38, ease },
  }
}

export const hoverLiftSubtle = {
  y: -4,
  transition: { duration: 0.32, ease },
}

export const hoverLiftProject = {
  y: -10,
  transition: { duration: 0.42, ease },
}

export const hoverButtonPrimary = {
  y: -3,
  scale: 1.02,
  transition: { duration: 0.28, ease },
}

export const hoverButtonSecondary = {
  y: -2,
  scale: 1.015,
  transition: { duration: 0.28, ease },
}

export const hoverTap = {
  scale: 0.98,
  transition: { duration: 0.14, ease },
}

export const hoverIconPop = {
  scale: 1.08,
  transition: { duration: 0.28, ease },
}
