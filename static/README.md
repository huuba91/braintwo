# BrainTwo - Static Design Files

This folder contains static HTML/CSS files showcasing the BrainTwo design system for handoff to designers.

## Files Included

- `index.html` - Main dashboard with capture box and module cards
- `module-builder.html` - Custom module creation interface
- `tasks.html` - Task management interface
- `notes.html` - Notes collection and search
- `styles.css` - Custom CSS styles and utilities

## Design System

### Colors
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Background**: Light gradient (Slate-50 to Blue-50)
- **Cards**: White with 80% opacity and backdrop blur
- **Text**: Slate color palette for hierarchy

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body**: Regular (400) and medium (500)

### Components
- **Glass morphism cards** with backdrop blur
- **Rounded corners** (8px-16px radius)
- **Subtle shadows** with layered depth
- **Smooth hover animations**
- **Responsive grid layouts**

### Icons
- Lucide icons via CDN
- Consistent 4px-6px sizing
- Color-coded by category

## Technical Notes

- Uses Tailwind CSS via CDN for rapid styling
- Responsive design with mobile-first approach
- Semantic HTML structure
- Accessible color contrast ratios
- Print-friendly styles included

## Browser Support
- Modern browsers with backdrop-filter support
- Graceful degradation for older browsers
- Mobile responsive design

## Usage
Open any HTML file in a web browser to view the design. All dependencies are loaded via CDN so no build process is required.