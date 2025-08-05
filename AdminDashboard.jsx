import { useState, useEffect } from 'react';
import { MessageCircle, AlertTriangle, ShoppingCart, Heart } from 'lucide-react';
import NavigationMenu from '../components/NavigationMenu';

export default function AdminDashboard() {
  const [pendingComments, setPendingComments] = useState([]);
  const [pendingCorrections, setPendingCorrections] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      // Comments
      const commentsRes = await fetch('http://localhost:3000/api/comment/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingComments(await commentsRes.json());

      // Corrections
      const correctionsRes = await fetch('http://localhost:3000/api/correction/status/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingCorrections(await correctionsRes.json());

      // Orders
      const ordersRes = await fetch('http://localhost:3000/api/shop/orders/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const orders = await ordersRes.json();
      setPendingOrders(orders.filter(o => o.status === 'pending'));

      // Wishlist
      const wishlistRes = await fetch('http://localhost:3000/api/shop/wishlist/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(await wishlistRes.json());

    } catch (error) {
      console.error('Admin data loading error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderAction = async (orderId, action) => {
    const token = localStorage.getItem('authToken');
    await fetch(`http://localhost:3000/api/shop/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: action })
    });
    loadAdminData();
  };

  const handleCommentAction = async (commentId, action) => {
    const token = localStorage.getItem('authToken');
    await fetch(`http://localhost:3000/api/comment/status/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ isApproved: action === 'approve' })
    });
    loadAdminData();
  };

  const handleCorrectionAction = async (correctionId, action) => {
    const token = localStorage.getItem('authToken');
    await fetch(`http://localhost:3000/api/correction/status/${correctionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: action })
    });
    loadAdminData();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationMenu />
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6 text-red-800">Admin Dashboard</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <Section
              icon={MessageCircle}
              title={`Pending Comments (${pendingComments.length})`}
              items={pendingComments}
              renderItem={(comment) => (
                <div key={comment.id} className="p-4 bg-white shadow rounded mb-3">
                  <p><strong>{comment.userName}</strong> on <em>{comment.page}</em></p>
                  <p className="text-gray-700">{comment.content}</p>
                  <div className="mt-2 flex space-x-2">
                    <button onClick={() => handleCommentAction(comment.id, 'approve')} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                    <button onClick={() => handleCommentAction(comment.id, 'reject')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                  </div>
                </div>
              )}
            />

            <Section
              icon={AlertTriangle}
              title={`Pending Corrections (${pendingCorrections.length})`}
              items={pendingCorrections}
              renderItem={(correction) => (
                <div key={correction.id} className="p-4 bg-white shadow rounded mb-3">
                  <p><strong>{correction.userName}</strong> suggested a change on <em>{correction.page}</em></p>
                  <p><strong>Section:</strong> {correction.section}</p>
                  <p><strong>Current:</strong> {correction.currentContent}</p>
                  <p><strong>Suggested:</strong> {correction.suggestedContent}</p>
                  <div className="mt-2 flex space-x-2">
                    <button onClick={() => handleCorrectionAction(correction.id, 'approved')} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                    <button onClick={() => handleCorrectionAction(correction.id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                  </div>
                </div>
              )}
            />

            <Section
              icon={ShoppingCart}
              title={`Pending Orders (${pendingOrders.length})`}
              items={pendingOrders}
              renderItem={(order) => (
                <div key={order.id} className="p-4 bg-white shadow rounded mb-3">
                  <p><strong>{order.User?.username}</strong> ordered <strong>{order.Product?.name}</strong></p>
                  <p>Quantity: {order.quantity} | Total: ${order.totalPrice}</p>
                  <p>Shipping: {order.shippingAddress}</p>
                  <div className="mt-2 flex space-x-2">
                    <button onClick={() => handleOrderAction(order.id, 'approved')} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                    <button onClick={() => handleOrderAction(order.id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                  </div>
                </div>
              )}
            />

            <Section
              icon={Heart}
              title={`Wishlist Items (${wishlistItems.length})`}
              items={wishlistItems}
              renderItem={(item) => (
                <div key={item.id} className="p-4 bg-white shadow rounded mb-3">
                  <p><strong>{item.User?.username}</strong> saved <strong>{item.Product?.name}</strong></p>
                  <p>Price: ${item.Product?.price}</p>
                </div>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, items, renderItem }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Icon className="w-5 h-5 mr-2" /> {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Nothing here yet.</p>
      ) : (
        <div>{items.map(renderItem)}</div>
      )}
    </div>
  );
}
