import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Heart, 
  Plus, 
  Minus, 
  Trash2, 
  LogOut, 
  Upload, 
  Check, 
  Menu,
  X,
  ChevronRight,
  ShoppingCart,
  Home,
  Settings
} from 'lucide-react';

// --- Mock Data & Constants ---
const COLORS = {
  navy: '#0F172A',
  gray: '#E5E7EB',
  blue: '#3B82F6',
  glass: 'rgba(255, 255, 255, 0.12)',
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Casual T-Shirt",
    category: "Women Style",
    price: 150,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    likes: 124,
  },
  {
    id: 2,
    name: "Pink Blazer",
    category: "Women Style",
    price: 250,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    likes: 89,
  },
  {
    id: 3,
    name: "Fruit Tanktop",
    category: "Women Style",
    price: 56,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    likes: 210,
  },
  {
    id: 4,
    name: "Urban Hoodie",
    category: "Women Style",
    price: 190,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    likes: 45,
  },
];

// --- Components ---

// 1. Loading Screen
const LoadingScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A] text-white">
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-[#3B82F6] rounded-full opacity-20 animate-ping"></div>
        <div className="absolute inset-0 border-4 border-t-[#3B82F6] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <ShoppingBag size={40} className="text-[#3B82F6]" />
      </div>
      <h1 className="text-2xl font-bold tracking-widest animate-pulse">WEAR8</h1>
      <p className="mt-2 text-sm text-gray-400">Premium Fashion Store</p>
    </div>
  );
};

