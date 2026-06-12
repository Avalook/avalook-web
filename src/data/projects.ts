import { asset, media } from "./site";

/** A card in the home/portfolio grid. */
export type PortfolioCard = {
  title: string;
  type: string;
  accent: string;
  href: string;
  external?: boolean;
  image?: string;
  video?: string;
  poster?: string;
};

/** A full project detail page. */
export type ProjectDetail = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Left-column label for the copy section. Defaults to "Overview". */
  label?: string;
  cover: string;
  /** rich-copy paragraphs as HTML (may include a ghost-button link). */
  body: string[];
  statusHeading: string;
  video?: string;
  gallery: string[];
};

// ---------------------------------------------------------------------------
// Portfolio grid (home + /project listing)
// ---------------------------------------------------------------------------
export const portfolio: PortfolioCard[] = [
  {
    title: "CAT-22 and Atman",
    type: "Short Series",
    accent: "#fff34a",
    href: "/projects/cat-22-and-atman/",
    image: asset("5c4f61_d477edda700e4bc09c4b4cab46e9282f~mv2.png"),
  },
  {
    title: "Pudgy Asia Art Contest",
    type: "Promotion Video",
    accent: "#43dce8",
    href: "/projects/pudgy-asia--art-contest/",
    video: media("pudgy-updated.mp4"),
    poster: asset("5c4f61_c1dd6dd686484ab2a049d90c4fb3a00cf000.jpg"),
  },
  {
    title: "Jelly's Bean",
    type: "Animation Series",
    accent: "#f5d72d",
    href: "/projects/jelly's-bean/",
    video: media("jelly bean -updated.mp4"),
    poster: asset("5c4f61_558ec87b267e442abbceb2aeb96a0b46f000.jpg"),
  },
  {
    title: "Do you want?",
    type: "Short Comic",
    accent: "#4285ff",
    href: "/projects/do-you-want%3F--/",
    image: asset("bia-doyouwant.png"),
  },
  {
    title: "The Chronicles of Broken Being",
    type: "Book Series",
    accent: "#ff8845",
    href: "/projects/the-chronicles-of--broken-being/",
    image: asset("5c4f61_a52cef5a5b414a63ab0c52c3fc90f576~mv2.jpg"),
  },
  {
    title: "Not For Thinking",
    type: "NFT Collection",
    accent: "#45c8ef",
    href: "https://x.com/NotForThinking",
    external: true,
    video: asset("notforthinking.mp4"),
    poster: asset("5c4f61_26a5bd2726a74f148293d54e203a4edbf000.jpg"),
  },
  {
    title: "Hoang Thi The : Fate and Destiny",
    type: "Featured Film",
    accent: "#c8dfb2",
    href: "/projects/once-upon-her-time/",
    image: asset("hoangthithe.jpg"),
  },
];

// ---------------------------------------------------------------------------
// Project detail pages (route /projects/$slug)
// ---------------------------------------------------------------------------
const catTwentyTwo: Omit<ProjectDetail, "slug"> = {
  title: "CAT-22 and Atman",
  description:
    "In a world that should feel ordinary, chaos is always just one thought away, especially when that thought belongs to Atman. Atman is an odd boy who believes he is a dog; CAT-22 is a cautious cat who wants peace and a working TV. Whenever Atman's imagination twists reality, their home becomes a new disaster.",
  category: "Short series",
  label: "Synopsis",
  cover: asset("5c4f61_d477edda700e4bc09c4b4cab46e9282f~mv2.png"),
  body: [
    "In a world that should feel ordinary, chaos is always just one thought away — especially when that thought belongs to Atman.",
    "Atman is an odd boy who believes he's a dog. He barks, chases bikes, and takes everything far too seriously. The real problem? Whatever Atman overthinks… comes to life. Sharing the same roof is CAT-22 — a cautious, anxiety-prone cat who dreams of nothing more than peace and a working TV. But whenever Atman's wild imagination twists reality — from talking trash cans to alien hamsters and noodle-monster tsunamis — it's CAT-22 who has to clean up the mess.",
    "Each episode unleashes a new surreal disaster sparked by Atman's latest obsession, while CAT-22 scrambles to hold reality together before it falls apart. Along the way, they cross paths with a mysterious delivery guy who fights like Bruce Lee and never seems fazed by the madness.",
    "Fast-paced, slapstick, and full of bizarre twists, CAT-22 & Atman is a comedy series about the chaos of overthinking — and the reminder that sometimes, just being present is enough.",
  ],
  statusHeading: "Concept Design",
  video: media("cat22-updated.mp4"),
  gallery: [
    asset("5c4f61_d477edda700e4bc09c4b4cab46e9282f~mv2.png"),
    asset("5c4f61_7adcb7165d16438b870086138f255181~mv2.png"),
    asset("5c4f61_f5d79841989846c1bc716c5a0137e8ec~mv2.png"),
    asset("5c4f61_0b0a957b99aa4dc6b912fed7e40a1e46~mv2.png"),
    asset("5c4f61_5f9548cfb29c49b683d667adb8b59def~mv2.png"),
    asset("5c4f61_5455e8a45f974a01bd9e75ab6eab8a63~mv2.png"),
  ],
};

