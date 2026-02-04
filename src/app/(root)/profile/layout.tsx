import SideNavigation from "./_components/SideNavigation";

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container-1440 py-12 grid grid-cols-1 md:grid-cols-[14rem_1fr] h-full gap-8">
      {/* sidebar becomes a top row on small screens */}
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
