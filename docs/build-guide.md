# Personal Portfolio Website — Step-by-Step Build Guide

> **Archived: original build playbook.** Bu doküman, projeyi sıfırdan inşa ederken kullanılan orijinal yol haritasıdır. Kod tabanı bu rehber yazıldıktan sonra gelişmiş olabilir; güncel kurulum, mimari ve dağıtım notları için [../README.md](../README.md) dosyasına bakın.

---

> **Project Summary:** Modern, responsive ve performans odaklı bir kişisel portfolyo şablonu. Üç sayfadan oluşur (`index.html`, `projects.html`, `contact.html`); hero/hakkımda/öne çıkan projeler, proje listesi ve iletişim formu içerir. Tamamen istemci tarafında çalışır; backend, build aracı veya çerçeve bağımlılığı yoktur. SEO (Open Graph, Twitter Card, JSON-LD, `sitemap.xml`, `robots.txt`) ve erişilebilirlik (skip link, ARIA, semantik HTML, görünür focus, klavye navigasyonu) ilk sınıf vatandaştır. İletişim formu `mailto` fallback ile çalışır, opsiyonel olarak Formspree veya EmailJS'e bağlanabilir.

Each step below is a self-contained prompt. Execute them in order.

Stack: HTML5, CSS3 (Custom Properties, Grid, Flexbox), Vanilla JavaScript (ES6+), no build tooling.

---

## Table of Contents

**PHASE 1 — Foundation**

- STEP 1 — Project Scaffolding & File Structure
- STEP 2 — CSS Reset, Design Tokens & Base Styles

**PHASE 2 — Shared Layout**

- STEP 3 — Header & Responsive Navigation
- STEP 4 — Footer & Global Section Primitives

**PHASE 3 — Pages**

- STEP 5 — Home Page (`index.html`)
- STEP 6 — Projects Page (`projects.html`)
- STEP 7 — Contact Page (`contact.html`)

**PHASE 4 — Interactivity**

- STEP 8 — Navigation Toggle & Active Link
- STEP 9 — Smooth Scroll & Skip-Link Focus (a11y)
- STEP 10 — Contact Form Handling & Validation
- STEP 11 — Scroll Animations & Scroll-to-Top

**PHASE 5 — SEO, A11y & Deploy**

- STEP 12 — SEO Metadata & Structured Data
- STEP 13 — `sitemap.xml` & `robots.txt`
- STEP 14 — Accessibility & Performance Pass
- STEP 15 — Deployment (GitHub Pages / Netlify / Vercel)

**Appendices**

- Appendix A — Design Tokens (CSS Variables)
- Appendix B — Responsive Breakpoints
- Appendix C — Common Pitfalls
- Appendix D — Pre-flight Checklist

---

## Global Build Rules (apply to EVERY step)

- **No git operations.** `git` komutları çalıştırma; versiyon kontrolü kullanıcı tarafından elle yönetilir.
- Onaylanmamış paket ekleme; mümkün olduğunca native tarayıcı API'lerini kullan.
- İstenmedikçe uzun süreli süreçler (watcher, server) başlatma.
- Her adım kendi içinde bağımsızdır; bir adımı uygularken sadece o adımın dosyalarına dokun.
- Kod temiz, okunabilir; değişken/fonksiyon isimleri İngilizce ve camelCase olmalı.
- Güvenlik, erişilebilirlik ve performans her adımda gözetilir; DRY ilkesine uy.

---

## Architecture at a Glance

Statik bir site olduğu için "mimari" tarayıcıda yüklenen varlıkların ilişkisidir. Sunucu tarafı mantık yoktur; iletişim formu harici servislere (opsiyonel) veya kullanıcının e-posta istemcisine yönlenir.

```mermaid
flowchart LR
    User([Visitor]) -->|HTTP| Host[Static Host\nGitHub Pages / Netlify / Vercel]
    Host --> HTML[index.html / projects.html / contact.html]
    HTML --> CSS[styles.css]
    HTML --> JS[script.js]
    JS -->|optional| Formspree[(Formspree API)]
    JS -->|optional| EmailJS[(EmailJS)]
    JS -->|fallback| Mail[mailto: client]
    HTML --> SEO[sitemap.xml / robots.txt / JSON-LD]
    Crawler([Search Engine]) --> SEO
```

Tüm sayfalar aynı `styles.css` ve `script.js` dosyalarını paylaşır. `script.js` her sayfada güvenli çalışacak şekilde defansif yazılır (elementler `null` olabilir).

---

# PHASE 1 — FOUNDATION

---

## STEP 1 — Project Scaffolding & File Structure

**Goal:** Bağımlılıksız, doğrudan tarayıcıda açılabilen statik proje iskeletini kur.

**Files/folders to create:**

