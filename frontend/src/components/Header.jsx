import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Filter, Sun, Moon, LogOut, Menu, Grid3X3 } from "lucide-react";
import Logo from "./Logo";
import { logoutUser, getUser } from "../api/authAPI";

const Header = ({
  authHeader = false,
  searchTerm = "",
  setSearchTerm,
  filterPriority = "all",
  setFilterPriority,
  isDarkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  const fetchProfileIcon = () => {
    const username = getUser();
    return username[0].toUpperCase();
  };
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
      <div className="max-w-7xl mx-auto px-2 md:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <Logo className="w-14 h-14" />

              <div
                to="/"
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors unbounded-700"
              >
                <span className="unbounded-900 text-3xl md:text-4xl">P</span>lan
                <span className="unbounded-900 text-3xl md:text-4xl">P</span>
                ilot
              </div>
            </div>
          </div>

          {/* Search and Filter*/}
          {!authHeader && (
            <div className="hidden md:flex items-center justify-center flex-1 max-w-lg mx-8">
              <div className="flex items-center space-x-4 w-full max-w-md">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    size={18}
                  />
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white appearance-none cursor-pointer transition-colors min-w-[140px]"
                  >
                    <option value="all">All Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Auth Navigation for bigger screens */}
            {authHeader && (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isLoginPage
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isRegisterPage
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Toggle dark mode"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {!authHeader && (
              <>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>

                {/* Profile Icon */}
                <div
                  className="hidden md:flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer"
                  title={getUser()}
                >
                  {fetchProfileIcon()}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  <Menu size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {/* Search and Filter for non-auth pages */}
              {!authHeader && (
                <>
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Filter
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      size={18}
                    />
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none cursor-pointer transition-colors"
                    >
                      <option value="all">All Priority</option>
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer">
                      {fetchProfileIcon()}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
