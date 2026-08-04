# Workflow Section — Image Generation Prompts

Product: NestJS Modular Monolith Starter Kit
Brand color: #d91f3d (NestJS crimson red)
Background: container `bg-code`, selalu dark (#0b0a0b)
Aspect ratio: 16:9
Output format: WebP, 1920×1080
Style: Flat vector illustration, bersih, profesional
Generator: Gemini (recommended) & ChatGPT/DALL-E 3
Catatan: Gambar-gambar ini juga dipakai di `/free` page sebagai hero image.

---

## Ilustrasi 1 — Day 1: Users are real

A clean flat vector illustration on a dark background (#0b0a0b). A stylized geometric user avatar silhouette at the center. Surrounding the avatar are four floating icons — a fingerprint, a key, an envelope, and a shield — connected to the center by thin glowing lines. Select lines and panel borders are crimson red (#d91f3d). All elements glow with a warm amber-white light, indicating an active operational state. No text, no realistic human faces, no UI screenshots. Flat shading. 16:9 wide

---

## Ilustrasi 2 — Day 2: Ship to prod

A clean flat vector illustration on a dark background (#0b0a0b). A left-to-right horizontal pipeline of five interconnected stages: a cube (code repository), a gear (CI), a container box (Docker), a heartbeat pulse line (health monitoring), and a cloud shape (deployment). Flowing arrow lines connect the stages, accented in crimson red (#d91f3d). Every stage has a small green dot indicating active operational status. No text, no UI screenshots, no people. Flat shading. 16:9 wide format.

---

## Alt Text (sudah diterapkan di `workflow-section.tsx`)

- Ilustrasi 1: "Illustration of an active user identity system — avatar connected to fingerprint, key, envelope, and shield icons representing authentication readiness"
- Ilustrasi 2: "Illustration of a production deployment pipeline — code repository, CI, Docker, health monitoring, and cloud deployment all showing active green status"

---

## Generasi & Penempatan

1. Jalankan prompt di Gemini (recommended) dan ChatGPT/DALL-E 3 sebagai cadangan.
2. Pilih hasil terbaik untuk masing-masing ilustrasi.
3. Konversi ke WebP (quality ~85%), rename ke `images-4.webp` dan `images-5.webp`.
4. Tempatkan di `/public/images/`, timpa file existing.
