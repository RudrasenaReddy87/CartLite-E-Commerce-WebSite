// Mock data - In a real app, this would come from a database
const products = [
  {
    id: 1,
    name: "Men's Casual Shirt",
    price: 29.99,
    originalPrice: 39.99,
    category: "fashion",
    rating: 4.5,
    reviews: 128,
    image: "/images/products/shirt-1.jpg",
    hoverImage: "/images/products/shirt-2.jpg",
    badge: "Sale",
    badgeType: "pink",
    description: "Comfortable cotton shirt perfect for casual wear",
    inStock: true,
    discount: 25
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 89.99,
    originalPrice: 129.99,
    category: "electronics",
    rating: 4.8,
    reviews: 256,
    image: "/images/products/watch-1.jpg",
    hoverImage: "/images/products/watch-2.jpg",
    badge: "New",
    badgeType: "ocean-green",
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
    discount: 31
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 249.99,
    category: "electronics",
    rating: 4.6,
    reviews: 89,
    image: "/images/products/watch-3.jpg",
    hoverImage: "/images/products/watch-4.jpg",
    badge: "Hot",
    badgeType: "bittersweet",
    description: "Feature-rich smartwatch with health monitoring",
    inStock: true,
    discount: 20
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 79.99,
    originalPrice: 99.99,
    category: "sports",
    rating: 4.7,
    reviews: 167,
    image: "/images/products/shoe-1.jpg",
    hoverImage: "/images/products/shoe-2.jpg",
    badge: "Sale",
    badgeType: "pink",
    description: "Lightweight running shoes with superior comfort",
    inStock: true,
    discount: 20
  },
  {
    id: 5,
    name: "Rose Gold Earrings",
    price: 45.99,
    originalPrice: 59.99,
    category: "jewelry",
    rating: 4.9,
    reviews: 203,
    image: "/images/products/jewellery-1.jpg",
    hoverImage: "/images/products/jewellery-2.jpg",
    badge: "Popular",
    badgeType: "ocean-green",
    description: "Elegant rose gold earrings perfect for any occasion",
    inStock: true,
    discount: 23
  },
  {
    id: 6,
    name: "Designer Handbag",
    price: 129.99,
    originalPrice: 179.99,
    category: "fashion",
    rating: 4.4,
    reviews: 95,
    image: "/images/products/clothes-1.jpg",
    hoverImage: "/images/products/clothes-2.jpg",
    badge: "New",
    badgeType: "ocean-green",
    description: "Stylish designer handbag with premium leather",
    inStock: true,
    discount: 28
  },
  {
    id: 7,
    name: "Gaming Mouse",
    price: 39.99,
    originalPrice: 59.99,
    category: "electronics",
    rating: 4.7,
    reviews: 312,
    image: "/images/products/1.jpg",
    hoverImage: "/images/products/2.jpg",
    badge: "Hot",
    badgeType: "bittersweet",
    description: "High-precision gaming mouse with RGB lighting",
    inStock: true,
    discount: 33
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 24.99,
    originalPrice: 34.99,
    category: "sports",
    rating: 4.6,
    reviews: 178,
    image: "/images/products/sports-1.jpg",
    hoverImage: "/images/products/sports-2.jpg",
    badge: "Sale",
    badgeType: "pink",
    description: "Non-slip yoga mat perfect for all fitness levels",
    inStock: true,
    discount: 29
  }
];

const getAllProducts = (req, res) => {
  try {
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
};

const getProductById = (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    });
  }
};

const getProductsByCategory = (req, res) => {
  try {
    const categoryProducts = products.filter(p => p.category === req.params.categoryId);
    res.json({
      success: true,
      data: categoryProducts,
      count: categoryProducts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products by category'
    });
  }
};

const createProduct = (req, res) => {
  try {
    const newProduct = {
      id: products.length + 1,
      ...req.body
    };
    products.push(newProduct);
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create product'
    });
  }
};

const updateProduct = (req, res) => {
  try {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    products[productIndex] = { ...products[productIndex], ...req.body };
    res.json({
      success: true,
      data: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update product'
    });
  }
};

const deleteProduct = (req, res) => {
  try {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    const deletedProduct = products.splice(productIndex, 1);
    res.json({
      success: true,
      data: deletedProduct[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete product'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
