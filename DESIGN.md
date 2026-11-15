# **UI_UX_DESIGN.md — TracerLog**



Design Direction

Clean SaaS

Desktop-first



[Plane | Open-source Project Management Software for all teams](https://images.openai.com/static-rsc-4/I-Q-MxCHx0JAqg_h5ziijrKwOIoTJ192gxXOTCjCdYQNHZGa5prEJdqEdU-L8PjjHPDIrUXJgYDxU6txZKsnVP7bY99Y18abNK-eMBgbpID324NsXsdz2gbQGGDGGciu7QQggVo8u4Xa0jit5zXg9RqgMneTdT3m6lPY6Gj2WB4?purpose=inline)

[plane.so](https://plane.so/?utm_source=chatgpt.com)

- Visual style: Clean, minimal, functional.
- Inspiration: Linear, modern project management tools.
- Primary color: Muted green.
- Background: Soft neutral white.
- Typography: Plus Jakarta Sans.
- Layout: Compact, structured, spacious enough to breathe.
- Interaction: Direct, predictable, minimal friction.

## **1. Design Principles**

### **1.1 Clean & Functional**

Setiap elemen UI harus punya tujuan. Hindari elemen dekoratif yang tidak membantu workflow.

### **1.2 Information Hierarchy**

Urutan prioritas visual:

1. R# — identitas utama work.
2. Customer — konteks pekerjaan.
3. Status — progres pekerjaan.
4. Notes indicator — informasi internal.
5. Metadata — tanggal dan waktu.

### **1.3 Minimal Interaction**

- Form input singkat.
- Modal untuk tambah dan edit work.
- Inline status update.
- Copy report dengan satu klik.
- Hindari navigasi bertingkat.

### **1.4 Consistency**

Komponen, spacing, warna, typography, dan interaction pattern harus konsisten di seluruh halaman.

## **2. Color System**

Palette Reference: [Colorhunt #071B2B #167D8D #B9E4E8 #EEEEEE](https://colorhunt.co/palette/071b2b167d8db9e4e8eeeeee)

Primary
#167D8D

Primary Hover
#11626F

Accent / Soft Highlight
#B9E4E8

App Background (Light)
#EEEEEE

Surface (Light)
#FFFFFF

Border (Light)
#DCE5E8

Text Primary (Light)
#071B2B

Text Secondary (Light)
#3D5A70

Text Muted (Light)
#6B889C

### **Status Colors**

| Status          | Background | Text      |
| --------------- | ---------- | --------- |
| PROGRESS        | `#FFF4DB`  | `#946200` |
| SELESAI         | `#E5F4EA`  | `#286A43` |
| REVISI PROGRESS | `#FCE8E6`  | `#B54736` |
| REVISI SELESAI  | `#E6F0FA`  | `#315F91` |

Status badge gunakan soft background dengan teks yang cukup kontras. Jangan gunakan neon colors.

### **Dark Mode**

| Token            | Dark      |
| ---------------- | --------- |
| Background       | `#071B2B` |
| Surface          | `#0D253A` |
| Surface Elevated | `#14334C` |
| Border           | `#1B3F60` |
| Text Primary     | `#EEEEEE` |
| Text Secondary   | `#B9E4E8` |
| Primary          | `#167D8D` |
| Accent           | `#B9E4E8` |

## **3. Typography**

[Modern Fintech CRM & SaaS Dashboard | UX UI Case Study (11) | Images :: Behance](https://images.openai.com/static-rsc-4/Yha9-mIz50-A9W-_AMMEU7xaZOc-4FC6Uto3FRUwwogGcyUbQUkN9HSNExXi_4G34iSA0QY-x42MmiSQGReKywXtL2yXCzplOwYTgkz2kftLuaNorcJ6yX1P18V0j9pPRc9qH7YgQdNuYAFy-VFy2TiF6XhdL6JzA3sWHMMSPOU?purpose=inline)

[behance.net](https://www.behance.net/gallery/245057705/Modern-Fintech-CRM-SaaS-Dashboard-UX-UI-Case-Study/modules/1415270435?utm_source=chatgpt.com)

Font: Plus Jakarta Sans

| Element       | Size | Weight |
| ------------- | ---- | ------ |
| Page Title    | 24px | 600    |
| Section Title | 16px | 600    |
| Card Title    | 14px | 600    |
| Body          | 14px | 400    |
| Label         | 12px | 500    |
| Metadata      | 12px | 400    |
| Button        | 14px | 500    |

Rules:

- Hindari font terlalu besar untuk dashboard.
- Gunakan line-height yang nyaman dibaca.
- Jangan menggunakan uppercase pada semua heading.
- Uppercase hanya untuk status dan label laporan yang memang mengikuti format kantor.

## **4. Layout System**

[Shadcn Sidebar Layouts Blocks – Shadcnuikit.com](https://images.openai.com/static-rsc-4/i4PIl8N4e--_lhgBtTFELc6sy7D0SiMdk6qOEtSTue51biFafy30Cuk9-HN8trVdDAwoK56cb6DZ8ILys_F3EaXiifuDH-yz6dXitomyB8RoX2c_MlfJ5K1RiVhp51ChXW4Ukuwj6CUAyhbuRwKaSIVwQvob_M04RFC7wW1vDSA?purpose=inline)

[shadcnuikit.com](https://shadcnuikit.com/blocks/dashboard-ui/sidebar-layouts?utm_source=chatgpt.com)

### **Application Layout**

```
┌──────────────────────────────────────────────────────────┐
│ TracerLog                                                │
├──────────────┬───────────────────────────────────────────┤
│              │                                           │
│ Sidebar      │ Main Content                              │
│              │                                           │
│ Dashboard    │ Page Header                               │
│ Kanban Board │                                           │
│ Daily Report │ Page Content                               │
│ Work History │                                           │
│              │                                           │
│ Settings     │                                           │
│              │                                           │
│              │                                           │
│ Profile      │                                           │
└──────────────┴───────────────────────────────────────────┘
```

### **Sidebar**

- Width: 220px.
- Background: Surface.
- Border-right: 1px solid border color.
- Logo text: TracerLog.
- Navigation icons menggunakan Lucide.
- Active navigation menggunakan muted green background.
- Profile section di bagian bawah.
- Sidebar dapat collapse di layar kecil.

### **Main Content**

- Max-width: 1440px.
- Padding desktop: 24px.
- Page header memiliki title, description singkat, dan action button.
- Content menggunakan spacing yang konsisten.

## **5. Dashboard UI**

[Zendo — Task Management Made Simple](https://images.openai.com/static-rsc-4/0Ar-Vl886-0WJ1EJrTHKl6vu6A8z4VdjwHSuJEDsyrV0uZMptjmTh4sI_jpKULEEutTdBLY-zg4lko8Z4--VeyvGurTohp_IvQ8De4iRCBssqOj0PTFnehrHqv8f45d6CoZ_wrNMBZS3VXdihZChbzWitSQaOw86Gxhh0JWPwwQ?purpose=inline)

[myzendo.vercel.app](https://myzendo.vercel.app/?utm_source=chatgpt.com)

Dashboard tidak perlu terlalu banyak widget.

```
┌──────────────────────────────────────────────────────────┐
│ Dashboard                             + Add Work         │
│ Ringkasan pekerjaan hari ini                            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Total Work    Selesai       Progress       Revisi       │
│  12            7             3              2            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Recent Work                            View all →        │
│                                                          │
│ R# 2610240    GIS       REVISI SELESAI                  │
│ R# 2611138    GIS       PROGRESS                        │
│ R# 2611140    ABC       SELESAI                         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Daily Report                                             │
│ Lihat atau generate laporan hari ini                     │
│                                    Open Report →         │
└──────────────────────────────────────────────────────────┘
```

Guidelines:

- Statistik menggunakan angka sederhana.
- Hindari chart pada MVP.
- Recent Work menggunakan compact list.
- Quick action mudah dijangkau.

## **6. Kanban Board UI**

[Quantix UI • Craftwork](https://images.openai.com/static-rsc-4/oOvAklYZfIQoaYEn7LQXG5bt3FVuNZTzcBo75SviAot1bMMbSLtTqqcRnguVoj5q5RzLjZUjKhRdTgaaB0T_ErMHBpmT0vRGnPbm5DpUmSPEFRr6Z1D-uJutbBZ4YGKhfBIO_HuIMeJM6pU3uBuwpA6WXgF9KSVF4_bdDD26Xkw?purpose=inline)

[craftwork.design](https://craftwork.design/product/quantix-ui-modern-admin-analytics-dashboa?utm_source=chatgpt.com)

```
┌───────────────────────────────────────────────────────────────┐
│ Kanban Board                              + Add Work          │
│ Kelola pekerjaan berdasarkan status                           │
├───────────────────────────────────────────────────────────────┤
│ Search R# / Customer                 Filter Date               │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│ PROGRESS        SELESAI         REVISI PROGRESS  REVISI SELESAI│
│ ────────        ───────         ───────────────  ──────────────│
│                                                               │
│ ┌───────────┐   ┌───────────┐   ┌───────────┐  ┌───────────┐ │
│ │ R# 2611138│   │ R# 2610240│   │ R# 2611140│  │ R# 2611100│ │
│ │ GIS       │   │ GIS       │   │ ABC       │  │ XYZ       │ │
│ │           │   │           │   │           │  │           │ │
│ └───────────┘   └───────────┘   └───────────┘  └───────────┘ │
│                                                               │
│ + Add Work       + Add Work      + Add Work      + Add Work   │
└───────────────────────────────────────────────────────────────┘
```

### **Work Card**

[Saga - AI workspace for your notes, docs, and tasks](https://images.openai.com/static-rsc-4/pmuAOByWUSkoz2-df9Gzs0jkj2aPYv_duFK7_HD7mJKAeJWlQJ4epv8mBsESfsqbW-CgIh4tw6KD4bKb46mC-3lhh1his7_iQmP9SN_1b2Xkc6AiqB0M9B-PZzvJVUo9PTJ0E3-Rnak0DoK3ymdGfGMmWHRn00QbN4-fvuYjuSM?purpose=inline)

Card design:

- Background putih.
- Border tipis.
- Radius: 8px.
- Padding: 12px.
- Shadow minimal atau tanpa shadow.
- R# menjadi heading.
- Customer sebagai secondary text.
- Status tidak perlu ditampilkan di dalam card jika sudah berada pada column status yang sama.
- Notes indicator berupa icon kecil.

Hover state:

- Border sedikit lebih jelas.
- Cursor pointer.
- Tidak ada scale animation.

## **7. Work Detail Modal**

[Task dialog box concept by Sergi Arevalo on Dribbble](https://images.openai.com/static-rsc-4/AGrUQQGO7-uuNJx3h6DPPjLSsfJNhKU1XK3tWHrqeJ8093EMps2JCgbxyigBRHOVDOmJ7FLpZXZLBKgPkLJ8KTLDhsfzfTtefy9OemRMYXxyuzHg5xhLg4PCWt2Q6RfdJcCYVTBBzS52ZkW_UGWlKL9gH3ZUCww9lTYUvoYRqvM?purpose=inline)

[dribbble.com](https://dribbble.com/shots/25869901-Task-dialog-box-concept?utm_source=chatgpt.com)

Modal digunakan untuk melihat dan mengedit detail work.

```
┌──────────────────────────────────────────────┐
│ Work Detail                         ×       │
├──────────────────────────────────────────────┤
│ R#                                          │
│ [ 2610240                                ]  │
│                                              │
│ Customer                                    │
│ [ GIS                                    ]  │
│                                              │
│ Status                                      │
│ [ REVISI SELESAI                       ▼ ]  │
│                                              │
│ Work Date                                   │
│ [ 13 November 2026                      ]  │
│                                              │
│ Notes                                       │
│ ┌────────────────────────────────────────┐  │
│ │ Area: 12, 14, 18                       │  │
│ │ SO: perlu dibuat                       │  │
│ └────────────────────────────────────────┘  │
│                                              │
├──────────────────────────────────────────────┤
│ Delete                       Cancel  Save   │
└──────────────────────────────────────────────┘
```

Rules:

- Modal max-width: 520px.
- Notes textarea dapat diperbesar.
- Save button menjadi primary.
- Delete button menggunakan destructive styling.
- Close modal dengan Escape.
- Konfirmasi sebelum delete.

## **8. Daily Report UI**

[Automate Weekly Data Reports With AI | Contextflo Blog](https://images.openai.com/static-rsc-4/VJjpIpWH-vSEIjACKRW_kVMwV6l6oZTwPHwkfTHNrESFgPhnTxNPbskSB8hCfHoEbU6e0NDhVaXrTEan7TD_a0MNcb6g2-XnDdLxzLoDW1iSfVRQJbK17IlGvpMKWny005z1MIiUAEZSoLupb09WhwoIzOZ-RpGcuYQZrSScYMc?purpose=inline)

[contextflo.com](https://contextflo.com/blog/creating-reports-with-ai?utm_source=chatgpt.com)

Daily Report merupakan halaman yang paling penting setelah Kanban Board.

```
┌──────────────────────────────────────────────────────────┐
│ Daily Report                                             │
│ Generate laporan pekerjaan harian                        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ Report Date                                              │
│ [ Jumat, 13 November 2026           ]                    │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Rekap laporan, Jumat 13 - 11 - 2026                  │ │
│ │ Nama : Elfrian T. Setiawan                           │ │
│ │ divisi : digital printing                            │ │
│ │ bagian : designer junior                             │ │
│ │                                                      │ │
│ │ R# 2610240 / GIS / REVISI SELESAI                    │ │
│ │ R# 2611138 / GIS / PROGRESS                          │ │
│ └──────────────────────────────────────────────────────┘ │
│                                                          │
│                         [ Copy Report ]                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Guidelines:

- Preview menggunakan plain text style.
- Font preview: monospace atau sans-serif sederhana.
- Copy Report menjadi primary CTA.
- Feedback copy menggunakan toast.
- Notes tidak pernah ditampilkan di report preview.

## **9. Component Design System**

Reusable components:

```
components/
├── ui/
│   ├── AppButton.vue
│   ├── AppInput.vue
│   ├── AppSelect.vue
│   ├── AppTextarea.vue
│   ├── AppModal.vue
│   ├── AppBadge.vue
│   ├── AppToast.vue
│   ├── AppDropdown.vue
│   ├── AppDatePicker.vue
│   └── AppEmptyState.vue
│
├── work/
│   ├── WorkCard.vue
│   ├── WorkForm.vue
│   ├── WorkDetailModal.vue
│   ├── WorkNotes.vue
│   └── WorkStatusBadge.vue
│
├── kanban/
│   ├── KanbanBoard.vue
│   └── KanbanColumn.vue
│
└── report/
    ├── ReportPreview.vue
    └── ReportGenerator.vue
```

### **Spacing Scale**

| Token | Value |
| ----- | ----- |
| 1     | 4px   |
| 2     | 8px   |
| 3     | 12px  |
| 4     | 16px  |
| 5     | 20px  |
| 6     | 24px  |
| 8     | 32px  |
| 10    | 40px  |

### **Radius**

| Element | Radius |
| ------- | ------ |
| Input   | 6px    |
| Button  | 6px    |
| Card    | 8px    |
| Modal   | 12px   |
| Badge   | 4px    |

### **Interaction**

- Transition: 150ms ease.
- Focus ring: muted green.
- Button hover: slight color shift.
- Modal: subtle fade.
- Toast: short slide/fade.
- Drag-and-drop: subtle highlight.
- Respect `prefers-reduced-motion`.

## **10. Responsive Behavior**

| Breakpoint        | Layout                                               |
| ----------------- | ---------------------------------------------------- |
| Desktop ≥ 1280px  | Full sidebar + 4-column Kanban                       |
| Tablet 768–1279px | Collapsible sidebar + horizontally scrollable Kanban |
| Mobile < 768px    | Compact navigation + Kanban horizontal scroll        |

Mobile priorities:

- Add Work tetap mudah diakses.
- Work detail menggunakan full-screen modal.
- Report preview nyaman dibaca.
- Copy Report button sticky di bagian bawah halaman report.
- Tidak memaksakan empat column Kanban tampil sekaligus.

## **11. UX Rules**

- Semua form harus memiliki label yang jelas.
- Jangan mengandalkan placeholder sebagai label.
- Setiap action harus memberikan feedback.
- Jangan menghapus work tanpa konfirmasi.
- Search harus bekerja berdasarkan R# dan customer.
- Filter tanggal harus konsisten.
- Empty state harus menjelaskan apa yang dapat dilakukan pengguna.
- Jangan membuat dashboard penuh statistik yang tidak dibutuhkan.
- Hindari gradient, glassmorphism, glow, dan excessive shadow.
- Hindari emoji sebagai pengganti icon UI.
- Tidak menggunakan font Inter.
- Jangan menambahkan animasi dekoratif yang tidak mendukung workflow.

## **12. Final Design Acceptance Criteria**

- Visual clean dan konsisten.
- Tidak ada dekorasi berlebihan.
- Dashboard mudah dipahami dalam sekali lihat.
- Kanban nyaman digunakan untuk pekerjaan harian.
- Work card ringkas dan mudah dipindai.
- Work detail mudah diedit.
- Notes terpisah dari laporan.
- Daily Report preview menyerupai output WhatsApp.
- Copy Report mudah ditemukan.
- Light mode dan dark mode konsisten.
- Responsive pada desktop, tablet, dan mobile.
- Semua komponen menggunakan design tokens.
- Tidak ada elemen UI yang hanya bersifat dekoratif tanpa fungsi.

**Kesimpulan design direction:** TracerLog harus terlihat seperti tool kerja profesional yang sederhana, bukan dashboard showcase. Prioritaskan readability, density yang pas, dan kecepatan interaksi.