import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';
import { ShoppingCart, Truck, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

export default function Purchase() {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [orderData, setOrderData] = useState({
    quantity: 1,
    shippingAddress: '',
    contactPhone: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      navigate('/shop');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!orderData.shippingAddress.trim() || !orderData.contactPhone.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await api.createOrder({
        productId: product.id,
        quantity: orderData.quantity,
        shippingAddress: orderData.shippingAddress,
        contactPhone: orderData.contactPhone
      }, token);

      if (response.message) {
        setOrderSubmitted(true);
      } else {
        alert('Error creating order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateTotal = () => {
    if (!product) return 0;
    return product.price * orderData.quantity;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <NavigationMenu />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <NavigationMenu />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Submitted!</h1>
            <p className="text-gray-600 mb-8">
              Your order has been submitted successfully. Our admin team will review and process your order.
              You will receive updates on your order status.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                View My Orders
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 ml-4"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Purchase</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
            <div className="flex items-start space-x-4">
              <img
                src={product.image || 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</p>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock} available</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                <select
                  name="quantity"
                  value={orderData.quantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address *</label>
                <textarea
                  name="shippingAddress"
                  value={orderData.shippingAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your complete shipping address..."
                  required
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={orderData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Product:</span><span>{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span><span>{orderData.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per item:</span><span>{formatPrice(product.price)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span><span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || product.stock === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2" size={20} />
                    Submit Order
                  </>
                )}
              </button>
            </form>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Truck className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-blue-900">Order Processing</h4>
                  <p className="text-sm text-blue-700">
                    Your order will be reviewed by our admin team. You'll receive updates on the status of your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}