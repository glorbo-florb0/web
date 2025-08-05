const Product = require('../model/productModel');
const Wishlist = require('../model/wishlistModel');
const Order = require('../model/orderModel');
const UserAccount = require('../model/userModel');

const shopController = {
  // All your original methods...
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { isActive: true },
        order: [['createdAt', 'DESC']]
      });
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const products = await Product.findAll({
        where: { category, isActive: true },
        order: [['createdAt', 'DESC']]
      });
      res.json(products);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Admin: Create product
  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      const product = await Product.create(productData);
      res.status(201).json({
        message: 'Product created successfully',
        product
      });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      await product.update(updateData);
      res.json({ message: 'Product updated successfully', product });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  addToWishlist: async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user.id;
      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const existingWishlist = await Wishlist.findOne({ where: { userId, productId } });
      if (existingWishlist) return res.status(400).json({ message: 'Product already in wishlist' });

      const wishlistItem = await Wishlist.create({ userId, productId });
      res.status(201).json({ message: 'Product added to wishlist successfully', wishlistItem });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  removeFromWishlist: async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id;
      const wishlistItem = await Wishlist.findOne({ where: { userId, productId } });
      if (!wishlistItem) return res.status(404).json({ message: 'Wishlist item not found' });

      await wishlistItem.destroy();
      res.json({ message: 'Product removed from wishlist successfully' });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const wishlistItems = await Wishlist.findAll({
        where: { userId },
        include: [{ model: Product, attributes: ['id', 'name', 'description', 'price', 'image', 'category'] }],
        order: [['createdAt', 'DESC']]
      });
      res.json(wishlistItems);
    } catch (error) {
      console.error('Error fetching user wishlist:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { productId, quantity, shippingAddress, contactPhone } = req.body;
      const userId = req.user.id;
      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

      const totalPrice = product.price * quantity;
      const order = await Order.create({
        userId,
        productId,
        quantity,
        totalPrice,
        shippingAddress,
        contactPhone
      });

      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserOrders: async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await Order.findAll({
        where: { userId },
        include: [{ model: Product, attributes: ['name', 'image', 'category'] }],
        order: [['createdAt', 'DESC']]
      });
      res.json(orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [
          { model: Product, attributes: ['name', 'image', 'category'] },
          { model: UserAccount, attributes: ['username', 'email'] }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(orders);
    } catch (error) {
      console.error('Error fetching all orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNotes } = req.body;
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      order.status = status;
      if (adminNotes) order.adminNotes = adminNotes;
      await order.save();

      res.json({ message: `Order status updated to ${status}`, order });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = shopController;
