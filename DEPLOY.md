# Deploying to Cloudflare Pages

## One-time setup

1. Push this folder to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PRAYING prayer app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages →
   Connect to Git**, and pick your repository.

3. Use these build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`

4. Click **Save and Deploy**. Cloudflare gives you a URL like
   `your-project.pages.dev`.

## Putting it on formedformore.org

In your Pages project: **Custom domains → Set up a custom domain**, and enter
a subdomain such as `pray.formedformore.org`. Cloudflare walks you through the
DNS record (this is seamless if formedformore.org is already on Cloudflare).

## Future updates

Every time you push to the `main` branch on GitHub, Cloudflare automatically
rebuilds and redeploys. No manual steps.
