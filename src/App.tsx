import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import Dashboard from './components/Dashboard';
import EmailConfirmation from './components/EmailConfirmation';
import UserProfile from './components/UserProfile';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import { supabase } from './lib/supabase';

// Component to handle email confirmation
const EmailConfirmationHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  React.useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');
      
      if (token && type === 'signup') {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup'
          });
          
          if (error) {
            toast.error('Email confirmation failed. Please try again.');
          } else {
            toast.success('Email confirmed successfully! You can now sign in.');
          }
        } catch (error) {
          toast.error('An error occurred during email confirmation.');
        }
      }
    };
    
    handleEmailConfirmation();
  }, [searchParams]);
  
  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Otherwise show login page
  return <LoginPage />;
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <EmailConfirmationHandler />} 
            />
            <Route 
              path="/signup" 
              element={user ? <Navigate to="/dashboard" replace /> : <CreateAccountPage />} 
            />
            <Route 
              path="/email-confirmation" 
              element={<EmailConfirmation />} 
            />
            <Route 
              path="/forgot-password" 
              element={<ForgotPasswordPage />} 
            />
            <Route 
              path="/reset-password" 
              element={<ResetPasswordPage />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/profile" 
              element={user ? <UserProfile /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
            />
          </Routes>
        </div>
      </Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#374151',
            color: '#fff',
            border: '1px solid #4B5563',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;