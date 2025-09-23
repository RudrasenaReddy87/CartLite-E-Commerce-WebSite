const categories = [
  {
    id: 1,
    name: "Fashion",
    icon: "/images/icons/tee.svg",
    itemCount: 45,
    image: "/images/products/clothes-1.jpg"
  },
  {
    id: 2,
    name: "Electronics",
    icon: "/images/icons/watch.svg",
    itemCount: 32,
    image: "/images/products/watch-1.jpg"
  },
  {
    id: 3,
    name: "Sports",
    icon: "/images/icons/shoes.svg",
    itemCount: 28,
    image: "/images/products/sports-1.jpg"
  },
  {
    id: 4,
    name: "Home & Garden",
    icon: "/images/icons/hat.svg",
    itemCount: 67,
    image: "/images/products/clothes-2.jpg"
  },
  {
    id: 5,
    name: "Books",
    icon: "/images/icons/glasses.svg",
    itemCount: 89,
    image: "/images/products/1.jpg"
  },
  {
    id: 6,
    name: "Jewelry",
    icon: "/images/icons/jewelry.svg",
    itemCount: 23,
    image: "/images/products/jewellery-1.jpg"
  },
  {
    id: 7,
    name: "Beauty",
    icon: "/images/icons/perfume.svg",
    itemCount: 34,
    image: "/images/products/perfume.jpg"
  },
  {
    id: 8,
    name: "Accessories",
    icon: "/images/icons/bag.svg",
    itemCount: 56,
    image: "/images/products/clothes-3.jpg"
  }
];

const getAllCategories = () => ({
  success: true,
  data: categories,
  count: categories.length
});

const getCategoryById = (id) => {
  const category = categories.find(c => c.id === parseInt(id));
  if (!category) {
    return { success: false, error: 'Category not found' };
  }
  return { success: true, data: category };
};

const createCategory = (body) => {
  const newCategory = { id: categories.length + 1, ...body };
  categories.push(newCategory);
  return { success: true, data: newCategory };
};

const updateCategory = (id, body) => {
  const categoryIndex = categories.findIndex(c => c.id === parseInt(id));
  if (categoryIndex === -1) {
    return { success: false, error: 'Category not found' };
  }
  categories[categoryIndex] = { ...categories[categoryIndex], ...body };
  return { success: true, data: categories[categoryIndex] };
};

const deleteCategory = (id) => {
  const categoryIndex = categories.findIndex(c => c.id === parseInt(id));
  if (categoryIndex === -1) {
    return { success: false, error: 'Category not found' };
  }
  const deletedCategory = categories.splice(categoryIndex, 1);
  return { success: true, data: deletedCategory[0] };
};

exports.handler = async (event, context) => {
  const { httpMethod, path, body, pathParameters } = event;
  const id = pathParameters ? pathParameters.id : null;

  let response;

  try {
    switch (httpMethod) {
      case 'GET':
        if (path.includes('/categories')) {
          if (id) {
            response = getCategoryById(id);
          } else {
            response = getAllCategories();
          }
        }
        break;
      case 'POST':
        if (path.includes('/categories')) {
          response = createCategory(JSON.parse(body));
        }
        break;
      case 'PUT':
        if (path.includes('/categories') && id) {
          response = updateCategory(id, JSON.parse(body));
        }
        break;
      case 'DELETE':
        if (path.includes('/categories') && id) {
          response = deleteCategory(id);
        }
        break;
      default:
        response = { success: false, error: 'Method not allowed' };
    }

    return {
      statusCode: response.success ? 200 : (response.error === 'Category not found' ? 404 : 500),
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
