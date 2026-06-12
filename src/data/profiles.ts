import { media } from "./site";

export type Profile = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
};

const profileList: Profile[] = [
  {
    slug: "dang-hai-quang",
    name: "Dang Hai Quang",
    role: "Founder/ CEO",
    image: media("Founder/anhquang.avif"),
    bio: [
      "Quang Dang, the visionary founder of Avalook, brings over a decade of diverse experience in the creative arts industry. In 2017, he established DeeDee Animation Studio, now one of Vietnam's premier animation production companies. His work Broken Being: Prequel has been honored by the Vietnam Cinema Association and international festivals including Olympus Film Festival, KHEM Film Festival, and Bloodstained Film Festival.",
    ],
  },
  {
    slug: "le-quynh-nhu",
    name: "Le Quynh Nhu",
    role: "Co-Founder/COO",
    image: media("Co-Founder/chinhu.avif"),
    bio: [
      "Nhu Le is responsible for the studio's general operations. Her operation and coordination ability has been proven through campaigns with Unilever, Vinamilk, Pops Worldwide and animated series collaborations with studios such as Shin-Ei Animation, TMS Animation and Disney Animation Studio.",
    ],
  },
  {
    slug: "ha-huy-hoang",
    name: "Ha Huy Hoang",
    role: "Creative Advisor",
    image: media("Creative Advisor/anhhoang.avif"),
    bio: [
      "Graduated with a BFA in Animation from the Academy of Art University in San Francisco, Ha Huy Hoang has more than 10 years of experience in animation. His expertise helps him conceptualize designs, manage projects and ensure visual consistency for clients and original productions.",
    ],
  },
  {
    slug: "nguyen-viet-hoa",
    name: "Nguyen Viet Hoa",
    role: "Business Advisor",
    image: media("Creative Advisor/anhhoa.avif"),
    bio: [
      "With over 10 years of experience at top IT firms such as FPT and Microsoft, Hoa Nguyen has also been a speaker and expert at international blockchain events including GM Vietnam, Vietnam Security Bootcamp and SSI Digital Assets Summit.",
    ],
  },
  {
    slug: "jason-vu-",
    name: "Jason Vu",
    role: "Strategy Advisor",
    image: media("Creative Advisor/anhvu.avif"),
    bio: [
      "Ex-Kyber Network and Krystal Defi, Jason Vu is an NFT and DeFi enthusiast with five years of experience in the industry.",
    ],
  },
];

export const profilesBySlug: Record<string, Profile> = Object.fromEntries(
  profileList.map((p) => [p.slug, p]),
);
