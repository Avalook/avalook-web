# ASSET_MAP.md

Tổng quan toàn bộ ảnh / video / font đang được dùng trong site, kèm đường dẫn thật trong repo và trạng thái.

**Trạng thái:**
- ✅ CÓ FILE — đường dẫn đúng, đang hoạt động
- ⚠️ SAI ĐƯỜNG DẪN — file có nhưng đang gọi sai tên/folder
- ❌ THIẾU FILE — không tìm thấy trong repo

> Lưu ý: Một số path trong HTML dùng URL-encoding (`%20` cho space, `%40` cho `@`). Path "thật" trên đĩa đã được decode trong cột "File trong repo".

---

## 1. HERO (slider 3 ảnh)

| STT | Vị trí | Loại | Path trong HTML | File trong repo | Trạng thái | Ghi chú |
|----:|--------|------|-----------------|-----------------|:----------:|---------|
| 1 | Hero slide 1 — "From Storylines to Digital Wonders" | IMG | `/media/1.png` | `media/1.png` | ✅ | Cảnh 3D nhân vật mèo, nền hoa anh đào |
| 2 | Hero slide 2 — "From Books to Bytes" | IMG | `/media/2.png` | `media/2.png` | ⚠️ | Ảnh có nền đỏ/cam — nghi ngờ KHÔNG đúng với bản Wix gốc, cần đối chiếu lại |
| 3 | Hero slide 3 — "From Creative Sparks to Cutting-Edge IPs" | IMG | `/media/3.png` | `media/3.png` | ⚠️ | Cần đối chiếu với bản Wix gốc |

---

## 2. HEADER & FOOTER

| STT | Vị trí | Loại | Path trong HTML | File trong repo | Trạng thái |
|----:|--------|------|-----------------|-----------------|:----------:|
| 4 | Logo header | IMG | `/assets/img/5c4f61_358c319cf4c6430484b5fadea2ebca8f~mv2.png` | `assets/img/5c4f61_358c319cf4c6430484b5fadea2ebca8f~mv2.png` | ✅ |
| 5 | Logo footer | IMG | `/assets/img/5c4f61_1ccc0ab56eb349efa425fe763eff2635~mv2.png` | `assets/img/5c4f61_1ccc0ab56eb349efa425fe763eff2635~mv2.png` | ✅ |

---

## 3. WHO WE ARE

| STT | Vị trí | Loại | Path trong HTML | Trạng thái |
|----:|--------|------|-----------------|:----------:|
| 6 | Artwork section about | IMG | `/assets/img/437529_71632d0aaaa14c99888067c778e44511~mv2.png` | ✅ |

---

## 4. PORTFOLIO (7 thẻ)

| STT | Tên dự án | Loại | Path | Trạng thái |
|----:|-----------|------|------|:----------:|
| 7 | The Chronicles of Broken Being | IMG | `/assets/img/5c4f61_a52cef5a5b414a63ab0c52c3fc90f576~mv2.jpg` | ✅ |
| 8 | Not For Thinking | IMG | `/assets/img/5c4f61_26a5bd2726a74f148293d54e203a4edbf000.jpg` | ✅ |
| 9 | Jelly's Bean | IMG | `/assets/img/5c4f61_558ec87b267e442abbceb2aeb96a0b46f000.jpg` | ✅ |
| 10 | Do you want? | IMG | `/assets/img/5c4f61_ad91be0c1f7046bebf3d44c057419278f000.jpg` | ✅ |
| 11 | Hoang Thi The | IMG | `/assets/img/437529_5f47a07fe64847d5aa40b8bdc141c11df000.jpg` | ✅ |
| 12 | CAT-22 and Atman | IMG | `/assets/img/5c4f61_41fd0cdca9e94b32b3868b0f57ed297d~mv2.jpg` | ✅ |
| 13 | Pudgy Asia Art Contest | IMG | `/assets/img/5c4f61_c1dd6dd686484ab2a049d90c4fb3a00cf000.jpg` | ✅ |

---

## 5. PARTNERS (6 logo)

| STT | Path | Trạng thái |
|----:|------|:----------:|
| 14 | `/assets/img/5c4f61_6bdb165f43284bef99d3d8d58bb89a1e~mv2.png` | ✅ |
| 15 | `/assets/img/5c4f61_3e57a2e273f44ae29249c6860f5551b2~mv2.png` | ✅ |
| 16 | `/assets/img/437529_5e0a2a01500140d6ac7f93c629a37027~mv2.png` | ✅ |
| 17 | `/assets/img/437529_067add392d9f433783e72cb3f0eb29bf~mv2.png` | ✅ |
| 18 | `/assets/img/437529_cbee0ed817ba41b0af98a83ee4f98a6e~mv2.png` | ✅ |
| 19 | `/assets/img/437529_31ed4ea7749a46df8cd136408b0448d3~mv2.png` | ✅ |

