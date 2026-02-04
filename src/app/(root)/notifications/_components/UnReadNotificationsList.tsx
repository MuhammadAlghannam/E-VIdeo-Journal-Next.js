import { getUnSeenNotifications } from "@/lib/apis/notifications/unseen-notications.api";
import NotificationsCard from "./NotificationsCard";

type Props = {
  page: number;
};

export default async function UnreadNotificationsList({ page }: Props) {
  const res = await getUnSeenNotifications(page);
  const items = res.data.data;

  if (!items?.length) return <div>No unread notifications.</div>;

  return (
    <div>
      {items.map((n) => (
        <NotificationsCard key={n.id} notification={n} />
      ))}
    </div>
  );
}
