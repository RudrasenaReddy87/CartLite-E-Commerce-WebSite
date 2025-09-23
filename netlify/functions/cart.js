let cart = [];

// Mock products data (same as in productsController)
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

// Helper function to get product by ID
const getProductById = (productId) => {
  return products.find(p => p.id === parseInt(productId));
};

// Helper function to calculate cart totals
const calculateCartTotals = (cartItems) => {
  let total = 0;
  let itemCount = 0;

  cartItems.forEach(item => {
    const product = getProductById(item.productId);
    if (product) {
      total += product.price * item.quantity;
      itemCount += item.quantity;
    }
  });

  return { total, itemCount };
};

const getCart = () => {
  const { total, itemCount } = calculateCartTotals(cart);

  // Add product details to cart items
  const cartWithProductDetails = cart.map(item => {
    const product = getProductById(item.productId);
    return {
      ...item,
      product: product || null,
      price: product ? product.price : 0
    };
  });

  return { success: true, data: cartWithProductDetails, total, itemCount };
};

const addToCart = (body) => {
  const { productId, quantity = 1 } = body;

  // Validate product exists
  const product = getProductById(productId);
  if (!product) {
    return { success: false, error: 'Product not found' };
  }

  // Find existing item in cart
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: Date.now().toString(),
      productId,
      quantity,
      addedAt: new Date().toISOString()
    });
  }

  return { success: true, message: 'Item added to cart', data: cart };
};

const updateCartItem = (id, body) => {
  const { quantity } = body;

  const itemIndex = cart.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    return { success: false, error: 'Cart item not found' };
  }

  if (quantity <= 0) {
    cart.splice(itemIndex, 1);
  } else {
    cart[itemIndex].quantity = quantity;
  }

  return { success: true, message: 'Cart item updated', data: cart };
};

const removeFromCart = (id) => {
  const itemIndex = cart.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    return { success: false, error: 'Cart item not found' };
  }

  const removedItem = cart.splice(itemIndex, 1);

  return { success: true, message: 'Item removed from cart', data: removedItem[0] };
};

const clearCart = () => {
  cart = [];
  return { success: true, message: 'Cart cleared', data: cart };
};

exports.handler = async (event, context) => {
  const { httpMethod, path, body, pathParameters } = event;
  const id = pathParameters ? pathParameters.id : null;

  let response;

  try {
    switch (httpMethod) {
      case 'GET':
        if (path.includes('/cart')) {
          response = getCart();
        }
        break;
      case 'POST':
        if (path.includes('/cart')) {
          response = addToCart(JSON.parse(body));
        }
        break;
      case 'PUT':
        if (path.includes('/cart') && id) {
          response = updateCartItem(id, JSON.parse(body));
        }
        break;
      case 'DELETE':
        if (path.includes('/cart')) {
          if (id) {
            response = removeFromCart(id);
          } else {
            response = clearCart();
          }
        }
        break;
      default:
        response = { success: false, error: 'Method not allowed' };
    }

    return {
      statusCode: response.success ? 200 : (response.error === 'Product not found' || response.error === 'Cart item not found' ? 404 : 500),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, error: 'Internal server error' })
    };
  }
};