---

## 6. TEAM (founders + advisors + achievements)

### Founders / Co-Founder (2)

| STT | Người | Path trong HTML | File trong repo | Trạng thái |
|----:|-------|-----------------|-----------------|:----------:|
| 20 | Dang Hai Quang | `/media/Founder/Avatar%403x%202.png` | `media/Founder/Avatar@3x 2.png` | ✅ |
| 21 | Le Quynh Nhu | `/media/Co-Founder/Avatar%403x%201.png` | `media/Co-Founder/Avatar@3x 1.png` | ✅ |

### Creative Advisors (3)

| STT | Người | Path trong HTML | File trong repo | Trạng thái |
|----:|-------|-----------------|-----------------|:----------:|
| 22 | Ha Huy Hoang | `/media/Creative%20Advisor/ADVISOT.png` | `media/Creative Advisor/ADVISOT.png` | ✅ |
| 23 | Nguyen Viet Hoa | `/media/Creative%20Advisor/ADVISOT-2.png` | `media/Creative Advisor/ADVISOT-2.png` | ✅ |
| 24 | Jason Vu | `/media/Creative%20Advisor/ADVISOT-1.png` | `media/Creative Advisor/ADVISOT-1.png` | ✅ |

### Founder achievements (12 ảnh)

| STT | Path | Trạng thái |
|----:|------|:----------:|
| 25–36 | `/assets/img/5c4f61_aff3f7b2a6934ffda7d44e1856063481~mv2.png` … `5c4f61_54ec3f2f0fef459a935dd930e9527aab~mv2.png` | ✅ tất cả |

---

## 7. ACTIVITIES (16 ảnh)

Tất cả nằm trong `media/Activties/`. Lưu ý: thư mục viết SAI chính tả (`Activties` thay vì `Activities`) — code đang gọi đúng theo tên thư mục thật, nên ✅, nhưng nên rename sau này.

| STT | File trong repo | Trạng thái |
|----:|-----------------|:----------:|
| 37 | `media/Activties/B8DB98E5-EAA1-4B11-9F76-0640B1CB15EA.jpg` | ✅ |
| 38 | `media/Activties/IMG_4310.jpg` | ✅ |
| 39 | `media/Activties/038BF0C5-4ECD-483F-BB2F-CB01EC2DCC95_edited.jpg` | ✅ |
| 40 | `media/Activties/BDB42B77-28E0-4D79-A535-E315FEA57634.jpg` | ✅ |
| 41 | `media/Activties/00.jpg` | ✅ |
| 42 | `media/Activties/5EDA8DF9-1F12-49F3-9602-E060D27D858D.jpg` | ✅ |
| 43 | `media/Activties/0001.jpg` | ✅ |
| 44 | `media/Activties/1 (1).png` | ✅ |
| 45 | `media/Activties/Screenshot_20.png` | ✅ |
| 46 | `media/Activties/IMG_4998.jpg` | ✅ |
| 47 | `media/Activties/DSC00391.jpg` | ✅ |
| 48 | `media/Activties/000001.jfif` | ✅ |
| 49 | `media/Activties/Screenshot_1.png` | ✅ |
| 50 | `media/Activties/1.jpg` | ✅ |
| 51 | `media/Activties/365A4466-40F3-4AD0-8CF5-43585DCD0883.jpg` | ✅ |
| 52 | `media/Activties/Screenshot_2.png` | ✅ |

---

## 8. LATEST ANNOUNCEMENTS (6 thẻ blog)

| STT | Tiêu đề | Path | Trạng thái |
|----:|---------|------|:----------:|
| 53 | Calling all business brains... | `/assets/img/5c4f61_cada4df827144253b8347a981132f6c3~mv2.jpg` | ✅ |
| 54 | Meet Avalook team at AVA Exhibition 2024 | `/assets/img/5c4f61_a402d012c796475fbf2590b586687bcf~mv2.png` | ✅ |
| 55 | Mr. Quang Dang named 3rd judge | `/assets/img/5c4f61_6a82eee2a2bd44ec961e48d687c56572~mv2.png` | ✅ |
| 56 | Sponsoring Non-Fungible Saigon 2024 | `/assets/img/5c4f61_5e8c5955352048549758dd3ea9abeb95~mv2.png` | ✅ |
| 57 | Media Partner of GMVN 2024 | `/assets/img/5c4f61_9385fbc8802047d78c1f2fe657d27ad2~mv2.png` | ✅ |
| 58 | Pudgy Penguin Friends Asia tour | `/assets/img/5c4f61_e96039e8fcc240f69c4904dff1297ac8~mv2.png` | ✅ |

---

## 9. VIDEO (3 file dùng cho project detail pages)

