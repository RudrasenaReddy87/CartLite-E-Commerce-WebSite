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

const getAllProducts = () => ({
  success: true,
  data: products,
  count: products.length
});

const getProductById = (id) => {
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return { success: false, error: 'Product not found' };
  }
  return { success: true, data: product };
};

const getProductsByCategory = (categoryId) => {
  const categoryProducts = products.filter(p => p.category === categoryId);
  return { success: true, data: categoryProducts, count: categoryProducts.length };
};

const createProduct = (body) => {
  const newProduct = { id: products.length + 1, ...body };
  products.push(newProduct);
  return { success: true, data: newProduct };
};

const updateProduct = (id, body) => {
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    return { success: false, error: 'Product not found' };
  }
  products[productIndex] = { ...products[productIndex], ...body };
  return { success: true, data: products[productIndex] };
};

const deleteProduct = (id) => {
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    return { success: false, error: 'Product not found' };
  }
  const deletedProduct = products.splice(productIndex, 1);
  return { success: true, data: deletedProduct[0] };
};

exports.handler = async (event, context) => {
  const { httpMethod, path, body, pathParameters } = event;
  const id = pathParameters ? pathParameters.id : null;
  const categoryId = pathParameters ? pathParameters.categoryId : null;

  let response;

  try {
    switch (httpMethod) {
      case 'GET':
        if (path.includes('/products')) {
          if (id) {
            response = getProductById(id);
          } else if (path.includes('/category/')) {
            response = getProductsByCategory(categoryId);
          } else {
            response = getAllProducts();
          }
        }
        break;
      case 'POST':
        if (path.includes('/products')) {
          response = createProduct(JSON.parse(body));
        }
        break;
      case 'PUT':
        if (path.includes('/products') && id) {
          response = updateProduct(id, JSON.parse(body));
        }
        break;
      case 'DELETE':
        if (path.includes('/products') && id) {
          response = deleteProduct(id);
        }
        break;
      default:
        response = { success: false, error: 'Method not allowed' };
    }

    return {
      statusCode: response.success ? 200 : (response.error === 'Product not found' ? 404 : 500),
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
