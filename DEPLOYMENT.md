# Deployment Guide - Wassiya.fr

This guide explains how to deploy the Wassiya.fr application to various hosting platforms.

## Prerequisites

-   Node.js 18+ installed
-   Git installed
-   A GitHub account (for most hosting options)

## Building for Production

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Build the project**

    ```bash
    npm run build
    ```

    This creates an optimized production build in the `dist/` directory.

3. **Preview the build locally**
    ```bash
    npm run preview
    ```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers excellent performance and is free for personal projects.

1. **Install Vercel CLI**

    ```bash
    npm install -g vercel
    ```

2. **Deploy**

    ```bash
    vercel
    ```

3. **Or deploy via GitHub**
    - Push your code to GitHub
    - Go to [vercel.com](https://vercel.com)
    - Import your repository
    - Vercel will auto-detect Vite and configure everything

**Configuration:**

-   Framework Preset: Vite
-   Build Command: `npm run build`
-   Output Directory: `dist`

### Option 2: Netlify

1. **Install Netlify CLI**

    ```bash
    npm install -g netlify-cli
    ```

2. **Build and deploy**

    ```bash
    npm run build
    netlify deploy --prod
    ```

3. **Or deploy via GitHub**
    - Push to GitHub
    - Go to [netlify.com](https://netlify.com)
    - Connect your repository
    - Set build settings:
        - Build command: `npm run build`
        - Publish directory: `dist`

### Option 3: GitHub Pages

1. **Install gh-pages**

    ```bash
    npm install --save-dev gh-pages
    ```

2. **Update vite.config.ts**

    ```typescript
    export default defineConfig({
    	base: "/wassiya-app/", // your repo name
    	// ... other config
    });
    ```

3. **Add deploy script to package.json**

    ```json
    {
    	"scripts": {
    		"deploy": "npm run build && gh-pages -d dist"
    	}
    }
    ```

4. **Deploy**
    ```bash
    npm run deploy
    ```

### Option 4: Traditional Web Hosting

For traditional hosting (shared hosting, VPS):

1. **Build the project**

    ```bash
    npm run build
    ```

2. **Upload the `dist/` folder contents**

    - Use FTP/SFTP to upload all files from `dist/` to your web root
    - Typically to `public_html/` or `www/`

3. **Configure server**

    - Ensure all routes redirect to `index.html` for client-side routing

    **Apache (.htaccess):**

    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>
    ```

    **Nginx:**

    ```nginx
    location / {
      try_files $uri $uri/ /index.html;
    }
    ```

## Environment Variables

For production, create a `.env.production` file:

```env
VITE_APP_NAME=Wassiya.fr
VITE_APP_VERSION=1.0.0
VITE_ENABLE_PDF_DOWNLOAD=true
```

## Performance Optimization

### 1. Enable Compression

Ensure your hosting enables gzip/brotli compression.

### 2. Cache Headers

Configure proper cache headers for static assets:

```nginx
# Nginx example
location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN (Optional)

Consider using a CDN like Cloudflare for:

-   Faster global delivery
-   DDoS protection
-   SSL certificate
-   Caching

## SSL Certificate

Always use HTTPS for security:

-   **Vercel/Netlify**: Automatic SSL
-   **Custom domain**: Use Let's Encrypt (free)
-   **Cloudflare**: Free SSL proxy

## Post-Deployment Checklist

-   [ ] Test all form steps
-   [ ] Verify PDF generation works
-   [ ] Test on mobile devices
-   [ ] Check page load speed
-   [ ] Verify local storage works
-   [ ] Test all navigation links
-   [ ] Ensure HTTPS is working
-   [ ] Test browser compatibility

## Monitoring

### Analytics (Optional)

If you want basic analytics while respecting privacy:

-   Use privacy-focused tools like Plausible or Fathom
-   Never track personal data
-   Make it clear in privacy policy

### Error Tracking (Optional)

Consider Sentry for error tracking:

```bash
npm install @sentry/react
```

## Updating

To update the deployed application:

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Most platforms auto-deploy on push
5. Or manually run:
    ```bash
    npm run build
    vercel --prod  # or netlify deploy --prod
    ```

## Custom Domain

### Vercel

1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify

1. Go to Domain Management
2. Add custom domain
3. Configure DNS

## Backup

-   Keep your GitHub repository as backup
-   Regularly commit changes
-   Consider exporting localStorage data periodically

## Support

For deployment issues:

-   Check hosting platform documentation
-   Review build logs for errors
-   Ensure Node.js version matches requirements
-   Verify all dependencies are installed

## Security Considerations

-   Enable HTTPS only
-   Set security headers
-   No server-side processing needed
-   All data stays client-side
-   Regular dependency updates

---

**Remember:** This is a privacy-first application. Never add server-side data storage or tracking without explicit user consent.
