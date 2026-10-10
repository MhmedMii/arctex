# ARCTEX — Design Solutions | Demo Version

**Bilingual Architecture & Design Website | Freelance Web Development Project**

A portfolio demonstration of a responsive, bilingual website developed for **ARCTEX Design Solutions**, an architecture, interior design, and design-build firm based in Kuwait.

The demo showcases the website's design, architectural project portfolio, services, Arabic/English language support, and interactive features.

**[🌐 View Live Demo](https://arctex-indol.vercel.app/)** · **[💻 View Source Code](https://github.com/MhmedMii/arctex)**

> **Demo Version:** This public website is presented for portfolio and demonstration purposes. Certain features and external integrations may not represent a fully operational production environment.

**Technologies:** HTML5 · CSS3 · JavaScript ES Modules · Google Apps Script Integration · Vercel

---

## 📌 Project Overview

ARCTEX needed a web presence that presents its architectural and interior design work while giving potential clients a straightforward way to explore services and submit enquiries.

The website provides:

- A portfolio of architectural and design projects.
- Dedicated pages for the firm's services, background, and contact information.
- Arabic and English interfaces with right-to-left support.
- Responsive layouts for desktop and mobile devices.
- A client enquiry form connected to an external Google Apps Script endpoint.

The frontend is implemented using HTML, CSS, and vanilla JavaScript modules without a frontend framework or build process.

## 👨‍💻 My Contribution

**Role: Freelance Website Developer**

I developed the website's frontend experience and organized its implementation around reusable styles and JavaScript modules.

The work includes:

- Building the five-page website structure.
- Implementing responsive page layouts and mobile navigation.
- Supporting English and Arabic content, including RTL presentation.
- Implementing light and dark themes with persistent preferences.
- Developing interactive project previews and scrolling interactions.
- Implementing the frontend client enquiry form and its external endpoint integration.
- Preparing the static website for deployment on Vercel.

## ✨ Key Features

### Architecture & Design Portfolio

Five dedicated website pages:

| Page | Purpose |
|---|---|
| Home | Introduction and recent-project previews |
| Projects | Architectural and design portfolio |
| Firm | Company background, philosophy, and values |
| Services | Design and construction services |
| Contact | Contact details and client enquiries |

### Bilingual User Experience

- English and Arabic language switching.
- Right-to-left layout support for Arabic.
- Translated form labels and bilingual feedback messages.
- Language preference stored in `localStorage`.

### Responsive Interface & Themes

- Responsive desktop and mobile layouts.
- Mobile navigation drawer.
- Light and dark appearance modes.
- Theme preference stored in `localStorage`.
- Interactive recent-project previews.
- Scroll-reveal effects and a reading-progress bar.

### Client Enquiries

- Client enquiry form with browser-side validation.
- Bilingual submission status messages.
- Honeypot field to discourage automated submissions.
- External Google Apps Script endpoint intended to record enquiries in Google Sheets.

**Integration note:** Because the form uses `no-cors` requests, the browser cannot confirm whether an enquiry has actually been recorded. Delivery must be verified in the receiving spreadsheet.

### Website Metadata

- Search and social-sharing metadata.
- Favicons.
- Web app manifest.

---

## 🛠️ Technology & Architecture

| Area | Implementation |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 with shared variables and section stylesheets |
| Interactions | Vanilla JavaScript ES modules |
| Bilingual support | English/Arabic content and RTL styles |
| Preferences | Browser `localStorage` |
| Enquiry integration | External Google Apps Script endpoint |
| Hosting | Vercel |
| Typography | Google Fonts |

The website does not use a frontend framework, package manager, or build step.

### Frontend Organization

The HTML files define the individual pages and their content. CSS variables and shared styles keep the visual design consistent, while section-specific styles manage page layouts and responsive behavior.

JavaScript features are organized into modules for navigation, themes, language switching, project previews, and the contact form. The shared `js/main.js` entry point initializes these behaviors.

The frontend is deployed as a static website. The enquiry form is the main integration with an external service; the receiving Apps Script source is not included in this repository.

---

## ▶️ Run Locally

**Requirements:** Git and Python 3, or another static HTTP server.

Clone the repository:

```bash
git clone https://github.com/MhmedMii/arctex.git
cd arctex
```

Start a local server:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open:

**http://localhost:8000/homepage.html**

The JavaScript module imports require the website to be served over HTTP.

No dependency installation or frontend environment variables are required.

An internet connection is needed for Google Fonts and the external enquiry endpoint.

**Note:** The local HTTP server does not apply Vercel's root URL rewrite, so open `/homepage.html` locally rather than assuming `/` will show the homepage.

---

## 📁 Project Structure

```text
arctex/
├── homepage.html          # Home and recent-project previews
├── projectspage.html      # Project portfolio
├── firmpage.html          # Company profile, philosophy, and values
├── servicespage.html      # Design and construction services
├── contactpage.html       # Contact details and enquiry form
├── 404.html               # Custom not-found page
├── maintenance.html       # Standalone maintenance page
├── css/
│   ├── variables.css      # Theme tokens and shared variables
│   ├── base.css           # Global styles
│   ├── sections.css       # Entry point for section styles
│   └── sections/          # Page sections, responsive rules, and Arabic RTL
├── js/
│   ├── main.js            # Initializes the site's behavior modules
│   └── modules/           # Theme, language, navigation, previews, and form
├── images/                # Project photography, logos, and app icons
├── site.webmanifest       # App name, icons, and display settings
├── vercel.json            # Maps the domain root to the homepage
└── README.md
```

---

## 🔧 Maintenance Guide

### Content & Translations

Edit the corresponding HTML page when changing website content.

Keep `.lang-en` and `.lang-ar` content synchronized. Contact form translations also use `data-*` attributes.

### Colors & Themes

Shared colors and theme definitions are maintained in:

- `css/variables.css`
- `js/modules/dark-light-theme.js`

### Layout & Responsive Styles

Update styles in the relevant file inside `css/sections/`.

Preserve the stylesheet import order in `css/sections.css`, because it determines the CSS cascade.

### JavaScript Interactions

Edit the corresponding module in `js/modules/`.

The `js/main.js` entry point initializes the site's features and provides a shared starting point across pages.

### Images & Project Content

Add or replace project images inside `images/`.

Update the relevant image paths, alternative text, and recent-project `data-img` attributes in the HTML.

### Navigation & Footer

Shared navigation and footer markup is repeated across the five main HTML pages.

When changing navigation links or contact information, update every relevant page.

### Browser Caching

Some HTML pages and JavaScript module imports include version query strings.

Update the relevant version value when changing assets that browsers might otherwise serve from cache.

---

## 📩 Enquiry Form Integration

The contact form is implemented in:

`js/modules/contact-form.js`

Its `ENDPOINT` constant points to an external Google Apps Script web application intended to record enquiries in Google Sheets.

The frontend sends a URL-encoded POST containing:

- `name`
- `email`
- `phone`
- `project_type`
- `message`

### Connecting Another Endpoint

To use a different destination:

1. Deploy a compatible Google Apps Script web application.
2. Replace the `ENDPOINT` constant with the new `/exec` URL.
3. Configure the receiving script to read the submitted values from `e.parameter`.
4. Verify received enquiries in the destination spreadsheet.

The Google Apps Script source code is not included in this repository.

Set `ENDPOINT` to an empty string to enable demo mode without sending enquiries.

### Important Delivery Limitation

The frontend uses `mode: 'no-cors'` for submission requests.

This means the browser cannot read the response returned by the external service.

A success message in the website does **not** guarantee that an enquiry was saved successfully.

Actual delivery should be confirmed in the receiving Google Sheet.

The deployment check did not submit an enquiry or independently verify the external backend.

---

## 🚀 Deployment on Vercel

The website is published as a static site using Vercel.

There is no dependency installation or build command required for the frontend.

Deploy the repository root directly, keeping its HTML files and `css/`, `js/`, and `images/` directories together so relative paths continue to work.

### Deployment Checklist

After deployment, verify:

- Homepage and all navigation links.
- Five main website pages.
- Arabic and English switching.
- Light and dark modes.
- Mobile navigation.
- Client enquiry form validation.
- Actual enquiry delivery in the receiving spreadsheet.

The frontend form's status message alone is insufficient to confirm successful backend delivery.

---

## 📄 Credits & Licensing

**Brand and website content:** ARCTEX Design Solutions

No license file is included in this repository.

---

## 👨‍💻 Author

**ENG. Mohammed Mahmoud**  
AI & Software Engineer

- **GitHub:** [@MhmedMii](https://github.com/MhmedMii)
- **Portfolio:** [View Portfolio](https://mohammed-mahmoud-portfolio.vercel.app/)

Built as a portfolio demonstration of freelance web development using HTML5, CSS3, and vanilla JavaScript ES modules, featuring bilingual Arabic/English interfaces, responsive layouts, and modular frontend architecture. The live demo showcases architectural project galleries, interactive navigation, persistent light/dark themes, and a client enquiry form with Google Apps Script integration.
