# Arya Sr. Secondary School website — how to edit

Plain HTML, CSS and JavaScript, with no build step and nothing to install.
The design and animations follow the reference site. All text comes from the *Arya School Content Doc*.

**To preview:** run `python -m http.server 8080` inside this folder and open http://localhost:8080.

---

## ⚠ Before going live: the yellow items

Anything the content doc marked **[CONFIRM] / [NUMBER] / [NAME] / [SESSION]** appears on the site
**highlighted in yellow** (`<span class="tbc">…</span>`). The doc says nothing highlighted may go live.

- To find them all, search the files for `class="tbc"`. About 300 are spread across the pages, and some are in `js/site-config.js`.
- To fix one, replace the bracketed text with the verified information and delete the `<span class="tbc">` wrapper.

The school still needs to supply the items in the doc's Part 5:
- figures, results, fees and dates
- staff names and photos
- the email address, WhatsApp number and office hours
- testimonials and the real photos and videos

## 1. Pages (follows the doc's Part 2 site structure)

| Menu | Files |
|---|---|
| Home | `index.html` (the 12 home sections from doc 4.1) |
| About Us | `about.html`, `about-our-story.html`, `about-principals-message.html`, `about-vision-mission-values.html`, `about-leadership.html`, `about-affiliation.html` |
| Academics | `academics.html`, `academics-learning-approach.html`, `academics-primary-middle.html`, `academics-secondary.html`, `academics-senior-secondary.html` (#science #commerce #arts), `academics-careers.html`, `academics-results.html` |
| Admissions | `admissions.html`, `admissions-how-to-apply.html`, `admissions-eligibility.html`, `admissions-fees.html`, `admissions-scholarships.html`, `admissions-faqs.html`, `admissions-enquiry.html` |
| Campus | `campus.html` (facility tiles: #classrooms #library #science-lab #computer-lab #theatre #playground #activity-area), `campus-safety.html` |
| Life at Arya | `life-at-arya.html`, `life-sports.html`, `life-performing-arts.html`, `life-publications.html`, `life-celebrations.html`, `life-student-stories.html` |
| Achievers | `achievers.html`, `achievers-toppers.html`, `achievers-alumni.html`, `achievers-testimonials.html` |
| Parents and News | `news.html`, `news-article.html` (copy for each story), `parents-calendar.html`, `parents-gallery.html`, `parents-disclosure.html`, `contact.html` |
| Other | `404.html`, `page-template.html` (blank page to copy) |

`documents/` holds **placeholder** PDFs: `prospectus.pdf` and `public-mandatory-disclosure.pdf`.
Replace them with the real files and keep the same names.

## 2. Where to change things

| I want to change… | Edit |
|---|---|
| School name, address, phones, email, WhatsApp, office hours | `js/site-config.js` → `contact` |
| Top bar text / admission session | `js/site-config.js` → `topBar`, `session` |
| Menus, footer links, social links | `js/site-config.js` |
| Where enquiry forms are sent | `js/site-config.js` → `formEndpoint` (see below) |
| Colours (blue theme, saffron "Apply" buttons) and fonts | `css/variables.css` |
| Text on a page | that page's `.html` file |
| Photos | replace files in `images/` and update `src="…"` / `url(…)` |
| Videos | `data-video="…"` (YouTube link, Vimeo link or `videos/file.mp4`); home hero: uncomment the `<source>` lines in `index.html` |
| Animation speeds | `js/animations.js` → `CONFIG` |

## 3. Forms (Enquiry Form and Contact Us)

By default a submitted form **opens WhatsApp** with the parent's details filled in, ready to send to the school's number.
To receive forms by email instead, create a free form at a service such as Formspree or Web3Forms and paste its
address into `formEndpoint` in `js/site-config.js`. The success and error messages are the ones from the content doc.

## 4. Everything on every page (doc Part 3)

These are built automatically by `js/layout.js` from `js/site-config.js`:
- top bar
- header with "Apply Now" (saffron) and "Call Us" buttons
- full-screen menu
- round "Book a Campus Visit" button
- phone bottom bar with Call, WhatsApp and Apply
- sidebar menu
- trust strip (`<div data-trust-strip></div>`)
- footer with the address, phones, quick links, social links, #LearnWithArya and the CBSE / UDISE legal line

## 5. Building blocks

- **Inner pages:** text, quote, tables (`data-table`), numbered steps, text cards (`card-grid`), accordion, downloads, stats, staff grid, testimonial cards, enquiry form, map.
- **Full-width rows:** Explore cards, gallery, facility tiles (pop-ups), signposting cards, people grid, "Where Arya Students Go" name ticker.

Copy a block's HTML between pages to reuse it.

## 6. Still recommended by the doc (not built yet)

- **Hindi / English toggle:** needs the Hindi text first.
- **Google Analytics and Google Business Profile:** need the school's accounts.
- **Instagram feed embed and a 360° campus tour:** need the school's accounts or media.
- **Redirect from the old `/acadamics/` address to the new Academics page:** set up with your web host when the new site goes live.
