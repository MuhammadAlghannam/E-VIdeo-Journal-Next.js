import getUserInfo from "@/lib/apis/profile/user-info.api";
import { auth } from "@/lib/auth";
import { navbarLinks } from "@/lib/constants/navbarLinks";
import Image from "next/image";
import Link from "next/link";
import HamburgerNav from "./_components/HamburgerNav";
import LoginButton from "./_components/LoginButton";
import NavLinks from "./_components/NavLinks";
import NavNotifications from "./_components/NavNotifications";
import NavSearch from "./_components/NavSearch";
import UserDropDown from "./_components/UserDropDown";

export default async function NavBar() {
  const session = await auth();

  // Get user info
  let initialUser: ApiUser | null = null;
  if (session?.token) {
    try {
      initialUser = await getUserInfo();
    } catch {
      initialUser = null;
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container-1440 border-b border-b-border py-7 ">
        <div className="flex-between items-center">

          {/* Left */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/">
              <Image
                src={"/images/logos/logo.svg"}
                alt={"HIS logo"}
                width={94}
                height={68}
                className="w-[94px] h-[68px]"
                priority
                quality={75}
              />
            </Link>

            {/* Main Links */}
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-[18px]">
                {navbarLinks
                  .filter((items) => {
                    const isHiddenStatic = ["Login", "Sign up", "Profile", "Dashboard"].includes(items.label);
                    const isFavoritesHiddenWhenLoggedOut = !session?.user && items.label === "Favorites";
                    const isGuidelineHiddenWhenLoggedOut = !session?.user && items.label === "Guideline Publications";
                    return !isHiddenStatic && !isFavoritesHiddenWhenLoggedOut && !isGuidelineHiddenWhenLoggedOut;
                  })
                  .map((items) => (
                    <NavLinks
                      key={items.id}
                      items={{ label: items.label, href: items.href }}
                    />
                  ))}
              </ul>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* search */}
            <div className="hidden lg:block">
              {session?.user && <NavSearch />}
            </div>

            {/* Notifications */}
            {session?.user && <NavNotifications />}

            {session?.user ?
              (
                <>
                  {/* User DropDown (desktop only) */}
                  <div className="hidden lg:flex items-center gap-3">
                    {initialUser && <UserDropDown initialUser={initialUser} />}
                  </div>
                </>
              ) : (
                <>
                  {/* Login & Signup Buttons (desktop only) */}
                  <div className="hidden lg:flex items-center gap-3">
                    <LoginButton>Login</LoginButton>
                  </div>
                </>
              )
            }

            {/* Hamburger Links */}
            <div className="block lg:hidden">
              <HamburgerNav session={session} />
            </div>
          </div>
        </div>

        {/* Search row for xs, sm, and md (under navbar) */}
        <div className="mt-4 block lg:hidden">
          {session?.user && <NavSearch />}
        </div>
      </div>
    </header>
  )
}
