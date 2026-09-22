# WUEG website

The Wharton Undergraduate Energy Group website. Plain HTML, CSS, and a little
JavaScript. No framework, no build step, no `npm install`. Open any `.html`
file in a browser and it works.

Per the constitution (§2.a.vii), the VP of Finance &amp; Treasury keeps this
current with the (Co-)President. This README is written for that person,
assuming no prior web experience.

---

## Before you publish: the checklist

These are the things that are currently placeholders. Work through them in
order; the first three matter most.

- [ ] **Email addresses.** `contact.html` uses `contact@whartonenergygroup.com`
      and `careers@whartonenergygroup.com` as placeholders. **These are guesses.**
      Replace them with the club's real inboxes before the site goes live, or
      messages will bounce into nothing. Search the whole folder for
      `@whartonenergygroup.com` to catch every occurrence.
- [ ] **Newsletter signup.** Four pages have a `<form ... data-newsletter>`
      whose `action="#"` does nothing. Point each at your Mailchimp signup
      endpoint or a Google Form. See "Wiring up the forms" below.
- [ ] **Contact form.** Same deal in `contact.html`. Formspree's free tier is
      the shortest path.
- [ ] **Board roster and headshots.** `team.html` is full of
      "Board member name" placeholders. See `assets/img/team/README.md` for
      photo specs and a batch-resize command.
- [ ] **Events.** `events.html` and the preview block on `index.html` list
      programming with `TBD` dates. Put real dates in, or cut the entries you
      are not running this semester.
- [ ] **Google Calendar embed.** `events.html` has a marked spot for it.
- [ ] **Insights.** `insights.html` has sample entries. Replace with real
      articles and newsletter issues, or delete the sections until you have
      some — three obviously-fake entries read worse than none.
- [ ] **Partner logos.** `partners.html` and `index.html` list partner names as
      text. Swap to logo images only once you have permission to display them.
- [ ] **Social links.** The Instagram, Facebook, and CampusGroups URLs in every
      footer are the ones we could find publicly. Confirm they are current.

Every one of these is marked in the HTML with an `EDIT ME` comment, so you can
also just open a file and search for `EDIT ME`.

---

## Files

```
site/
├── index.html          Home — mission, three pillars, committees, events
├── about.html          Mission, structure, governance, FAQ
├── committees.html     All seven committees in detail
├── team.html           Executive board, AVPs, advisors
├── events.html         Upcoming, signature programming, calendar, past events
├── involvement.html    How to join, membership tiers, applications
├── insights.html       Newsletter archive, research, policy briefs
├── partners.html       Sponsorship, recruiting, alumni
├── constitution.html   Full constitution with a sticky table of contents
├── contact.html        Contact form and direct addresses
├── 404.html            Not-found page
├── robots.txt
├── sitemap.xml         Update when you add or remove a page
└── assets/
    ├── css/styles.css  The entire design system, one file, sectioned + commented
    ├── js/main.js      Mobile nav, current-page marking, TOC scrollspy
    └── img/
        ├── logo.svg
        ├── favicon.svg
        └── team/       Headshots go here (see that folder's README)
```

The header and footer are copy-pasted into every page rather than shared. That
is deliberate: it keeps the site dependency-free and editable by anyone. The
cost is that **a change to the nav has to be made in all 11 files**. Do it with
find-and-replace in your editor.

---

## Editing

### Text
Open the `.html` file, find the words, change them. Everything between
`>` and `<` is text.

### Adding an event
In `events.html`, copy one `<article class="event">` block and edit the date,
title, and description. Keep them in date order.

### Adding a board member
In `team.html`, copy one `<article class="person">` block. Drop their headshot
in `assets/img/team/` and update the `src`.

### Adding an article
In `insights.html`, copy one `<article class="post">` block.

### Colors and fonts
All in the `:root` block at the top of `assets/css/styles.css`. Change
`--teal` once and it updates everywhere. Dark mode is handled automatically
by a matching block near the bottom of the file — if you change a brand color,
glance at that block too.

The tokens worth knowing:

