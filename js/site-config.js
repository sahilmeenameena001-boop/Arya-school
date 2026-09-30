/* =====================================================================
   SITE CONFIG  —  edit this ONE file to change details on EVERY page:
   name, logo, contact details, menus, buttons, social links, footer.
   Text in [square brackets] still has to be confirmed by the school.
   ===================================================================== */

window.SITE = {
  name: "Arya Sr. Secondary School",
  // Animated header logo: shield emblem + wordmark that types itself in once
  logo: {
    emblem: "images/logo/arya-emblem.png",       // transparent shield
    wordmark: "images/logo/arya-wordmark.png",   // image version (used in the footer)
    lines: ["Arya Senior Secondary", "School"],  // the two wordmark lines typed in the header
    typingDelay: 500,      // ms to wait after the page opens before typing starts
    typingSpeed: 55,       // ms per letter (lower = faster)
    collapseAfter: 80      // px scrolled before the wordmark folds away and only the emblem stays
  },

  contact: {
    addressLines: ["Bharan Road, Village and P.O. Madina", "Tehsil Meham, District Rohtak", "Haryana – 124001"],
    phones: ["98963 23370", "88200 00086"],   // admissions and general enquiries
    office: "01257-682486",                    // school office landline
    phone: "98963 23370",                      // main number used on buttons ("Call Us")
    whatsapp: "919896323370",                  // [CONFIRM the WhatsApp number] — digits only, with country code
    email: "[ONE VERIFIED EMAIL]",             // [CONFIRM] — the old site showed two different addresses
    hours: "[Monday to Saturday, 8:00 am to 2:00 pm — CONFIRM]"
  },

  // Contact page map (search query used by Google Maps)
  mapQuery: "Arya Sr. Secondary School, Madina, Rohtak, Haryana",

  // Thin bar above the header
  topBar: 'Admissions open for <span class="tbc">[2027–28]</span>',
  session: "[2027–28]",

  // Round button fixed to the bottom-left corner ("" label to hide)
  // Change the wording with the calendar, e.g. "Admissions<br>Open<br>2027–28" or "Class 11<br>Open Day". "" hides it.
  stickyButton: { label: "Open Day<br>Book Your<br>Visit", href: "admissions-open-days.html" },

  // Urgent notices bar on every page (holidays, closures, fee dates). "" hides it.
  notice: "Notice: [Holiday / weather closure / fee due date]",
  noticeLink: "news.html",

  // If the school uses a parent app or portal, put its address here to show "Parent Login"
  parentLogin: "",

  // Buttons on the right of the header
  applyLink: "admissions-enquiry.html",

  // Enquiry / contact forms: paste a form-service address here (e.g. a Formspree or Web3Forms
  // endpoint) to receive submissions by email. Left empty, the form opens WhatsApp with the
  // details filled in instead.
  formEndpoint: "",

  // Main menu (8 items). First click on an item with "children" opens its sub-menu.
  // Each inner page's sidebar is built from the section it belongs to.
  mainNav: [
    { label: "Home", href: "index.html" },
    { label: "About Us", href: "about.html", children: [
      { label: "Overview", href: "about.html" },
      { label: "Our Story", href: "about-our-story.html" },
      { label: "Principal's Message", href: "about-principals-message.html" },
      { label: "Vision, Mission and Values", href: "about-vision-mission-values.html" },
      { label: "Leadership and Teachers", href: "about-leadership.html" },
      { label: "Affiliation and Approvals", href: "about-affiliation.html" }
    ]},
    { label: "Admissions", href: "admissions.html", children: [
      { label: "Overview", href: "admissions.html" },
      { label: "How to Apply", href: "admissions-how-to-apply.html" },
      { label: "Eligibility and Documents", href: "admissions-eligibility.html" },
      { label: "Fee Structure", href: "admissions-fees.html" },
      { label: "Scholarships", href: "admissions-scholarships.html" },
      { label: "Open Days and Campus Visits", href: "admissions-open-days.html" },
      { label: "FAQs", href: "admissions-faqs.html" },
      { label: "Downloads", href: "admissions-downloads.html" },
      { label: "Enquiry Form", href: "admissions-enquiry.html" }
    ]},
    { label: "Academics", href: "academics.html", children: [
      { label: "Overview", href: "academics.html" },
      { label: "Learning Approach", href: "academics-learning-approach.html" },
      { label: "Primary and Middle (1–8)", href: "academics-primary-middle.html" },
      { label: "Secondary (9–10)", href: "academics-secondary.html" },
      { label: "Senior Secondary Streams", href: "academics-senior-secondary.html" },
      { label: "Careers and Guidance", href: "academics-careers.html" },
      { label: "Which Stream Suits Me?", href: "academics-stream-quiz.html" },
      { label: "Results", href: "academics-results.html" }
    ]},
    { label: "Campus", href: "campus.html", children: [
      { label: "Overview", href: "campus.html" },
      { label: "Classrooms", href: "campus.html#classrooms" },
      { label: "Library", href: "campus.html#library" },
      { label: "Science Lab", href: "campus.html#science-lab" },
      { label: "Computer Lab", href: "campus.html#computer-lab" },
      { label: "Theatre", href: "campus.html#theatre" },
      { label: "Playground", href: "campus.html#playground" },
      { label: "Activity Area", href: "campus.html#activity-area" },
      { label: "Safety and Transport", href: "campus-safety.html" }
    ]},
    { label: "Life at Arya", href: "life-at-arya.html", children: [
      { label: "Overview", href: "life-at-arya.html" },
      { label: "Sports", href: "life-sports.html" },
      { label: "Performing Arts and Music", href: "life-performing-arts.html" },
      { label: "In-house Publications", href: "life-publications.html" },
      { label: "Celebrations", href: "life-celebrations.html" },
      { label: "Student Stories", href: "life-student-stories.html" }
    ]},
    { label: "Achievers", href: "achievers.html", children: [
      { label: "Overview", href: "achievers.html" },
      { label: "Toppers", href: "achievers-toppers.html" },
      { label: "Alumni", href: "achievers-alumni.html" },
      { label: "Testimonials", href: "achievers-testimonials.html" }
    ]},
    { label: "Parents and News", href: "news.html", children: [
      { label: "News and Events", href: "news.html" },
      { label: "Calendar", href: "parents-calendar.html" },
      { label: "Photo and Video Gallery", href: "parents-gallery.html" },
      { label: "Public Mandatory Disclosure", href: "parents-disclosure.html" },
      { label: "Pay Fees Online", href: "parents-pay-fees.html" },
      { label: "Contact Us", href: "contact.html" }
    ]}
  ],

  // Smaller links under the main menu
  secondaryNav: [
    { label: "Open Days", href: "admissions-open-days.html" },
    { label: "Pay Fees Online", href: "parents-pay-fees.html" },
    { label: "Calendar", href: "parents-calendar.html" },
    { label: "Public Mandatory Disclosure", href: "parents-disclosure.html" },
    { label: "Contact Us", href: "contact.html" }
  ],

  extraSections: [],

  // Footer
  tagline: "Arya Sr. Secondary School. Nurturing minds, shaping futures since 2001.",
  footerLinks: [
    { label: "Admissions", href: "admissions.html" },
    { label: "Open Days and Campus Visits", href: "admissions-open-days.html" },
    { label: "Fee Structure", href: "admissions-fees.html" },
    { label: "Pay Fees Online", href: "parents-pay-fees.html" },
    { label: "Results", href: "academics-results.html" },
    { label: "Calendar", href: "parents-calendar.html" },
    { label: "Public Mandatory Disclosure", href: "parents-disclosure.html" },
    { label: "Contact", href: "contact.html" }
  ],
  hashtag: "#LearnWithArya",
  legalLine: "CBSE Affiliation No. 530656 · UDISE Code 06140301709 · © " + new Date().getFullYear() + " Arya Sr. Secondary School. All rights reserved.",
  footerLogos: [],   // e.g. { image: "images/cbse-logo.png", href: "https://www.cbse.gov.in", alt: "CBSE" }

  social: {
    youtube: "https://www.youtube.com/@aryaschoolmadina990",
    facebook: "https://www.facebook.com/aryaschoolmadina2001",
    instagram: "https://www.instagram.com/aryaschoolmadina"
  }
};
