type Props = {
    children: React.ReactNode;
    className?: string; 
  };
  
  export default function SectionWrapper({ children, className = "" }: Props) {
    return (
      <section className={`py-16 px-6 md:px-20 ${className}`}>
        {children}
      </section>
    );
  }