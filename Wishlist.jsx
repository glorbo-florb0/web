import { useEffect, useState } from 'react';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3000/api/shop/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setWishlist(data);
    } catch (err) {
      console.error('Failed to load wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem('authToken');
    await fetch(`http://localhost:3000/api/shop/wishlist/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchWishlist(); // Refresh after delete
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map(item => (
            <li key={item.id} className="flex justify-between items-center p-4 bg-gray-100 rounded">
              <div>
                <p className="font-semibold">{item.Product?.name}</p>
                <p className="text-sm text-gray-600">${item.Product?.price}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.Product?.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
