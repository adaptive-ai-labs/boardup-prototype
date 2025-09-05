# Deployment Guide

## Overview

BoardUp is a React-based single-page application built with Vite. This guide covers deployment to various hosting platforms and best practices for production deployment.

## Build Process

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Build Commands
```bash
# Install dependencies
npm install

# Run type checking
npm run lint

# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Build Output
The build process creates a `dist/` directory containing:
- `index.html` - Main HTML file
- `assets/` - JavaScript, CSS, and static assets with hashed filenames
- Optimized and minified code ready for production

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel provides excellent React/Vite support with zero-config deployment.

#### Automatic Deployment
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel auto-deploys on every push to main branch

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel

# Deploy to production
vercel --prod
```

#### Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Netlify

Netlify offers similar zero-config deployment with excellent performance.

#### Automatic Deployment
1. Connect GitHub repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

#### Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 3. GitHub Pages

Free hosting option for public repositories.

#### Setup
1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update vite.config.ts for GitHub Pages:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/boardup/', // Replace with your repository name
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### 4. AWS S3 + CloudFront

For more control and AWS ecosystem integration.

#### S3 Setup
```bash
# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://boardup-app

# Upload build files
aws s3 sync dist/ s3://boardup-app --delete

# Configure bucket for static hosting
aws s3 website s3://boardup-app \
  --index-document index.html \
  --error-document index.html
```

#### CloudFront Configuration
```json
{
  "Origins": [{
    "Id": "S3Origin",
    "DomainName": "boardup-app.s3.amazonaws.com",
    "S3OriginConfig": {
      "OriginAccessIdentity": ""
    }
  }],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3Origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {"Forward": "none"}
    }
  },
  "CustomErrorResponses": [{
    "ErrorCode": 404,
    "ResponseCode": 200,
    "ResponsePagePath": "/index.html",
    "ErrorCachingMinTTL": 300
  }]
}
```

## Environment Variables

### Development Environment
Create `.env.local` file:
```bash
# API Configuration (when backend is implemented)
VITE_API_URL=http://localhost:3001
VITE_APP_ENV=development

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Feature Flags
VITE_ENABLE_VOICE_FEATURES=true
VITE_ENABLE_BETA_FEATURES=false
```

### Production Environment
Set environment variables in your deployment platform:
```bash
VITE_API_URL=https://api.boardup.com
VITE_APP_ENV=production
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Environment Variable Usage
```typescript
// In your React components
const apiUrl = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.VITE_APP_ENV === 'production';
```

## Performance Optimization

### Build Optimizations

#### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Generate source maps for production debugging
    sourcemap: true,
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    
    // Set chunk size warnings
    chunkSizeWarningLimit: 600
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
```

### Bundle Analysis
```bash
# Analyze bundle size
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
})
```

### Compression
Most deployment platforms automatically compress assets, but for custom servers:

```bash
# Gzip compression
gzip -9 -c dist/assets/*.js > dist/assets/*.js.gz
gzip -9 -c dist/assets/*.css > dist/assets/*.css.gz

# Brotli compression (better than gzip)
brotli -q 11 dist/assets/*.js
brotli -q 11 dist/assets/*.css
```

## Custom Domain Setup

### DNS Configuration
```
# A Records (for root domain)
@ IN A 76.76.19.61

# CNAME (for subdomains)
www IN CNAME boardup.vercel.app.
```

### SSL Certificate
Most platforms (Vercel, Netlify) provide automatic SSL certificates. For custom setups:

```bash
# Using Certbot for Let's Encrypt
certbot --webroot -w /var/www/boardup -d boardup.com -d www.boardup.com
```

## Monitoring and Analytics

### Error Tracking
```typescript
// Sentry integration (optional)
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.VITE_APP_ENV,
});
```

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Google Analytics
```typescript
// Google Analytics 4
import { gtag } from 'ga-gtag';

gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
  page_title: document.title,
  page_location: window.location.href
});
```

## Security Considerations

### Content Security Policy
```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.boardup.com;
">
```

### HTTPS Enforcement
All deployment platforms should enforce HTTPS:
```javascript
// Redirect HTTP to HTTPS (if needed)
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

## Continuous Deployment

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Build application
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
        VITE_GOOGLE_ANALYTICS_ID: ${{ secrets.VITE_GOOGLE_ANALYTICS_ID }}
    
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

## Backup and Recovery

### Code Backup
- Primary: GitHub repository
- Mirror: GitLab or Bitbucket
- Local: Regular git pulls

### Deployment Rollback
```bash
# Vercel rollback
vercel rollback [deployment-url]

# Netlify rollback (via dashboard or CLI)
netlify api rollbackSiteDeploy --site-id SITE_ID --deploy-id DEPLOY_ID
```

## Performance Targets

### Core Web Vitals Goals
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Bundle Size Goals
- Initial bundle: < 300KB gzipped
- Total JavaScript: < 1MB gzipped
- First paint: < 1.5s on 3G

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

#### Routing Issues (404 on Refresh)
Ensure your hosting platform is configured for SPA routing:
- All routes should serve `index.html`
- Configure rewrites/redirects properly

#### Environment Variable Issues
```bash
# Check if variables are properly prefixed with VITE_
echo "API URL: $VITE_API_URL"

# Verify in build
npm run build && grep -r "VITE_API_URL" dist/
```

## Future Considerations

### Backend Integration
When the backend API is ready:
1. Update API URLs in environment variables
2. Replace mock data with real API calls
3. Implement proper error handling
4. Add loading states

### Mobile App
The current codebase can be adapted for mobile:
- React Native with shared components
- Capacitor for hybrid app approach
- Progressive Web App (PWA) features

### Scaling
For high traffic:
- CDN for global distribution
- Database optimization
- Caching strategies
- Load balancing

---

This deployment guide will be updated as the application evolves and new requirements emerge.