# Netlify Deployment TODO

## Plan Summary
Deploy the full-stack e-commerce project to Netlify by adapting the backend to serverless functions and configuring the build.

## Steps
1. **Create netlify.toml**: Configure build settings for the React frontend.
2. **Build Frontend**: Run `npm run build` in the frontend directory to generate static files.
3. **Create Netlify Functions**:
   - Create `netlify/functions/products.js` based on backend routes and controllers.
   - Create `netlify/functions/categories.js`.
   - Create `netlify/functions/cart.js`.
   - Create `netlify/functions/newsletter.js`.
4. **Update Frontend**: Modify API calls in the frontend to point to Netlify Functions (e.g., change `/api/` to `/.netlify/functions/`).
5. **Test Locally**: Run the build and test the functions.
6. **Deploy to Netlify**: Push to Git and deploy via Netlify dashboard or CLI.

## Progress
- [x] Step 1: Create netlify.toml
- [x] Step 2: Build Frontend
- [x] Step 3: Create Netlify Functions
- [x] Step 4: Update Frontend
- [x] Step 5: Test Locally
- [x] Step 6: Deploy to Netlify
