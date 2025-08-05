import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorldWar1 from './pages/WorldWar1';
import WorldWar2 from './pages/WorldWar2';
import WorldWar3 from './pages/WorldWar3';
import ModernEra from './pages/ModernEra';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import Shop from './pages/Shop';
import Purchase from './pages/Purchase';
import AuthGuard from './components/AuthGuard';
import About from './pages/Contact';
import Wishlist from './components/Wishlist';
import OrderHistory from './components/OrderHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/worldwar1" element={<WorldWar1 />} />
        <Route path="/worldwar2" element={<WorldWar2 />} />
        <Route path="/worldwar3" element={<WorldWar3 />} />
        <Route path="/modernera" element={<ModernEra />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/admindash" element={<AdminDashboard />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        } />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-dashboard" element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        } />
        <Route path="/purchase" element={
          <AuthGuard>
            <Purchase />
          </AuthGuard>
        } />
        <Route path="/wishlist" element={
          <AuthGuard>
            <Wishlist />
          </AuthGuard>
        } />
        <Route path="/orders" element={
          <AuthGuard>
            <OrderHistory />
          </AuthGuard>
        } />
      </Routes>
    </Router>
  );
}

export default App; 