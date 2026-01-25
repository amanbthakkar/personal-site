# Personal Website - amanthakkar.com

A modern, responsive personal website built with React and Vite, showcasing projects, resume, and a Bitcoin indicator.

## Features

- 🚀 **Fast & Modern**: Built with Vite for lightning-fast development and builds
- 📱 **Responsive**: Mobile-first design that works on all devices
- ♿ **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- 🔗 **URL Shortener**: Personal URL shortening service integration
- 📊 **Bitcoin Indicator**: Live Bitcoin Power Law Oscillator indicator
- 📈 **Analytics**: Self-hosted visitor tracking

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router 6** - Client-side routing
- **SCSS** - Styling
- **React Hot Toast** - Toast notifications
- **React Error Boundary** - Error handling

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amanbthakkar/personal-site.git
cd personal-site
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp sample.env .env.local
```

Edit `.env.local` and add:
```
VITE_GA_TRACKING_ID=your-google-analytics-id
```

### Development

Start the development server:
```bash
npm start
# or
npm run dev
```

The site will be available at `http://localhost:3000`

### Building

Build for production:
```bash
npm run build
```

The build output will be in the `build/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
  components/     # Reusable React components
  constants/      # Constants and configuration
  data/          # Static data (projects, resume, etc.)
  hooks/         # Custom React hooks
  layouts/       # Layout components
  pages/         # Page components
  services/      # API service layer
  static/        # Static assets (CSS, images)
  utils/         # Utility functions
```

## Environment Variables

- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID (optional)

## Deployment

This site is deployed to GitHub Pages via GitHub Actions. Simply push to the `main` branch and the workflow will automatically build and deploy.

### Manual Deployment

1. Build the project: `npm run build`
2. The `build/` directory contains the static files
3. Deploy the contents of `build/` to your hosting service

## Features in Detail

### URL Shortener
- Personal URL shortening service
- Form validation and error handling
- Copy-to-clipboard functionality
- Automatic redirect handling

### Bitcoin Indicator
- Live indicator updated daily
- Cache-busting for fresh images
- Responsive image display
- Detailed explanation and interpretation guide

### Visitor Tracking
- Self-hosted analytics
- Cookie-based unique visitor detection
- Privacy-friendly (no personal data collected)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a personal website, but suggestions and improvements are welcome!

## License

MIT

## Author

**Aman Thakkar**
- Website: [amanthakkar.com](https://amanthakkar.com)
- Email: amanbthakkar@gmail.com
- LinkedIn: [amanbthakkar](https://www.linkedin.com/in/amanbthakkar/)
