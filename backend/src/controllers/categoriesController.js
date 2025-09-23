// Mock data - In a real app, this would come from a database
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

const getAllCategories = (req, res) => {
  try {
    res.json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
};

const getCategoryById = (req, res) => {
  try {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category'
    });
  }
};

const createCategory = (req, res) => {
  try {
    const newCategory = {
      id: categories.length + 1,
      ...req.body
    };
    categories.push(newCategory);
    res.status(201).json({
      success: true,
      data: newCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create category'
    });
  }
};

const updateCategory = (req, res) => {
  try {
    const categoryIndex = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (categoryIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }
    categories[categoryIndex] = { ...categories[categoryIndex], ...req.body };
    res.json({
      success: true,
      data: categories[categoryIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update category'
    });
  }
};

const deleteCategory = (req, res) => {
  try {
    const categoryIndex = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (categoryIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }
    const deletedCategory = categories.splice(categoryIndex, 1);
    res.json({
      success: true,
      data: deletedCategory[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete category'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
