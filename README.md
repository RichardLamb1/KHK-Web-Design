# KHK Delta Chapter - Official Website

Welcome to the official website for Kappa Eta Kappa, Delta Chapter at the University of Wisconsin-Madison.

## Overview

This is a modern, responsive website for KHK Delta Chapter, a co-ed professional fraternity for Electrical Engineering and Computer Science students at UW-Madison. The site showcases our professional events, social activities, member community, and alumni network.

## Features

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
KHK Web Design/
├── index.html                 # Main homepage
├── css/
│   └── style.css             # Custom CSS styles
├── js/
│   └── script.js             # Custom JavaScript functionality
└── assets/
    ├── fonts/                # Font files
    ├── img/                  # Image files (event photos, member photos)
    │   └── members/          # Member directory images
    └── svg/                  # SVG files (logos, crests, icons)
```

## Technologies Used

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
- **Primary**: #1e3a5f (Navy Blue)
- **Secondary**: #c41e3a (KHK Red)
- **Accent**: #ffc72c (Gold)

### Animations & Effects
- Fade-in animations on scroll
- Hover effects on buttons and cards
- Smooth transitions throughout
- Scroll-to-top button appears after scrolling down

### Form Handling
- Email validation for newsletter signup
- Success/error notifications
- Form reset after submission

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

## Future Enhancements

Potential features to add:
- Event calendar with registration
- Member directory/login portal
- Blog/news section
- Photo gallery with lightbox
- Contact form
- Event RSVP system
- Alumni spotlight section
- Donation/fundraising page

## Getting Started

1. Open `index.html` in a web browser
2. Navigate through sections using the top menu
3. Update content and links as needed
4. Test on different devices to ensure responsiveness
5. Deploy to your web hosting service

## File Sizes

- index.html: ~20KB
- css/style.css: ~15KB
- js/script.js: ~6KB

Total (without external CDN files): ~41KB

## Support & Maintenance

For questions or assistance with the website, contact the Delta Chapter web team at contact@delta.khk.org

## License

Website content is the property of Kappa Eta Kappa, Delta Chapter. All rights reserved.

---

**Last Updated**: 2024
**Version**: 1.0.0