| Token | What it controls |
| --- | --- |
| `--teal`, `--teal-dark` | Accent: links, primary buttons, eyebrows |
| `--teal-deep` | Background of the hero, footer, and dark bands |
| `--bg`, `--bg-2` | The grey page background |
| `--surface`, `--surface-2` | Cards and panels sitting on that grey |
| `--ink`, `--ink-2`, `--ink-3` | Body text, from darkest to most muted |
| `--on-dark*` | Text and buttons on the dark teal bands |
| `--line`, `--line-strong` | Dividers and hover borders |
| `--line-control` | Borders of inputs and buttons — keep this at 3:1 |

There is no white and no red anywhere in the palette; both were replaced. If
you reintroduce a color, check it at
[webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/)
against whichever background it lands on.

### Previewing your changes
Double-clicking an HTML file works for most things. For the real thing, run a
local server from inside `site/`:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Stop it with Ctrl-C.

---

## Wiring up the forms

A static site cannot send email by itself. Pick one:

**Mailchimp (newsletter).** In Mailchimp: Audience → Signup forms → Embedded
form. Copy the `action` URL out of the code it gives you and paste it into the
`action="#"` of each `<form data-newsletter>`. The field is already named
`EMAIL`, which is what Mailchimp expects.

**Formspree (contact form).** Create a free form at
[formspree.io](https://formspree.io), then in `contact.html` set
`action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"`. The
existing field names work as-is.

**Google Forms (either).** Build the form in Google Forms and replace the whole
`<form>` block with the iframe embed code. Least pretty, zero accounts to
manage, and it never expires when an officer graduates — which is a real
advantage for a club.

---

## Deploying

The site publishes to GitHub Pages via
`.github/workflows/deploy-site.yml`. Any push to `main` (or to
`claude/jolly-johnson-fugd2j`) that touches `site/**` triggers a deploy.

**One-time setup:** in the repository, go to Settings → Pages → Build and
deployment → Source, and choose **GitHub Actions**. That is the whole setup.
There is no build step, so nothing can fail to compile.

### Pointing whartonenergygroup.com at it

Only do this when you are ready to move off the current host — DNS changes take
effect fast and the old site stops being reachable.

1. Add a file named `CNAME` in `site/`, containing exactly one line:
   `whartonenergygroup.com`
2. In the repository: Settings → Pages → Custom domain → enter
   `whartonenergygroup.com` → Save.
3. At your DNS registrar, create four `A` records for the apex domain pointing
   at `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and
   `185.199.111.153`, plus a `CNAME` for `www` pointing at
   `<your-github-username>.github.io`.
4. Wait for DNS to propagate, then tick **Enforce HTTPS** in the Pages
   settings. The certificate is issued automatically and is free.

The `CNAME` file is deliberately **not** included yet, so that enabling Pages
for testing cannot interfere with the live site.

### Hosting somewhere else instead

The site is just files, so any static host works. Netlify and Vercel both
accept a drag-and-drop of the `site/` folder, or a repo connection with the
publish directory set to `site` and the build command left empty. Cloudflare
Pages is the same.

---

## Things worth not breaking

- **The skip link and focus outlines.** They are how keyboard and screen-reader
  users navigate. They look like nothing and matter a lot.
- **`alt` attributes on images.** Decorative images (the logo mark, headshots
  sitting next to a name) correctly use `alt=""`. A photo carrying information
  a sighted reader gets and a blind reader would not needs real alt text.
- **Heading order.** One `<h1>` per page, then `<h2>`, then `<h3>`. Do not skip
  a level to get a smaller font — use a class instead.
- **The dark mode block** at the bottom of the stylesheet. Roughly a third of
  visitors will be in dark mode; if you add a hard-coded color somewhere, check
  it there too.
- **Contrast.** If you introduce a new color, check it against its background
  at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/).
  Body text needs 4.5:1.

---

## Handing this over

When you step down, walk your successor through:

1. This README, top to bottom.
2. Where the repository is and how they get write access.
3. Which accounts the forms depend on (Mailchimp? Formspree? whose Google
   account owns the Form?) — **this is the thing that actually breaks between
   boards.** Club accounts should not be tied to a personal login.
4. Who controls the `whartonenergygroup.com` domain registration and when it
   renews. A domain lapsing over the summer is the single most common way a
   student club loses its website.
