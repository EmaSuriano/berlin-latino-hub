import Link from "next/link";
import NavLinks from "./nav-links";
import AcmeLogo from "./acme-logo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-2 md:px-2">
      <Link
        className="mb-2 flex h-30 items-end justify-center rounded-md bg-[e3e7e7]  items-center md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
