import { useEffect, useState } from 'react';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3000/api/shop/orders/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 bg-gray-100 rounded">
              <p><strong>Product:</strong> {order.Product?.name}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total Price:</strong> ${order.totalPrice}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
