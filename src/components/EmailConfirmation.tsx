import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';
import Logo from './Logo';
import Footer from './Footer';

const EmailConfirmation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Logo />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>

            {/* Header */}
            <h1 className="text-3xl font-bold text-white mb-4">
              Check Your Email
            </h1>
            
            <div className="flex items-center justify-center mb-6">
              <Mail className="h-6 w-6 text-violet-400 mr-2" />
              <p className="text-gray-400">
                We've sent you a confirmation link
              </p>
            </div>

            <p className="text-gray-300 mb-6">
              Please check your email and click the confirmation link to activate your account. 
              Once confirmed, you can sign in to Plamento.
            </p>

            {/* Actions */}
            <div className="space-y-4">
              <Link
                to="/login"
                className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-800 inline-block text-center"
              >
                Go to Sign In
              </Link>
              
              <p className="text-sm text-gray-400">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={handleResendEmail}
                  className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
                >
                  resend confirmation
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Add resend email function
const handleResendEmail = async () => {
  // This would need the user's email - you might want to pass it via state or store it
  toast.info('Please try signing up again if you need a new confirmation email.');
};

export default EmailConfirmation;