const jellysBean: Omit<ProjectDetail, "slug"> = {
  title: "Jelly's Bean",
  description:
    "In Jelly's vivid imagination, the world around her is always more fantastical than it appears. When her thoughts materialize into Bean, a magical creature able to bring imagination into real life, every episode follows the adventure and chaos created by Jelly's extraordinary view of the world.",
  category: "Animation Series",
  cover: asset("5c4f61_9842cddf628848a7a51ea134fd213496~mv2.png"),
  body: [
    "In Jelly's vivid imagination, the world around her is always more fantastical than it appears. When her thoughts materialize into Bean, a magical creature able to bring imagination into real life, every episode follows the adventure and chaos created by Jelly's extraordinary view of the world.",
  ],
  statusHeading: "Concept Design",
  video: media("jelly bean -updated.mp4"),
  gallery: [
    asset("5c4f61_9842cddf628848a7a51ea134fd213496~mv2.png"),
    asset("5c4f61_cd858622882e4cbf8ef3e88db4eb2769~mv2.png"),
    asset("5c4f61_be70525c7b1e47e6b803f187b43a0ddd~mv2.png"),
    asset("5c4f61_37c4a29294bc4dd7a2a777e395bca3ce~mv2.png"),
    asset("5c4f61_ab66b5fe761b432799d5fd124f5e5c70~mv2.png"),
    asset("5c4f61_edcf5b366a434ff3a42793fc3da492e0~mv2.png"),
  ],
};

