# Dependencies for Millennium Platform

Here's a comprehensive list of dependencies used in the Millennium Problems Explorer & NFT Platform:

```markdown
# Dependencies

## Core Libraries
- **Tailwind CSS** (latest via CDN) - Utility-first CSS framework
  - URL: https://cdn.tailwindcss.com

## Typography
- **Google Fonts**
  - Playfair Display (400, 400 italic, 700) - Used for headings
  - Source Sans Pro (400, 600) - Used for body text
  - URL: https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+Pro:wght@400;600&display=swap

## Markdown Processing
- **Marked.js** (v4.3.0) - Markdown parser and compiler
  - URL: https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js

## Mathematics & Visualization
- **Math.js** (v11.8.0) - Math library for JavaScript
  - URL: https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.min.js

- **D3.js** (v7.8.5) - Data visualization library
  - URL: https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js

- **Plotly.js** (latest) - Interactive graphing library
  - URL: https://cdn.plot.ly/plotly-latest.min.js

## Cryptography
- **CryptoJS** (v4.1.1) - JavaScript library of crypto standards
  - URL: https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js

## Browser Support
- The application requires a modern browser that supports:
  - CSS Grid Layout
  - CSS Flexbox
  - ES6 JavaScript features
  - Canvas API
  - SVG support

## Local Storage
- The application does not require localStorage or sessionStorage

## Deployment Notes
- All libraries are loaded from CDNs specified in the Content Security Policy
- No backend dependencies required (frontend-only application)
- Total size of all dependencies: ~2MB (combined)
```

## Installation & Setup

Since this is a frontend-only application, no formal installation process is required. The app can be deployed by:

1. Copying the HTML file to a web server
2. Accessing the file through a web browser
3. All dependencies will be automatically loaded from their CDNs

## Additional Resources

For local development, you might want to consider:

1. **Local Tailwind CSS Setup**
   ```bash
   npm install tailwindcss
   npx tailwindcss init
   ```

2. **Local Development Server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. **Performance Optimization**
   - For production, consider downloading and hosting the libraries locally
   - Minify the HTML and inline critical CSS
   - Use a CDN for global distribution

