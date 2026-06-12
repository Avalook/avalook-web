import { usePageClass } from "@/hooks/usePageClass";
import { SiteHeader } from "./SiteHeader";
import { FollowStrip } from "./FollowStrip";
import { SiteFooter } from "./SiteFooter";

/**
 * Standard layout for every subpage: animated background, header, the page's
 * <main> content, the follow marquee and the footer.
 */
export function PageShell({
  children,
  bodyClass,
}: {
  children: React.ReactNode;
  bodyClass?: string;
}) {
  usePageClass(bodyClass);
  return (
    <>
      <div className="page-bg" />
      <SiteHeader variant="page" />
      <main>{children}</main>
      <FollowStrip />
      <SiteFooter variant="page" />
    </>
  );
}
