import { AppDownloader } from "@/app/(root)/_components/home/AppDownloader";
import { RecentlyAdded } from "@/app/(root)/_components/home/RecentlyAdded";
import AccessDashboard from "./_components/home/AccessDashboard";
import FeaturedVideos from "./_components/home/FeaturedVideos";
import { Hero } from "./_components/home/Hero";

export default function Page() {
  return (
    <>
      <Hero />
      <AccessDashboard />
      <FeaturedVideos />
      <RecentlyAdded />
      <AppDownloader />
    </>
  )
}