// 2. Auth Screens
const AuthScreen = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Admin Check
      if (formData.email === 'Wear8' && formData.password === 'specialuser2024') {
        onLogin({ ...formData, role: 'admin', name: 'Admin' });
        return;
      }
      // Mock User Login
      if (formData.email && formData.password) {
        onLogin({ ...formData, role: 'user', name: formData.email.split('@')[0] });
      } else {
        setError('Invalid credentials');
      }
    } else {
      if (formData.name && formData.email && formData.password) {
        onSignup({ ...formData, role: 'user' });
      } else {
        setError('Please fill all fields');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center relative">
           <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <h2 className="text-3xl font-bold text-white z-10">
             {isLogin ? 'Welcome Back' : 'Create Account'}
           </h2>
        </div>
        
        <div className="p-8">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#3B82F6] outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            <div>
              <input 
                type="text" 
                placeholder="Email or Username" 
                className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#3B82F6] outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#3B82F6] outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#1e293b] transition-colors mt-4"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-[#3B82F6] font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
            {isLogin && (
              <p className="mt-4 text-xs text-gray-400">
                Admin Login: <span className="font-mono">Wear8 / specialuser2024</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Admin Dashboard
const AdminDashboard = ({ onLogout, products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Women Style' });
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !previewImage) return;
    
    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      image: previewImage,
      likes: 0,
    };

    setProducts([product, ...products]);
    setNewProduct({ name: '', price: '', category: 'Women Style' });
    setPreviewImage(null);
    alert('Product added successfully!');
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-24">
      <header className="p-6 flex justify-between items-center bg-[#1e293b] sticky top-0 z-20">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="text-[#3B82F6]" /> Admin Panel
        </h1>
        <button onClick={onLogout} className="p-2 bg-red-500/20 text-red-400 rounded-lg">
          <LogOut size={20} />
        </button>
      </header>

      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Add Product Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Product Name" 
                className="w-full p-3 bg-white/10 rounded-xl border border-white/10 focus:border-[#3B82F6] outline-none"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
              <div className="flex gap-4">
                <input 
                  type="number" 
                  placeholder="Price" 
                  className="w-1/2 p-3 bg-white/10 rounded-xl border border-white/10 focus:border-[#3B82F6] outline-none"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
                <select 
                  className="w-1/2 p-3 bg-white/10 rounded-xl border border-white/10 focus:border-[#3B82F6] outline-none"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option>Women Style</option>
                  <option>Men Style</option>
                  <option>Accessories</option>
                </select>
              </div>
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="h-full w-full object-cover rounded-xl" />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 text-gray-400" />
                    <span className="text-sm text-gray-400">Upload Image</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleAddProduct}
                className="w-full py-4 bg-[#3B82F6] rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Publish Product
              </button>
            </div>
          </div>
        </div>

        {/* Manage Products */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Manage Inventory</h2>
          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-400">${product.price}</p>
                </div>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Main Store Components
const ProductCard = ({ product, onAdd, isLiked, onLike }) => (
  <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow relative group">
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-gray-100">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      <button 
        onClick={(e) => { e.stopPropagation(); onLike(product.id); }}
        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
      >
        <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} />
      </button>
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg text-[#0F172A]">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
      </div>
      <span className="font-bold text-lg text-[#0F172A]">${product.price}</span>
    </div>
    <button 
      onClick={() => onAdd(product)}
      className="w-full mt-4 py-3 bg-[#0F172A] text-white rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-opacity active:scale-95"
    >
      Add to Cart
    </button>
  </div>
);

const CartItem = ({ item, onUpdateQty, onRemove }) => (
  <div className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm mb-4">
    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-[#0F172A]">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
        <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
          <X size={18} />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">${item.price * item.qty}</span>
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
          <button 
            onClick={() => onUpdateQty(item.id, -1)} 
            className="p-1 hover:text-[#3B82F6] disabled:opacity-50"
            disabled={item.qty <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="font-medium w-4 text-center">{item.qty}</span>
          <button 
            onClick={() => onUpdateQty(item.id, 1)} 
            className="p-1 hover:text-[#3B82F6]"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// 5. Main App Shell
const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home'); // home, cart, profile, search, admin
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load data from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('wear8_user');
    const savedCart = localStorage.getItem('wear8_cart');
    const savedProducts = localStorage.getItem('wear8_products');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  // Save data to local storage on change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('wear8_cart', JSON.stringify(cart));
      localStorage.setItem('wear8_products', JSON.stringify(products));
    }
  }, [cart, products, loading]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('wear8_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setView('home');
    localStorage.removeItem('wear8_user');
    localStorage.removeItem('wear8_cart');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    // Simple toast feedback could go here
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, qty: Math.max(1, item.qty + delta) };
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // --- Views ---

  if (loading) return <LoadingScreen onFinish={() => setLoading(false)} />;
  
  if (!user) return <AuthScreen onLogin={handleLogin} onSignup={handleLogin} />;

  if (user.role === 'admin') return <AdminDashboard onLogout={handleLogout} products={products} setProducts={setProducts} />;

  const renderContent = () => {
    switch(view) {
      case 'home':
        const filteredProducts = products.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (
          <div className="p-6 pb-24">
            <header className="flex justify-between items-center mb-6">
              <button className="p-2 bg-white rounded-xl shadow-sm">
                <Menu size={24} className="text-[#0F172A]" />
              </button>
              <h1 className="text-2xl font-bold text-[#0F172A]">Wear8</h1>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                 <img src={`https://ui-avatars.com/api/?name=${user.name}&background=0F172A&color=fff`} alt="Profile" />
              </div>
            </header>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search collection..." 
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 mb-4 scrollbar-hide">
              {['All', 'Women', 'Men', 'Accessories'].map((cat, idx) => (
                <button 
                  key={cat} 
                  className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${idx === 0 ? 'bg-[#0F172A] text-white' : 'bg-white text-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAdd={addToCart}
                  isLiked={likedItems.includes(product.id)}
                  onLike={toggleLike}
                />
              ))}
            </div>
          </div>
        );
      
      case 'cart':
        return (
          <div className="p-6 pb-32 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">My Cart</h2>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <ShoppingBag size={48} className="mb-4 opacity-20" />
                <p>Your cart is empty</p>
                <button onClick={() => setView('home')} className="mt-4 text-[#3B82F6] font-medium">Start Shopping</button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onUpdateQty={updateQty} 
                    onRemove={removeFromCart} 
                  />
                ))}
              </div>
            )}
            
            {cart.length > 0 && (
              <div className="fixed bottom-24 left-6 right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 z-30">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Total</span>
                  <span className="text-2xl font-bold text-[#0F172A]">${cartTotal}</span>
                </div>
                <button className="w-full py-4 bg-[#0F172A] text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform">
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-[#0F172A] text-white p-8 pb-12 rounded-b-[3rem]">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Profile</h2>
                <div className="flex gap-4">
                   <MailIcon />
                   <BellIcon />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
                  <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="px-6 -mt-6">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Orders</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                    <Check size={20} />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Promos</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    <Heart size={20} />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Saved</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 font-semibold text-gray-800">General Settings</div>
                <MenuItem icon={<User size={20} />} label="My Account" />
                <MenuItem icon={<CreditCardIcon />} label="Payment Methods" />
                <MenuItem icon={<MapPinIcon />} label="My Address" />
                <MenuItem icon={<BellIcon />} label="Notifications" />
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-8 py-4 bg-red-50 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <LogOut size={20} /> Log Out
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-[#0F172A]">
      {renderContent()}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 bg-white rounded-2xl shadow-2xl shadow-blue-900/20 p-2 flex justify-between items-center z-40">
        <NavButton active={view === 'home'} onClick={() => setView('home')} icon={<Home size={24} />} />
        <NavButton active={view === 'search'} onClick={() => setView('home')} icon={<Search size={24} />} />
        <div className="relative -top-8">
          <button 
            onClick={() => setView('cart')}
            className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-900/40 border-4 border-gray-50"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center border border-[#0F172A]">
                  {cart.length}
                </span>
              )}
            </div>
          </button>
        </div>
        <NavButton active={view === 'profile'} onClick={() => setView('profile')} icon={<User size={24} />} />
      </nav>
    </div>
  );
};

// --- Helper Components ---
const NavButton = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-xl transition-colors ${active ? 'text-[#3B82F6] bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
  </button>
);

const MenuItem = ({ icon, label }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
    <div className="flex items-center gap-4 text-gray-600">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </div>
);

// Simple Icon Wrappers for consistency
const MailIcon = () => <div className="p-2 bg-white/10 rounded-full"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>;
const BellIcon = () => <div className="p-2 bg-white/10 rounded-full"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div>;
const CreditCardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
const MapPinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;

export default App;
