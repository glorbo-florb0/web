import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, Search } from 'lucide-react';

export default function NavigationMenu() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuItems = [
    { 
      name: 'World War One', 
      link: '/worldwar1',
      items: ['WWI Tanks', 'Artillery', 'Armored Cars', 'Prototypes'] 
    },
    { 
      name: 'World War Two', 
      link: '/worldwar2',
      items: ['German Tanks', 'Allied Tanks', 'Soviet Tanks', 'Tank Destroyers'] 
    },
    { 
      name: 'Cold War', 
      link: '/worldwar3',
      items: ['NATO Tanks', 'Warsaw Pact', 'Main Battle Tanks', 'IFVs'] 
    },
    { 
      name: 'Modern Era', 
      link: '/modernera',
      items: ['Current MBTs', 'Future Concepts', 'Upgrades', 'Export Variants'] 
    },
    { 
      name: 'Equinox Tanks', 
      items: ['Movie Tanks', 'Game Vehicles', 'Hoaxes', 'Prototypes'], 
      active: true 
    },
    { 
      name: 'Shop', 
      link: '/shop',
      items: ['Books', 'Models', 'Merchandise', 'Digital Content'] 
    },
    
    
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="bg-gray-800 text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-black font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight">Equinox</h1>
                <h1 className="text-lg font-bold leading-tight">Tanks</h1>
              </div>
            </Link>
          </div>

          {/* Social Icons and Dark Mode */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-600 rounded cursor-pointer hover:bg-gray-500 transition-colors"></div>
            <div className="w-8 h-8 bg-blue-600 rounded cursor-pointer hover:bg-blue-500 transition-colors"></div>
            <div className="w-8 h-8 bg-blue-400 rounded cursor-pointer hover:bg-blue-300 transition-colors"></div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-3 py-1 rounded text-sm ml-4 transition-colors ${
                isDarkMode ? 'bg-yellow-400 text-black' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Dark Mode
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 text-sm">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.link ? (
                  <Link
                    to={item.link}
                    className={`flex items-center gap-1 hover:text-yellow-400 transition-colors ${
                      item.active ? 'text-yellow-400' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center gap-1 hover:text-yellow-400 transition-colors ${
                      item.active ? 'text-yellow-400' : ''
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                )}
                
                {activeDropdown === item.name && !item.link && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-md shadow-lg py-2 min-w-48 z-50">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors"
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center gap-4 ml-4 border-l border-gray-600 pl-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
              >
                <Menu className="w-4 h-4" />
                Menu
              </button>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center gap-2"
          >
            <Menu className="w-5 h-5" />
            Menu
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tanks, articles, and more..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 border-t border-gray-700 pt-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.link ? (
                    <Link
                      to={item.link}
                      className={`block w-full text-left py-2 hover:text-yellow-400 transition-colors ${
                        item.active ? 'text-yellow-400' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      className={`block w-full text-left py-2 hover:text-yellow-400 transition-colors ${
                        item.active ? 'text-yellow-400' : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 