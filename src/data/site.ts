// Central site configuration, asset helpers and shared navigation/footer data.
//
// This module is the single seam where a future backend/CMS can replace the
// static content: routes and components read everything through `src/data/*`,
// so swapping these constants for fetched data does not touch the UI layer.

/** Resolve an image filename to its public URL under /assets/img. */
export const asset = (file: string) => `/assets/img/${file}`;

/** Resolve a media path (videos, photos with spaces/diacritics) under /media. */
export const media = (path: string) =>
  `/media/${path.split("/").map(encodeURIComponent).join("/")}`;

export const SITE = {
  name: "Avalook",
  email: "creative.avalook@gmail.com",
  description:
    "Avalook is a Vietnam-based creative unit focused on researching and developing Intellectual Property (IP) products. Rooted in innovation through advanced technology application, Avalook aims to enhance the value of artists' works and user experiences.",
  ogImage: asset("logo-avalook2.png"),
  logo: asset("logo.png"),
  social: {
    facebook: "https://www.facebook.com/avalookk",
    x: "https://x.com/Avalookstudio",
    linkedin: "https://www.linkedin.com/company/avalook/",
  },
  address: "Central Point, 219 Trung Kinh Street, Cau Giay District, Ha Noi",
  hours: "Mon - Fri 9:00 am - 5:00 pm",
} as const;

export type NavLink = { label: string; href: string };

// The home page scrolls to in-page sections; subpages link back to absolute
// routes (with hash anchors for the home sections).
export const HOME_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Who we are", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Partners", href: "#partners" },
  { label: "Team", href: "#team" },
  { label: "Activities", href: "#activities" },
  { label: "Latest Announcements", href: "/blog/" },
];

export const PAGE_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Who we are", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Partners", href: "/#partners" },
  { label: "Team", href: "/#team" },
  { label: "Activities", href: "/#activities" },
  { label: "Latest Announcements", href: "/blog/" },
];

export const FOLLOW_LINKS: { href: string; label: string }[] = [
  { href: SITE.social.x, label: "Follow us on X >>> @avalookstudio" },
  { href: SITE.social.facebook, label: "Follow us on Facebook >>> @avalookk" },
  { href: SITE.social.linkedin, label: "Follow us on LinkedIn >>> Avalook" },
];
