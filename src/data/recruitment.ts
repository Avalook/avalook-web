import { asset } from "./site";

export type Recruitment = {
  slug: string;
  title: string;
  description: string;
  /** Short tagline shown under the heading. */
  tagline: string;
  cover: string;
  metaLabel: string;
  metaTags: string[];
  intro: string[];
  duties: string[];
};

export const recruitmentBySlug: Record<string, Recruitment> = {
  "chuyen-vien-ban-quyen-phat-trien-ip": {
    slug: "chuyen-vien-ban-quyen-phat-trien-ip",
    title: "Chuyên viên bản quyền và phát triển IP",
    description: "Avalook recruitment for IP licensing sales coordinator.",
    tagline:
      "IP Licensing Sales Coordinator for Avalook and the Sang Y creative ecosystem.",
    cover: asset("5c4f61_f49ffecc4d93442da5271aae4c615d71~mv2.png"),
    metaLabel: "Về chúng tôi",
    metaTags: ["Avalook", "IP Development"],
    intro: [
      "Sáng Ý là một hệ sinh thái sáng tạo tiên phong trong lĩnh vực hoạt hình 2D/3D và phát triển sản phẩm Sở hữu Trí tuệ (IP) tại Việt Nam. Hệ sinh thái gồm DeeDee Animation Studio, Avalook và Vexa.",
      "Avalook là đơn vị phát triển IP ứng dụng công nghệ Web2 và Web3. Chúng tôi đang tìm kiếm IP Licensing Sales Coordinator - Chuyên viên bản quyền và phát triển IP.",
    ],
    duties: [
      "Phát triển cơ hội hợp tác bản quyền, thương mại hóa IP và mở rộng mạng lưới đối tác.",
      "Soạn thảo, rà soát và theo dõi hợp đồng; phối hợp với pháp chế để đảm bảo tuân thủ luật bản quyền Việt Nam.",
      "Quản lý quy trình hợp đồng từ NDA, MOU đến hợp đồng thương mại chính thức.",
      "Cập nhật và tư vấn cho team về xu hướng thị trường, bản quyền và sở hữu trí tuệ.",
      "Tiêu đề email ứng tuyển: [UT - Chuyên viên IP - HỌ VÀ TÊN].",
    ],
  },
};

/** Recruitment slugs that are an alias for an existing blog post. */
export const recruitmentPostAlias: Record<string, string> = {
  "business-development-manager":
    "calling-all-business-brains-with-creative-heart-we-are-hiring-a-business-development-manager",
};
