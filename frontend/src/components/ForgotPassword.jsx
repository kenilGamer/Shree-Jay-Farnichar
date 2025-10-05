import React, { useState } from 'react';
import { FaEnvelope, FaArrowLeft, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always succeed
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="card-modern text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                  <FaCheckCircle className="text-3xl text-white" />
                </div>
                
                <div>
                  <h1 className="heading-md text-white mb-4">Check Your Email</h1>
                  <p className="text-gray-300 leading-relaxed">
                    We've sent a password reset link to <strong className="text-white">{email}</strong>. 
                    Please check your email and follow the instructions to reset your password.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="btn-secondary flex-1"
                    >
                      Try Another Email
                    </button>
                    <Link 
                      to="/login" 
                      className="btn-primary flex-1 text-center"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Back to Login Link */}
          <div className="mb-6">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D3AA62] transition-colors duration-300"
            >
              <FaArrowLeft className="text-sm" />
              Back to Login
            </Link>
          </div>

          <div className="card-modern">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEnvelope className="text-2xl text-black" />
              </div>
              
              <h1 className="heading-md text-white mb-4">Forgot Password?</h1>
              <p className="text-gray-300 leading-relaxed">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                    required
                  />
                  <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending Reset Link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  className="text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-center">
            <div className="card-modern">
              <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                If you're having trouble accessing your account, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="mailto:bhumiinteriorsolution@gmail.com" 
                  className="btn-secondary text-center"
                >
                  Contact Support
                </a>
                <a 
                  href="tel:+919228104285" 
                  className="btn-ghost text-center"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

