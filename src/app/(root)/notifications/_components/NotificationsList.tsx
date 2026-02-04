
import getNotifications from "@/lib/apis/notifications/notifications.api";
import NotificationsCard from "./NotificationsCard";

type Props = {
  page: number;
};

export default async function NotificationsList({ page }: Props) {
  const res = await getNotifications(page); // calls the api
  const items = res.data.data;

  if (!items?.length) return <div>No notifications.</div>;

  return (
    <div>
      {items.map((n) => (
        <NotificationsCard key={n.id} notification={n} />
      ))}
    </div>
  );
}
