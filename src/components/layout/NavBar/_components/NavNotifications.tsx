import { getUnSeenNotifications } from "@/lib/apis/notifications/unseen-notications.api";
import NavNotificationsClient from "./NavNotifivationsClient";


export default async function NavNotifications() {
  // Fetch
  const res = await getUnSeenNotifications(1);
  // Filter
  const items = (res.data?.data ?? []).slice(0, 3);

  return <NavNotificationsClient items={items} />;
}