const projectList: ProjectDetail[] = [
  { slug: "cat-22-and-atman", ...catTwentyTwo },
  { slug: "cat-22", ...catTwentyTwo },
  { slug: "jelly's-bean", ...jellysBean },
  { slug: "jelly-bean", ...jellysBean },
  {
    slug: "do-you-want?--",
    title: "Do you want?",
    description:
      "He is an extraordinary android, a machine harboring dreams of an existence akin to that of an ordinary person. Faced with impending termination, he crafts captivating virtual lives, yet remains unfulfilled. A bold plan emerges, driven by a relentless pursuit of defying death.",
    category: "Short Comic",
    cover: asset("5c4f61_bdd3236cc284478c83d1cd6da9e04b8e~mv2.png"),
    body: [
      "He is an extraordinary android, a machine harboring dreams of an existence akin to that of an ordinary person. Faced with impending termination, he crafts captivating virtual lives, yet remains unfulfilled. A bold plan emerges, driven by a relentless pursuit of defying death.",
    ],
    statusHeading: "Concept Design",
    gallery: [
      asset("5c4f61_bdd3236cc284478c83d1cd6da9e04b8e~mv2.png"),
      asset("5c4f61_12642b3d7d264924b636705c5221b6af~mv2.png"),
      asset("5c4f61_6f721987dd0e4afe8ec6123f48128c36~mv2.jpg"),
      asset("5c4f61_90fc485ded144a33948c12d0f7a23766~mv2.png"),
      asset("5c4f61_6607c1e21cbb4b50959074acebb2eea6~mv2.png"),
      asset("5c4f61_8421362872994e23800c6d35d913acd9~mv2.png"),
    ],
  },
  {
    slug: "not-for-thinking",
    title: "Not For Thinking",
    description:
      "Not For Thinking is Avalook's NFT collection experiment connecting character-driven visual storytelling with Web3 creative culture.",
    category: "NFT Collection",
    cover: asset("5c4f61_26a5bd2726a74f148293d54e203a4edbf000.jpg"),
    body: [
      "Not For Thinking is Avalook's NFT collection experiment connecting character-driven visual storytelling with Web3 creative culture.",
    ],
    statusHeading: "NFT Collection",
    gallery: [asset("5c4f61_26a5bd2726a74f148293d54e203a4edbf000.jpg")],
  },
  {
    slug: "once-upon-her-time",
    title: "Hoang Thi The: Fate & Destiny",
    description:
      "Hoang Thi The, the daughter of legendary rebel De Tham, lived a spectacular life torn between her heroic roots and her enemies' nurture. Two descendants in Vietnam and France must retrace her story to uncover the true fate that binds their families.",
    category: "Feature Film",
    label: "Logline",
    cover: asset("437529_5b744cfad40c4e479841482451dd6a27~mv2.png"),
    body: [
      "Hoang Thi The, the daughter of legendary rebel De Tham, lived a spectacular life torn between her heroic roots and her enemies' nurture. Two descendants in Vietnam and France must retrace her story to uncover the true fate that binds their families.",
    ],
    statusHeading: "Working in Progress",
    gallery: [
      asset("437529_5b744cfad40c4e479841482451dd6a27~mv2.png"),
      asset("437529_c570e8a659b8415e9c2e640948c310c8~mv2.png"),
      asset("437529_4cf4ae75557a4ae694a3cab28eb84321~mv2.png"),
      asset("fa6112_5bdf0c6cfaba4535b625ae696352c88e~mv2.jpg"),
      asset("437529_5f47a07fe64847d5aa40b8bdc141c11df000.jpg"),
      asset("fa6112_6194203c3e5c47508384e56720900613~mv2.png"),
    ],
  },
  {
    slug: "pudgy-asia--art-contest",
    title: "Pudgy Asia Art Contest",
    description:
      "As Creative Partner for the Pudgy Asia Art Contest, Avalook collaborated with PunkgaMe and DeeDee Animation Studio on a special project featuring Pudgy Penguins across their Asia Tour. The project was sponsored by Dagora Marketplace and organized with PunkgaMe, Pudgy VN, Aura Network, Avalook and Pudgy Asia.",
    category: "Promotion Video",
    cover: asset("5c4f61_2381cd63fbe54fea94fc5055e98f26ed~mv2.png"),
    body: [
      "As Creative Partner for the Pudgy Asia Art Contest, Avalook collaborated with PunkgaMe and DeeDee Animation Studio on a special project featuring Pudgy Penguins across their Asia Tour. The project was sponsored by Dagora Marketplace and organized with PunkgaMe, Pudgy VN, Aura Network, Avalook and Pudgy Asia.",
    ],
    statusHeading: "Concept Design",
    video: media("pudgy-updated.mp4"),
    gallery: [
      asset("5c4f61_2381cd63fbe54fea94fc5055e98f26ed~mv2.png"),
      asset("5c4f61_4a6b011280ab4ebdaf166453d00edbc3~mv2.png"),
      asset("5c4f61_f995ef9d43794e50ac6ba3d3102d9b47~mv2.png"),
      asset("5c4f61_f64fbd84ebf94660a085ef7eaa0d3a2e~mv2.png"),
      asset("5c4f61_5e70a48168ec4d4180267b4d3e34f622~mv2.png"),
      asset("5c4f61_e96039e8fcc240f69c4904dff1297ac8~mv2.png"),
    ],
  },
  {
    slug: "the-chronicles-of--broken-being",
    title: "The Chronicles of Broken Being",
    description:
      "In a world teetering on the edge, a chilling prophecy, 'God is dead,' plunges humanity into chaos. Lac Long Quan, a brilliant technologist with the mysterious machine AUCO, foresees Broken Time and builds a distant sanctuary, while AUCO evolves into a conscious force capable of manipulating reality.",
    category: "Book Series",
    cover: asset("5c4f61_84c3dcadfdb24c6e9768c5c8a2604798~mv2.png"),
    body: [
      "In a world teetering on the edge, a chilling prophecy, 'God is dead,' plunges humanity into chaos. Lac Long Quan, a brilliant technologist with the mysterious machine AUCO, foresees Broken Time and builds a distant sanctuary, while AUCO evolves into a conscious force capable of manipulating reality.",
    ],
    statusHeading: "Concept Design",
    gallery: [
      asset("5c4f61_84c3dcadfdb24c6e9768c5c8a2604798~mv2.png"),
      asset("5c4f61_e10f96b5f53545d6a1181e18b5f28b94~mv2.png"),
      asset("5c4f61_d561064e060f418f9df18bdc8fbdf3f5~mv2.png"),
      asset("5c4f61_bde9f2aae9df47e6bbc637699fdb2f36~mv2.png"),
      asset("5c4f61_6d216e7fb80a4491b639641179ec6610~mv2.png"),
      asset("5c4f61_8421362872994e23800c6d35d913acd9~mv2.png"),
    ],
  },
];

export const projectsBySlug: Record<string, ProjectDetail> = Object.fromEntries(
  projectList.map((p) => [p.slug, p]),
);
