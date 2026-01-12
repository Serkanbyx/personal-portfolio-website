# 💼 Personal Portfolio Website

A modern, responsive, and performance-optimized personal portfolio website. Showcase your projects, skills, and experience to potential employers and clients with a clean, professional design.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Responsive Design**: Fully responsive layout that adapts seamlessly to all screen sizes and devices
- **SEO Optimized**: Complete SEO setup with Open Graph tags, Twitter Cards, Structured Data (JSON-LD), sitemap.xml, and robots.txt
- **Accessibility (A11y)**: WCAG 2.1 AA compliant with skip links, focus states, ARIA labels, and semantic HTML
- **Performance Optimized**: Fast loading times with lazy loading, optimized assets, and efficient code
- **Contact Form**: Multiple integration options including Formspree, EmailJS, or mailto fallback
- **Modern UI/UX**: Clean, minimal design with smooth animations and transitions
- **Cross-Browser Compatible**: Works perfectly on all modern browsers

## Live Demo

[🎮 View Live Demo](https://personal-portfolio-websiteee.netlify.app/)

## Technologies

- **HTML5**: Semantic markup with proper structure and accessibility features
- **CSS3**: Modern CSS features including Grid, Flexbox, Custom Properties (CSS Variables), and animations
- **Vanilla JavaScript (ES6+)**: Modern JavaScript with no dependencies, using ES6+ features like arrow functions, async/await, and modules
- **SEO**: Open Graph meta tags, Twitter Cards, Structured Data (JSON-LD), sitemap.xml, robots.txt
- **Accessibility**: Skip links, focus management, ARIA attributes, semantic HTML5 elements

## Installation

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Serkanbyx/portfolio-website.git
cd portfolio-website
```

2. Open the project in your preferred code editor (VS Code recommended)

3. Start a local server. You can use one of the following methods:

   - **VS Code Live Server**: Install the Live Server extension and click "Go Live"
   - **Python**: Run `python -m http.server 8000` in the project directory
   - **Node.js**: Install `http-server` globally with `npm install -g http-server`, then run `http-server`
   - **PHP**: Run `php -S localhost:8000` in the project directory

4. Open your browser and navigate to `http://localhost:8000`

## Usage

1. **Update Personal Information**: Edit `index.html` to replace placeholder content with your personal information
2. **Add Your Projects**: Edit `projects.html` to add your projects with descriptions, technologies, and links
3. **Configure Contact Form**: Set up Formspree or EmailJS (see Configuration section)
4. **Add Assets**: Place your profile photo, project images, and CV in the `assets/` folder
5. **Customize Colors**: Modify CSS variables in `styles.css` to match your brand
6. **Deploy**: Deploy to GitHub Pages, Netlify, or Vercel (see Deployment section)

## How It Works?

### Structure

The portfolio website consists of three main pages:

- **index.html**: Homepage with hero section, about section, and featured projects
- **projects.html**: Complete list of all projects with detailed information
- **contact.html**: Contact form and contact information

### Navigation

The website uses a sticky navigation bar that remains visible while scrolling. On mobile devices, a hamburger menu provides access to all pages.

### Form Handling

The contact form supports three integration methods:

1. **Formspree**: Server-side form handling service
2. **EmailJS**: Client-side email service
3. **Mailto**: Fallback option that opens default email client

### SEO Implementation

- **Structured Data**: JSON-LD format for Person, CollectionPage, and ContactPage schemas
- **Meta Tags**: Open Graph and Twitter Card tags for social media sharing
- **Sitemap**: XML sitemap for search engine indexing
- **Robots.txt**: Instructions for search engine crawlers

### Accessibility Features

- **Skip Links**: Allow keyboard users to skip navigation
- **Focus States**: Visible focus indicators on all interactive elements
- **ARIA Labels**: Descriptive labels for screen readers
- **Semantic HTML**: Proper use of HTML5 semantic elements

## Customization

### Update Personal Information

Edit `index.html` to update your personal information:

```html
<h1 class="hero-title">Hello, I'm <span class="highlight">Your Name</span></h1>
<p class="hero-subtitle">Your Job Title</p>
<p class="hero-description">Your personal description and bio here.</p>
```

### Add Your Projects

Edit `projects.html` to add your projects. Each project should include:

- Project title
- Description
- Technologies used (displayed as tags)
- Demo link (if available)
- GitHub repository link

Example project structure:

```html
<div class="project-card-large">
  <div class="project-image">
    <img
      src="assets/projects/project.jpg"
      alt="Project description"
      loading="lazy"
    />
  </div>
  <div class="project-info">
    <h3>Project Title</h3>
    <p>Project description...</p>
    <div class="project-tech">
      <span class="tech-tag">React</span>
      <span class="tech-tag">Node.js</span>
    </div>
    <div class="project-links">
      <a
        href="https://demo.com"
        class="project-link"
        target="_blank"
        rel="noopener noreferrer"
        >Live Demo</a
      >
      <a
        href="https://github.com/username/project"
        class="project-link"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub Repo</a
      >
    </div>
  </div>
</div>
```

### Customize Colors

Edit CSS variables in `styles.css`:

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
  /* Change these values to match your brand */
}
```

### Configure Contact Form

1. **Formspree**:
   - Sign up at [formspree.io](https://formspree.io/)
   - Create a new form and get your endpoint URL
   - Update the endpoint in `script.js`:

```javascript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

2. **EmailJS**:

   - Sign up at [emailjs.com](https://www.emailjs.com/)
   - Configure service and template
   - Add EmailJS script to HTML and update `script.js` with your service ID and template ID

3. **Mailto**: Already configured as fallback option

### Add Images

1. **Profile Photo**:
   - Add your profile photo to `assets/` folder
   - Replace the placeholder in `index.html`:

```html
<img src="assets/profile.jpg" alt="Your Name - Your Title" loading="lazy" />
```

2. **Project Images**:

   - Add project images to `assets/projects/` folder
   - Replace placeholders in `projects.html` with actual images
   - Use WebP format for better performance

3. **CV**:
   - Add your CV as PDF to `assets/cv.pdf`
   - The download link is already configured in `index.html`

### Update SEO Information

1. **Meta Tags**: Update Open Graph and Twitter Card images and URLs in all HTML files
2. **Structured Data**: Update JSON-LD schemas with your personal information
3. **Sitemap**: Update URLs in `sitemap.xml` with your actual domain
4. **robots.txt**: Update sitemap URL if needed

## Deployment

### GitHub Pages

1. Push your repository to GitHub
2. Go to Settings > Pages
3. Select `main` branch as source
4. Your site will be available at `https://username.github.io/portfolio-website`

### Netlify

1. Sign up at [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Connect your repository
4. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `/` (root)
5. Click "Deploy site"

### Vercel

1. Sign up at [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import your repository
4. Framework Preset: "Other"
5. Click "Deploy"

### Custom Domain

You can add a custom domain in the Settings > Domain section of any platform. Update your DNS settings according to the platform's instructions.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Message Format

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## License

This project is open source and available under the [MIT License](LICENSE).

## Developer

**Serkan Bayraktar**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: serkanbyx1@gmail.com

## Acknowledgments

- Modern CSS techniques and best practices
- Accessibility guidelines from WCAG 2.1
- SEO best practices from Google and Schema.org
- Responsive design principles

## Contact

For questions, suggestions, or issues:

- Open an issue on [GitHub](https://github.com/Serkanbyx/portfolio-website/issues)
- Email: serkanbyx1@gmail.com
- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
