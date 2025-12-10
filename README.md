# Website Resmi Desa Batumarta 1

![Cuplikan Layar Beranda](https://picsum.photos/seed/readme/1200/600)

Selamat datang di repositori kode untuk website resmi Desa Batumarta 1. Proyek ini adalah platform digital yang dirancang untuk menjadi pusat informasi, galeri, dan berita terkini bagi warga dan masyarakat umum yang tertarik dengan Desa Batumarta 1.

Website ini dibangun dengan teknologi modern, mengedepankan kemudahan pengelolaan konten melalui panel admin yang intuitif.

## ✨ Fitur Utama

### 🌐 Untuk Pengunjung (Frontend)
- **Beranda Dinamis**: Menampilkan _carousel_ gambar slider, tagline, dan berita terbaru.
- **Halaman Berita**: Daftar lengkap semua artikel berita dengan fitur pencarian dan paginasi.
- **Detail Berita**: Tampilan artikel yang bersih dan mudah dibaca.
- **Galeri Foto**: Galeri responsif untuk menampilkan momen dan kegiatan desa.
- **Profil Desa**: Informasi lengkap mengenai sejarah, visi, misi, dan struktur perangkat desa.
- **Desain Responsif**: Tampilan optimal di berbagai perangkat, dari desktop hingga mobile.

### 🔒 Untuk Administrator (Backend)
- **Login Aman**: Halaman login khusus untuk administrator.
- **Dashboard Ringkasan**: Menampilkan statistik konten seperti jumlah berita dan foto.
- **Manajemen Berita (CRUD)**: Tambah, lihat, edit, dan hapus artikel berita dengan mudah.
- **Manajemen Galeri (CRUD)**: Tambah dan hapus foto. Foto juga dapat ditandai untuk tampil di _carousel_ halaman utama.
- **Kustomisasi Tampilan**: Mengubah gambar header, tagline, dan skema warna website secara langsung.
- **Pengaturan Kontak**: Mengelola informasi kontak (alamat, email, telepon) yang ditampilkan di footer.

## 🚀 Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (dengan App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore & Authentication)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Management**: React Hook Form & Zod
- **Deployment**: Dikonfigurasi untuk [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 🛠️ Menjalankan Proyek Secara Lokal

Untuk menjalankan proyek ini di lingkungan pengembangan lokal Anda, ikuti langkah-langkah berikut:

**Prasyarat:**
- Node.js (v18 atau lebih baru)
- npm atau yarn

1.  **Clone Repositori**
    ```bash
    git clone [URL_REPOSITORI_ANDA]
    cd [NAMA_FOLDER_PROYEK]
    ```

2.  **Install Dependensi**
    ```bash
    npm install
    ```

3.  **Konfigurasi Firebase**
    Pastikan file `src/firebase/config.ts` berisi konfigurasi Firebase proyek Anda.

4.  **Jalankan Server Pengembangan**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:9002](http://localhost:9002) di browser Anda untuk melihat hasilnya.

---

Dibuat dengan ❤️ untuk kemajuan digital Desa Batumarta 1.
