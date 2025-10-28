# Deployment Guide

This guide explains how to deploy the Exam Seating Arranger to various platforms.

## Table of Contents
- [GitHub Pages (Recommended)](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Self-Hosting](#self-hosting)

## GitHub Pages

The easiest way to deploy this project is using GitHub Pages, which is free and automatic.

### Setup Steps

1. **Push code to GitHub**
```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/exam-seating-arranger.git
   git push -u origin main
```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select branch: **main** and folder: **/ (root)**
   - Click **Save**

3. **Access your site**
   - Your site will be available at: `https://yourusername.github.io/exam-seating-arranger/`
   - It may take a few minutes for the first deployment

### Custom Domain (Optional)

1. Add a `CNAME` file to your repository:
```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
```

2. Configure DNS at your domain provider:
```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
```

## Netlify

### Option 1: Drag and Drop

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in
3. Drag your project folder to the upload area
4. Your site is live!

### Option 2: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: (leave empty or set to `/`)
4. Click **Deploy site**

## Vercel

1. Go to [Vercel](https://vercel.com/)
2. Click **Import Project**
3. Connect your Git repository
4. Configure:
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Click **Deploy**

## Self-Hosting

### Requirements
- Any web server (Apache, Nginx, IIS)
- No server-side processing required

### Apache

1. Copy files to your web directory:
```bash
   cp -r * /var/www/html/exam-seating-arranger/
```

2. Optional `.htaccess` for clean URLs:
```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /exam-seating-arranger/
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule ^.*$ index.html [L,QSA]
   </IfModule>
```

### Nginx

1. Copy files to web directory:
```bash
   cp -r * /usr/share/nginx/html/exam-seating-arranger/
```

2. Nginx configuration:
```nginx
   location /exam-seating-arranger/ {
       alias /usr/share/nginx/html/exam-seating-arranger/;
       index index.html;
       try_files $uri $uri/ /exam-seating-arranger/index.html;
   }
```

### Docker (Optional)

Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t exam-seating-arranger .
docker run -d -p 8080:80 exam-seating-arranger
```

## Security Considerations

### HTTPS
Always serve your application over HTTPS:
- GitHub Pages: Automatic
- Netlify/Vercel: Automatic
- Self-hosted: Use Let's Encrypt

### Content Security Policy
Add to your HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'">
```

### Headers
Recommended security headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Performance Optimization

### Optional: Minification
If you want to minify for production:
```bash
# Install minification tools
npm install -g clean-css-cli uglify-js html-minifier

# Minify CSS
cleancss -o styles.min.css styles.css

# Minify JavaScript
uglifyjs script.js -o script.min.js -c -m

# Update index.html to reference minified files
```

### CDN (Optional)
For better global performance, use a CDN:
- Cloudflare (Free)
- AWS CloudFront
- Google Cloud CDN

## Monitoring

### Analytics (Optional)
Add analytics to track usage:

**Google Analytics:**
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Files not loading
- Check file paths are correct
- Ensure case-sensitive naming on Linux servers
- Verify MIME types are correct

### Blank page
- Check browser console for errors
- Verify all files were uploaded
- Check file permissions (644 for files, 755 for directories)

### CORS errors
- Should not occur as all resources are local
- If using CDN, ensure proper CORS headers

## Updates

To update your deployment:

**GitHub Pages:**
```bash
git add .
git commit -m "Update: description of changes"
git push
```

**Netlify/Vercel:**
- Push to your Git repository (auto-deploys)
- Or drag & drop new files

**Self-hosted:**
```bash
# Backup current version
cp -r /var/www/html/exam-seating-arranger /var/www/html/exam-seating-arranger.backup

# Upload new files
cp -r * /var/www/html/exam-seating-arranger/
```

---

For support, please open an issue on GitHub.