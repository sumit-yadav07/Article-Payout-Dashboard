import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/slices/authSlice';
import { LogOut, Settings, LayoutDashboard } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { account } from '../../config/appwrite';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:');
    }
    
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">NewsDunia</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center gap-2"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </button>
            
            <button
              onClick={() => navigate('/payout-settings')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center gap-2"
            >
              <Settings size={20} />
              Payout Settings
            </button>

            <ThemeToggle />

            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;