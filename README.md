# CartLite E-Commerce Website

A modern, responsive e-commerce website built with React, Tailwind CSS, and Node.js. This project showcases a full-stack e-commerce solution with a focus on user experience, modern design, and scalable architecture using mock data for demonstration purposes.

## 👨‍💻 About the Developer

**Rudrasena Reddy**
Frontend Developer
[GitHub](https://github.com/RudrasenaReddy87) | [LinkedIn](https://www.linkedin.com/in/bodireddyrudrasenareddy) | [Portfolio](https://rudrasenareddy87.github.io/Coding-Profiles)

## 🚀 Features

- **Product Catalog**: Dynamic product showcase with 8 sample products across multiple categories
- **Category Management**: 8 product categories (Fashion, Electronics, Sports, Home & Garden, Books, Jewelry, Beauty, Accessories)
- **Shopping Cart**: Complete cart functionality with add, update, remove, and clear operations
- **Newsletter Subscription**: Email newsletter signup and management system
- **Product Search & Filtering**: Browse products by category with detailed product information
- **Responsive Design**: Mobile-first design optimized for all devices using Tailwind CSS
- **Mock Data Integration**: In-memory data storage for demonstration and development
- **RESTful API**: Well-structured backend API with proper error handling

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware
- **Body-parser** - Parse incoming request bodies
- **Dotenv** - Environment variable management
- **Nodemon** - Development tool for auto-restarting the server

### Frontend
- **React 18** - JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing for single-page applications
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **PostCSS** - CSS post-processing tool
- **React Scripts** - Build and development scripts
- **Testing**: Jest, React Testing Library, User Event Testing
- **Web Vitals** - Performance monitoring and optimization

## 📁 Project Structure

```
CartLite-E-Commerce-WebSite/
├── backend/
│   ├── package.json
│   ├── server.js                    # Main server file
│   ├── src/
│   │   ├── controllers/             # API controllers
│   │   │   ├── cartController.js    # Shopping cart logic
│   │   │   ├── categoriesController.js # Category management
│   │   │   ├── newsletterController.js # Newsletter functionality
│   │   │   └── productsController.js # Product management
│   │   ├── middleware/              # Custom middleware (if any)
│   │   ├── models/                  # Database models (currently mock data)
│   │   └── routes/                  # API routes
│   │       ├── cart.js
│   │       ├── categories.js
│   │       ├── newsletter.js
│   │       └── products.js
│   └── package-lock.json
├── frontend/
│   ├── package.json
│   ├── src/                         # React components and pages
│   ├── public/                      # Static assets
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── package-lock.json
├── LICENSE
├── README.md
├── vercel.json                      # Vercel deployment config
├── render.yaml                      # Render deployment config
└── TODO.md                          # Project task tracking
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RudrasenaReddy87/CartLite-E-Commerce-WebSite.git
   cd CartLite-E-Commerce-WebSite
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**
   - Create a `.env` file in the backend directory
   - Add necessary environment variables (PORT configuration, etc.)

5. **Start the Development Servers**

   **Backend:**
   ```bash
   cd backend
   npm run dev  # Uses nodemon for auto-restart
   ```

   **Frontend:**
   ```bash
   cd ../frontend
   npm start
   ```

6. **Open your browser**
   - Frontend: Navigate to `http://localhost:3000`
   - Backend API: Available at `http://localhost:5000` (or your configured port)

## 📱 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:categoryId` - Get products by category
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers
- `DELETE /api/newsletter/:id` - Unsubscribe from newsletter

## 📱 Deployment

- **netlify**: Frontend & Backend deployment configured via `Netlify`
- Run `npm run build` in frontend and deploy the build folder

## 🧪 Testing

- **Frontend Testing**:
  ```bash
  cd frontend
  npm test
  ```

- **Backend Testing**: Add your test scripts as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Rudrasena Reddy**
- GitHub: [RudrasenaReddy87](https://github.com/RudrasenaReddy87)
- LinkedIn: [bodireddyrudrasenareddy](https://www.linkedin.com/in/bodireddyrudrasenareddy)
- Portfolio: [Coding-Profiles](https://rudrasenareddy87.github.io/Coding-Profiles)
- Email: b.rudrasenareddy@gmail.com 

---

**Built with ❤️ by Rudrasena Reddy using React, Node.js, Express.js, and Tailwind CSS**
