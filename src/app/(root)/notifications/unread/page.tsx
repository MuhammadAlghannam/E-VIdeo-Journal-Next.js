import Spinner from "@/components/shared/Spinner";
import { getUnSeenNotifications } from "@/lib/apis/notifications/unseen-notications.api";
import { Metadata } from "next";
import { Suspense } from "react";
import NotificationsPagination from "../_components/NotificationsPagination";
import UnreadNotificationsList from "../_components/UnReadNotificationsList";

export const metadata: Metadata = {
  title: "Unread Notifications",
  description: "View all unread notifications",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {

  // Search Params
  const params = await searchParams;
  const page = Number(params.page) || 1;

  // Fetch once to get pagination meta (unread)
  const res = await getUnSeenNotifications(page);

  // Variables
  const meta = res.data; // current_page, data, last_page
  const hasItems = Array.isArray(meta.data) && meta.data.length > 0;
  const totalPages = meta.last_page;
  const currentPage = meta.current_page;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const showPagination = hasItems && totalPages > 1;

  return (
    <>
      <Suspense key={page} fallback={<Spinner />}>
        <UnreadNotificationsList page={page} />
      </Suspense>

      {showPagination && (
        <NotificationsPagination
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </>
  );
}
