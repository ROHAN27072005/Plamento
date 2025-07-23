import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

interface UserDetails {
  first_name: string;
  last_name: string;
}
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch user details from custom table
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_details')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (!error && data) {
          setUserDetails(data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    
    fetchUserDetails();
  }, [user]);
  // Get user's first name from metadata or email
  const getFirstName = () => {
    if (userDetails?.first_name) {
      return userDetails.first_name;
    }
    // Fallback to first part of email if no first name
    return user?.email?.split('@')[0] || 'User';
  };

  const getFirstNameInitial = () => {
    return getFirstName().charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
      console.error('Error signing out:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    {getFirstNameInitial()}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-semibold">
                          {getFirstNameInitial()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {getFirstName()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/profile');
                      }}
                      className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleSignOut();
                      }}
                      className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Plamento! 🎉
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Empty Cards */}
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 h-48 hover:bg-gray-800/40 transition-all duration-200 cursor-pointer"
            >
              {/* Empty card content - you can add content here later */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;