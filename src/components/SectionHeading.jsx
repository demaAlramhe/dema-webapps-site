/**
 * Shared section title — headline + decorative bar below.
 */
export default function SectionHeading({ children }) {
  return (
    <div className="mb-14 flex flex-col items-center text-center md:mb-20">
      <h2 className="max-w-4xl text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {children}
      </h2>
      <span
        className="mt-5 h-1 w-14 shrink-0 rounded-full bg-gradient-to-r from-transparent via-brand-600/55 to-transparent"
        aria-hidden
      />
    </div>
  )
}
