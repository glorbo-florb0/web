const UserAccount = require('../model/userModel');
const Comment = require('../model/commentModel');
const Correction = require('../model/correctionModel');
const Product = require('../model/productModel');
const Wishlist = require('../model/wishlistModel');
const Order = require('../model/orderModel');

// 🧑 User <-> Comment
UserAccount.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(UserAccount, { foreignKey: 'userId' });

// 🧑 User <-> Correction
UserAccount.hasMany(Correction, { foreignKey: 'userId', onDelete: 'CASCADE' });
Correction.belongsTo(UserAccount, { foreignKey: 'userId' });

// 🧑 User <-> Wishlist
UserAccount.hasMany(Wishlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Wishlist.belongsTo(UserAccount, { foreignKey: 'userId' });

// 🧑 User <-> Order
UserAccount.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(UserAccount, { foreignKey: 'userId' });

// 📦 Product <-> Wishlist
Product.hasMany(Wishlist, { foreignKey: 'productId', onDelete: 'CASCADE' });
Wishlist.belongsTo(Product, { foreignKey: 'productId' });

// 📦 Product <-> Order
Product.hasMany(Order, { foreignKey: 'productId', onDelete: 'CASCADE' });
Order.belongsTo(Product, { foreignKey: 'productId' });



module.exports = {
  UserAccount,
  Comment,
  Correction,
  Product,
  Wishlist,
  Order
};
