import UserMenu from "@/components/menu/UserMenu";
import SectionWrapper from "@/components/general/SeccionWrapper";

export default function PerfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionWrapper className="bg-[var(--hueso)] min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        <UserMenu />
        <div className="flex-1">{children}</div>
      </div>
    </SectionWrapper>
  );
}
