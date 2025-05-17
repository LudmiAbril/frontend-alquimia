export default function FlujoUsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(180deg, #D0C5BA 4%, #EFE9E3 18%)`,
      }}
    >
      {children}
    </div>
  );
}
