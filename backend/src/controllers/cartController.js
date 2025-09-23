// Mock cart data - In a real app, this would be stored in a database or session
let cart = [];

const getCart = (req, res) => {
  try {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      data: cart,
      total,
      itemCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cart'
    });
  }
};

const addToCart = (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

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

    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add item to cart'
    });
  }
};

const updateCartItem = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }

    res.json({
      success: true,
      message: 'Cart item updated',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update cart item'
    });
  }
};

const removeFromCart = (req, res) => {
  try {
    const { id } = req.params;

    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    const removedItem = cart.splice(itemIndex, 1);

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: removedItem[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove item from cart'
    });
  }
};

const clearCart = (req, res) => {
  try {
    cart = [];
    res.json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to clear cart'
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