```
.
├── index.html
├── projects.html
├── contact.html
├── styles.css
├── script.js
├── sitemap.xml
├── robots.txt
├── .gitignore
└── assets/            # profil görseli, proje görselleri, cv.pdf, favicon
```

**Implementation notes:**

- Build aracı veya `package.json` yok; site dosyaları tarayıcıya olduğu gibi servis edilir.
- Geliştirme için statik bir sunucu yeterlidir: `python -m http.server 8000` veya VS Code Live Server.
- `assets/` klasörü görseller, CV ve favicon için ayrılır; şablon, görsel yoksa CSS placeholder kullanır.

**Acceptance:** `index.html` tarayıcıda boş da olsa hatasız açılıyor; konsol temiz.

---

## STEP 2 — CSS Reset, Design Tokens & Base Styles

**Goal:** Tutarlı bir tasarım temeli için reset, CSS değişkenleri ve tipografi tanımla.

**Files to edit:** `styles.css`

**Implementation notes:**

- Evrensel reset: `* { margin:0; padding:0; box-sizing:border-box; }`.
- Tüm renk, gölge ve geçişleri `:root` altında CSS custom properties olarak tanımla (bkz. Appendix A). Markaya göre tek noktadan özelleştirme sağlar (DRY).
- `html { scroll-behavior: smooth; }` ve sistem font yığını ile hızlı, FOUT'suz tipografi.
- `.container` ile maksimum genişlik (1200px) ve yatay padding standardize edilir.

**Acceptance:** Renkler/spacing değişkenlerden geliyor; sabit (hard-coded) renk tekrarı yok.

---

# PHASE 2 — SHARED LAYOUT

---

## STEP 3 — Header & Responsive Navigation

**Goal:** Üç sayfada paylaşılan sticky header ve mobil hamburger menüyü oluştur.

**Files to edit:** her HTML dosyasının `<header>` bloğu, `styles.css`

**Implementation notes:**

- `.header` sticky + `z-index` ile içerik üstünde kalır.
- `.nav-menu` masaüstünde flex; `max-width: 768px` altında off-canvas panel olur, `.nav-toggle` görünür hale gelir.
- `.nav-toggle` üç `<span>` çizgisi `.active` durumunda X'e dönüşür.
- Aktif sayfa linkine `class="active"` ver (alt çizgi göstergesi `::after` ile).

**A11y:** `.nav-toggle` `aria-label="Toggle navigation"` taşır; tüm linkler görünür `:focus` outline'a sahiptir.

**Acceptance:** Menü 768px altında hamburger'e dönüşüyor; klavye ile gezilebiliyor.

---

## STEP 4 — Footer & Global Section Primitives

**Goal:** Ortak footer ve yeniden kullanılabilir bölüm/başlık/buton sınıflarını tanımla.

**Files to edit:** her HTML `<footer>`, `styles.css`

**Implementation notes:**

- `.footer` koyu zemin + sosyal linkler; `.footer-content` flex ve mobilde dikey yığılır.
- Yeniden kullanılabilir primitive'ler: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.section-title`, `.page-title`, `.page-subtitle`.
- Butonlarda `:hover` ve `:focus` durumları zorunlu (a11y + UX).

**Acceptance:** Buton ve başlık stilleri tek tanımdan tüm sayfalarda tutarlı.

---

# PHASE 3 — PAGES

---

## STEP 5 — Home Page (`index.html`)

**Goal:** Hero, Hakkımda ve Öne Çıkan Projeler bölümlerini kur.

**Files to edit:** `index.html`, `styles.css`

**Implementation notes:**

- Hero: iki kolonlu grid (metin + dairesel profil placeholder), CTA butonları (CV indir, İletişim).
- About: metin + `.skills-grid` (teknoloji etiketleri).
- Featured projects: `.projects-preview` içinde 2 `.project-card`, "Tüm Projeleri Gör" CTA'sı.
- Görseller eklenene kadar `.profile-placeholder` ve `.image-placeholder` gradient kutular kullanılır; gerçek `<img>` için `loading="lazy"` örneği yorum olarak bırakılır.

**Acceptance:** Hero 968px altında tek kolona düşüyor; placeholder'lar düzgün görünüyor.

---

## STEP 6 — Projects Page (`projects.html`)

**Goal:** Tüm projeleri detaylı kartlarla listele.

**Files to edit:** `projects.html`, `styles.css`

**Implementation notes:**

