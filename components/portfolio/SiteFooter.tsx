import Link from "next/link";

export default function SiteFooter({ topHref = "#top" }: { topHref?: string }) {
  return (
    <footer className="site-footer shell">
      <div className="footer-meta">
        <div className="footer-identity">
          <span className="footer-word" aria-hidden="true">
            DEAN<span>.</span>
          </span>
          <span>© {new Date().getFullYear()} 이정민</span>
        </div>
        <Link href={topHref}>맨 위로 ↑</Link>
      </div>
    </footer>
  );
}
