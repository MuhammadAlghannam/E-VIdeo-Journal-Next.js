import Spinner from "@/components/shared/Spinner";
import getNotifications from "@/lib/apis/notifications/notifications.api";
import { Metadata } from "next";
import NotificationsList from "./_components/NotificationsList";
import NotificationsPagination from "./_components/NotificationsPagination";

import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Notifications",
  description: "View all notifications",
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
  const res = await getNotifications(page);

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
        <NotificationsList page={page} />
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
