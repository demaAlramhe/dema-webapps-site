import { motion, useReducedMotion } from 'framer-motion'

const floatTransition = (duration = 9, delay = 0) => ({
  duration,
  repeat: Infinity,
  ease: 'easeInOut',
  delay,
})

const floatY = (amp = 14, reduceMotion) =>
  reduceMotion ? {} : { y: [0, -amp, 0] }

/**
 * @param {{ type: 'sphere' | 'ring' | 'glass' | 'pill' | 'disc', className?: string, style?: React.CSSProperties }} props
 */
function Shape({ type, className = '', style }) {
  const base = 'floating-3d-shape will-change-transform'

  if (type === 'sphere') {
    return <div className={`${base} floating-3d-sphere rounded-full ${className}`} style={style} />
  }
  if (type === 'ring') {
    return <div className={`${base} floating-3d-ring rounded-full ${className}`} style={style} />
  }
  if (type === 'pill') {
    return <div className={`${base} floating-3d-glass rounded-full ${className}`} style={style} />
  }
  if (type === 'disc') {
    return <div className={`${base} floating-3d-disc rounded-2xl ${className}`} style={style} />
  }
  return <div className={`${base} floating-3d-glass rounded-2xl ${className}`} style={style} />
}

/**
 * @param {{ children: React.ReactNode, className?: string, delay?: number, reduceMotion: boolean, duration?: number, transform?: string }} props
 */
function FloatWrap({ children, className, delay = 0, reduceMotion, duration = 9, transform }) {
  return (
    <div
      className={className}
      style={{
        transform,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={floatY(10, reduceMotion)}
        transition={floatTransition(duration, delay)}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Hero — larger 3D accents around the edges */
export function HeroFloating3D() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden [perspective:1200px]"
      aria-hidden
    >
      <FloatWrap
        reduceMotion={reduceMotion}
        duration={11}
        className="absolute left-[6%] top-[20%] hidden sm:block"
        transform="rotateX(58deg) rotateY(-22deg) rotateZ(-8deg)"
      >
        <Shape type="ring" className="h-14 w-14 md:h-[4.5rem] md:w-[4.5rem]" />
      </FloatWrap>

      <FloatWrap
        reduceMotion={reduceMotion}
        delay={1.2}
        duration={10}
        className="absolute right-[8%] top-[16%]"
        transform="rotateX(42deg) rotateY(28deg)"
      >
        <Shape type="sphere" className="h-9 w-9 opacity-90 md:h-11 md:w-11" />
      </FloatWrap>

      <FloatWrap
        reduceMotion={reduceMotion}
        delay={0.6}
        duration={12}
        className="absolute right-[5%] top-[42%] hidden md:block"
        transform="rotateX(48deg) rotateY(38deg) rotateZ(12deg)"
      >
        <Shape type="glass" className="h-16 w-16 md:h-[4.75rem] md:w-[4.75rem]" />
      </FloatWrap>

      <FloatWrap
        reduceMotion={reduceMotion}
        delay={2}
        duration={13}
        className="absolute bottom-[22%] left-[10%] hidden lg:block"
        transform="rotateX(52deg) rotateY(-18deg)"
      >
        <Shape type="pill" className="h-5 w-14 md:h-6 md:w-[4.5rem]" />
      </FloatWrap>

      <FloatWrap
        reduceMotion={reduceMotion}
        delay={1.8}
        duration={14}
        className="absolute bottom-[28%] right-[12%] hidden sm:block"
        transform="rotateX(62deg) rotateY(15deg) rotateZ(-6deg)"
      >
        <Shape type="disc" className="h-10 w-10 opacity-80 md:h-12 md:w-12" />
      </FloatWrap>

      <FloatWrap
        reduceMotion={reduceMotion}
        delay={0.3}
        duration={15}
        className="absolute left-[18%] bottom-[18%] opacity-70"
        transform="rotateX(70deg) rotateY(-35deg)"
      >
        <Shape type="ring" className="h-20 w-20 md:h-24 md:w-24" />
      </FloatWrap>
    </div>
  )
}

const SECTION_LAYOUTS = [
  [
    { type: 'sphere', pos: 'left-[12%] top-1/2 -translate-y-1/2', size: 'h-7 w-7', transform: 'rotateX(50deg) rotateY(-20deg)' },
    { type: 'ring', pos: 'right-[18%] top-[30%]', size: 'h-10 w-10', transform: 'rotateX(55deg) rotateY(25deg)' },
  ],
  [
    { type: 'glass', pos: 'left-[22%] top-[20%]', size: 'h-9 w-9', transform: 'rotateX(45deg) rotateY(-30deg) rotateZ(8deg)' },
    { type: 'pill', pos: 'right-[14%] top-[55%]', size: 'h-4 w-11', transform: 'rotateX(48deg) rotateY(18deg)' },
  ],
  [
    { type: 'disc', pos: 'left-[8%] top-[35%]', size: 'h-8 w-8', transform: 'rotateX(60deg) rotateY(-15deg)' },
    { type: 'sphere', pos: 'right-[10%] top-1/2 -translate-y-1/2', size: 'h-6 w-6', transform: 'rotateX(40deg) rotateY(22deg)' },
  ],
  [
    { type: 'ring', pos: 'left-[16%] top-[25%]', size: 'h-12 w-12 opacity-80', transform: 'rotateX(65deg) rotateY(-28deg)' },
    { type: 'glass', pos: 'right-[22%] top-[40%] hidden sm:block', size: 'h-8 w-8', transform: 'rotateX(50deg) rotateY(32deg)' },
  ],
  [
    { type: 'pill', pos: 'left-[10%] top-[45%]', size: 'h-3.5 w-10', transform: 'rotateX(52deg) rotateY(-12deg)' },
    { type: 'ring', pos: 'right-[15%] top-[22%]', size: 'h-9 w-9', transform: 'rotateX(58deg) rotateY(20deg)' },
  ],
  [
    { type: 'sphere', pos: 'left-[20%] top-[30%]', size: 'h-8 w-8', transform: 'rotateX(44deg) rotateY(-25deg)' },
    { type: 'disc', pos: 'right-[12%] top-[50%]', size: 'h-7 w-7', transform: 'rotateX(56deg) rotateY(16deg) rotateZ(-10deg)' },
  ],
  [
    { type: 'glass', pos: 'left-[14%] top-[38%]', size: 'h-10 w-10', transform: 'rotateX(48deg) rotateY(-22deg)' },
    { type: 'sphere', pos: 'right-[20%] top-[28%] hidden md:block', size: 'h-5 w-5', transform: 'rotateX(62deg) rotateY(28deg)' },
  ],
]

/**
 * Floating 3D accents between page sections.
 * @param {{ variant?: number }} props
 */
export function SectionFloatingDecor({ variant = 0 }) {
  const reduceMotion = useReducedMotion()
  const items = SECTION_LAYOUTS[variant % SECTION_LAYOUTS.length]

  return (
    <div
      className="relative z-[2] -my-5 h-14 overflow-visible pointer-events-none md:-my-7 md:h-20 [perspective:1000px]"
      aria-hidden
    >
      {items.map((item, i) => (
        <FloatWrap
          key={i}
          reduceMotion={reduceMotion}
          delay={i * 0.9}
          duration={10 + i}
          className={`absolute ${item.pos}`}
          transform={item.transform}
        >
          <Shape type={item.type} className={`${item.size} ${item.size.includes('opacity') ? '' : 'opacity-[0.88]'}`} />
        </FloatWrap>
      ))}
      <div className="absolute inset-x-[12%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-600/12 to-transparent" />
    </div>
  )
}