- `.projects-grid` dikey yığın; her öğe `.project-card-large` (görsel + bilgi grid'i).
- Her kart: başlık, açıklama, `.project-tech` etiketleri, `.project-links` (Demo + GitHub).
- Harici linkler `target="_blank" rel="noopener noreferrer"` taşır (güvenlik).
- 968px altında kart tek kolona düşer.

**Acceptance:** Kartlar responsive; tüm dış linkler `rel="noopener noreferrer"` içeriyor.

---

## STEP 7 — Contact Page (`contact.html`)

**Goal:** İletişim bilgileri + erişilebilir iletişim formu oluştur.

**Files to edit:** `contact.html`, `styles.css`

**Implementation notes:**

- İki kolon: `.contact-info` (email, LinkedIn, GitHub, konum) ve `.contact-form-wrapper`.
- Form alanları: `name`, `email`, `subject`, `message`; her birinde `<label for>` + `required`.
- `#formMessage` kutusu başarı/hata mesajları için (`.success` / `.error` sınıfları).
- Input `:focus` durumunda görünür outline + box-shadow.

**Acceptance:** Her input'un bağlı bir label'ı var; form 968px altında tek kolon.

---

# PHASE 4 — INTERACTIVITY

---

## STEP 8 — Navigation Toggle & Active Link

**Goal:** Mobil menü aç/kapa ve mevcut sayfa linkini vurgula.

**Files to edit:** `script.js`

**Implementation notes:**

- `navToggle` tıklamasında `navMenu` ve `navToggle` üzerinde `.active` toggle et.
- Bir linke tıklanınca menüyü kapat (mobil UX).
- `window.location.pathname` ile mevcut sayfayı bul, eşleşen linke `.active` ekle.
- Elementler yoksa kod sessizce atlamalı (`if (navToggle && navMenu)`).

**Acceptance:** Menü mobilde açılıp link tıklanınca kapanıyor; aktif link doğru.

---

## STEP 9 — Smooth Scroll & Skip-Link Focus (a11y)

**Goal:** Anchor linklerde yumuşak kaydırma; skip-link'in ekran okuyucularla çalışması.

**Files to edit:** `script.js`

**Implementation notes:**

- `a[href^="#"]` linkleri için: `href === '#'` olanları (placeholder demo/GitHub butonları) atla, böylece sayfa başa zıplamaz.
- Hedef bulunamazsa `preventDefault` yapma; varsayılan davranışı koru.
- Kaydırmadan sonra hedefe klavye odağını taşı (`tabindex="-1"` + `focus({ preventScroll: true })`), böylece "Ana içeriğe geç" skip-link gerçekten çalışır.

```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});
```

**Acceptance:** Skip-link odağı `#main-content`'e taşıyor; `href="#"` butonları sayfayı zıplatmıyor.

---

## STEP 10 — Contact Form Handling & Validation

**Goal:** İstemci tarafı doğrulama + gönderim stratejisi.

**Files to edit:** `script.js`

**Implementation notes:**

- `submit` olayında `preventDefault`; `FormData` ile alanları oku.
- Boş alan ve regex ile email doğrulaması; hata durumunda `#formMessage` göster.
- Gönderim için üç seçenek: Formspree (`fetch`), EmailJS, veya varsayılan `mailto` fallback.
- `showFormMessage(message, type)` yardımcı fonksiyonu mesaj kutusunu yönetir (DRY).

**Security:** Kullanıcı girdisi `encodeURIComponent` ile `mailto` linkine kaçışlanır; hassas anahtarlar istemciye gömülmemeli.

**Acceptance:** Geçersiz email hata mesajı veriyor; geçerli gönderim seçilen kanala yönleniyor.

---

## STEP 11 — Scroll Animations & Scroll-to-Top

**Goal:** Fade-in animasyonları ve yukarı çık butonu.

**Files to edit:** `script.js`, `styles.css`

**Implementation notes:**

- `IntersectionObserver` ile `.project-card`, `.project-card-large`, `.about-content`, `.contact-wrapper` öğelerini görünürlükte fade-in yap.
- Scroll-to-top butonu JS ile oluşturulur ama **stilleri `styles.css`'te** `.scroll-to-top` ve `.scroll-to-top.visible` sınıflarında tutulur (inline style yok — DRY/temiz kod).
- Scroll dinleyicisi `debounce` ile throttle edilir (performans).

```javascript
const handleScroll = debounce(() => {
  scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
}, 100);
```

**Acceptance:** 300px sonrası buton görünüyor; scroll performansı akıcı.

---

# PHASE 5 — SEO, A11Y & DEPLOY

---

## STEP 12 — SEO Metadata & Structured Data

**Goal:** Her sayfaya tam SEO meta seti ve JSON-LD ekle.

**Files to edit:** üç HTML dosyasının `<head>` bloğu

**Implementation notes:**

- `description`, `keywords`, `author`, canonical link.
- Open Graph (`og:*`) ve Twitter Card (`twitter:*`) etiketleri.
- JSON-LD: ana sayfada `Person`, projelerde `CollectionPage`, iletişimde `ContactPage`.
- Yayına almadan önce `yourwebsite.com`, `İsim Soyisim`, `email@example.com` placeholder'larını gerçek değerlerle değiştir.

**Acceptance:** Her sayfada geçerli JSON-LD ve canonical URL var.

---

## STEP 13 — `sitemap.xml` & `robots.txt`

**Goal:** Arama motoru taraması için sitemap ve robots dosyaları.

**Files to edit:** `sitemap.xml`, `robots.txt`

**Implementation notes:**

- `sitemap.xml`: üç URL, `lastmod`, `changefreq`, `priority`.
- `robots.txt`: tüm botlara izin + sitemap referansı.
- Domain placeholder'larını gerçek alan adıyla güncelle.

**Acceptance:** `sitemap.xml` geçerli XML; `robots.txt` sitemap'e işaret ediyor.

---

## STEP 14 — Accessibility & Performance Pass

**Goal:** WCAG uyumu ve hız iyileştirmeleri.

**Implementation notes:**

- Skip link (`.skip-link`) `:focus` ile görünür olur, ilk odaklanabilir öğedir.
- Tüm interaktif öğelerde görünür `:focus`; görseller için `alt` ve `loading="lazy"`.
- Renk kontrastını WCAG 2.1 AA seviyesinde doğrula.
- Gereksiz reflow'ları önlemek için animasyonlar `opacity`/`transform` üzerinden.

**Acceptance:** Klavye-only navigasyon tüm akışı kapsıyor; Lighthouse a11y skoru yüksek.

---

## STEP 15 — Deployment (GitHub Pages / Netlify / Vercel)

**Goal:** Statik siteyi yayına al.

**Implementation notes:**

- **GitHub Pages:** repo Settings > Pages > `main` branch root.
- **Netlify:** "New site from Git", build command boş, publish dir `/`.
- **Vercel:** "New Project", framework preset "Other".
- Build adımı yok; dosyalar olduğu gibi servis edilir.

**Acceptance:** Üç sayfa da canlı ortamda 200 dönüyor; varlıklar (CSS/JS) yükleniyor.

---

# Appendix A — Design Tokens (CSS Variables)

`:root` altında tek kaynaktan yönetilen tasarım değişkenleri:

```css
:root {
  --primary-color: #2563eb;
  --primary-dark: #1e40af;
  --secondary-color: #64748b;
  --text-color: #1e293b;
  --text-light: #64748b;
  --bg-color: #ffffff;
  --bg-light: #f8fafc;
  --bg-dark: #0f172a;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}
```

---

# Appendix B — Responsive Breakpoints

| Breakpoint        | Hedef                                        |
| ----------------- | -------------------------------------------- |
| `max-width: 968px` | Hero/about/proje/iletişim grid'leri tek kolon |
| `max-width: 768px` | Hamburger menü, off-canvas nav, başlık ölçek |
| `max-width: 480px` | Container padding, buton ölçek, footer dikey |

---

# Appendix C — Common Pitfalls

- **Skip-link odağı:** Sadece `scrollIntoView` yetmez; `focus()` çağrılmazsa ekran okuyucu kullanıcıları için skip-link işe yaramaz.
- **`href="#"` butonları:** Genel `a[href^="#"]` smooth-scroll handler'ı `preventDefault` ile sayfayı başa zıplatabilir; bare `#` linkleri atlanmalı.
- **Inline style:** Scroll-to-top gibi JS ile oluşturulan öğelerin stilini JS içine gömme; CSS sınıfı kullan (DRY, sürdürülebilirlik).
- **Placeholder içerik:** Şablon `yourwebsite.com`, `İsim Soyisim`, `email@example.com` gibi değerler içerir; yayına almadan önce değiştir.
- **Eksik `assets/`:** `cv.pdf`, favicon, OG görseli referansları dosya yoksa 404 verir.
- **Harici linkler:** `target="_blank"` her zaman `rel="noopener noreferrer"` ile birlikte kullanılmalı.

---

# Appendix D — Pre-flight Checklist

- [ ] Tüm placeholder metin/URL/email gerçek değerlerle değiştirildi
- [ ] `assets/` içindeki görseller, favicon ve `cv.pdf` mevcut
- [ ] JSON-LD, OG ve Twitter meta etiketleri her sayfada doğru
- [ ] `sitemap.xml` ve `robots.txt` gerçek domain'i gösteriyor
- [ ] Klavye-only navigasyon ve skip-link çalışıyor
- [ ] Tüm dış linkler `rel="noopener noreferrer"` taşıyor
- [ ] Mobil (≤768px) menü ve responsive grid'ler doğrulandı
- [ ] Konsol hatasız; Lighthouse SEO/A11y/Performance skorları yeşil
