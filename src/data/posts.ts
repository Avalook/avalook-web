import { asset } from "./site";

export type Post = {
  slug: string;
  title: string;
  /** Short excerpt used on cards and as the meta description. */
  excerpt: string;
  date: string;
  readingTime: string;
  /** Optional "Updated: …" date shown under the title (blog-post layout). */
  updated?: string;
  cover: string;
  /** Body paragraphs as HTML (some contain inline links). */
  body: string[];
};

// Newest first — this order drives both the blog index and the home
// "Latest announcements" carousel.
export const posts: Post[] = [
  {
    slug: "calling-all-business-brains-with-creative-heart-we-are-hiring-a-business-development-manager",
    title:
      "Calling all business brains with creative heart - we are hiring a Business development manager!",
    excerpt:
      "Location: Hanoi / Ho Chi Minh City (Onsite - Full-time). Avalook is seeking a results-driven Business Development Manager to lead and expand our client portfolio across traditional and blockchain markets.",
    date: "May 7, 2025",
    readingTime: "3 min read",
    cover: asset("5c4f61_cada4df827144253b8347a981132f6c3~mv2.jpg"),
    body: [
      "Location: Hanoi / Ho Chi Minh City (Onsite - Full-time). Open Positions: 01.",
      "Avalook is seeking a results-driven Business Development Manager to lead and expand our client portfolio across both traditional and blockchain markets. This role is ideal for a strategic thinker with B2B sales experience, a passion for creative industries, and a deep understanding of the Web3 ecosystem.",
      "Key responsibilities include market research, building a high-quality lead pipeline, proactive outreach, preparing proposal materials, reporting sales activity, representing the company at industry events, and collaborating with the Founder and Marketing team on go-to-market strategies.",
      "The role focuses on both blockchain markets, including NFT and decentralized IP projects, and traditional creative partners such as merchandise companies, game developers, studios, brands, broadcasters and producers.",
      "Preferred candidates have C1 English or higher, an international mindset, strong communication and analytical skills, and genuine interest in IP development, animation, film and creative industries.",
    ],
  },
  {
    slug: "meet-avalook-team-at-ava-exhibition-2024",
    title: "Meet Avalook team at AVA Exhibition 2024!",
    excerpt:
      "Avalook joined AVA 2024 as a media partner for AVA Grand Contest 2024 and exhibition partner for AVA Exhibition 2024.",
    date: "Nov 28, 2024",
    readingTime: "1 min read",
    cover: asset("5c4f61_a402d012c796475fbf2590b586687bcf~mv2.png"),
    body: [
      "This past weekend, the AVA 2024 Exhibition officially ended, and Avalook was excited to be part of it not just as a media partner for AVA Grand Contest 2024, but also as an exhibition partner for AVA Exhibition 2024.",
      "From start to finish, the weekend was full of energy, creativity and inspiring moments. The team met talented young artists from the AVA Grand Contest and connected with visitors through games, giveaways and conversations.",
      "One highlight was Founder Quang Dang sharing insights on AI and its impact on creativity, opening meaningful conversations about the future of art.",
    ],
  },
  {
    slug: "exciting-news-mr-quang-dang-the-visionary-founder-of-avalook-has-been-named-the-3rd-judge-in-the",
    title:
      "Exciting news! Mr. Quang Dang, the visionary founder of Avalook, has been named the 3rd judge in the Pudgy Asia Art Contest.",
    excerpt:
      "For more information: https://x.com/PunkgaMeManga/status/1832428369658388778",
    date: "Nov 28, 2024",
    readingTime: "1 min read",
    cover: asset("5c4f61_6a82eee2a2bd44ec961e48d687c56572~mv2.png"),
    body: [
      'For more information: <a href="https://x.com/PunkgaMeManga/status/1832428369658388778">https://x.com/PunkgaMeManga/status/1832428369658388778</a>',
    ],
  },
  {
    slug: "we-re-thrilled-to-announce-that-avalook-is-proudly-sponsoring-non-fungible-saigon-2024-the-ultimate",
    title:
      "We're thrilled to announce that Avalook is proudly sponsoring Non-Fungible Saigon 2024-the ultimate event for artists, creators, and NFT enthusiasts in Vietnam!",
    excerpt:
      "Avalook proudly sponsored Non-Fungible Saigon 2024, an event for artists, creators and NFT enthusiasts in Vietnam.",
    date: "Nov 28, 2024",
    readingTime: "1 min read",
    cover: asset("5c4f61_5e8c5955352048549758dd3ea9abeb95~mv2.png"),
    body: [
      'For more information: <a href="https://x.com/nonfungiblesgn/status/1796116498294985053">https://x.com/nonfungiblesgn/status/1796116498294985053</a>',
    ],
  },
  {
    slug: "avalook-joined-hands-as-the-official-media-partner-of-gmvn-2024",
    title: "Avalook joined hands as the official Media Partner of GMVN 2024.",
    excerpt: "Avalook joined GMVN 2024 as the official Media Partner.",
    date: "Nov 28, 2024",
    readingTime: "1 min read",
    cover: asset("5c4f61_9385fbc8802047d78c1f2fe657d27ad2~mv2.png"),
    body: [
      'Check out this post for more information: <a href="https://x.com/gmvn_official/status/1793582460560691344">https://x.com/gmvn_official/status/1793582460560691344</a>',
    ],
  },
  {
    slug: "get-ready-for-an-adorable-adventure-join-pudgy-penguin-friends-on-their-super-fun-and-exciting-asia",
    title:
      "Get ready for an adorable adventure! Join Pudgy Penguin Friends on their super fun and exciting Asia tour!",
    excerpt:
      "Pudgy Penguins are on an Asia Tour, and Avalook joined as Creative Partner for the Pudgy Asia Art Contest.",
    date: "Nov 28, 2024",
    readingTime: "1 min read",
    cover: asset("5c4f61_e96039e8fcc240f69c4904dff1297ac8~mv2.png"),
    body: [
      "Have you heard? Pudgy Penguins are on an epic Asia Tour. Follow along to see where they're heading next.",
      "As the Creative Partner for the Pudgy Asia Art Contest, Avalook collaborated with PunkgaMe and DeeDee Animation Studio on a special project featuring Pudgy Penguins.",
      "Big thanks to the hosts and partners: Dagora Marketplace, Pudgy Vietnam, Pudgy Asia and Aura Network. Head of Production: Quang Dang and Nhu Le. Supervising Producer: Trinh Nguy. Line Producer: Thu Le and Minh Anh Nguyen Pham.",
    ],
  },
];

export const postsBySlug: Record<string, Post> = Object.fromEntries(
  posts.map((p) => [p.slug, p]),
);
