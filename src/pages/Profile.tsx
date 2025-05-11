import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Bell, Shield, HardDrive } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  
  // Demo profile data
  const profile = {
    joined: 'March 2025',
    plan: 'Free',
    storage: {
      used: 5.7,
      total: 15
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'storage', label: 'Storage', icon: <HardDrive size={18} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-white mr-4 overflow-hidden">
              {user?.avatar ? (
                <img 
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-800 text-2xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <div className="flex items-center mt-1">
                <Mail size={16} className="mr-1" />
                <span>{user?.email}</span>
              </div>
              <div className="mt-2 flex space-x-4 text-sm">
                <div>
                  <span className="opacity-75">Member since:</span> {profile.joined}
                </div>
                <div>
                  <span className="opacity-75">Plan:</span> {profile.plan}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 flex items-center transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={user?.name}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={user?.email}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-800 font-bold">
                          {user?.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      Change
                    </button>
                    <button className="ml-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-800">Protect your account with 2FA</h5>
                    <p className="text-sm text-gray-500 mt-1">
                      Add an extra layer of security to your account by requiring a verification code.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { id: 'email-shares', label: 'Email notifications when someone shares a file with you' },
                  { id: 'email-comments', label: 'Email notifications for comments on your files' },
                  { id: 'email-updates', label: 'Product updates and announcements' },
                  { id: 'browser', label: 'Browser notifications for file activities' },
                ].map((option) => (
                  <div key={option.id} className="flex items-center justify-between py-3 border-b">
                    <div>
                      <label htmlFor={option.id} className="text-gray-800">
                        {option.label}
                      </label>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id={option.id}
                        defaultChecked={option.id !== 'browser'}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                      />
                      <label
                        htmlFor={option.id}
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'storage' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Storage Management</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Storage Used</span>
                  <span className="text-gray-700 font-medium">
                    {profile.storage.used} GB of {profile.storage.total} GB
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(profile.storage.used / profile.storage.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Storage Plan</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Current Plan</p>
                      <p className="font-medium text-lg">Free Plan</p>
                      <p className="text-sm text-gray-500 mt-1">15 GB Storage</p>
                    </div>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Upgrade
                    </button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Recovery Options</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Deleted files are kept in trash for 30 days before being permanently removed.
                  </p>
                  <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Empty Trash
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-end">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;