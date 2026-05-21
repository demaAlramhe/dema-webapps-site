import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import {
  EASE_OUT_EXPO,
  VIEWPORT,
  VIEWPORT_LOOSE,
  variants,
  staggerContainer,
  itemTransition,
  headingTransition,
  slideReveal,
} from '../../lib/motion'

function resolveStaticTag(as) {
  if (as === motion.article) return 'article'
  if (as === motion.section) return 'section'
  if (as === motion.footer) return 'footer'
  if (as === motion.a) return 'a'
  if (as === motion.form) return 'form'
  if (typeof as === 'string') return as
  return 'div'
}

/** Respects OS reduced-motion and accessibility panel setting. */
export function useMotionSafe() {
  const prefersReduced = useReducedMotion()
  const [a11yReduced, setA11yReduced] = useState(false)

  useEffect(() => {
    const check = () =>
      setA11yReduced(document.documentElement.classList.contains('a11y-reduce-motion'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return prefersReduced || a11yReduced
}

/**
 * Single scroll-reveal block.
 * @param {{ as?: keyof typeof motion | typeof motion.div, variant?: keyof typeof variants, delay?: number, className?: string, viewport?: object, children: React.ReactNode }} props
 */
export function Reveal({
  as = motion.div,
  variant = 'fadeUp',
  delay = 0,
  className,
  viewport = VIEWPORT,
  children,
  ...rest
}) {
  const motionSafe = useMotionSafe()
  const Component = as

  if (motionSafe) {
    const Tag = resolveStaticTag(as)
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants[variant] ?? variants.fadeUp}
      transition={{
        ...(variant === 'heading' ? headingTransition : itemTransition),
        delay,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

/**
 * Staggered children on scroll.
 * @param {{ stagger?: number, delayChildren?: number, className?: string, viewport?: object, children: React.ReactNode }} props
 */
export function Stagger({
  stagger = 0.09,
  delayChildren = 0.08,
  className,
  viewport = VIEWPORT_LOOSE,
  children,
}) {
  const motionSafe = useMotionSafe()

  if (motionSafe) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  )
}

/**
 * Child of Stagger — uses fadeUpSubtle by default.
 * @param {{ as?: typeof motion.div, variant?: keyof typeof variants, className?: string, children: React.ReactNode }} props
 */
export function StaggerItem({
  as = motion.div,
  variant = 'fadeUpSubtle',
  className,
  children,
  ...rest
}) {
  const motionSafe = useMotionSafe()
  const Component = as

  if (motionSafe) {
    const Tag = resolveStaticTag(as)
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Component
      className={className}
      variants={variants[variant] ?? variants.fadeUpSubtle}
      transition={itemTransition}
      {...rest}
    >
      {children}
    </Component>
  )
}

/**
 * Horizontal slide reveal (RTL-aware inline direction).
 * @param {{ from?: 'start' | 'end', offset?: number, className?: string, children: React.ReactNode }} props
 */
export function SlideReveal({ from = 'start', offset = 28, className, children, ...rest }) {
  const motionSafe = useMotionSafe()
  const { dir } = useLanguage()
  const isRtl = dir === 'rtl'
  let x = from === 'end' ? offset : -offset
  if (isRtl) x = from === 'end' ? -offset : offset

  if (motionSafe) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_LOOSE}
      variants={slideReveal(x)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export { EASE_OUT_EXPO, VIEWPORT, VIEWPORT_LOOSE }
