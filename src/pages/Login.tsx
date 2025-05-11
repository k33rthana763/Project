import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileUp } from 'lucide-react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex flex-col md:flex-row items-stretch">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-md mx-auto md:mx-0">
          <div className="mb-8 flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <FileUp size={32} className="text-white" />
            </div>
            <h1 className="ml-4 text-3xl font-bold">CloudShare</h1>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Share files with <span className="text-blue-200">confidence</span>
          </h2>
          
          <p className="text-lg text-blue-100 mb-8">
            Store, share, and collaborate on files with our secure platform. 
            Get started today and experience seamless file management.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              'Secure Storage',
              'Easy Sharing',
              'File Versioning',
              'Team Access',
              'Mobile Access',
              'Encrypted'
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-full p-1">
                <button 
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isLogin ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500'}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button 
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isLogin ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500'}`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            {isLogin ? <LoginForm /> : <SignupForm onSuccess={() => setIsLogin(true)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;