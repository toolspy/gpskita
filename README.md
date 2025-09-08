# PureLanding - Next.js 15 + Tailwind CSS 4 Blog & Landing Page

Sebuah website landing page dan blog yang dibangun dengan Next.js 15, Tailwind CSS 4, dan Shadcn UI. Project ini menggunakan App Router dan mendukung MDX untuk konten blog.

## 🚀 Fitur

### Halaman Statis
- **Landing Page** (`/`) - Hero section dengan daftar artikel terbaru
- **About** (`/about`) - Deskripsi singkat tentang perusahaan
- **Contact** (`/contact`) - Form kontak sederhana

### Blog System
- **Blog Listing** (`/blog`) - Daftar semua artikel dengan filter dan pencarian
- **Blog Detail** (`/blog/[slug]`) - Halaman detail artikel dengan MDX rendering
- **Konten MDX** - Menggunakan frontmatter untuk metadata (title, date, author, tags)

### SEO & Struktur Data
- **Meta Tags** - Menggunakan next-seo untuk optimasi SEO
- **Sitemap** - Otomatis generated dengan next-sitemap
- **RSS Feed** - Feed RSS sederhana di `/rss.xml`
- **Open Graph** - Meta tags untuk social media sharing

## 🛠️ Tech Stack

- **Next.js 15** - React framework dengan App Router
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - Komponen UI yang dapat dikustomisasi
- **MDX** - Markdown dengan JSX untuk konten blog
- **TypeScript** - Type safety
- **next-seo** - SEO optimization
- **next-sitemap** - Sitemap generation
- **gray-matter** - Frontmatter parsing

## 📁 Struktur Project

```
├── app/
│   ├── page.tsx                 # Landing page
│   ├── about/page.tsx           # Halaman about
│   ├── contact/page.tsx         # Halaman contact
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Blog detail
│   ├── rss.xml/route.ts        # RSS feed
│   └── layout.tsx              # Root layout
├── components/
│   ├── section.tsx             # Komponen Section wrapper
│   ├── card-post.tsx           # Card untuk artikel blog
│   ├── seo.tsx                 # Komponen SEO
│   ├── ui/                     # Shadcn UI components
│   └── ...                     # Komponen UI lainnya
├── content/
│   └── blog/                   # File MDX artikel
├── lib/
│   ├── posts.ts               # Logic untuk handling blog posts
│   ├── mdx.ts                 # MDX configuration
│   └── utils.ts               # Utility functions
└── next-sitemap.config.js     # Konfigurasi sitemap
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. Clone repository
```bash
git clone <repository-url>
cd alatlacak
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) di browser

### Build untuk Production

```bash
npm run build
npm start
```

## 📝 Menambah Artikel Blog

1. Buat file baru di `content/blog/` dengan ekstensi `.mdx`
2. Tambahkan frontmatter di awal file:

```mdx
---
title: "Judul Artikel"
date: "2024-01-15"
author: "Nama Penulis"
tags: ["tag1", "tag2"]
excerpt: "Deskripsi singkat artikel"
---

# Konten Artikel

Isi artikel dalam format Markdown...
```

3. File akan otomatis muncul di halaman blog

## 🎨 Kustomisasi

### Komponen UI
Project menggunakan Shadcn UI yang dapat dikustomisasi melalui:
- `components/ui/` - Komponen dasar
- `app/globals.css` - Styling global dan CSS variables

### Styling
- Menggunakan Tailwind CSS 4 dengan custom CSS variables
- Dark mode support dengan next-themes
- Responsive design dengan mobile-first approach

### SEO
- Edit `components/seo.tsx` untuk kustomisasi meta tags
- Update `next-sitemap.config.js` untuk konfigurasi sitemap
- RSS feed dapat dikustomisasi di `app/rss.xml/route.ts`

## 📱 Responsive Design

Website fully responsive dengan breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🌙 Dark Mode

Mendukung dark mode dengan toggle di navbar menggunakan next-themes.

## 🔍 SEO Features

- Meta tags otomatis untuk setiap halaman
- Open Graph tags untuk social media
- Structured data untuk blog posts
- Sitemap XML otomatis generated
- RSS feed untuk blog updates

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 🤝 Contributing

1. Fork project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository atau hubungi tim development.