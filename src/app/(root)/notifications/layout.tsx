import NotificationsLinks from "./_components/NotificationsLinks";

export default function NotificationsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="container-1440 pt-12 pb-20">
      {/* Head */}
      <h2 className="sm:text-40-semibold text-h2-semibold text-black">Notifications</h2>
      <p className="sm:text-h5-regular text-h6-regular text-black">Find all your recent activity, reminders, and important announcements in one place.</p>

      {/* Links */}
      <NotificationsLinks />

      <div className="pt-4">{children}</div>
    </section>
  );
}
