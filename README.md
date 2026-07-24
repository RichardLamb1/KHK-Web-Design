# [KHK Delta Chapter Website](https://delta.khk.org/)

This repository contains the website source tree for Kappa Eta Kappa, Delta Chapter at the University of Wisconsin-Madison.

## Overview

This is a modern, responsive website for Kappa Eta Kappa, a co-ed professional fraternity for Electrical Engineering and Computer Science students. Originally designed for use at Delta Chapter, other chapters of KHK are welcome to use this material as well.

## How-To For Future Web Developers

KHK is famously notorious for rebuilding our website. We've gone through quite a few iterations over the years bouncing back and forth between plain old HTML, WordPress, Jekyll, and Hugo. In fact, you can check out past ones on the [Internet Archive Wayback Machine](https://web.archive.org/web/*/https://delta.khk.org/) if you're curious! Our goal is to future-proof our work so there is no need for this anymore.

Common edits can be made through configuration files in `/_config`, `/_data`, and `/_config.yml`. For anything not configurable through these files (images, text, etc.), you'll need to edit the individual HTML, CSS, and JS files (see **Project Structure** below). If you're unfamiliar with HTML, CSS, and JS, AI tools (ChatGPT, Gemini, Claude, GitHub Copilot, etc.) are very useful. Fun fact: much of this site was originally written by AI!

TODO: write this documentation

### Getting Started

### Editing Alumni Cards (/about)

### Editing Rush Events Calendar (/rush)

### Editing Rush FAQs (/rush)

### Editing Testimonials (/rush)

### Editing Active Members (/members)

### Editing Contact Information (entire site)
Update the footer with actual contact details in `/_config.yml`:
- Address: 114 N Orchard St, Madison, WI 53715
- Email: contact@delta.khk.org
- Phone: +1 (608) 251-7545

### Editing Social Media Links (entire site)
Update the social media icon links in in `/_config.yml`:
TODO: yaml structure for this

## Project Structure

```
/
├── index.html                # Main homepage
├── css/
│   ├── style.css             # Main stylesheet
│   └── ...                   # Additional styles for subpages
├── js/
│   └── main.js               # Main script
├── assets/
│   ├── fonts/                # Font files
│   ├── img/                  # Image files (event photos, member photos)
│   │   └── members/          # Member directory images
│   └── svg/                  # SVG files (logos, crests, icons)
└ ...                         # Additional pages
```

## Tech Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with animations and gradients
- **JavaScript**: Interactive features and form handling
- [**Bootstrap 5.3**](https://getbootstrap.com/docs/5.3/getting-started/introduction/): Responsive grid system and components
- [**Font Awesome 6.4**](https://fontawesome.com/): Icon library for social media and UI elements
- [**Jekyll**](https://jekyllrb.com/): Static site generator for content management
- [**GitHub Pages**](https://pages.github.com/): Web hosting service provider

## Key Features Explained

### Navigation
- Sticky navigation bar that stays visible while scrolling
- Active link highlighting based on current scroll position
- Mobile hamburger menu for responsive design
- Smooth scroll to sections when links are clicked

### Color Scheme
- **Primary**: #4a1f6f (Purple)
- **Secondary**: #c41e3a (Red)
- **Accent**: #ffc72c (Gold)

### Animations & Effects
- Fade-in animations on scroll
- Hover effects on buttons and cards
- Smooth transitions throughout
- Scroll-to-top button appears after scrolling down

### Accessibility
- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus visible styles for accessibility

## License

Website content (C) 2026 Delta of Kappa Eta Kappa. All rights reserved.

---

**Last Updated**: 2026-07-23
