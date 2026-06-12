## 1. Phân tích codebase hiện tại

### Công nghệ đang dùng
Codebase Avalook hiện là **static HTML site** (không phải React), gồm:
- **HTML thuần**: 1 trang chính `index.html` (293 dòng) + ~25 trang con dạng `subfolder/index.html`
- **CSS thuần**: 6 file trong `/css/` (~2.800 dòng) — `base`, `layout`, `components`, `animations`, `responsive`, `section-backgrounds`
- **JS thuần (vanilla)**: `/js/main.js`, `/js/animations.js`, `/js/utils.js`, `script.js` — slider hero, nav toggle, scroll animations
- **Assets**: ảnh trong `/assets/img/`, video trong `/media/`, fonts Google trong `/assets/fonts/`
- Shell project đã có sẵn **TanStack Start v1 + React 19 + Tailwind v4 + shadcn/ui** (xem `package.json`, `src/routes/`) — nhưng hiện chỉ có 1 route `index.tsx` placeholder.

### Cấu trúc trang hiện có
- `/` — Home: hero slider 3 slide, Who we are, Portfolio (7 thẻ), Partners, Team, Activities, Latest Announcements, Footer
- `/about/`, `/services/`, `/contact/`, `/blog/`, `/dashboard/`
- `/projects/*` — 9 dự án (cat-22, cat-22-and-atman, do-you-want, jelly's-bean, jelly-bean, not-for-thinking, once-upon-her-time, pudgy-asia--art-contest, the-chronicles-of--broken-being)
- `/post/*` — 6 bài blog/announcement
- `/profile/*` — 5 hồ sơ thành viên team
- `/recruitment/*` — 2 tin tuyển dụng

### Điểm cần lưu ý
- Navigation hiện trộn cả route thật (`/`) lẫn hash anchor (`#about`, `#portfolio`…) trên cùng trang Home → khi port sang TanStack nên tách hẳn route hoặc giữ scroll trong trang Home.
- Một số path có ký tự đặc biệt (`?`, `'`, dấu cách) — cần slugify lại khi tạo route TanStack.
- `ASSET_MAP.md` đã đánh dấu sẵn ảnh nào ✅/⚠️/❌ — dùng làm checklist.
- 2 stack CSS đang cùng tồn tại: `/css/*.css` (Avalook gốc) và `src/styles.css` (Tailwind v4). Cần quyết định giữ cái nào.

---

## 2. Plan port sang React/TanStack (giữ nguyên giao diện)

### Chiến lược tổng thể
**Giữ nguyên 100% CSS gốc Avalook**, chỉ chuyển HTML → JSX components và vanilla JS → React hooks. Không refactor sang Tailwind/shadcn để tránh lệch giao diện. Tailwind vẫn nằm đó cho các tính năng mới sau này.

### Bước 1 — Chuẩn bị nền
- Copy `/css/*.css` và `/assets/fonts/google-fonts.css` vào `src/styles/` và import từ `src/styles.css` (hoặc `__root.tsx`) để bundler xử lý đúng.
- Copy `/assets/img/*` và `/media/*` vào `public/assets/` và `public/media/` để giữ nguyên đường dẫn tuyệt đối trong CSS/HTML.
- Cập nhật `__root.tsx`: set `<html lang="en">`, meta tags theo `index.html` gốc, link tới CSS đã import.

### Bước 2 — Components dùng chung
Tách từ `index.html`:
- `<SiteHeader>` — logo + nav + nút Contact, kèm `nav-toggle` (useState mở/đóng menu mobile)
- `<SiteFooter>`
- `<HeroSlider>` — port logic slider 3 slide từ `script.js` sang React (useState index + useEffect autoplay + prev/next/dots)
- `<PortfolioCard>`, `<TeamCard>`, `<AnnouncementCard>`, `<PartnerLogo>` — presentational components
- `<RevealOnScroll>` — wrap IntersectionObserver từ `js/animations.js`

### Bước 3 — Routes (file-based, mỗi trang 1 file dưới `src/routes/`)
- `index.tsx` — Home (hero + about + portfolio + partners + team + activities + announcements). Giữ hash anchor trong trang.
- `about.tsx`, `services.tsx`, `contact.tsx`, `blog.tsx`, `dashboard.tsx`
- `projects.$slug.tsx` — 1 route động cho 9 dự án, data lấy từ `src/data/projects.ts`
- `post.$slug.tsx` — 6 bài post
- `profile.$slug.tsx` — 5 hồ sơ
- `recruitment.$slug.tsx` — 2 tin tuyển dụng

Mỗi route thêm `head()` riêng (title + meta + og) lấy từ HTML gốc tương ứng.

### Bước 4 — Data layer
Tạo `src/data/`:
- `projects.ts` — array { slug, title, type, cover, accent, body, gallery }
- `posts.ts`, `team.ts`, `recruitment.ts`

Trích xuất từ các `subfolder/index.html` hiện tại bằng script (đọc HTML, parse) hoặc copy thủ công.

### Bước 5 — Slugify & redirect
- Slug `do-you-want?--` → `do-you-want`, `jelly's-bean` → `jellys-bean` v.v.
- Optional: thêm map redirect cho URL cũ.

### Bước 6 — Dọn dẹp
- Xoá `index.html` cũ ở root, các thư mục `about/`, `projects/`, `post/`… sau khi đã port xong (TanStack Start sẽ tự render).
- Giữ `public/assets/` & `public/media/`.
- Giữ ASSET_MAP.md để tham chiếu.

### Thứ tự triển khai đề xuất (chia nhỏ)
1. Setup CSS + assets + root layout + Header/Footer
2. Trang Home đầy đủ (hero slider + tất cả section)
3. Các trang static đơn giản: About, Services, Contact, Blog
4. Trang Projects (template + 9 entries)
5. Trang Post / Profile / Recruitment
6. QA so sánh pixel với bản gốc, fix responsive, dọn file cũ

### Câu hỏi cần bạn xác nhận trước khi code
1. **Giữ nguyên CSS gốc** (`/css/*.css`) hay viết lại bằng Tailwind? → Đề xuất: giữ nguyên để 1:1 giao diện.
2. **Nav trên Home**: giữ hash anchor `#about #portfolio` trong trang Home (1 trang dài), hay tách mỗi section thành route riêng?
3. **Phạm vi lần này**: port toàn bộ ~25 trang, hay chỉ Home + vài trang chính trước rồi mở rộng sau?
4. **Nội dung động** (projects, posts, team) sẽ lưu ở: file TS tĩnh trong repo, hay dùng Lovable Cloud (DB) để sau này edit qua admin?
