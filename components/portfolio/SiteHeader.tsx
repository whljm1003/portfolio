import Link from "next/link";
import { profile } from "@/assets/portfolio";
import MobileMenu from "./MobileMenu";
import SectionNavigation from "./SectionNavigation";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="DEAN 이정민 홈">
          <span className="brand-word">
            DEAN<span className="brand-period">.</span>
          </span>
          <span className="brand-description">
            이정민
            <br />
            {profile.role}
          </span>
        </Link>
        <SectionNavigation />
        <MobileMenu />
      </div>
    </header>
  );
}
