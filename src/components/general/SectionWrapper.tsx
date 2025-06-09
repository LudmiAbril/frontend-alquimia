import { SectionWrapperProps } from "../Utils/typing";


export default function SectionWrapper({
  children,
  className = "",
  id,
  ariaLabel,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-14 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
