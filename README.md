# ARCTEX — Design Solutions

A freelance portfolio website for ARCTEX Design Solutions, an architecture, interior design, and design-build firm in Kuwait. The site presents the firm's work, services, and company profile, with English and Arabic content and a client enquiry form.

**[View the live website](https://arctex-indol.vercel.app/)** · [Source repository](https://github.com/MhmedMii/arctex)

The site is hosted on Vercel. `vercel.json` maps the domain root (`/`) to `homepage.html`, so visitors can open the homepage directly at the live URL. The original `/homepage.html` URL remains available.

## Features

- Five pages: Home, Projects, Firm, Services, and Contact.
- English and Arabic language switching, including right-to-left layouts and translated form labels.
- Light and dark themes, with theme and language preferences saved in `localStorage`.
- Responsive navigation with a mobile menu drawer.
- Interactive recent-project previews, scroll reveals, and a reading-progress bar.
- Client enquiry form with browser validation, bilingual status messages, and a honeypot field.
- Page metadata for search and social sharing, favicons, and a web app manifest.

## Technology

The frontend uses **HTML5, CSS, and vanilla JavaScript ES modules**. There is no framework, package manager, or build step. Fonts are loaded from Google Fonts. The enquiry form sends requests to an external Google Apps Script web app intended to record leads in Google Sheets.

## Run locally

Requirements: Git and Python 3, or another static HTTP server.

```sh
git clone https://github.com/MhmedMii/arctex.git
cd arctex
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **[http://localhost:8000/homepage.html](http://localhost:8000/homepage.html)**.

Serve the files over HTTP so the JavaScript module imports work correctly. No dependency installation or frontend environment variables are required. An internet connection is needed for Google Fonts and the external form endpoint.

## Project structure

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

## Maintain the site

- **Content and translations:** edit the corresponding HTML page. Keep `.lang-en` and `.lang-ar` content in sync; form translations also use `data-*` attributes.
- **Colors and themes:** update `css/variables.css` and `js/modules/dark-light-theme.js` as needed.
- **Layout:** edit the relevant file in `css/sections/`. Preserve the import order in `css/sections.css`, since it controls the cascade.
- **Interactions:** edit the corresponding module in `js/modules/`. `js/main.js` initializes each feature and shares the entry point across pages.
- **Project imagery:** replace or add files in `images/`, then update image paths, alt text, and recent-project `data-img` attributes in the HTML.
- **Shared navigation and footer:** these are repeated in each main HTML page; update every copy when changing links or contact details.
- **Asset caching:** pages and some module imports include version query strings. Update the relevant version when changing an asset that browsers may have cached.

## Enquiry form

The form is implemented in `js/modules/contact-form.js`. Its `ENDPOINT` constant points to a Google Apps Script web app. It sends a URL-encoded POST containing `name`, `email`, `phone`, `project_type`, and `message`.

To connect a different destination, deploy a compatible Apps Script web app and replace `ENDPOINT` with its `/exec` URL. The receiving script should read the fields from `e.parameter`; the Apps Script source is not included in this repository. Set `ENDPOINT` to an empty string to enable demo mode without sending enquiries.

Requests use `mode: 'no-cors'`, so the browser cannot read the server response. A frontend success message does not confirm that a spreadsheet row was saved; check the receiving spreadsheet when validating delivery. The deployment check did not submit an enquiry or verify the external backend.

## Deploy on Vercel

Publish this repository as a static site, serving the repository root directly. The frontend does not require an install or build command. Keep the HTML, `css/`, `js/`, and `images/` paths together so relative links and imports continue to resolve.

The homepage filename is `homepage.html`. The root rewrite in `vercel.json` serves this page at `/` while keeping the URL unchanged, following [Vercel's rewrite configuration](https://vercel.com/docs/project-configuration/vercel-json#rewrites). This also supports the manifest's `/` start URL. Keep this configuration in the deployed source; a generic local static server does not apply Vercel rewrites, so use `/homepage.html` for the local preview.

Push changes to the connected GitHub production branch (`main`) to trigger Vercel's Git deployment. The tracked `README.md` is also displayed on the GitHub repository page.

After deploying, check the homepage, each navigation link, English/Arabic switching, both themes, mobile navigation, and the enquiry form's validation. Confirm actual form delivery separately in the receiving spreadsheet.

## Credits and licensing

Website development: **Mohammed.Moh.M (Triple M)**. Brand and website content: **ARCTEX Design Solutions**.

No license file is included in this repository.