| STT | Project | Path | Trạng thái |
|----:|---------|------|:----------:|
| 59 | Cat-22 | `/media/cat22-updated.mp4` | ✅ |
| 60 | Jelly Bean | `/media/jelly%20bean%20-updated.mp4` (file: `media/jelly bean -updated.mp4`) | ✅ |
| 61 | Pudgy | `/media/pudgy-updated.mp4` | ✅ |

---

## 10. FONT FILES

| STT | File | Định dạng | Tên font (đoán theo file) | Đang dùng cho section nào | Trạng thái |
|----:|------|-----------|----------------------------|---------------------------|:----------:|
| F1 | `media/FONT/KNOB.otf` | .otf (OpenType) | **KNOB** (custom Avalook display font) | Hero h1, Section heading h2, Subheading, Marquee, Mobile nav, Page hero, Detail title | ✅ ĐANG DÙNG (weight 400 only) |
| F2 | `media/FONT/Avalook Fonts/SVN-MissionX.otf` | .otf | **SVN Mission X** (Vietnamese display) | Đang khai báo trong fallback chain nhưng KNOB luôn load trước → thực tế chưa hiển thị | ⚠️ KHAI BÁO NHƯNG CHƯA HIỂN THỊ |
| F3 | `media/FONT/Avalook Fonts/SF-Pro-Text-Regular.otf` | .otf | **SF Pro Text 400** | Body text mặc định | ✅ ĐANG DÙNG |
| F4 | `media/FONT/Avalook Fonts/SF-Pro-Text-Medium.otf` | .otf | **SF Pro Text 500** | Nav links, contact pill | ✅ ĐANG DÙNG |
| F5 | `media/FONT/Avalook Fonts/SF-Pro-Text-Semibold.otf` | .otf | **SF Pro Text 600** | Section heading p, person-card link, achievements label | ✅ ĐANG DÙNG |
| F6 | `media/FONT/Avalook Fonts/SF-Pro-Text-Bold.otf` | .otf | **SF Pro Text 700** | Breadcrumb, page-hero span | ✅ ĐANG DÙNG |
| F7 | `assets/fonts/1Ptgg87LROyAm0K0.ttf` | .ttf | **Anton** (Google Fonts mirror) | Đã khai báo `@font-face` nhưng không còn rule CSS nào dùng | ❌ DEAD WEIGHT — có thể xóa |
| F8 | `assets/fonts/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf` | .ttf | **Inter 400** (Google Fonts mirror) | Body fallback (sau SF Pro) | ✅ FALLBACK |
| F9 | `assets/fonts/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf` | .ttf | **Inter 500** | Fallback | ✅ FALLBACK |
| F10 | `assets/fonts/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf` | .ttf | **Inter 600** | Fallback | ✅ FALLBACK |
| F11 | `assets/fonts/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf` | .ttf | **Inter 700** | Fallback | ✅ FALLBACK |

> File `assets/fonts/google-fonts.css` cũng khai báo alias `@font-face: 'Avalook Knob'` cùng src về `KNOB.otf`. Hai tên trỏ cùng file — vô hại nhưng dư thừa.

---

## TỔNG KẾT

| Hạng mục | Tổng | Đã có đủ | Cần cung cấp thêm |
|----------|-----:|---------:|------------------:|
| Asset ảnh & video (đang được tham chiếu trong HTML) | 92 unique reference | **92** ✅ | 0 |
| Font đang dùng trong CSS rule | 6 (KNOB, SVN, SF Pro 4 weights, Inter 4 weights, Anton) | 11/12 dùng được | 0 |
| Asset trong `assets/img/` chưa được dùng (dead asset) | 141 | — | 72 unused (có thể xóa) |
| File ảnh hero nghi ngờ sai bản gốc | 2 (slide 2, slide 3) | — | Cần đối chiếu lại với bản Wix |

### Việc tôi cần bạn xác nhận

1. **Hero slide 2 (`media/2.png`)** — ảnh hiện tại có nền đỏ/cam rõ, không match cảm giác chung. Nếu bạn còn screenshot/ảnh gốc của slide 2 từ Wix → gửi để mình thay.
2. **Hero slide 3 (`media/3.png`)** — đối chiếu tương tự.
3. **72 file dư trong `assets/img/`** — mình có thể xoá để gọn repo, hoặc giữ lại làm "kho" tuỳ ý bạn.
4. **Folder typo `media/Activties/`** — rename về `Activities/` không? (sẽ phải sửa toàn bộ HTML kèm theo)

### Ghi chú font

- **KNOB.otf** chỉ có 1 weight (400). Mọi heading dùng `font-family: "KNOB"` đã được set `font-weight: 400` ở mọi nơi (đã sửa) để chặn browser synthesize fake bold — đây là nguyên nhân khiến chữ trông DÀY HƠN bình thường.
- Sẽ thêm `font-synthesis: none` ở `:root` và `font-smoothing` antialiased trong `base.css` (xem mục Refactor).
- Không tự thay font — chỉ báo cáo.
