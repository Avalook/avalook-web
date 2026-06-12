# Avalook — Deploy lên Vercel + CMS dashboard (git-based)

Site Avalook (TanStack Start) + **CMS dashboard** tại `/dashboard` để đăng bài.
Cơ chế: sửa nội dung trong dashboard → bấm **Publish to site** → server commit
`src/content/cms.json` lên GitHub → Vercel tự build lại → khách thấy nội dung mới.

## 0. Nhánh & build
- Code nằm trên nhánh **`cms-prod`** (tách từ `main`). Để deploy, gộp vào `main`:
  ```bash
  git checkout main
  git merge cms-prod
  git push origin main
  ```
  (Hoặc deploy thẳng nhánh `cms-prod` trên Vercel — nhớ đặt `GITHUB_BRANCH=cms-prod`.)
- Đã chuyển khỏi Cloudflare sang Vercel: `vite.config.ts` dùng `nitro()` (tự nhận
  Vercel, xuất `.vercel/output`), đã xoá `wrangler.jsonc`. Build: `vite build`.

## 1. Tạo GitHub token (cho nút Publish)
1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Repository access: chỉ repo `nguyencongtuyenlp/avalook`.
3. Permissions → **Contents: Read and write**.
4. Copy token (dạng `github_pat_...`).

## 2. Import vào Vercel
1. vercel.com → **Add New → Project** → chọn repo `nguyencongtuyenlp/avalook`.
2. Framework: Vercel tự nhận **TanStack Start** (build `vite build`, output tự động —
   KHÔNG cần `vercel.json`).
3. Thêm **Environment Variables** (Production + Preview):

   | Tên | Giá trị | Bắt buộc |
   |-----|---------|----------|
   | `DASHBOARD_PASSWORD` | mật khẩu đăng nhập dashboard | ✅ |
   | `SESSION_SECRET` | chuỗi ngẫu nhiên ≥ 32 ký tự (mã hoá cookie phiên) | ✅ |
   | `GITHUB_TOKEN` | token ở bước 1 | ✅ (để Publish chạy) |
   | `GITHUB_REPO` | `nguyencongtuyenlp/avalook` | tuỳ chọn (mặc định đã đúng) |
   | `GITHUB_BRANCH` | `main` (hoặc nhánh deploy) | tuỳ chọn (mặc định `main`) |

   Tạo `SESSION_SECRET` nhanh: `openssl rand -hex 32`.
4. **Deploy**.

## 3. Trỏ tên miền (DNS)
Vercel → Project → **Settings → Domains** → Add domain (tên miền đã mua). Vercel sẽ
yêu cầu một trong hai (làm ở trang quản lý DNS của nhà cung cấp tên miền):
- **Apex** (`avalook.com`): bản ghi `A` → `76.76.21.21`.
- **www** (`www.avalook.com`): bản ghi `CNAME` → `cname.vercel-dns.com`.
Theo đúng giá trị Vercel hiển thị (có thể khác). Chờ DNS lan truyền (vài phút–vài giờ).

## 4. Dùng dashboard
- Vào `https<your-domain>/dashboard` → bị chuyển tới `/login` → nhập `DASHBOARD_PASSWORD`.
- Quản lý các collection: **Blog Posts, Projects, Activities, Team, Partners**.
  - Thêm/sửa item, đổi **Draft/Published**, kéo-thả đổi thứ tự, **Preview** (xem trên site).
- Bấm **Publish to site** (góc trên phải) → commit lên GitHub → Vercel build lại (~1–2 phút) → site cập nhật.

## Cách hoạt động (tóm tắt)
- Site đọc nội dung qua `src/data/content.ts`, overlay `src/content/cms.json` lên trên
  dữ liệu tĩnh `src/data/*` (khi cms.json rỗng → dùng nội dung gốc).
- Item có `status: "draft"` sẽ **không** hiện trên site (chỉ hiện trong dashboard).
- Auth: cookie phiên mã hoá (`useSession`), guard ở route `/dashboard` + server function `publish`.

## Đã làm / Còn lại
- ✅ Tích hợp dashboard vào site (đọc `@/data` thật), Vercel build (`.vercel/output`),
  đăng nhập mật khẩu, git-publish, Draft/Published + filter, Preview, Duplicate,
  bulk publish/draft, reorder, 5 collection.
- ⏳ Chưa làm (đề xuất sau): upload ảnh trực tiếp (Vercel Blob), command palette ⌘K,
  dark mode, SEO fields riêng, trang Overview thống kê, overlay cho project **detail** pages.
