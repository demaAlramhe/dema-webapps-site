/**
 * Subtle animated mesh + blurred glow orbs for section backgrounds.
 * Respects prefers-reduced-motion and html.a11y-reduce-motion.
 */

const VARIANTS = {
  page: [
    'start-[-15%] top-[5%] h-[min(75vw,520px)] w-[min(75vw,520px)] bg-brand-600/[0.11]',
    'end-[-10%] bottom-[0%] h-[min(68vw,460px)] w-[min(68vw,460px)] bg-brand-800/[0.09]',
  ],
  alt: [
    'start-[-18%] top-1/2 h-[min(80vw,560px)] w-[min(80vw,560px)] -translate-y-1/2 bg-brand-600/[0.1]',
    'end-[-12%] top-[15%] h-[min(60vw,400px)] w-[min(60vw,400px)] bg-brand-400/[0.08]',
    'start-[20%] bottom-[-15%] h-[min(55vw,380px)] w-[min(55vw,380px)] bg-brand-700/[0.07]',
  ],
  spotlight: [
    'end-[-18%] top-1/2 h-[min(85vw,520px)] w-[min(85vw,520px)] -translate-y-1/2 bg-brand-600/[0.12]',
    'start-[-8%] top-[20%] h-[min(50vw,340px)] w-[min(50vw,340px)] bg-brand-500/[0.06]',
  ],
  cta: [
    'start-[-20%] top-[-10%] h-[min(70vw,480px)] w-[min(70vw,480px)] bg-brand-600/[0.14]',
    'end-[-15%] bottom-[-15%] h-[min(65vw,440px)] w-[min(65vw,440px)] bg-brand-800/[0.1]',
  ],
}

const MESH_OPACITY = {
  page: 'opacity-[0.55]',
  alt: 'opacity-[0.65]',
  spotlight: 'opacity-50',
  cta: 'opacity-70',
}

/**
 * @param {{ variant?: keyof typeof VARIANTS, className?: string, intensity?: 'soft' | 'normal' }} props
 */
export default function AmbientBackground({ variant = 'alt', className = '', intensity = 'normal' }) {
  const orbs = VARIANTS[variant] ?? VARIANTS.alt
  const meshClass = MESH_OPACITY[variant] ?? MESH_OPACITY.alt
  const orbFade = intensity === 'soft' ? 'opacity-[0.72]' : 'opacity-100'

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`ambient-mesh absolute inset-0 bg-ambient-mesh bg-ambient-mesh-size animate-mesh-shift ${meshClass}`}
      />
      <div className="ambient-aurora absolute inset-0 bg-ambient-aurora bg-ambient-aurora-size animate-gradient-shift opacity-60" />
      {orbs.map((orbClass, i) => (
        <div
          key={i}
          className={`ambient-orb absolute rounded-full blur-[100px] will-change-transform motion-reduce:animate-none ${orbFade} ${orbClass} ${
            i % 2 === 0 ? 'animate-glow-drift' : 'animate-glow-drift-slow'
          }`}
          style={i > 0 ? { animationDelay: `${i * 2.5}s` } : undefined}
        />
      ))}
    </div>
  )
}
