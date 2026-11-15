# **PLAN.md — TracerLog**



MVP · Week 1

Personal Use

Local-first



[Axino | SaaS & Tech Startup HTML Template | Home Page 01](https://images.openai.com/static-rsc-4/s7My8uIpaMmMpeSLt4wTxEa8vdzc4xNtCA8LGgJXShYmfHyBuyM8DVLLVghxFajU0XdM_3XUittR4xSs01yQUiZ9ttknLAnwtvc5GcFHtHfVVhuBMPja1V9NDkgmOIJeO96JT2isNEjIMm4SaJb8yk5KgVXe4ndUP1GdH4iENf0?purpose=inline)

[html.kodesolution.com](https://html.kodesolution.com/2025/axino-html/?utm_source=chatgpt.com)

## **1. Project Overview**

TracerLog adalah aplikasi web personal untuk membantu Design Tracer mencatat, mengelola, dan memantau pekerjaan harian, serta menghasilkan rekap laporan kerja secara otomatis dengan format yang siap disalin ke WhatsApp grup kantor.

Aplikasi berfokus pada efisiensi pencatatan pekerjaan dan penyederhanaan proses pelaporan harian.

### **Goals**

- Mempermudah pencatatan pekerjaan berdasarkan R# dan customer.
- Mengelola pekerjaan menggunakan Kanban Board.
- Menyediakan catatan internal pada setiap work.
- Menghasilkan laporan harian sesuai format perusahaan.
- Menyimpan riwayat laporan.
- Mengurangi pekerjaan administratif yang berulang.

### **Non-Goals**

MVP tidak ditujukan untuk:

- Sistem manajemen perusahaan.
- Multi-user atau team collaboration.
- Integrasi WhatsApp API.
- Approval atau workflow antar-divisi.
- Cloud synchronization.
- Employee monitoring.

## **2. Tech Stack**

| Layer            | Teknologi       |
| ---------------- | --------------- |
| Framework        | Vue 3           |
| Build Tool       | Vite            |
| Language         | TypeScript      |
| Styling          | Tailwind CSS    |
| State Management | Pinia           |
| Database         | IndexedDB       |
| Database Wrapper | Dexie.js        |
| Icons            | Lucide          |
| Date Handling    | date-fns        |
| Deployment       | PWA / Local Web |

Pendekatan: frontend-only, local-first. Tidak membutuhkan backend, database server, maupun authentication pada MVP.

## **3. Application Modules**

### **3.1 Dashboard**

[Bakos Gergő – Portfólió | gbakos.hu](https://images.openai.com/static-rsc-4/HVAyZ-RcozDn1_rd0u6zcCuU0hT2jGuSFNoSEMcOyZSU2gy-RV5b4_Etp548XsAbnVVLQ8ryDXx0u7eFEH_KpQbl0Byij_M-ZEgASX3YgAld4ATYQjBJLgHFodRAsRliaW4yVQ47YHvvNePN0tV-b18Cc63lwr2PNFuN19qjpwY?purpose=inline)

[gbakos.hu](https://gbakos.hu/hu?utm_source=chatgpt.com)

Dashboard menampilkan ringkasan aktivitas kerja harian.

Features:

- Total work hari ini.
- Total pekerjaan berstatus SELESAI.
- Total pekerjaan berstatus PROGRESS.
- Total pekerjaan revisi.
- Recent work.
- Quick action untuk menambahkan work.
- Shortcut menuju Daily Report.

### **3.2 Work Management**

Fitur utama untuk mengelola pekerjaan.

Setiap work memiliki informasi:

| Field      | Description               |
| ---------- | ------------------------- |
| R#         | Nomor pekerjaan           |
| Customer   | Nama customer             |
| Status     | Status pengerjaan         |
| Notes      | Catatan internal          |
| Work Date  | Tanggal pekerjaan         |
| Created At | Waktu work dibuat         |
| Updated At | Waktu terakhir diperbarui |

#### **Work Status**

PROGRESS

In Progress

SELESAI

Completed

REVISI PROGRESS

Revision in Progress

REVISI SELESAI

Revision Completed

Status mengikuti terminologi yang digunakan di tempat kerja.

#### **Work Notes**

Setiap work memiliki catatan internal yang dapat diisi secara bebas.

Contoh:

- Nomor area untuk pembuatan SO.
- Detail kebutuhan desain.
- Informasi revisi.
- Catatan teknis.
- Informasi tambahan pekerjaan.

Rules:

- Notes dapat diedit kapan saja.
- Notes tersimpan secara lokal.
- Notes tidak ditampilkan dalam Daily Report.
- Notes tidak ikut proses Copy Report.
- Notes hanya tersedia pada detail work.

### **3.3 Kanban Board**

[FlowDeck Kanban Board (Scrollable Lanes + Drag & Drop)](https://images.openai.com/static-rsc-4/_E1v3-hYrzdkiRVnZ0KXPvdvQz_OO8nXYocjrS6Pt4_Hp5rKAV7OFfqbqM6GA9jbFYALe3D3eLBEM7MelmEieLO3a_KaHLnefryC5UYwKRrwG-PG3XGsqYiblCK-8e6At43clx4taNoJGKukYxs7ohLdKQpHm5SW2XfUwn6P75s?purpose=inline)

[codepen.io](https://codepen.io/ash1198/pen/myEeqKL?utm_source=chatgpt.com)

Kanban Board menjadi visualisasi utama pengelolaan pekerjaan.

Columns:

- PROGRESS
- SELESAI
- REVISI PROGRESS
- REVISI SELESAI

Features:

- Work card berdasarkan status.
- Drag and drop antar-column.
- Update status otomatis ketika work dipindahkan.
- Click card untuk membuka detail work.
- Edit dan delete work.
- Filter berdasarkan tanggal.
- Search berdasarkan R# atau customer.

Work card menampilkan:

- R#
- Nama customer
- Tanggal pekerjaan
- Indicator notes jika tersedia

Catatan tidak ditampilkan langsung di card agar tampilan tetap ringkas.

### **3.4 Daily Report Generator**

[Word counter - complete guide | MORELESS.TOOLS](https://images.openai.com/static-rsc-4/B8gPwfbA9Lna9v3gkw8PFYMj22ZnCU2jpVIx15lhU7pCFHjfDVdqu4J1iZoJWcymsu4tWBnfADD-rCJZe4Ayarn_SA8XrsZdcbdK_WNgVu5EJL2nEnFUai12y7Xz_XDYFJCzpwjVLXQkMg5_AWPCdlqfbyD8AIlBehct7KTNQOg?purpose=inline)

[moreless.tools](https://moreless.tools/en/docs/tools/word-counter/?utm_source=chatgpt.com)

Fitur untuk menghasilkan laporan harian sesuai format perusahaan.

#### **Report Template**

Format laporan:

```
Rekap laporan, Jumat 13 - 11 - 2026
Nama : Elfrian T. Setiawan
divisi : digital printing
bagian : designer junior

R# 2610240 / GIS / REVISI SELESAI
R# 2611138 / GIS / PROGRESS
```

#### **Features**

- Pilih tanggal laporan.
- Generate report berdasarkan work pada tanggal tersebut.
- Preview hasil laporan.
- Copy report ke clipboard.
- Edit data work sebelum generate.
- Simpan laporan harian.
- Generate ulang laporan dari data work.
- Empty state jika tidak ada work pada tanggal yang dipilih.

#### **Report Generation Rules**

1. Laporan hanya mengambil work berdasarkan tanggal yang dipilih.
2. Format tanggal menggunakan nama hari dalam Bahasa Indonesia.
3. Work diurutkan berdasarkan waktu input.
4. Status ditampilkan menggunakan uppercase.
5. Notes tidak pernah dimasukkan ke report.
6. Copy Report menghasilkan plain text.
7. Report tidak mengandung metadata internal aplikasi.

### **3.5 Work History**

Features:

- Riwayat pekerjaan berdasarkan tanggal.
- Riwayat laporan harian.
- Search R#.
- Search customer.
- Filter berdasarkan status.
- Filter berdasarkan tanggal.
- Buka kembali detail work.
- Edit work dari riwayat.

### **3.6 Personal Profile**

Informasi identitas yang digunakan dalam laporan.

Default profile:

```
Nama    : Elfrian T. Setiawan
Divisi  : digital printing
Bagian  : designer junior
```

Features:

- Edit nama.
- Edit divisi.
- Edit bagian.
- Simpan profile secara lokal.
- Perubahan profile digunakan untuk report berikutnya.

## **4. UI / UX Direction**

[Task Management Web App UI — Kanban Board, Timeline, Calendar by Vislume Studio on Dribbble](https://images.openai.com/static-rsc-4/WvyXugV2_Gznmvecbij_zes3-h4FJbcn677mpmqWU7JhgTzYObUo7OpACGTxAJtWpp3MwIPWpdElsUQeoWFLfLXrWNtVWoy9AAlT5WgoAbmSl6imF2sVzbT3JNQ7aQV74h2mQQb79oV4i0zVnxpAhiL8P17y9Axvp4UfvclafaE?purpose=inline)

[Getting Started | Bika.ai](https://images.openai.com/static-rsc-4/UGRgZ0abNCJOz6GNgQ59OkFUdCGr1UG3qFRsdxd0KXioBwVnKopB83yDtwWF4qxWXSpVpWyrwmRx0U6NminIc1q5HvJLQk-sC5tWhauxSWnQepf8VC3NduOhKVisUOdnunzRDPlAFGhV8lkEX0WYq-EMJhN5t5cKaxaADQJitTY?purpose=inline)

[Dashboard design for a BOM Product(SaaS) by Oge UI/UX Designer on Dribbble](https://images.openai.com/static-rsc-4/4voyuNUbXcr9DaxjRpBc9BMzmNlcZsN3Xf0k1hb-c1d-xivvDctWRF_X1814QecWgHRe-8QOTQAxo_7mFObYnlTFQYq1SRai7VJnI7k2QlCnxMWKTa6pnT9Yk_AewABFruHaMU9-TpM9GTsrbr_hDcpkEpiPfbycNiy2LBPtV_I?purpose=inline)

8

Design direction:

- Clean productivity dashboard.
- Dark mode sebagai default.
- Green accent.
- Minimal visual clutter.
- Compact work cards.
- Sidebar navigation.
- Responsive desktop-first layout.
- Lucide icons.
- Typography: Plus Jakarta Sans.
- Tidak menggunakan gradient berlebihan.

### **Navigation**

```
TracerLog
│
├── Dashboard
├── Kanban Board
├── Daily Report
├── Work History
└── Settings
```

## **5. Data Model**

### **Work**

```
type WorkStatus =
  | "PROGRESS"
  | "SELESAI"
  | "REVISI PROGRESS"
  | "REVISI SELESAI";

interface Work {
  id: string;
  rNumber: string;
  customer: string;
  status: WorkStatus;
  notes: string;
  workDate: string;
  createdAt: string;
  updatedAt: string;
}
```

### **Profile**

```
interface Profile {
  id: string;
  name: string;
  division: string;
  position: string;
}
```

### **DailyReport**

```
interface DailyReport {
  id: string;
  reportDate: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
```

DailyReport menyimpan hasil laporan yang sudah di-generate. Work tetap menjadi sumber data utama.

## **6. Project Scope**

MVP — Must Have

- Dashboard.
- Work CRUD.
- Kanban Board.
- Drag and drop.
- Work notes.
- Daily Report Generator.
- Copy Report.
- Work History.
- Personal Profile.
- IndexedDB persistence.
- Responsive UI.
- Dark mode.

Future Development

- Pomodoro timer.
- Windows tray application.
- Desktop notification.
- Export laporan ke TXT.
- Export CSV.
- Statistik produktivitas.
- PWA offline support.
- Backup dan restore JSON.
- Custom report template.

Out of Scope

- Backend API.
- Multi-user.
- WhatsApp API.
- Company dashboard.
- Employee management.
- Role-based access control.

## **7. Development Timeline**

1. **Day 1 — Foundation**

   Setup Vue 3, Vite, Tailwind, Pinia, Dexie, layout, navigation.
2. **Day 2 — Work Management**

   Work CRUD, work notes, form, detail modal, IndexedDB persistence.
3. **Day 3 — Kanban Board**

   Four columns, drag and drop, status management, search and filtering.
4. **Day 4 — Daily Report**

   Report template, preview, date selection, clipboard, report history.
5. **Day 5 — Dashboard & Profile**

   Dashboard summary, profile settings, UI refinement.
6. **Day 6 — Testing**

   CRUD tests, report validation, notes exclusion, persistence testing.
7. **Day 7 — Finalization**

   README, screenshots, GitHub release, retrospective.

## **8. Definition of Done**

TracerLog MVP dianggap selesai jika:

- Work bisa ditambahkan, diedit, dan dihapus.
- R# dan customer tersimpan dengan benar.
- Work dapat dipindahkan antar status Kanban.
- Notes dapat disimpan dan diedit.
- Notes tidak ikut laporan WhatsApp.
- Report menghasilkan format yang sesuai.
- Report bisa dicopy dengan satu klik.
- Riwayat work tersimpan setelah browser ditutup.
- Profile dapat diedit.
- Tidak ada fitur inti yang membutuhkan backend.
- Aplikasi bisa digunakan untuk pekerjaan harian secara nyata.