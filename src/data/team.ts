import { asset, media } from "./site";

export type Person = {
  name: string;
  role: string;
  image: string;
  href: string;
};

export type Partner = { name: string; image: string };

// Founders — linked to their full profile pages.
export const founders: Person[] = [
  {
    name: "Dang Hai Quang",
    role: "Founder/ CEO",
    image: media("Founder/anhquang.avif"),
    href: "/profile/dang-hai-quang/",
  },
  {
    name: "Le Quynh Nhu",
    role: "Co-Founder/COO",
    image: media("Co-Founder/chinhu.avif"),
    href: "/profile/le-quynh-nhu/",
  },
];

// Core contributors — no dedicated profile page yet (anchor back to the team
// section, placeholder avatar until a portrait is provided).
export const contributors: Person[] = [
  { name: "Nguyen Hong Dung", role: "Marketing Specialist", image: media("Team/chidung.avif"), href: "#team" },
  { name: "Le Hoai Thu", role: "Project Assistant", image: media("Team/chithu.avif"), href: "#team" },
  { name: "Sylvain Grisollet", role: "Business Development Director", image: media("Team/anhtay.avif"), href: "#team" },
];

export const advisors: Person[] = [
  {
    name: "Ha Huy Hoang",
    role: "Creative Advisor",
    image: media("Creative Advisor/anhhoang.avif"),
    href: "/profile/ha-huy-hoang/",
  },
  {
    name: "Nguyen Viet Hoa",
    role: "Business Advisor",
    image: media("Creative Advisor/anhhoa.avif"),
    href: "/profile/nguyen-viet-hoa/",
  },
  {
    name: "Jason Vu",
    role: "Strategy Advisor",
    image: media("Creative Advisor/anhvu.avif"),
    href: "/profile/jason-vu-/",
  },
];

export const partners: Partner[] = [
  { name: "DeeDee Animation Studio", image: asset("5c4f61_6bdb165f43284bef99d3d8d58bb89a1e~mv2.png") },
  { name: "Ninety Eight", image: asset("5c4f61_3e57a2e273f44ae29249c6860f5551b2~mv2.png") },
  { name: "Aura Network", image: asset("437529_5e0a2a01500140d6ac7f93c629a37027~mv2.png") },
  { name: "VEXA", image: asset("437529_067add392d9f433783e72cb3f0eb29bf~mv2.png") },
  { name: "PunkgaMe", image: asset("punkga-logo.avif") },
  { name: "Oseero", image: asset("5c4f61_be353565208c4b6fb68c44007900a716~mv2.png") },
  { name: "SeekHype", image: asset("437529_31ed4ea7749a46df8cd136408b0448d3~mv2.png") },
];

// Founder achievements — two marquee rows (featured then compact).
export const achievementsFeatured: string[] = [
  asset("5c4f61_aff3f7b2a6934ffda7d44e1856063481~mv2.png"),
  asset("5c4f61_cca5f844127844c798ddce04c8defd39~mv2.png"),
  asset("5c4f61_3d37c4680673469499d931a18baca8d9~mv2.png"),
  asset("5c4f61_61657e5dff3f4b1eb54a71488e178464~mv2.png"),
  asset("5c4f61_08c8dd1eb65d49348926b9da3547fa3e~mv2.png"),
];

export const achievementsCompact: string[] = [
  asset("5c4f61_fc561367dd6a43e584452cbfbf37f23a~mv2.png"),
  asset("5c4f61_b42265e5f45e4c2ca9a886873b4f1744~mv2.png"),
  asset("5c4f61_7bfd6e9a74004b9687a538bcf27ce0f2~mv2.png"),
  asset("5c4f61_97643dba39604bb7accf5d397009c581~mv2.png"),
  asset("5c4f61_a14da66c2e5e49efac1b9fb86b3dc87a~mv2.png"),
  asset("5c4f61_343902b26b444b8aafe87f0085920d1e~mv2.png"),
  asset("5c4f61_54ec3f2f0fef459a935dd930e9527aab~mv2.png"),
  asset("5c4f61_ff29bec0909c44b09d2d472237ebb7e0~mv2.png"),
  asset("5c4f61_1261bd468f874f049969cd705e13cad4~mv2.png"),
  asset("5c4f61_4d15ecab05d8415d96c07dc01650251e~mv2.png"),
  asset("5c4f61_21ee84c8c92e44a09e46adfb389fbf9f~mv2.png"),
  asset("5c4f61_34dce7d9ecfe45cc984b0a3fbc9176eb~mv2.png"),
];

// Activities gallery — the first six show by default, the rest reveal on
// "Load more". Two photos are placeholders until the originals are supplied.
export const activities: string[] = [
  asset("5c4f61_36e7c9a95fbe41c2a486380555416a36~mv2.png"),
  media("Activties/0001.jpg"),
  media("Activties/00.jpg"),
  media("Activties/000001.jfif"),
  "/placeholder.svg",
  "/placeholder.svg",
  media("Activties/B8DB98E5-EAA1-4B11-9F76-0640B1CB15EA.jpg"),
  media("Activties/IMG_4310.jpg"),
  media("Activties/038BF0C5-4ECD-483F-BB2F-CB01EC2DCC95_edited.jpg"),
  media("Activties/BDB42B77-28E0-4D79-A535-E315FEA57634.jpg"),
  media("Activties/5EDA8DF9-1F12-49F3-9602-E060D27D858D.jpg"),
  media("Activties/1 (1).png"),
  media("Activties/Screenshot_20.png"),
  media("Activties/IMG_4998.jpg"),
  media("Activties/DSC00391.jpg"),
  media("Activties/Screenshot_1.png"),
  media("Activties/1.jpg"),
  media("Activties/365A4466-40F3-4AD0-8CF5-43585DCD0883.jpg"),
  media("Activties/Screenshot_2.png"),
];

/** Number of activity photos shown before "Load more". */
export const ACTIVITIES_VISIBLE = 6;
