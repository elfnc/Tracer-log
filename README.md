# TracerLog

> **Personal Worklog & WhatsApp Daily Report Generator for Design Tracers**
>
> Modern, minimal, and local-first productivity tool to manage daily graphic design / tracing jobs and generate one-click copyable WhatsApp daily reports matching company standards.

---

## 📌 Project Overview

**TracerLog** adalah aplikasi web personal yang dirancang khusus untuk mempermudah **Design Tracer** dalam mencatat, mengelola, dan memantau pekerjaan harian (berdasarkan nomor R# dan nama pelanggan), serta menghasilkan rekap laporan kerja harian secara otomatis dengan format yang langsung siap ditempel (*paste*) ke WhatsApp grup kantor.

Aplikasi ini beroperasi dengan filosofi **Local-First** — tanpa backend, tanpa login akun, dan tanpa server database terpusat. Seluruh data tersimpan aman dan privat di dalam peramban (*browser*) komputer masing-masing.

---

## ✨ Fitur Utama

### 1. 📊 Dashboard
* **Ringkasan Aktivitas**: Statistik reaktif pekerjaan hari ini (*Total Hari Ini*, *Selesai*, *Dalam Proses*, *Revisi*).
* **Pekerjaan Terbaru**: Daftar pekerjaan yang baru saja dicatat dengan indikator catatan internal dan badge status.
* **Aksi Cepat**: Tombol `+ Tambah Pekerjaan` dan jalan pintas menuju halaman Laporan Harian.
* **Tanggal Lokal**: Penunjuk hari dan tanggal lokal Indonesia real-time.

### 2. 📋 Kanban Board
* **4 Kolom Status Standar**:
  * `PROGRESS`
  * `SELESAI`
  * `REVISI PROGRESS`
  * `REVISI SELESAI`
* **Drag and Drop Interaktif**: Geser kartu pekerjaan antar kolom untuk memperbarui status secara otomatis ke IndexedDB.
* **Pencarian & Filter Cepat**: Cari instan berdasarkan nomor R# atau nama customer, serta filter tanggal (*Hari Ini*, *Semua Tanggal*, atau tanggal kustom).
* **Quick Add Per Kolom**: Tambah pekerjaan baru langsung dengan status kolom terpilih.

### 3. 🔒 Catatan Internal (Work Notes)
* Setiap pekerjaan memiliki kolom catatan internal (misal: nomor area SO, instruksi cetak, spesifikasi teknis).
* **Kerahasiaan Terjamin**: Catatan internal **100% tidak pernah disertakan** ke dalam format rekap WhatsApp.
* Dilengkapi ikon indikator pada kartu pekerjaan jika terdapat catatan internal.

### 4. 📝 Daily Report Generator
* **Format Standar Kantor**: Menghasilkan format teks persis seperti template resmi perusahaan:
  ```text
  Rekap laporan, Jumat 13 - 11 - 2026
  Nama : Elfrian T. Setiawan
  divisi : digital printing
  bagian : designer junior

  R# 2610240 / GIS / REVISI SELESAI
  R# 2611138 / GIS / PROGRESS
  ```
* **1-Klik Salin Laporan**: Tombol `Salin Laporan` menyalin teks plain text langsung ke clipboard dengan notifikasi toast.
* **Penyimpanan Riwayat Laporan**: Fitur `Simpan Laporan` untuk mengarsipkan rekap harian ke dalam riwayat.
* **Pencegahan Human Error**: Tanggal dalam Bahasa Indonesia otomatis, status selalu uppercase, dan urutan kronologis berdasarkan waktu input.

### 5. 🗄️ Work History
* Arsip komprehensif seluruh riwayat pekerjaan yang pernah dicatat.
* Filter status, pencarian ganda (R# & customer), dan filter rentang waktu (*Hari Ini*, *7 Hari Terakhir*, *Bulan Ini*, atau *Pilih Tanggal*).
* Klik baris pekerjaan untuk membuka modal detail, mengedit, atau menghapus data.

### 6. ⚙️ Settings & Profil Karyawan
* Atur data diri: **Nama Lengkap**, **Divisi**, dan **Bagian / Posisi**.
* **Live Preview**: Pratinjau langsung 4 baris header WhatsApp yang berubah real-time saat data diedit.
* Perubahan profil di Settings otomatis terhubung ke generator laporan harian.

### 7. 🎨 Sistem Desain & Collapsible Sidebar
* **Palet Warna**: Mengadopsi palet modern [Colorhunt](https://colorhunt.co/palette/071b2b167d8db9e4e8eeeeee):
  * Dark Navy: `#071B2B`
  * Deep Teal (Primary): `#167D8D`
  * Ice Cyan (Accent): `#B9E4E8`
  * Soft Grey (Light Base): `#EEEEEE`
* **Mode Terang & Gelap**: Switch tema yang konsisten dan nyaman di mata.
* **Collapsible Sidebar**: Sidebar fleksibel dengan 2 mode (tampilan penuh dan mode ciut/icon-only) yang tersimpan di `localStorage`.

---

## 🛡️ Arsitektur Local-First & Privasi

TracerLog dibangun dengan prinsip **Local-First**:
* Menggunakan **IndexedDB** melalui pustaka **Dexie.js**.
* **Keamanan Privasi**: Tidak ada data yang dikirim ke server cloud pihak ketiga.
* **Multi-Pengguna Tanpa Server**: Jika di-deploy ke Vercel atau Netlify, Anda dan rekan kantor dapat membuka link yang sama secara independen. Data profil dan pekerjaan tiap orang tersimpan di browser komputernya masing-masing dan **tidak akan pernah tercampur**.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
| :--- | :--- |
| **Framework** | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Typography** | Plus Jakarta Sans (`@fontsource-variable/plus-jakarta-sans`) |
| **Database** | IndexedDB via [Dexie.js](https://dexie.org/) |
| **State Management** | [Pinia](https://pinia.vuejs.org/) |
| **Date Handling** | [date-fns](https://date-fns.org/) (dengan locale `id`) |
| **Icons** | [Lucide Vue](https://lucide.dev/) |

---

## 🚀 Instalasi & Menjalankan Proyek

### Prasyarat
* [Node.js](https://nodejs.org/) versi 20+ (direkomendasikan v24 LTS)
* Package manager: `pnpm` (atau `npm` / `yarn`)

### Langkah Menjalankan:
```bash
# 1. Masuk ke direktori aplikasi
cd TracerLog/TracerLog

# 2. Pasang dependensi
pnpm install

# 3. Jalankan server pengembangan lokal
pnpm dev

# 4. Buka di browser
# http://localhost:5173
```

### Build untuk Produksi:
```bash
pnpm build
```
File hasil kompilasi siap di-deploy akan berada di direktori `dist/`.

---

## 📖 Alur Kerja Harian (Workflow)

1. **Awal Penggunaan**: Buka menu **Settings**, sesuaikan nama Anda, divisi, dan bagian.
2. **Pagi / Siang**: Catat pekerjaan saat order masuk dengan mengklik **Tambah Pekerjaan** (masukkan nomor R#, nama customer, status, dan catatan internal nomor area jika ada).
3. **Selama Pengerjaan**: Geser kartu di **Kanban Board** sesuai progres pengerjaan (misal dari `PROGRESS` ke `SELESAI` atau `REVISI SELESAI`).
4. **Sore / Akhir Shift**: 
   * Buka menu **Daily Report**.
   * Periksa pratinjau rekap WhatsApp.
   * Klik tombol **Salin Laporan**.
   * Buka grup WhatsApp kantor dan tinggal **Ctrl + V (Paste)** & Kirim!

---

## 📄 Lisensi & Pembuat

Dibuat untuk kebutuhan operasional harian Design Tracer.
Dikembangkan secara lokal, cepat, dan efisien.
