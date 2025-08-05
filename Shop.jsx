import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';
import { Heart, ShoppingCart, Star, Filter, Search } from 'lucide-react';
import { api } from '../services/api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'books', name: 'Books' },
    { id: 'models', name: 'Models' },
    { id: 'posters', name: 'Posters' }
  ];

  useEffect(() => {
    checkAuthStatus();
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      loadWishlist(token);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getAllProducts();
      if (!response || response.length === 0) {
        setProducts(getSampleProducts());
      } else {
        setProducts(response);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts(getSampleProducts());
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async (token) => {
    try {
      const response = await api.getUserWishlist(token);
      setWishlist(response.map(item => item.productId));
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const getSampleProducts = () => ([
    {
      id: 1,
      name: "T-34 Tank Model Kit",
      description: "Detailed 1:35 scale model kit of the iconic Soviet T-34 tank",
      price: 45.99,
      category: "models",
      image: "/pictures/modelt34.png",
      stock: 15,
      tags: ["tank", "model", "soviet", "ww2"]
    },
    {
      id: 2,
      name: "Tiger Tank T-Shirt",
      description: "Premium cotton t-shirt featuring the German Tiger tank design",
      price: 24.99,
      category: "clothing",
      image: "/pictures/tigert.png",
      stock: 50,
      tags: ["tank", "clothing", "german", "ww2"]
    },
    {
      id: 3,
      name: "Sherman Tank Poster",
      description: "High-quality poster of the American M4 Sherman tank",
      price: 12.99,
      category: "posters",
      image: "/pictures/shermanpos.png",
      stock: 25,
      tags: ["tank", "poster", "american", "ww2"]
    },
    {
      id: 4,
      name: "Tank Commander Cap",
      description: "Authentic-style tank commander cap with embroidered insignia",
      price: 34.99,
      category: "accessories",
      image: "/pictures/tankcommandercap.png",
      stock: 20,
      tags: ["tank", "accessories", "military", "cap"]
    },
    {
      id: 5,
      name: "Tank Warfare History Book",
      description: "Comprehensive guide to tank warfare from WWI to modern era",
      price: 29.99,
      category: "books",
      image: "/pictures/boook.png",
      stock: 30,
      tags: ["tank", "book", "history", "military"]
    }
  ]);

  const filterProducts = () => {
    let filtered = products;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  };

  const handleWishlistToggle = async (productId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const isInWishlist = wishlist.includes(productId);
      if (isInWishlist) {
        await api.removeFromWishlist(productId, token);
        setWishlist(prev => prev.filter(id => id !== productId));
      } else {
        await api.addToWishlist(productId, token);
        setWishlist(prev => [...prev, productId]);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const handlePurchase = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate('/purchase', { state: { product } });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <NavigationMenu />
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      <section className="bg-gradient-to-b from-gray-800 to-gray-700 text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Equinox Tanks Shop</h1>
        <p className="text-xl text-gray-300">Official merchandise, books, models, and collectibles</p>
      </section>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-600" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src={product.image || 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleWishlistToggle(product.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                    wishlist.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium uppercase">{product.category}</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400" size={16} fill="currentColor" />
                    <span className="text-sm text-gray-600 ml-1">4.5</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => handlePurchase(product)}
                    disabled={product.stock === 0}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
                  </button>
                </div>
                {product.stock > 0 && (
                  <p className="text-sm text-gray-500 mt-2">{product.stock} in stock</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2024 Equinox Tanks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
