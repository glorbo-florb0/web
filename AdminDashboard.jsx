import { useState, useEffect } from 'react';
import { MessageCircle, AlertTriangle, ShoppingCart, Heart } from 'lucide-react';

// Mock NavigationMenu component
const NavigationMenu = () => (
  <nav className="bg-red-800 text-white p-4">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-bold">Admin Panel</h1>
    </div>
  </nav>
);

export default function AdminDashboard() {
  const [pendingComments, setPendingComments] = useState([]);
  const [pendingCorrections, setPendingCorrections] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static sample data
  const sampleCorrections = [
    {
      id: 1,
      userName: "zzz",
      page: "World War II Tanks - German Tiger I",
      section: "Technical Specifications",
      currentContent: "The Tiger I was heavily armored but mechanically complex and expensive to produce.",
      suggestedContent: "The Tiger I was heavily armored but mechanically complex and expensive to produce. Only 1,347 units were manufactured between 1942-1944."
    },
    {
      id: 2,
      userName: "Tank_Historian_92",
      page: "Cold War Tanks - Soviet T-72",
      section: "Combat History",
      currentContent: "The T-72 was the most produced tank of the Cold War era.",
      suggestedContent: "The T-72 was the most produced tank of the Cold War era, with over 25,000 units manufactured and widely exported to Warsaw Pact allies."
    }
  ];

  const sampleOrders = [
    {
      id: 101,
      User: { username: "tank_collector_47" },
      Product: { name: "T-34 Tank Model Kit", price: 45.99 },
      quantity: 1,
      totalPrice: 45.99,
      shippingAddress: "1247 Military Ave, Fort Knox, KY 40121"
    },
    {
      id: 102,
      User: { username: "history_buff_mike" },
      Product: { name: "Tiger Tank T-Shirt", price: 24.99 },
      quantity: 2,
      totalPrice: 49.98,
      shippingAddress: "892 Veterans Blvd, San Antonio, TX 78234"
    }
  ];

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    // Simulate loading delay
    setTimeout(() => {
      // Use static data instead of API calls
      setPendingComments([]);
      setPendingCorrections(sampleCorrections);
      setPendingOrders(sampleOrders);
      setWishlistItems([]);
      setLoading(false);
    }, 1000);
  };

  const handleOrderAction = async (orderId, action) => {
    // Remove the order from pending list when action is taken
    setPendingOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const handleCommentAction = async (commentId, action) => {
    setPendingComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const handleCorrectionAction = async (correctionId, action) => {
    setPendingCorrections(prev => prev.filter(correction => correction.id !== correctionId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationMenu />
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6 text-red-800">Admin Dashboard</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading admin data...</p>
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
                    <button onClick={() => handleCommentAction(comment.id, 'approve')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Approve</button>
                    <button onClick={() => handleCommentAction(comment.id, 'reject')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                  </div>
                </div>
              )}
            />

            <Section
              icon={AlertTriangle}
              title={`Pending Corrections (${pendingCorrections.length})`}
              items={pendingCorrections}
              renderItem={(correction) => (
                <div key={correction.id} className="p-4 bg-white shadow rounded mb-3 border-l-4 border-yellow-400">
                  <p><strong>{correction.userName}</strong> suggested a change on <em>{correction.page}</em></p>
                  <p className="mt-2"><strong>Section:</strong> <span className="text-blue-600">{correction.section}</span></p>
                  <div className="mt-3 p-3 bg-red-50 rounded">
                    <p><strong>Current:</strong> <span className="text-red-800">{correction.currentContent}</span></p>
                  </div>
                  <div className="mt-2 p-3 bg-green-50 rounded">
                    <p><strong>Suggested:</strong> <span className="text-green-800">{correction.suggestedContent}</span></p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button onClick={() => handleCorrectionAction(correction.id, 'approved')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Approve</button>
                    <button onClick={() => handleCorrectionAction(correction.id, 'rejected')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reject</button>
                  </div>
                </div>
              )}
            />

            <Section
              icon={ShoppingCart}
              title={`Pending Orders (${pendingOrders.length})`}
              items={pendingOrders}
              renderItem={(order) => (
                <div key={order.id} className="p-4 bg-white shadow rounded mb-3 border-l-4 border-blue-400">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-lg"><strong>{order.User?.username}</strong> ordered <strong className="text-blue-600">{order.Product?.name}</strong></p>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${order.totalPrice}</p>
                      <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p><strong>Shipping Address:</strong></p>
                    <p className="text-gray-700">{order.shippingAddress}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleOrderAction(order.id, 'approved')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Approve Order</button>
                    <button onClick={() => handleOrderAction(order.id, 'rejected')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reject Order</button>
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
        <p className="text-gray-500 bg-white p-4 rounded shadow">Nothing here yet.</p>
      ) : (
        <div>{items.map(renderItem)}</div>
      )}
    </div>
  );
}