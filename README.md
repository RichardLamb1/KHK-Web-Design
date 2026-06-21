# KHK Delta Chapter - HTML Templates

This repository contains core HTML, CSS, and JavaScript for Kappa Eta Kappa, Delta Chapter at the University of Wisconsin-Madison.

## Overview

This is a modern, responsive website for Kappa Eta Kappa, a co-ed professional fraternity for Electrical Engineering and Computer Science students. Originally designed for use at Delta Chapter, other chapters of KHK are welcome to use this material as well.

## Goals

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Navigation Bar**: Quick access to all main sections with sticky top positioning
- **Hero Section**: Eye-catching introduction with the KHK crest
- **Multiple Sections**:
  - About Us: Organization overview and mission
  - Events: Professional and social events highlights
  - Gallery: Event photos and memories
  - Rush Information: Guide for prospective members
  - Members: Statistics and member directory link
  - Alumni: Information about our alumni network
  - Newsletter: Email subscription form
- **Footer**: Complete contact information, social media links, and external links
- **Interactive Elements**: Smooth scrolling, animations, form validation

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
- **Bootstrap 5**: Responsive grid system and components
- **Font Awesome 6**: Icon library for social media and UI elements

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

## Customization Guide

### Contact Information
Update the footer with actual contact details in `index.html`:
- Address: 114 N Orchard St, Madison, WI 53715
- Email: contact@delta.khk.org
- Phone: +1 (608) 251-7545

### Social Media Links
Update the social media icon links in the footer:
```html
<a href="YOUR_INSTAGRAM_URL" class="social-icon" title="Instagram">
    <i class="fab fa-instagram"></i>
</a>
```

### Event Photos
Replace placeholder images in the gallery section:
- `assets/img/resume_workshop.jpg`
- `assets/img/executive_board.jpg`
- `assets/img/spring_2025_casino_night.jpg`

### External Links
Update placeholder links in `index.html`:
- Rush Information link
- Member Directory link
- Alumni Association link
- National Organization link
- University of Wisconsin-Madison link

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images for web
- CDN-hosted Bootstrap and Font Awesome
- Minimal custom CSS and JavaScript
- Lazy loading for images (built-in with modern browsers)

## Responsive Breakpoints

- **Large (lg)**: 992px and up
- **Medium (md)**: 768px - 991px
- **Small (sm)**: 576px - 767px
- **Extra Small (xs)**: Below 576px

## Roadmap

Short term:
- Finalize design, HTML layouts, and page content
- Collaborate with design team for more specific details

Long term:
- Migration to a static content manager (Jekyll, Hugo, etc)
- Possible backend integration with login system
  - Issue each member a login so they can update their composite photo and links

## License

Website content (C) 2026 Delta of Kappa Eta Kappa. All rights reserved.

Website tools (HTML, CSS, JS) (C) 2026 Richard Lamb. License TBD.

---

**Last Updated**: 2026
