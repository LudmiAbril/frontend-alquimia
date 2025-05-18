type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function SectionWrapper({ children, className = "" }: Props) {
    return (
        <section className={`py-20 ${className}`}>
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {children}
            </div>
        </section>
    );
}
