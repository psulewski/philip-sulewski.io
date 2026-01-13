# Philip Sulewski's Academic Website - Developer Guide

## Overview

This is Philip Sulewski's personal academic website, built as a single-page application using vanilla HTML, CSS, and JavaScript. The site showcases research, publications, CV, and contact information for a PhD candidate in Cognitive Science.

## Project Structure

```
philip-sulewski.io/
├── index.html              # Main website file (single-page app)
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── script.js      # Interactive functionality
│   └── images/            # Profile pictures, logos, project images
├── README.md              # GitHub repository documentation
└── CLAUDE.md              # This file - developer documentation
```

## Development Commands

### Local Development

To preview the website locally, you can use any simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Git Operations

```bash
# Check status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

## Architecture

### Single-Page Application

The website is a single-page application where all content is contained in `index.html`. Navigation is handled via JavaScript, showing/hiding different sections without page reloads.

**Key sections:**
- About (data-page="about")
- Projects (data-page="projects")
- Publications (data-page="publications")
- CV (data-page="CV")
- Blog (data-page="blog")
- Contact (data-page="contact")

### Content Management System

**Publications are directly embedded in HTML** in the Publications section (starting around line 650). The publication structure uses timeline components with these subsections:

1. **Journal Articles** - Peer-reviewed published papers
2. **Preprints** - Papers on preprint servers (bioRxiv, ResearchSquare, etc.)
3. **Conference Contributions** - Posters and talks at conferences
4. **Invited Talks** - Invited presentations
5. **Theses** - Master's and Bachelor's theses

**CV content** is also directly embedded in HTML in the CV section (starting around line 951) with these subsections:

1. **Education**
2. **Research Experience**
3. **Teaching Experience**
4. **Student Supervision**
5. **Academic Service**
6. **Awards & Scholarships**

### Publication Entry Format

Journal articles and preprints follow this HTML structure:

```html
<li class="timeline-item">
  <h4 class="h4 timeline-item-title">Paper Title</h4>
  <span>Year</span>
  <p class="timeline-text">
    <strong>Authors</strong><br>
    <em>Journal/Venue</em>. <a href="DOI URL" target="_blank">DOI</a>
  </p>
</li>
```

### CV Entry Format

CV entries follow this structure:

```html
<li class="timeline-item">
  <h4 class="h4 timeline-item-title">Position/Role Title</h4>
  <span>Date Range</span>
  <p class="timeline-text">
    Description of the role, responsibilities, or achievements.
  </p>
  <p class="supervisor">Supervisor: Name (if applicable)</p>
</li>
```

## Key Implementation Details

### Navigation System

The navigation is controlled by `script.js` which:
1. Listens for clicks on navbar buttons (`.navbar-link`)
2. Updates the active state of navigation items
3. Shows/hides article sections based on the `data-page` attribute
4. Maintains clean URLs (no hash navigation)

### Responsive Design

The site uses CSS media queries for responsive layouts:
- Mobile-first approach
- Sidebar collapses on mobile devices
- Grid layouts adjust based on screen size
- Touch-friendly navigation

### Icon System

Uses Ionicons 5.5.2 for all icons throughout the site:
```html
<ion-icon name="icon-name"></ion-icon>
```

Common icons used:
- `book-outline` - Education
- `briefcase-outline` - Experience
- `school-outline` - Academic
- `trophy-outline` - Awards
- `people-outline` - Supervision
- `document-text-outline` - Preprints
- `library-outline` - Conference papers

## Adding/Updating Content

### Adding a New Publication

1. Locate the appropriate section in `index.html` (Journal Articles, Preprints, etc.)
2. Find the `<ol class="timeline-list">` element
3. Add a new `<li class="timeline-item">` following the format above
4. Ensure proper ordering (newest first)

### Moving a Preprint to Published

When a preprint gets published:
1. Add the publication to the "Journal Articles" section with full citation
2. Remove the corresponding preprint entry from the "Preprints" section
3. Update the year and add journal information

### Updating CV

1. Navigate to the CV section (data-page="CV")
2. Find the appropriate subsection
3. Add entries following the timeline format
4. Maintain reverse chronological order (newest first)

### Adding a New CV Section

To add a new section (like Academic Service):
1. Copy an existing section structure
2. Update the icon-box icon name
3. Update the h3 title
4. Add timeline-list items
5. Ensure proper placement in the document flow

## Browser Compatibility

The website uses modern web standards but maintains broad compatibility:
- HTML5 semantic elements
- CSS Grid and Flexbox
- Vanilla JavaScript (ES6+)
- Progressive enhancement approach

Tested and working on:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

The site is designed to be deployed as static files. Compatible with:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

No build process or server-side rendering required.

## Customization Tips

### Changing Colors

Main color variables would typically be defined at the top of `style.css`. Look for CSS custom properties (variables) or color definitions.

### Adding New Sections

1. Add a new navigation item in the navbar
2. Create a new `<article>` with appropriate `data-page` attribute
3. The JavaScript will automatically handle showing/hiding

### Updating Images

- Profile image: `assets/images/profile_twitter.jpg`
- Lab logos: `assets/images/`
- Maintain consistent sizing for best results

## Maintenance Notes

### Regular Updates Needed

- Publications as they are published
- CV entries for new positions, teaching, supervision
- Update funding/affiliations as they change
- Keep social media links current

### Performance Considerations

- Optimize images before adding (compress large files)
- Lazy loading is enabled for project images
- Keep the single HTML file size reasonable (currently ~50KB)

## Contact & Support

For issues or questions about this website:
- Primary: Philip Sulewski (contact info in the website sidebar)
- GitHub Issues: Use the repository issue tracker

---

Last updated: January 2026
