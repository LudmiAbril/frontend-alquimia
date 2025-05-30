import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  );
}
